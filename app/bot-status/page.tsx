import { Metadata } from "next";
import BotStatusOverview from "@/components/bot/BotStatusOverview";
import BotSettings from "@/components/bot/BotSettings";
import BotPerformance from "@/components/bot/BotPerformance";
import RecentTrades from "@/components/bot/RecentTrades";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const metadata: Metadata = {
  title: "Bot Status - IKABAY",
  description: "Suivez les performances de votre bot de trading en temps réel",
};

export default function BotStatusPage() {
  return (
    <RoleGuard>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Bot Trading MEXC
          </h1>
          <p className="text-gray-600">
            Suivez les performances de votre bot de trading en temps réel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <BotStatusOverview />
            <RecentTrades />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BotSettings />
            <BotPerformance />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}