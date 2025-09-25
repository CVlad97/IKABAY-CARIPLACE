"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Store, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Upload,
  Download,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Filter
} from "lucide-react";
import { useSupabase } from "@/lib/supabase-provider";

const SupplierManagement = () => {
  const { supabase } = useSupabase();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    category: "",
    status: "active"
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setSuppliers(data || []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setErrorMessage("Erreur lors du chargement des fournisseurs");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      category: "",
      status: "active"
    });
    setEditingSupplier(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSupplier) {
        // Update existing supplier
        const { error } = await supabase
          .from('suppliers')
          .update(formData)
          .eq('id', editingSupplier.id);
          
        if (error) throw error;
        
        setSuccessMessage("Fournisseur mis à jour avec succès");
      } else {
        // Add new supplier
        const { error } = await supabase
          .from('suppliers')
          .insert([formData]);
          
        if (error) throw error;
        
        setSuccessMessage("Fournisseur ajouté avec succès");
      }
      
      // Reset form and refresh data
      resetForm();
      setShowAddForm(false);
      fetchSuppliers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Error saving supplier:', error);
      setErrorMessage("Erreur lors de l'enregistrement du fournisseur");
      
      // Clear error message after 3 seconds
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleEdit = (supplier: any) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone || "",
      address: supplier.address || "",
      country: supplier.country || "",
      category: supplier.category || "",
      status: supplier.status
    });
    setEditingSupplier(supplier);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setSuccessMessage("Fournisseur supprimé avec succès");
      fetchSuppliers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Error deleting supplier:', error);
      setErrorMessage("Erreur lors de la suppression du fournisseur");
      
      // Clear error message after 3 seconds
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleImportCSV = async () => {
    if (!csvFile) {
      setErrorMessage("Veuillez sélectionner un fichier CSV");
      return;
    }
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        
        const suppliers = [];
        
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue;
          
          const values = rows[i].split(',');
          const supplier: any = {};
          
          headers.forEach((header, index) => {
            supplier[header.trim()] = values[index]?.trim() || "";
          });
          
          // Add required fields if missing
          if (!supplier.status) supplier.status = "active";
          
          suppliers.push(supplier);
        }
        
        if (suppliers.length > 0) {
          const { error } = await supabase
            .from('suppliers')
            .insert(suppliers);
            
          if (error) throw error;
          
          setSuccessMessage(`${suppliers.length} fournisseurs importés avec succès`);
          fetchSuppliers();
          setShowImportForm(false);
          setCsvFile(null);
        } else {
          setErrorMessage("Aucun fournisseur trouvé dans le fichier CSV");
        }
      };
      
      reader.readAsText(csvFile);
    } catch (error) {
      console.error('Error importing CSV:', error);
      setErrorMessage("Erreur lors de l'importation du fichier CSV");
    }
  };

  const handleExportCSV = async () => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*');
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(supplier => 
          Object.values(supplier).map(value => 
            typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
          ).join(',')
        );
        
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `suppliers_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        setErrorMessage("Aucun fournisseur à exporter");
      }
    } catch (error) {
      console.error('Error exporting CSV:', error);
      setErrorMessage("Erreur lors de l'exportation des fournisseurs");
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (supplier.category && supplier.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Success/Error Messages */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-800 p-4 rounded-xl flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span>{successMessage}</span>
        </motion.div>
      )}
      
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-800 p-4 rounded-xl flex items-center space-x-2"
        >
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un fournisseur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              resetForm();
              setShowAddForm(true);
              setShowImportForm(false);
            }}
            className="bg-caribbean-gradient text-white px-4 py-3 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un Fournisseur</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowImportForm(true);
              setShowAddForm(false);
            }}
            className="bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Importer CSV</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportCSV}
            className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Exporter CSV</span>
          </motion.button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {editingSupplier ? 'Modifier le Fournisseur' : 'Ajouter un Fournisseur'}
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du fournisseur *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  placeholder="Nom du fournisseur"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  placeholder="email@fournisseur.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="electronics">Électronique</option>
                  <option value="clothing">Vêtements</option>
                  <option value="home">Maison & Déco</option>
                  <option value="beauty">Beauté & Bien-être</option>
                  <option value="sports">Sports & Loisirs</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                placeholder="Adresse complète"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  placeholder="Pays"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="pending">En attente</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-caribbean-gradient text-white px-6 py-3 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300 flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{editingSupplier ? 'Mettre à jour' : 'Enregistrer'}</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Import CSV Form */}
      {showImportForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Importer des Fournisseurs</h3>
            <button
              onClick={() => setShowImportForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fichier CSV
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-caribbean-500"
              />
              <p className="mt-2 text-sm text-gray-500">
                Le fichier CSV doit contenir les colonnes suivantes : name, email, phone, address, country, category, status
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-medium text-blue-800 mb-2">Format du CSV</h4>
              <pre className="text-xs text-blue-700 bg-blue-100 p-2 rounded-lg overflow-x-auto">
                name,email,phone,address,country,category,status
                Fournisseur A,contact@fournisseura.com,+33123456789,123 Rue de Paris,France,electronics,active
                Fournisseur B,contact@fournisseurb.com,+33987654321,456 Avenue des Champs,France,clothing,active
              </pre>
            </div>
            
            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowImportForm(false)}
                className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleImportCSV}
                disabled={!csvFile}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Importer</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Suppliers Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Liste des Fournisseurs</h3>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="w-8 h-8 text-caribbean-600 animate-spin" />
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Aucun fournisseur trouvé</h4>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "Aucun résultat pour votre recherche" : "Commencez par ajouter votre premier fournisseur"}
            </p>
            {!searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="bg-caribbean-gradient text-white px-6 py-3 rounded-xl font-medium hover:shadow-caribbean transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Ajouter un Fournisseur</span>
              </motion.button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Catégorie</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pays</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{supplier.name}</td>
                    <td className="py-4 px-4 text-gray-600">{supplier.email}</td>
                    <td className="py-4 px-4 text-gray-600">{supplier.category || "-"}</td>
                    <td className="py-4 px-4 text-gray-600">{supplier.country || "-"}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        supplier.status === 'active' ? 'bg-green-100 text-green-800' :
                        supplier.status === 'inactive' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {supplier.status === 'active' ? 'Actif' :
                         supplier.status === 'inactive' ? 'Inactif' :
                         'En attente'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(supplier)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(supplier.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierManagement;