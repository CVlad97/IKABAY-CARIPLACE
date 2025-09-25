import { supabase } from './supabase';
import { monitoring } from './monitoring';

// Permission types
export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
}

export enum ResourceType {
  USER = 'user',
  PRODUCT = 'product',
  ORDER = 'order',
  TRANSACTION = 'transaction',
  WALLET = 'wallet',
  SYSTEM = 'system',
  REPORT = 'report',
  SETTING = 'setting',
}

// Role definitions
export enum UserRole {
  USER = 'user',
  SUPPLIER = 'supplier',
  PARTNER = 'partner',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// Permission system
class PermissionSystem {
  private static instance: PermissionSystem;
  private permissionCache: Map<string, boolean> = new Map();
  private roleCache: Map<string, UserRole> = new Map();
  
  // Singleton pattern
  public static getInstance(): PermissionSystem {
    if (!PermissionSystem.instance) {
      PermissionSystem.instance = new PermissionSystem();
    }
    return PermissionSystem.instance;
  }
  
  // Initialize permission system
  public initialize(): void {
    console.log('Permission system initialized');
  }
  
  // Check if user has permission
  public async hasPermission(
    userId: string,
    action: PermissionAction,
    resource: ResourceType,
    resourceId?: string
  ): Promise<boolean> {
    try {
      // Generate cache key
      const cacheKey = `${userId}:${action}:${resource}:${resourceId || '*'}`;
      
      // Check cache first
      if (this.permissionCache.has(cacheKey)) {
        return this.permissionCache.get(cacheKey)!;
      }
      
      // Get user role
      const userRole = await this.getUserRole(userId);
      if (!userRole) return false;
      
      // Check permission based on role
      let hasPermission = false;
      
      switch (userRole) {
        case UserRole.SUPER_ADMIN:
          // Super admins have all permissions
          hasPermission = true;
          break;
          
        case UserRole.ADMIN:
          // Admins have all permissions except for system management
          if (resource === ResourceType.SYSTEM && action === PermissionAction.MANAGE) {
            hasPermission = false;
          } else {
            hasPermission = true;
          }
          break;
          
        case UserRole.PARTNER:
          // Partners can manage their own resources and read most things
          if (action === PermissionAction.READ) {
            hasPermission = resource !== ResourceType.SYSTEM;
          } else if (resourceId) {
            // Check if resource belongs to the user
            hasPermission = await this.isResourceOwner(userId, resource, resourceId);
          }
          break;
          
        case UserRole.SUPPLIER:
          // Suppliers can manage their products and read their orders
          if (resource === ResourceType.PRODUCT) {
            if (action === PermissionAction.CREATE) {
              hasPermission = true;
            } else if (resourceId) {
              hasPermission = await this.isResourceOwner(userId, resource, resourceId);
            }
          } else if (resource === ResourceType.ORDER && action === PermissionAction.READ) {
            hasPermission = true;
          }
          break;
          
        case UserRole.USER:
          // Regular users can only manage their own resources
          if (action === PermissionAction.READ && 
              [ResourceType.PRODUCT, ResourceType.USER].includes(resource)) {
            hasPermission = true;
          } else if (resourceId) {
            hasPermission = await this.isResourceOwner(userId, resource, resourceId);
          }
          break;
          
        default:
          hasPermission = false;
      }
      
      // Cache the result
      this.permissionCache.set(cacheKey, hasPermission);
      
      // Log permission check for monitoring
      if (!hasPermission) {
        monitoring.logEvent('permission_denied', {
          userId,
          action,
          resource,
          resourceId,
          userRole,
        });
      }
      
      return hasPermission;
    } catch (error) {
      console.error('Permission check error:', error);
      
      // Log error
      monitoring.logEvent('permission_check_error', {
        userId,
        action,
        resource,
        resourceId,
        error: error.toString(),
      });
      
      return false;
    }
  }
  
  // Get user role
  public async getUserRole(userId: string): Promise<UserRole | null> {
    try {
      // Check cache first
      if (this.roleCache.has(userId)) {
        return this.roleCache.get(userId)!;
      }
      
      // Get role from database
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      if (!data) return null;
      
      const role = data.role as UserRole;
      
      // Cache the result
      this.roleCache.set(userId, role);
      
      return role;
    } catch (error) {
      console.error('Get user role error:', error);
      return null;
    }
  }
  
  // Check if user is resource owner
  private async isResourceOwner(
    userId: string,
    resource: ResourceType,
    resourceId: string
  ): Promise<boolean> {
    try {
      let table: string;
      let column: string = 'user_id';
      
      // Map resource type to table name
      switch (resource) {
        case ResourceType.USER:
          table = 'users';
          column = 'id';
          break;
        case ResourceType.PRODUCT:
          table = 'products';
          column = 'supplier_id';
          break;
        case ResourceType.ORDER:
          table = 'orders';
          break;
        case ResourceType.TRANSACTION:
          table = 'transactions';
          // Need to join with wallets
          const { data: walletData, error: walletError } = await supabase
            .from('crypto_wallets')
            .select('id')
            .eq('user_id', userId);
            
          if (walletError) throw walletError;
          
          const walletIds = walletData.map(w => w.id);
          
          const { data, error } = await supabase
            .from('transactions')
            .select('id')
            .eq('id', resourceId)
            .in('wallet_id', walletIds);
            
          if (error) throw error;
          
          return data.length > 0;
        case ResourceType.WALLET:
          table = 'crypto_wallets';
          break;
        default:
          return false;
      }
      
      // Check if user owns the resource
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .eq('id', resourceId)
        .eq(column, userId);
        
      if (error) throw error;
      
      return data.length > 0;
    } catch (error) {
      console.error('Resource ownership check error:', error);
      return false;
    }
  }
  
  // Clear permission cache for user
  public clearUserCache(userId: string): void {
    // Clear role cache
    this.roleCache.delete(userId);
    
    // Clear permission cache
    for (const key of this.permissionCache.keys()) {
      if (key.startsWith(`${userId}:`)) {
        this.permissionCache.delete(key);
      }
    }
  }
  
  // Clear all caches
  public clearAllCaches(): void {
    this.permissionCache.clear();
    this.roleCache.clear();
  }
}

// Export singleton instance
export const permissionSystem = PermissionSystem.getInstance();

// Initialize permission system
permissionSystem.initialize();

// React hook for permissions
export const usePermissions = (userId: string) => {
  const checkPermission = async (
    action: PermissionAction,
    resource: ResourceType,
    resourceId?: string
  ) => {
    return await permissionSystem.hasPermission(userId, action, resource, resourceId);
  };
  
  const getUserRole = async () => {
    return await permissionSystem.getUserRole(userId);
  };
  
  return {
    checkPermission,
    getUserRole,
  };
};

export default permissionSystem;