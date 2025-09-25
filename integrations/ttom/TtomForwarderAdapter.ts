import { z } from 'zod';
import nodemailer from 'nodemailer';
import SftpClient from 'ssh2-sftp-client';
import fs from 'fs';
import { PDFDocument, rgb } from 'pdf-lib';

const TtomQuoteRequestSchema = z.object({
  from: z.object({
    countryCode: z.string(),
    cityName: z.string()
  }),
  to: z.object({
    countryCode: z.string(),
    cityName: z.string()
  }),
  packages: z.array(z.object({
    weight: z.number(),
    length: z.number(),
    width: z.number(),
    height: z.number()
  }))
});

const TtomBookingRequestSchema = z.object({
  orders: z.array(z.object({
    reference: z.string(),
    items: z.array(z.object({
      sku: z.string(),
      description: z.string(),
      quantity: z.number(),
      weight: z.number(),
      value: z.number(),
      hs_code: z.string().optional()
    }))
  })),
  shipper: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    email: z.string(),
    phone: z.string()
  }),
  consignee: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    email: z.string(),
    phone: z.string()
  })
});

export interface TtomRate {
  service: string;
  totalPrice: number;
  currency: string;
  transitTime: string;
  mode: 'sea';
}

export interface TtomBooking {
  bookingReference: string;
  manifestUrl: string;
  packingListUrl: string;
  estimatedDeparture: string;
  estimatedArrival: string;
}

export class TtomForwarderAdapter {
  private contactEmail: string;
  private sftpHost: string;
  private sftpPort: number;
  private sftpUser: string;
  private sftpKeyPath: string;
  private defaultOrigin: string;
  private defaultTransitDays: number;

  constructor() {
    this.contactEmail = process.env.TTOM_CONTACT_EMAIL || 'ops@ttom.fr';
    this.sftpHost = process.env.TTOM_SFTP_HOST || '';
    this.sftpPort = parseInt(process.env.TTOM_SFTP_PORT || '22');
    this.sftpUser = process.env.TTOM_SFTP_USER || '';
    this.sftpKeyPath = process.env.TTOM_SFTP_PRIVATE_KEY_PATH || './certs/ttom_id_rsa';
    this.defaultOrigin = process.env.TTOM_DEFAULT_ORIGIN || 'Rouen';
    this.defaultTransitDays = parseInt(process.env.TTOM_DEFAULT_TRANSIT_TIME_DAYS || '11');
  }

  private isConfigured(): boolean {
    return !!(this.contactEmail);
  }

  private isSftpConfigured(): boolean {
    return !!(this.sftpHost && this.sftpUser && fs.existsSync(this.sftpKeyPath));
  }

  async quoteRates(request: z.infer<typeof TtomQuoteRequestSchema>): Promise<TtomRate[]> {
    try {
      const validatedRequest = TtomQuoteRequestSchema.parse(request);
      
      // Calcul heuristique basé sur le volume et poids
      const totalVolume = validatedRequest.packages.reduce((sum, pkg) => 
        sum + (pkg.length * pkg.width * pkg.height / 1000000), 0); // m³
      const totalWeight = validatedRequest.packages.reduce((sum, pkg) => sum + pkg.weight, 0);
      
      // Tarification maritime simplifiée (à ajuster selon les vraies grilles TTOM)
      const volumeRate = 150; // €/m³
      const weightRate = 2.5; // €/kg
      const fixedFee = 85; // Frais fixes
      
      const volumeCost = totalVolume * volumeRate;
      const weightCost = totalWeight * weightRate;
      const totalCost = Math.max(volumeCost, weightCost) + fixedFee;
      
      // Transit time selon destination
      let transitDays = this.defaultTransitDays;
      if (validatedRequest.to.countryCode === 'MQ' || validatedRequest.to.countryCode === 'GP') {
        transitDays = 8; // Ligne directe Antilles
      }
      
      return [
        {
          service: 'TTOM Maritime Standard',
          totalPrice: Math.round(totalCost * 100) / 100,
          currency: 'EUR',
          transitTime: `${transitDays} jours`,
          mode: 'sea'
        }
      ];

    } catch (error) {
      console.error('TTOM quote error:', error);
      throw error;
    }
  }

  async book(request: z.infer<typeof TtomBookingRequestSchema>): Promise<TtomBooking> {
    if (!this.isConfigured()) {
      throw new Error('TTOM not configured - missing contact email');
    }

    try {
      const validatedRequest = TtomBookingRequestSchema.parse(request);
      const bookingRef = `TTOM-${Date.now()}`;
      
      // Générer le manifeste CSV
      const manifestCsv = await this.generateManifest(validatedRequest, bookingRef);
      const manifestPath = `/tmp/manifest_${bookingRef}.csv`;
      fs.writeFileSync(manifestPath, manifestCsv);
      
      // Générer la packing list PDF
      const packingListPdf = await this.generatePackingList(validatedRequest, bookingRef);
      const packingListPath = `/tmp/packing_list_${bookingRef}.pdf`;
      fs.writeFileSync(packingListPath, packingListPdf);
      
      // Envoyer via SFTP si configuré, sinon par email
      if (this.isSftpConfigured()) {
        await this.sendViaSftp(manifestPath, packingListPath, bookingRef);
      } else {
        await this.sendViaEmail(manifestPath, packingListPath, bookingRef);
      }
      
      // Nettoyer les fichiers temporaires
      fs.unlinkSync(manifestPath);
      fs.unlinkSync(packingListPath);
      
      const departureDate = new Date();
      departureDate.setDate(departureDate.getDate() + 3); // Départ dans 3 jours
      
      const arrivalDate = new Date(departureDate);
      arrivalDate.setDate(arrivalDate.getDate() + this.defaultTransitDays);
      
      return {
        bookingReference: bookingRef,
        manifestUrl: `data:text/csv;base64,${Buffer.from(manifestCsv).toString('base64')}`,
        packingListUrl: `data:application/pdf;base64,${packingListPdf.toString('base64')}`,
        estimatedDeparture: departureDate.toISOString(),
        estimatedArrival: arrivalDate.toISOString()
      };

    } catch (error) {
      console.error('TTOM booking error:', error);
      throw error;
    }
  }

  private async generateManifest(request: z.infer<typeof TtomBookingRequestSchema>, bookingRef: string): Promise<string> {
    const headers = ['Booking_Ref', 'Order_Ref', 'SKU', 'Description', 'Quantity', 'Weight_KG', 'Value_EUR', 'HS_Code'];
    const rows = [headers.join(',')];
    
    for (const order of request.orders) {
      for (const item of order.items) {
        rows.push([
          bookingRef,
          order.reference,
          item.sku,
          `"${item.description}"`,
          item.quantity.toString(),
          item.weight.toString(),
          item.value.toString(),
          item.hs_code || '9999999999'
        ].join(','));
      }
    }
    
    return rows.join('\n');
  }

  private async generatePackingList(request: z.infer<typeof TtomBookingRequestSchema>, bookingRef: string): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();
    
    let yPosition = height - 50;
    
