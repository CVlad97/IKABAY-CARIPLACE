import { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { AdminGuard } from "@/components/auth/AdminGuard";

export const metadata: Metadata = {
  title: "Admin - IKABAY",
  description: "Panneau d'administration IKABAY",
};

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Administration
          </h1>
          <p className="text-gray-600">
            Gérez les utilisateurs, les transactions et les paramètres du système
          </p>
        </div>

        <AdminDashboard />
      </div>
    </AdminGuard>
  );
}