import { z } from 'zod';

// Schémas de validation
const DhlQuoteRequestSchema = z.object({
  from: z.object({
    countryCode: z.string(),
    postalCode: z.string(),
    cityName: z.string()
  }),
  to: z.object({
    countryCode: z.string(),
    postalCode: z.string(),
    cityName: z.string()
  }),
  packages: z.array(z.object({
    weight: z.number(),
    length: z.number(),
    width: z.number(),
    height: z.number()
  }))
});

const DhlShipmentRequestSchema = z.object({
  from: z.object({
    countryCode: z.string(),
    postalCode: z.string(),
    cityName: z.string(),
    addressLine1: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string()
  }),
  to: z.object({
    countryCode: z.string(),
    postalCode: z.string(),
    cityName: z.string(),
    addressLine1: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string()
  }),
  packages: z.array(z.object({
    weight: z.number(),
    length: z.number(),
    width: z.number(),
    height: z.number(),
    description: z.string()
  })),
  reference: z.string(),
  labelFormat: z.enum(['PDF', 'PNG', 'ZPL']).default('PDF')
});

export interface DhlRate {
  productCode: string;
  productName: string;
  totalPrice: number;
  currency: string;
  deliveryTime: string;
  cutoffTime?: string;
}

export interface DhlShipment {
  trackingNumber: string;
  labelUrl: string;
  cost: number;
  currency: string;
}

export class DhlExpressAdapter {
  private clientId: string;
  private clientSecret: string;
  private accountNumber: string;
  private region: string;
  private environment: 'sandbox' | 'live';
  private baseUrl: string;
  private accessToken?: string;
  private tokenExpiry?: Date;

  constructor() {
    this.clientId = process.env.DHL_EXPRESS_CLIENT_ID || '';
    this.clientSecret = process.env.DHL_EXPRESS_CLIENT_SECRET || '';
    this.accountNumber = process.env.DHL_EXPRESS_ACCOUNT_NUMBER || '';
    this.region = process.env.DHL_EXPRESS_REGION || 'EU';
    this.environment = (process.env.DHL_EXPRESS_ENV as 'sandbox' | 'live') || 'sandbox';
    
    this.baseUrl = this.environment === 'sandbox' 
      ? 'https://express.api.dhl.com/mydhlapi/test'
      : 'https://express.api.dhl.com/mydhlapi';
  }

