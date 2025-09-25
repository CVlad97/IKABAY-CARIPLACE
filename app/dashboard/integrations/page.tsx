'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface HealthCheck {
  configured: boolean;
  status: 'ok' | 'error' | 'not_configured' | 'unknown';
  error?: string | null;
}

interface HealthChecks {
  dhl: HealthCheck;
  revolut_merchant: HealthCheck;
  revolut_business: HealthCheck;
  ttom: HealthCheck;
}

export default function IntegrationsPage() {
  const [healthChecks, setHealthChecks] = useState<HealthChecks | null>(null);
  const [loading, setLoading] = useState(false);

  const runHealthCheck = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/integrations/health', {
        method: 'POST'
      });
      const data = await response.json();
      setHealthChecks(data.health_checks);
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'not_configured':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ok':
        return 'Opérationnel';
      case 'error':
        return 'Erreur';
      case 'not_configured':
        return 'Non configuré';
      default:
        return 'Inconnu';
    }
  };

  const testRevolutCheckout = async () => {
    try {
      const response = await fetch('/api/pay/revolut/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 10.00,
          currency: 'EUR',
          customer: { email: 'test@ikabay.com' },
          reference: 'TEST-' + Date.now(),
          success_url: window.location.origin + '/demo/success',
          cancel_url: window.location.origin + '/demo/cancel',
          description: 'Test checkout'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        window.open(data.checkout.checkout_url, '_blank');
      } else {
        alert('Erreur: ' + data.error);
      }
    } catch (error) {
      alert('Erreur lors du test checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Intégrations
        </h1>
        <p className="text-gray-600">
          État des connecteurs DHL, Revolut et TTOM
        </p>
      </div>

      {/* Health Check */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            État des Services
          </h2>
          <button
            onClick={runHealthCheck}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Vérifier
          </button>
        </div>

        {healthChecks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* DHL Express */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(healthChecks.dhl.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">DHL Express</h3>
                  <p className="text-sm text-gray-600">
                    {getStatusText(healthChecks.dhl.status)}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Configuré: {healthChecks.dhl.configured ? 'Oui' : 'Non'}</p>
                {healthChecks.dhl.error && (
                  <p className="text-red-500 mt-1">{healthChecks.dhl.error}</p>
                )}
              </div>
            </div>

            {/* Revolut Merchant */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(healthChecks.revolut_merchant.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">Revolut Merchant</h3>
                  <p className="text-sm text-gray-600">
                    {getStatusText(healthChecks.revolut_merchant.status)}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Configuré: {healthChecks.revolut_merchant.configured ? 'Oui' : 'Non'}</p>
                {healthChecks.revolut_merchant.configured && (
                  <button
                    onClick={testRevolutCheckout}
                    className="mt-2 text-blue-500 hover:text-blue-700 text-xs"
                  >
                    Tester checkout
                  </button>
                )}
              </div>
            </div>

            {/* Revolut Business */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(healthChecks.revolut_business.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">Revolut Business</h3>
                  <p className="text-sm text-gray-600">
                    {getStatusText(healthChecks.revolut_business.status)}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Configuré: {healthChecks.revolut_business.configured ? 'Oui' : 'Non'}</p>
                {healthChecks.revolut_business.error && (
                  <p className="text-red-500 mt-1">{healthChecks.revolut_business.error}</p>
                )}
              </div>
            </div>

            {/* TTOM */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(healthChecks.ttom.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">TTOM</h3>
                  <p className="text-sm text-gray-600">
                    {getStatusText(healthChecks.ttom.status)}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Configuré: {healthChecks.ttom.configured ? 'Oui' : 'Non'}</p>
                {healthChecks.ttom.error && (
                  <p className="text-red-500 mt-1">{healthChecks.ttom.error}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Cliquez sur "Vérifier" pour tester les intégrations
          </div>
        )}
      </div>

      {/* Configuration Info */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Configuration Requise
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">DHL Express</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• DHL_EXPRESS_CLIENT_ID</p>
              <p>• DHL_EXPRESS_CLIENT_SECRET</p>
              <p>• DHL_EXPRESS_ACCOUNT_NUMBER</p>
              <p>• DHL_EXPRESS_REGION (EU/AM/AP)</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Revolut Merchant</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• REVOLUT_MERCHANT_API_KEY</p>
              <p>• REVOLUT_MERCHANT_WEBHOOK_SECRET</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Revolut Business</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• REVOLUT_BUSINESS_API_CERT_PATH</p>
              <p>• REVOLUT_BUSINESS_API_KEY_ID</p>
              <p>• REVOLUT_BUSINESS_ORG_ID</p>
              <p>• IP whitelisting requis</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">TTOM</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• TTOM_CONTACT_EMAIL (minimum)</p>
              <p>• TTOM_SFTP_* (optionnel pour automatisation)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}