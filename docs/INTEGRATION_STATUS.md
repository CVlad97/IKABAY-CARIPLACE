# Statut des Intégrations IKABAY-CARIPLACE

## DHL Express
- Status : ✅ Connecteur prêt (mode simulation)
- Fonctionnalités : Cotations, Envois, Étiquettes, Pickup, Tracking
- Clés requises : DHL_EXPRESS_CLIENT_ID, DHL_EXPRESS_CLIENT_SECRET, DHL_EXPRESS_ACCOUNT_NUMBER
- Obtenir : https://developer.dhl.com

## Revolut Merchant
- Status : ✅ Connecteur prêt (mode simulation)
- Fonctionnalités : Paiements carte, Webhooks
- Clés requises : REVOLUT_MERCHANT_API_KEY
- Obtenir : https://developer.revolut.com

## Revolut Business (Payouts)
- Status : ✅ Connecteur prêt (mode simulation, mTLS)
- Fonctionnalités : Payouts automatiques vers partenaires
- Clés requises : REVOLUT_BUSINESS_API_KEY_ID + certificats mTLS
- Obtenir : https://developer.revolut.com/docs/business

## TTOM (Transitaire Maritime)
- Status : ✅ Façade API prête
- Fonctionnalités : Cotations maritimes DOM-TOM, réservations
- Contact : ops@ttom.fr

## Supabase
- Status : 🔴 À configurer
- Requis : NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE
- Obtenir : https://supabase.com/dashboard

## Prochaines intégrations prévues
- [ ] Stripe (paiements marketplace)
- [ ] Google SSO
- [ ] Binance Pay
- [ ] IKB Token rewards