  private isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret && this.accountNumber);
  }

  private async authenticate(): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('DHL Express not configured - missing credentials');
    }

    // Vérifier si le token est encore valide
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch(`${this.baseUrl}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          scope: 'express.api'
        })
      });

      if (!response.ok) {
        throw new Error(`DHL Auth failed: ${response.status}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = new Date(Date.now() + (data.expires_in * 1000) - 60000); // -1min buffer

      return this.accessToken;
    } catch (error) {
      console.error('DHL authentication error:', error);
      throw error;
    }
  }

  async quoteRates(request: z.infer<typeof DhlQuoteRequestSchema>): Promise<DhlRate[]> {
    if (!this.isConfigured()) {
      // Mode simulation
      return [
        {
          productCode: 'N',
          productName: 'DHL EXPRESS 12:00',
          totalPrice: 45.50,
          currency: 'EUR',
          deliveryTime: '1 business day',
          cutoffTime: '12:00'
        },
        {
          productCode: 'P',
          productName: 'DHL EXPRESS WORLDWIDE',
          totalPrice: 38.90,
          currency: 'EUR',
          deliveryTime: '2-3 business days'
        }
      ];
    }

    try {
      const validatedRequest = DhlQuoteRequestSchema.parse(request);
      const token = await this.authenticate();

      const payload = {
        customerDetails: {
          shipperDetails: {
            postalAddress: {
              postalCode: validatedRequest.from.postalCode,
              cityName: validatedRequest.from.cityName,
              countryCode: validatedRequest.from.countryCode
            }
          },
          receiverDetails: {
            postalAddress: {
              postalCode: validatedRequest.to.postalCode,
              cityName: validatedRequest.to.cityName,
              countryCode: validatedRequest.to.countryCode
            }
          }
        },
        accounts: [{
          typeCode: 'shipper',
          number: this.accountNumber
        }],
        packages: validatedRequest.packages.map((pkg, index) => ({
          typeCode: '2BP', // Box/Package
          weight: pkg.weight,
          dimensions: {
            length: pkg.length,
            width: pkg.width,
            height: pkg.height
          }
        })),
        plannedShippingDateAndTime: new Date().toISOString()
      };

      const response = await fetch(`${this.baseUrl}/rates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`DHL rates API error: ${response.status}`);
      }

      const data = await response.json();
      
      return data.products?.map((product: any) => ({
        productCode: product.productCode,
        productName: product.productName,
        totalPrice: parseFloat(product.totalPrice?.[0]?.price || '0'),
        currency: product.totalPrice?.[0]?.priceCurrency || 'EUR',
        deliveryTime: product.deliveryCapabilities?.deliveryTypeCode || 'Standard',
        cutoffTime: product.pickupCapabilities?.cutoffTime
      })) || [];

    } catch (error) {
      console.error('DHL quote error:', error);
      throw error;
    }
  }

  async createShipment(request: z.infer<typeof DhlShipmentRequestSchema>): Promise<DhlShipment> {
    if (!this.isConfigured()) {
      // Mode simulation
      return {
        trackingNumber: `SIM${Date.now()}`,
        labelUrl: 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvRm9udERlc2NyaXB0b3IKL0ZvbnROYW1lIC9IZWx2ZXRpY2EKPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDE5MiAwMDAwMCBuIAowMDAwMDAwMjcxIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMzI5CiUlRU9G',
        cost: 42.50,
        currency: 'EUR'
      };
    }

    try {
      const validatedRequest = DhlShipmentRequestSchema.parse(request);
      const token = await this.authenticate();

      const payload = {
        plannedShippingDateAndTime: new Date().toISOString(),
        pickup: {
          isRequested: false
        },
        productCode: 'P', // Express Worldwide par défaut
        accounts: [{
          typeCode: 'shipper',
          number: this.accountNumber
        }],
        customerDetails: {
          shipperDetails: {
            postalAddress: {
              postalCode: validatedRequest.from.postalCode,
              cityName: validatedRequest.from.cityName,
              countryCode: validatedRequest.from.countryCode,
              addressLine1: validatedRequest.from.addressLine1
            },
            contactInformation: {
              companyName: validatedRequest.from.name,
              fullName: validatedRequest.from.name,
              phone: validatedRequest.from.phone,
              email: validatedRequest.from.email
            }
          },
          receiverDetails: {
            postalAddress: {
              postalCode: validatedRequest.to.postalCode,
              cityName: validatedRequest.to.cityName,
              countryCode: validatedRequest.to.countryCode,
              addressLine1: validatedRequest.to.addressLine1
            },
            contactInformation: {
              companyName: validatedRequest.to.name,
              fullName: validatedRequest.to.name,
              phone: validatedRequest.to.phone,
              email: validatedRequest.to.email
            }
          }
        },
        content: {
          packages: validatedRequest.packages.map((pkg, index) => ({
            typeCode: '2BP',
            weight: pkg.weight,
            dimensions: {
              length: pkg.length,
              width: pkg.width,
              height: pkg.height
            },
            customerReferences: [{
              value: validatedRequest.reference,
              typeCode: 'CU'
            }],
            description: pkg.description
          })),
          isCustomsDeclarable: validatedRequest.from.countryCode !== validatedRequest.to.countryCode,
          declaredValue: 100, // À calculer selon les produits
          declaredValueCurrency: 'EUR',
          exportDeclaration: {
            lineItems: validatedRequest.packages.map((pkg, index) => ({
              number: index + 1,
              description: pkg.description,
              price: 50, // À calculer
              quantity: {
                value: 1,
                unitOfMeasurement: 'PCS'
              },
              commodityCodes: [{
                typeCode: 'outbound',
                value: '9999999999' // Code HS générique
              }],
              weight: {
                netValue: pkg.weight,
                grossValue: pkg.weight
              }
            }))
          }
        },
        outputImageProperties: {
          printerDPI: 300,
          encodingFormat: validatedRequest.labelFormat,
          imageOptions: [{
            typeCode: 'label',
            templateName: 'ECOM26_84_001',
            isRequested: true
          }]
        }
      };

      const response = await fetch(`${this.baseUrl}/shipments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`DHL shipment API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        trackingNumber: data.shipmentTrackingNumber,
        labelUrl: data.documents?.[0]?.content || '',
        cost: parseFloat(data.shipmentCharges?.[0]?.price || '0'),
        currency: data.shipmentCharges?.[0]?.priceCurrency || 'EUR'
      };

    } catch (error) {
      console.error('DHL shipment creation error:', error);
      throw error;
    }
  }

  async schedulePickup(params: {
    date: string;
    location: {
      countryCode: string;
      postalCode: string;
      cityName: string;
      addressLine1: string;
      name: string;
      phone: string;
      email: string;
    };
    timeWindow: {
      from: string;
      to: string;
    };
    shipmentDetails: {
      productCode: string;
      accounts: Array<{ typeCode: string; number: string }>;
    };
  }): Promise<{ confirmationNumber: string; readyByTime: string; closingTime: string }> {
    if (!this.isConfigured()) {
      return {
        confirmationNumber: `PU${Date.now()}`,
        readyByTime: params.timeWindow.from,
        closingTime: params.timeWindow.to
      };
    }

    try {
      const token = await this.authenticate();

      const payload = {
        plannedPickupDateAndTime: params.date,
        closeTime: params.timeWindow.to,
        location: params.location.addressLine1,
        locationType: 'business',
        accounts: params.shipmentDetails.accounts,
        customerDetails: {
          shipperDetails: {
            postalAddress: {
              postalCode: params.location.postalCode,
              cityName: params.location.cityName,
              countryCode: params.location.countryCode,
              addressLine1: params.location.addressLine1
            },
            contactInformation: {
              companyName: params.location.name,
              fullName: params.location.name,
              phone: params.location.phone,
              email: params.location.email
            }
          }
        },
        shipmentDetails: [{
          productCode: params.shipmentDetails.productCode,
          isCustomsDeclarable: false,
          unitOfMeasurement: 'metric',
          packages: [{
            weight: 1,
            dimensions: {
              length: 10,
              width: 10,
              height: 10
            }
          }]
        }]
      };

      const response = await fetch(`${this.baseUrl}/pickups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`DHL pickup API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        confirmationNumber: data.dispatchConfirmationNumber,
        readyByTime: data.readyByTime,
        closingTime: data.closingTime
      };

    } catch (error) {
      console.error('DHL pickup scheduling error:', error);
      throw error;
    }
  }

  async track(trackingNumber: string): Promise<{
    status: string;
    location?: string;
    timestamp?: string;
    events: Array<{
      status: string;
      location: string;
      timestamp: string;
      description: string;
    }>;
  }> {
    if (!this.isConfigured()) {
      return {
        status: 'in_transit',
        location: 'Paris, France',
        timestamp: new Date().toISOString(),
        events: [
          {
            status: 'picked_up',
            location: 'Origin facility',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            description: 'Shipment picked up'
          },
          {
            status: 'in_transit',
            location: 'Paris, France',
            timestamp: new Date().toISOString(),
            description: 'In transit to destination'
          }
        ]
      };
    }

    try {
      const token = await this.authenticate();

      const response = await fetch(`${this.baseUrl}/track/shipments?trackingNumber=${trackingNumber}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`DHL tracking API error: ${response.status}`);
      }

      const data = await response.json();
      const shipment = data.shipments?.[0];
      
      if (!shipment) {
        throw new Error('Tracking number not found');
      }

      const events = shipment.events?.map((event: any) => ({
        status: event.typeCode,
        location: event.location?.address?.addressLocality || '',
        timestamp: event.timestamp,
        description: event.description
      })) || [];

      return {
        status: shipment.status?.statusCode || 'unknown',
        location: shipment.status?.location?.address?.addressLocality,
        timestamp: shipment.status?.timestamp,
        events
      };

    } catch (error) {
      console.error('DHL tracking error:', error);
      throw error;
    }
  }
}