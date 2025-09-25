import { z } from 'zod';
import crypto from 'crypto';

const CheckoutRequestSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('EUR'),
  customer: z.object({
    email: z.string().email(),
    name: z.string().optional()
  }),
  reference: z.string(),
  success_url: z.string().url(),
  cancel_url: z.string().url(),
  description: z.string().optional()
});

export interface RevolutCheckout {
  id: string;
  public_id: string;
  checkout_url: string;
  status: string;
}

export class RevolutMerchantAdapter {
  private apiKey: string;
  private webhookSecret: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.REVOLUT_MERCHANT_API_KEY || '';
    this.webhookSecret = process.env.REVOLUT_MERCHANT_WEBHOOK_SECRET || '';
    this.baseUrl = this.apiKey.startsWith('sk_live_') 
      ? 'https://merchant.revolut.com/api/1.0'
      : 'https://sandbox-merchant.revolut.com/api/1.0';
  }

  private isConfigured(): boolean {
    return !!(this.apiKey && this.webhookSecret);
  }

  async createCheckout(request: z.infer<typeof CheckoutRequestSchema>): Promise<RevolutCheckout> {
    if (!this.isConfigured()) {
      // Mode simulation
      const simulatedId = `sim_${Date.now()}`;
      return {
        id: simulatedId,
        public_id: `pub_${simulatedId}`,
        checkout_url: `${process.env.NEXT_PUBLIC_SITE_URL}/demo/checkout-success?sim=true`,
        status: 'pending'
      };
    }

    try {
      const validatedRequest = CheckoutRequestSchema.parse(request);

      const payload = {
        amount: Math.round(validatedRequest.amount * 100), // Centimes
        currency: validatedRequest.currency,
        capture_mode: 'AUTOMATIC',
        merchant_order_ext_ref: validatedRequest.reference,
        description: validatedRequest.description || `Order ${validatedRequest.reference}`,
        settlement_currency: validatedRequest.currency,
        customer_email: validatedRequest.customer.email,
        success_redirect_url: validatedRequest.success_url,
        failure_redirect_url: validatedRequest.cancel_url,
        cancel_redirect_url: validatedRequest.cancel_url
      };

      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Revolut-Api-Version': '2023-09-01'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Revolut checkout API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        id: data.id,
        public_id: data.public_id,
        checkout_url: data.checkout_url,
        status: data.state
      };

    } catch (error) {
      console.error('Revolut checkout creation error:', error);
      throw error;
    }
  }

  verifyWebhook(signature: string, payload: string): boolean {
    if (!this.isConfigured()) {
      console.log('Revolut webhook simulation mode - signature not verified');
      return true;
    }

    try {
      const expectedSignature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(payload)
        .digest('hex');

      const providedSignature = signature.replace('sha256=', '');
      
      return crypto.timingSafeEqual(
        Buffer.from(expectedSignature, 'hex'),
        Buffer.from(providedSignature, 'hex')
      );
    } catch (error) {
      console.error('Webhook verification error:', error);
      return false;
    }
  }

  async getOrder(orderId: string): Promise<{
    id: string;
    state: string;
    amount: number;
    currency: string;
    merchant_order_ext_ref: string;
    created_at: string;
    updated_at: string;
  }> {
    if (!this.isConfigured()) {
      return {
        id: orderId,
        state: 'COMPLETED',
        amount: 5000, // 50.00 EUR en centimes
        currency: 'EUR',
        merchant_order_ext_ref: 'SIM-ORDER-123',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Revolut-Api-Version': '2023-09-01'
        }
      });

      if (!response.ok) {
        throw new Error(`Revolut get order API error: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Revolut get order error:', error);
      throw error;
    }
  }

  async refundOrder(orderId: string, amount?: number, reason?: string): Promise<{
    id: string;
    state: string;
    amount: number;
    currency: string;
  }> {
    if (!this.isConfigured()) {
      return {
        id: `refund_sim_${Date.now()}`,
        state: 'COMPLETED',
        amount: amount || 5000,
        currency: 'EUR'
      };
    }

    try {
      const payload: any = {
        amount: amount ? Math.round(amount * 100) : undefined,
        reason: reason || 'requested_by_customer'
      };

      const response = await fetch(`${this.baseUrl}/orders/${orderId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Revolut-Api-Version': '2023-09-01'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Revolut refund API error: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Revolut refund error:', error);
      throw error;
    }
  }
}