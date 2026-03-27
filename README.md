# IKABAY OPS - Monorepo Autonome

Monorepo Next.js 14 avec connecteurs prêts à l'emploi pour DHL Express, Revolut et TTOM.

## 🚀 Fonctionnalités

### ✅ **Connecteurs Intégrés**
- **DHL Express** : Cotations, création d'envois, étiquettes, pickup, tracking
- **Revolut Merchant** : Paiements carte + webhooks
- **Revolut Business** : Payouts automatiques (mTLS)
- **TTOM** : Transitaire maritime (email/SFTP + façade API)

### ✅ **Autonome & Résilient**
- Fonctionne sans clés (mode simulation)
- Bannières d'information, pas de crash
- Gestion d'erreurs complète
- Timeouts et retry automatiques

### ✅ **Prêt Production**
- TypeScript strict
- Validation Zod
- Logs webhook complets
- Scripts cron-ready

## 🛠 Installation

### 1. Cloner et installer
```bash
git clone <repo-url>
cd ikabay-ops
npm install
```

### 2. Configuration Supabase
```bash
# Exécuter le schema SQL
psql -h <supabase-host> -U postgres -d postgres -f sql/migrations.sql
```

### 3. Variables d'environnement
Copier `.env.example` vers `.env.local` et configurer :

```bash
# Supabase (requis)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE=xxx

# DHL Express (optionnel)
DHL_EXPRESS_CLIENT_ID=xxx
DHL_EXPRESS_CLIENT_SECRET=xxx
DHL_EXPRESS_ACCOUNT_NUMBER=xxx

# Revolut (optionnel)
REVOLUT_MERCHANT_API_KEY=xxx
REVOLUT_BUSINESS_API_KEY_ID=xxx
# + certificats dans ./certs/

# TTOM (optionnel)
TTOM_CONTACT_EMAIL=ops@ttom.fr
```

### 4. Lancer le projet
```bash
npm run dev
```

## 🧪 Tests Manuels

### **1. Health Check**
```bash
# Aller sur /dashboard/integrations
# Cliquer "Vérifier" → voir l'état de chaque service
```

### **2. Shipping (Air)**
```bash
curl -X POST http://localhost:3000/api/shipping/quote \
  -H "Content-Type: application/json" \
  -d '{
    "from": {"countryCode": "FR", "postalCode": "75001", "cityName": "Paris"},
    "to": {"countryCode": "MQ", "postalCode": "97200", "cityName": "Fort-de-France"},
    "packages": [{"weight": 1, "length": 10, "width": 10, "height": 10}]
  }'
```

### **3. Shipping (Sea)**
```bash
curl -X POST http://localhost:3000/api/shipping/book-sea \
  -H "Content-Type: application/json" \
  -d '{
    "orders": [{"id": "xxx", "reference": "TEST-001", "items": [...]}],
    "shipper": {...},
    "consignee": {...}
  }'
```

### **4. Revolut Checkout**
```bash
# Aller sur /demo/checkout
# Tester le flow complet : panier → shipping → paiement
```

### **5. Tracking Unifié**
```bash
curl -X POST http://localhost:3000/api/shipments/track \
  -H "Content-Type: application/json" \
  -d '{"trackingNumber": "1234567890"}'
```

## 📦 Scripts

### **Sync DHL Rates**
```bash
npm run sync-rates
# Synchronise les tarifs DHL sur les routes principales
```

### **TTOM Manifest**
```bash
npm run ttom-manifest
# Génère les manifestes pour les commandes SEA J-1
```

### **Vendor Payouts**
```bash
npm run payouts
# Génère les virements vendeurs hebdomadaires
```

## 🏗 Architecture

### **Intégrations** (`integrations/`)
- `dhl/DhlExpressAdapter.ts` - MyDHL API REST
- `revolut/RevolutMerchantAdapter.ts` - Merchant API
- `revolut/RevolutBusinessAdapter.ts` - Business API (mTLS)
- `ttom/TtomForwarderAdapter.ts` - Email/SFTP + façade unifiée

### **API Routes** (`app/api/`)
- `shipping/quote` - Cotations air + mer
- `shipping/label` - Étiquettes DHL
- `shipping/book-sea` - Booking TTOM
- `pay/revolut/checkout` - Paiements Revolut
- `payouts/revolut` - Virements Business
- `integrations/health` - Health check

### **Pages** (`app/`)
- `dashboard/integrations` - État des connecteurs
- `dashboard/shipments` - Gestion expéditions
- `demo/checkout` - Démo complète

## 🌴 Spécificités Martinique

### **Taxes DOM** (`lib/dom-taxes.ts`)
- TVA 8,5% Martinique
- Octroi de mer (selon HS code)
- Calcul CIF automatique
- Intégration future Zonos/Avalara

### **TTOM Maritime**
- Hub Rouen → Martinique
- Transit 8-11 jours
- Groupage automatique
- Manifestes CSV + PDF

## 🔐 Sécurité

### **Certificats**
```bash
# Placer les certificats dans ./certs/
./certs/revolut-business.pem
./certs/ttom_id_rsa
```

### **IP Whitelisting**
- Revolut Business nécessite IP whitelisting
- Configurer `REVOLUT_BUSINESS_IP_WHITELISTED=true`

### **Webhooks**
- Vérification signatures automatique
- Logs complets dans `webhook_logs`
- Retry et idempotence

## 📊 Monitoring

### **Event Logs**
Tous les événements sont loggés :
- `dhl_rates_sync` - Sync tarifs
- `ttom_manifest_generated` - Manifestes
- `vendor_payouts_generated` - Payouts
- `revolut_payment_completed` - Paiements

### **Health Checks**
- Status temps réel des APIs
- Tests de connectivité
- Alertes de configuration

## 🚀 Déploiement

### **Vercel**
```bash
# Connecter le repo à Vercel
# Ajouter les variables d'environnement
# Uploader les certificats via Vercel CLI
```

### **Variables Production**
```bash
NEXT_PUBLIC_SUPABASE_URL=xxx
SUPABASE_SERVICE_ROLE=xxx
DHL_EXPRESS_CLIENT_ID=xxx
REVOLUT_MERCHANT_API_KEY=xxx
# etc.
```

## 📞 Support

- **DHL Express** : [developer.dhl.com](https://developer.dhl.com)
- **Revolut** : [developer.revolut.com](https://developer.revolut.com)
- **TTOM** : [ttom.fr](https://ttom.fr)

## 🗺 Roadmap

### Phase 1 (Actuel)
- ✅ Connecteurs DHL, Revolut, TTOM
- ✅ Mode autonome sans clés
- ✅ Scripts automatisation

### Phase 2
- [ ] Webhooks TTOM (parsing email)
- [ ] Calculateur taxes Zonos
- [ ] Dashboard analytics avancé

### Phase 3
- [ ] Multi-transporteurs
- [ ] API publique
- [ ] Mobile app

---

**IKABAY OPS** - Connecteurs autonomes pour marketplace caribéenne 🌴🚢✈️