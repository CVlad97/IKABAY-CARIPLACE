import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Shield, 
  Edit, 
  Trash, 
  Plus, 
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  RefreshCw,
  Save,
  X
} from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { UserRole, ResourceType, PermissionAction } from '../../utils/permissions';

const RoleManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  // Available roles
  const roles = [
    { id: UserRole.USER, name: 'Utilisateur', color: 'bg-gray-100 text-gray-800' },
    { id: UserRole.SUPPLIER, name: 'Fournisseur', color: 'bg-blue-100 text-blue-800' },
    { id: UserRole.PARTNER, name: 'Partenaire', color: 'bg-purple-100 text-purple-800' },
    { id: UserRole.ADMIN, name: 'Administrateur', color: 'bg-red-100 text-red-800' },
    { id: UserRole.SUPER_ADMIN, name: 'Super Admin', color: 'bg-yellow-100 text-yellow-800' }
  ];

  // Available permissions
  const permissions = [
    { id: `${ResourceType.USER}:${PermissionAction.READ}`, name: 'Voir utilisateurs' },
    { id: `${ResourceType.USER}:${PermissionAction.CREATE}`, name: 'Créer utilisateurs' },
    { id: `${ResourceType.USER}:${PermissionAction.UPDATE}`, name: 'Modifier utilisateurs' },
    { id: `${ResourceType.USER}:${PermissionAction.DELETE}`, name: 'Supprimer utilisateurs' },
    { id: `${ResourceType.PRODUCT}:${PermissionAction.READ}`, name: 'Voir produits' },
    { id: `${ResourceType.PRODUCT}:${PermissionAction.CREATE}`, name: 'Créer produits' },
    { id: `${ResourceType.PRODUCT}:${PermissionAction.UPDATE}`, name: 'Modifier produits' },
    { id: `${ResourceType.PRODUCT}:${PermissionAction.DELETE}`, name: 'Supprimer produits' },
    { id: `${ResourceType.ORDER}:${PermissionAction.READ}`, name: 'Voir commandes' },
    { id: `${ResourceType.ORDER}:${PermissionAction.UPDATE}`, name: 'Modifier commandes' },
    { id: `${ResourceType.SYSTEM}:${PermissionAction.READ}`, name: 'Voir système' },
    { id: `${ResourceType.SYSTEM}:${PermissionAction.MANAGE}`, name: 'Gérer système' },
  ];

  useEffect(() => {
    fetchUsers();
  }, [selectedRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      let query = supabase.from('users').select('*');
      
      if (selectedRole) {
        query = query.eq('role', selectedRole);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const createRole = async () => {
    try {
      const { error } = await supabase
        .from('roles')
        .insert({
          name: newRole.name,
          description: newRole.description,
          permissions: newRole.permissions
        });
        
      if (error) throw error;
      
      setShowAddRole(false);
      setNewRole({
        name: '',
        description: '',
        permissions: []
      });
      
      // Refresh roles
      // In a real app, you would fetch roles from the database
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    
    return (
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getRoleColor = (role: string) => {
    const foundRole = roles.find(r => r.id === role);
    return foundRole ? foundRole.color : 'bg-gray-100 text-gray-800';
  };

  const getRoleName = (role: string) => {
    const foundRole = roles.find(r => r.id === role);
    return foundRole ? foundRole.name : role;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6" />
            <h2 className="text-xl font-bold">Gestion des Rôles</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddRole(true)}
            className="flex items-center space-x-2 bg-caribbean-gradient px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un Rôle</span>
          </motion.button>
        </div>
        <p className="text-gray-300">
          Gérez les rôles et permissions des utilisateurs de la plateforme
        </p>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedRole || ''}
              onChange={(e) => setSelectedRole(e.target.value || null)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500 appearance-none"
            >
              <option value="">Tous les rôles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchUsers}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </motion.button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-caribbean-600"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
            <p className="text-gray-500">
              Aucun utilisateur ne correspond à vos critères de recherche
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pays
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-caribbean-100 flex items-center justify-center text-caribbean-600 font-bold">
                        {user.full_name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id.substring(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUser?.id === user.id ? (
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {getRoleName(user.role)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingUser?.id === user.id ? (
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => updateUserRole(user.id, editingUser.role)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-caribbean-600 hover:text-caribbean-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Ajouter un Rôle</h3>
              <button
                onClick={() => setShowAddRole(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du rôle
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  placeholder="Ex: Modérateur"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caribbean-500"
                  placeholder="Description du rôle et de ses responsabilités"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permissions
                </label>
                <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2 py-1">
                      <input
                        type="checkbox"
                        id={`perm-${permission.id}`}
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewRole({
                              ...newRole,
                              permissions: [...newRole.permissions, permission.id]
                            });
                          } else {
                            setNewRole({
                              ...newRole,
                              permissions: newRole.permissions.filter(p => p !== permission.id)
                            });
                          }
                        }}
                        className="h-4 w-4 text-caribbean-600 focus:ring-caribbean-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`perm-${permission.id}`} className="text-sm text-gray-700">
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddRole(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={createRole}
                className="px-4 py-2 bg-caribbean-gradient text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Créer le Rôle
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;