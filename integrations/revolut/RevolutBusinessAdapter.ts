import { z } from 'zod';
import fs from 'fs';
import https from 'https';

const PayoutRequestSchema = z.object({
  beneficiary_email: z.string().email(),
  beneficiary_name: z.string(),
  iban: z.string().optional(),
  bic: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().default('EUR'),
  reference: z.string()
});

export interface RevolutPayout {
  id: string;
  state: string;
  amount: number;
  currency: string;
  beneficiary: {
    name: string;
    email: string;
    iban?: string;
    bic?: string;
  };
  reference: string;
  created_at: string;
  completed_at?: string;
}

export class RevolutBusinessAdapter {
  private certPath: string;
  private apiKeyId: string;
  private orgId: string;
  private baseUrl: string;
  private ipWhitelisted: boolean;

  constructor() {
    this.certPath = process.env.REVOLUT_BUSINESS_API_CERT_PATH || './certs/revolut-business.pem';
    this.apiKeyId = process.env.REVOLUT_BUSINESS_API_KEY_ID || '';
    this.orgId = process.env.REVOLUT_BUSINESS_ORG_ID || '';
    this.baseUrl = process.env.REVOLUT_BUSINESS_BASE || 'https://b2b.revolut.com/api/1.0';
    this.ipWhitelisted = process.env.REVOLUT_BUSINESS_IP_WHITELISTED === 'true';
  }

  private isConfigured(): boolean {
    return !!(this.apiKeyId && this.orgId && fs.existsSync(this.certPath));
  }

  private getHttpsAgent(): https.Agent | undefined {
    if (!this.isConfigured()) return undefined;

    try {
      const cert = fs.readFileSync(this.certPath);
      return new https.Agent({
        cert,
        rejectUnauthorized: true
      });
    } catch (error) {
      console.error('Error loading Revolut Business certificate:', error);
      return undefined;
    }
  }

  async createPayout(request: z.infer<typeof PayoutRequestSchema>): Promise<RevolutPayout> {
    if (!this.isConfigured()) {
      // Mode simulation
      const simulatedId = `payout_sim_${Date.now()}`;
      return {
        id: simulatedId,
        state: 'pending',
        amount: request.amount,
        currency: request.currency,
        beneficiary: {
          name: request.beneficiary_name,
          email: request.beneficiary_email,
          iban: request.iban,
          bic: request.bic
        },
        reference: request.reference,
        created_at: new Date().toISOString()
      };
    }

    try {
      const validatedRequest = PayoutRequestSchema.parse(request);
      const agent = this.getHttpsAgent();

      if (!agent) {
        throw new Error('Failed to create HTTPS agent with certificate');
      }

      const payload = {
        request_id: `req_${Date.now()}`,
        account_id: this.orgId,
        receiver: {
          counterparty_id: null, // Sera créé automatiquement
          account_id: null
        },
        amount: Math.round(validatedRequest.amount * 100), // Centimes
        currency: validatedRequest.currency,
        reference: validatedRequest.reference,
        charge_bearer: 'shared'
      };

      // Si IBAN fourni, créer d'abord le counterparty
      if (validatedRequest.iban) {
        const counterparty = await this.createCounterparty({
          name: validatedRequest.beneficiary_name,
          email: validatedRequest.beneficiary_email,
          iban: validatedRequest.iban,
          bic: validatedRequest.bic
        }, agent);
        
        payload.receiver.counterparty_id = counterparty.id;
      }

      const response = await fetch(`${this.baseUrl}/pay`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKeyId}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        // @ts-ignore - Node.js fetch agent support
        agent
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Revolut Business payout API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        id: data.id,
        state: data.state,
        amount: data.amount / 100, // Convertir en euros
        currency: data.currency,
        beneficiary: {
          name: validatedRequest.beneficiary_name,
          email: validatedRequest.beneficiary_email,
          iban: validatedRequest.iban,
          bic: validatedRequest.bic
        },
        reference: data.reference,
        created_at: data.created_at,
        completed_at: data.completed_at
      };

    } catch (error) {
      console.error('Revolut Business payout creation error:', error);
      throw error;
    }
  }

  private async createCounterparty(details: {
    name: string;
    email: string;
    iban?: string;
    bic?: string;
  }, agent: https.Agent): Promise<{ id: string }> {
    const payload = {
      name: details.name,
      profile_type: 'personal',
      email: details.email,
      accounts: details.iban ? [{
        currency: 'EUR',
        type: 'iban',
        iban: details.iban,
        bic: details.bic
      }] : []
    };

    const response = await fetch(`${this.baseUrl}/counterparty`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKeyId}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      // @ts-ignore
      agent
    });

    if (!response.ok) {
      throw new Error(`Revolut counterparty creation error: ${response.status}`);
    }

    return await response.json();
  }

  async getPayout(payoutId: string): Promise<RevolutPayout> {
    if (!this.isConfigured()) {
      return {
        id: payoutId,
        state: 'completed',
        amount: 100.00,
        currency: 'EUR',
        beneficiary: {
          name: 'Simulation User',
          email: 'sim@example.com'
        },
        reference: 'SIM-REF-123',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        completed_at: new Date().toISOString()
      };
    }

    try {
      const agent = this.getHttpsAgent();
      if (!agent) {
        throw new Error('Failed to create HTTPS agent');
      }

      const response = await fetch(`${this.baseUrl}/transaction/${payoutId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKeyId}`
        },
        // @ts-ignore
        agent
      });

      if (!response.ok) {
        throw new Error(`Revolut Business get payout error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        id: data.id,
        state: data.state,
        amount: data.amount / 100,
        currency: data.currency,
        beneficiary: {
          name: data.counterparty?.name || '',
          email: data.counterparty?.email || ''
        },
        reference: data.reference,
        created_at: data.created_at,
        completed_at: data.completed_at
      };

    } catch (error) {
      console.error('Revolut Business get payout error:', error);
      throw error;
    }
  }

  async listPayouts(limit: number = 50): Promise<RevolutPayout[]> {
    if (!this.isConfigured()) {
      return [
        {
          id: 'sim_payout_1',
          state: 'completed',
          amount: 150.00,
          currency: 'EUR',
          beneficiary: {
            name: 'Vendor A',
            email: 'vendora@example.com'
          },
          reference: 'WEEKLY-PAYOUT-001',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          completed_at: new Date().toISOString()
        }
      ];
    }

    try {
      const agent = this.getHttpsAgent();
      if (!agent) {
        throw new Error('Failed to create HTTPS agent');
      }

      const response = await fetch(`${this.baseUrl}/transactions?limit=${limit}&type=transfer`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKeyId}`
        },
        // @ts-ignore
        agent
      });

      if (!response.ok) {
        throw new Error(`Revolut Business list payouts error: ${response.status}`);
      }

      const data = await response.json();
      
      return data.map((transaction: any) => ({
        id: transaction.id,
        state: transaction.state,
        amount: transaction.amount / 100,
        currency: transaction.currency,
        beneficiary: {
          name: transaction.counterparty?.name || '',
          email: transaction.counterparty?.email || ''
        },
        reference: transaction.reference,
        created_at: transaction.created_at,
        completed_at: transaction.completed_at
      }));

    } catch (error) {
      console.error('Revolut Business list payouts error:', error);
      throw error;
    }
  }
}