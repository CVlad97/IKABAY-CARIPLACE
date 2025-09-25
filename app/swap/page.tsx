import { Metadata } from "next";
import SwapInterface from "@/components/swap/SwapInterface";
import SwapHistory from "@/components/swap/SwapHistory";
import SwapStats from "@/components/swap/SwapStats";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const metadata: Metadata = {
  title: "Swap - IKABAY",
  description: "Échangez vos cryptomonnaies automatiquement via Jupiter API",
};

export default function SwapPage() {
  return (
    <RoleGuard>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Swap Automatique
          </h1>
          <p className="text-gray-600">
            Échangez vos cryptomonnaies automatiquement via Jupiter API avec des frais réduits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Swap Interface */}
          <div className="lg:col-span-2">
            <SwapInterface />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SwapStats />
            <SwapHistory />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}