    // En-tête
    page.drawText('TTOM - PACKING LIST', {
      x: 50,
      y: yPosition,
      size: 20,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 30;
    page.drawText(`Booking Reference: ${bookingRef}`, {
      x: 50,
      y: yPosition,
      size: 12
    });
    
    yPosition -= 20;
    page.drawText(`Date: ${new Date().toLocaleDateString('fr-FR')}`, {
      x: 50,
      y: yPosition,
      size: 12
    });
    
    // Expéditeur
    yPosition -= 40;
    page.drawText('SHIPPER:', {
      x: 50,
      y: yPosition,
      size: 14,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 20;
    page.drawText(`${request.shipper.name}`, { x: 50, y: yPosition, size: 10 });
    yPosition -= 15;
    page.drawText(`${request.shipper.address}`, { x: 50, y: yPosition, size: 10 });
    yPosition -= 15;
    page.drawText(`${request.shipper.city}, ${request.shipper.country}`, { x: 50, y: yPosition, size: 10 });
    
    // Destinataire
    yPosition -= 40;
    page.drawText('CONSIGNEE:', {
      x: 50,
      y: yPosition,
      size: 14,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 20;
    page.drawText(`${request.consignee.name}`, { x: 50, y: yPosition, size: 10 });
    yPosition -= 15;
    page.drawText(`${request.consignee.address}`, { x: 50, y: yPosition, size: 10 });
    yPosition -= 15;
    page.drawText(`${request.consignee.city}, ${request.consignee.country}`, { x: 50, y: yPosition, size: 10 });
    
    // Items
    yPosition -= 40;
    page.drawText('ITEMS:', {
      x: 50,
      y: yPosition,
      size: 14,
      color: rgb(0, 0, 0)
    });
    
    yPosition -= 25;
    // Headers
    page.drawText('SKU', { x: 50, y: yPosition, size: 10 });
    page.drawText('Description', { x: 150, y: yPosition, size: 10 });
    page.drawText('Qty', { x: 350, y: yPosition, size: 10 });
    page.drawText('Weight', { x: 400, y: yPosition, size: 10 });
    page.drawText('Value', { x: 470, y: yPosition, size: 10 });
    
    yPosition -= 20;
    
    for (const order of request.orders) {
      for (const item of order.items) {
        if (yPosition < 50) break; // Nouvelle page nécessaire
        
        page.drawText(item.sku, { x: 50, y: yPosition, size: 9 });
        page.drawText(item.description.substring(0, 25), { x: 150, y: yPosition, size: 9 });
        page.drawText(item.quantity.toString(), { x: 350, y: yPosition, size: 9 });
        page.drawText(`${item.weight}kg`, { x: 400, y: yPosition, size: 9 });
        page.drawText(`€${item.value}`, { x: 470, y: yPosition, size: 9 });
        
        yPosition -= 15;
      }
    }
    
    return Buffer.from(await pdfDoc.save());
  }

  private async sendViaSftp(manifestPath: string, packingListPath: string, bookingRef: string): Promise<void> {
    const sftp = new SftpClient();
    
    try {
      await sftp.connect({
        host: this.sftpHost,
        port: this.sftpPort,
        username: this.sftpUser,
        privateKey: fs.readFileSync(this.sftpKeyPath)
      });
      
      const remoteDir = `/incoming/${bookingRef}`;
      await sftp.mkdir(remoteDir, true);
      
      await sftp.put(manifestPath, `${remoteDir}/manifest.csv`);
      await sftp.put(packingListPath, `${remoteDir}/packing_list.pdf`);
      
      console.log(`TTOM booking ${bookingRef} sent via SFTP`);
      
    } catch (error) {
      console.error('SFTP upload error:', error);
      throw error;
    } finally {
      await sftp.end();
    }
  }

  private async sendViaEmail(manifestPath: string, packingListPath: string, bookingRef: string): Promise<void> {
    // Configuration email basique (à adapter selon le provider)
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com', // À configurer
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: this.contactEmail,
      subject: `TTOM Booking Request - ${bookingRef}`,
      text: `
Nouvelle demande de booking maritime TTOM.

Référence: ${bookingRef}
Date: ${new Date().toLocaleDateString('fr-FR')}

Veuillez traiter les documents en pièce jointe.

Cordialement,
IKABAY OPS
      `,
      attachments: [
        {
          filename: 'manifest.csv',
          path: manifestPath
        },
        {
          filename: 'packing_list.pdf',
          path: packingListPath
        }
      ]
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`TTOM booking ${bookingRef} sent via email to ${this.contactEmail}`);
    } catch (error) {
      console.error('Email send error:', error);
      // Ne pas faire échouer le booking si l'email échoue
      console.log(`TTOM booking ${bookingRef} created but email failed - manual processing required`);
    }
  }

  async track(bookingReference: string): Promise<{
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
    // TTOM n'ayant pas d'API de tracking, retourner des données simulées
    // En production, ceci serait alimenté par des mises à jour manuelles ou parsing email
    
    const statuses = ['booked', 'consolidation', 'on_water', 'customs', 'delivered'];
    const currentStatusIndex = Math.min(
      Math.floor((Date.now() % 1000000) / 200000), // Simulation basée sur le temps
      statuses.length - 1
    );
    
    const events = statuses.slice(0, currentStatusIndex + 1).map((status, index) => ({
      status,
      location: index < 2 ? 'Rouen, France' : index < 3 ? 'En mer' : 'Fort-de-France, Martinique',
      timestamp: new Date(Date.now() - (statuses.length - index) * 86400000).toISOString(),
      description: this.getStatusDescription(status)
    }));
    
    return {
      status: statuses[currentStatusIndex],
      location: events[events.length - 1]?.location,
      timestamp: events[events.length - 1]?.timestamp,
      events
    };
  }

  private getStatusDescription(status: string): string {
    const descriptions: Record<string, string> = {
      'booked': 'Booking confirmé',
      'consolidation': 'Consolidation en cours',
      'on_water': 'En transit maritime',
      'customs': 'Dédouanement',
      'delivered': 'Livré'
    };
    
    return descriptions[status] || status;
  }
}