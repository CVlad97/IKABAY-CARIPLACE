import { Metadata } from "next";
import TradingDashboard from "@/components/trading/TradingDashboard";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const metadata: Metadata = {
  title: "Trading - IKABAY",
  description: "Plateforme de trading automatisé IKABAY",
};

export default function TradingPage() {
  return (
    <RoleGuard>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Plateforme de Trading
          </h1>
          <p className="text-gray-600">
            Suivez vos performances de trading et gérez vos bots automatisés
          </p>
        </div>

        <TradingDashboard />
      </div>
    </RoleGuard>
  );
}