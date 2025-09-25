import { Metadata } from "next";
import SupplierManagement from "@/components/admin/SupplierManagement";
import { AdminGuard } from "@/components/auth/AdminGuard";

export const metadata: Metadata = {
  title: "Gestion des Fournisseurs - IKABAY",
  description: "Gérez les fournisseurs de la plateforme IKABAY",
};

export default function SuppliersPage() {
  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Gestion des Fournisseurs
          </h1>
          <p className="text-gray-600">
            Ajoutez, modifiez et gérez les fournisseurs de la plateforme
          </p>
        </div>

        <SupplierManagement />
      </div>
    </AdminGuard>
  );
}