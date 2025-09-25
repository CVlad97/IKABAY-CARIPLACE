import { supabase } from './supabase';
import { memoryCache, cachedFetch } from './cache';
import { monitoring } from './monitoring';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// API version
const API_VERSION = 'v1';

// Default request options
const DEFAULT_OPTIONS: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// API request method
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit & {
    useAuth?: boolean;
    cacheTTL?: number;
    cacheTags?: string[];
    forceRefresh?: boolean;
  } = {}
): Promise<T> => {
  try {
    const startTime = performance.now();
    
    // Merge default options
    const { useAuth = true, cacheTTL, cacheTags, forceRefresh, ...fetchOptions } = options;
    const mergedOptions = { ...DEFAULT_OPTIONS, ...fetchOptions };
    
    // Add authorization header if needed
    if (useAuth) {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.access_token) {
        mergedOptions.headers = {
          ...mergedOptions.headers,
          Authorization: `Bearer ${data.session.access_token}`,
        };
      }
    }
    
    // Construct full URL
    const url = `${API_BASE_URL}/api/${API_VERSION}/${endpoint}`;
    
    // Use cached fetch
    const response = await cachedFetch<T>(url, {
      ...mergedOptions,
      cacheTTL,
      cacheTags,
      forceRefresh,
    });
    
    // Log API request for monitoring
    const endTime = performance.now();
    monitoring.logEvent('api_request', {
      endpoint,
      method: mergedOptions.method || 'GET',
      duration: endTime - startTime,
      status: 'success',
    });
    
    return response;
  } catch (error) {
    // Log API error for monitoring
    monitoring.logEvent('api_error', {
      endpoint,
      method: options.method || 'GET',
      error: error.toString(),
    });
    
    throw error;
  }
};

// API endpoints
export const api = {
  // User endpoints
  users: {
    getCurrent: () => apiRequest<any>('users/me'),
    update: (data: any) => apiRequest<any>('users/me', { method: 'PUT', body: JSON.stringify(data) }),
    getById: (id: string) => apiRequest<any>(`users/${id}`),
  },
  
  // Products endpoints
  products: {
    getAll: (options: any = {}) => apiRequest<any>('products', { 
      cacheTTL: 5 * 60 * 1000, // 5 minutes
      cacheTags: ['products'],
      useAuth: false,
    }),
    getById: (id: string) => apiRequest<any>(`products/${id}`, { 
      cacheTTL: 5 * 60 * 1000,
      cacheTags: ['products', `product-${id}`],
      useAuth: false,
    }),
    getByCategory: (category: string) => apiRequest<any>(`products/category/${category}`, { 
      cacheTTL: 5 * 60 * 1000,
      cacheTags: ['products', `category-${category}`],
      useAuth: false,
    }),
  },
  
  // Orders endpoints
  orders: {
    getAll: () => apiRequest<any>('orders'),
    getById: (id: string) => apiRequest<any>(`orders/${id}`),
    create: (data: any) => apiRequest<any>('orders', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => apiRequest<any>(`orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  
  // Trading endpoints
  trading: {
    getBotStatus: () => apiRequest<any>('trading/bot/status', { 
      cacheTTL: 30 * 1000, // 30 seconds
      cacheTags: ['trading', 'bot'],
    }),
    getPositions: () => apiRequest<any>('trading/positions', { 
      cacheTTL: 30 * 1000,
      cacheTags: ['trading', 'positions'],
    }),
    getTrades: () => apiRequest<any>('trading/trades', { 
      cacheTTL: 30 * 1000,
      cacheTags: ['trading', 'trades'],
    }),
  },
  
  // Swap endpoints
  swap: {
    getQuote: (params: any) => apiRequest<any>('swap/quote', { 
      method: 'POST', 
      body: JSON.stringify(params),
      cacheTTL: 10 * 1000, // 10 seconds
      cacheTags: ['swap', 'quote'],
    }),
    execute: (params: any) => apiRequest<any>('swap/execute', { 
      method: 'POST', 
      body: JSON.stringify(params),
    }),
    getHistory: () => apiRequest<any>('swap/history', { 
      cacheTTL: 60 * 1000, // 1 minute
      cacheTags: ['swap', 'history'],
    }),
  },
  
  // Analytics endpoints
  analytics: {
    getDashboard: () => apiRequest<any>('analytics/dashboard', { 
      cacheTTL: 5 * 60 * 1000, // 5 minutes
      cacheTags: ['analytics', 'dashboard'],
    }),
    getRevenue: (period: string) => apiRequest<any>(`analytics/revenue?period=${period}`, { 
      cacheTTL: 5 * 60 * 1000,
      cacheTags: ['analytics', 'revenue'],
    }),
  },
  
  // Admin endpoints
  admin: {
    getUsers: () => apiRequest<any>('admin/users'),
    getOrders: () => apiRequest<any>('admin/orders'),
    getSales: () => apiRequest<any>('admin/sales'),
    getSystemStatus: () => apiRequest<any>('admin/system/status', { 
      cacheTTL: 60 * 1000,
      cacheTags: ['admin', 'system'],
    }),
  },
  
  // Invalidate cache for specific tags
  invalidateCache: async (tags: string[]) => {
    for (const tag of tags) {
      await memoryCache.invalidateByTag(tag);
    }
  },
};

// API documentation generator
export const generateApiDocs = () => {
  const docs = {
    openapi: '3.0.0',
    info: {
      title: 'IKABAY API',
      version: API_VERSION,
      description: 'API documentation for IKABAY platform',
    },
    paths: {},
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  };
  
  // Add endpoints to documentation
  const addEndpoint = (path, method, summary, requiresAuth = true) => {
    if (!docs.paths[path]) {
      docs.paths[path] = {};
    }
    
    docs.paths[path][method.toLowerCase()] = {
      summary,
      security: requiresAuth ? [{ bearerAuth: [] }] : [],
      responses: {
        '200': {
          description: 'Successful operation',
        },
        '401': {
          description: 'Unauthorized',
        },
        '500': {
          description: 'Server error',
        },
      },
    };
  };
  
  // Users endpoints
  addEndpoint('/api/v1/users/me', 'GET', 'Get current user');
  addEndpoint('/api/v1/users/me', 'PUT', 'Update current user');
  addEndpoint('/api/v1/users/{id}', 'GET', 'Get user by ID');
  
  // Products endpoints
  addEndpoint('/api/v1/products', 'GET', 'Get all products', false);
  addEndpoint('/api/v1/products/{id}', 'GET', 'Get product by ID', false);
  addEndpoint('/api/v1/products/category/{category}', 'GET', 'Get products by category', false);
  
  // Orders endpoints
  addEndpoint('/api/v1/orders', 'GET', 'Get all orders');
  addEndpoint('/api/v1/orders/{id}', 'GET', 'Get order by ID');
  addEndpoint('/api/v1/orders', 'POST', 'Create order');
  addEndpoint('/api/v1/orders/{id}', 'PUT', 'Update order');
  
  // Trading endpoints
  addEndpoint('/api/v1/trading/bot/status', 'GET', 'Get bot status');
  addEndpoint('/api/v1/trading/positions', 'GET', 'Get positions');
  addEndpoint('/api/v1/trading/trades', 'GET', 'Get trades');
  
  // Swap endpoints
  addEndpoint('/api/v1/swap/quote', 'POST', 'Get swap quote');
  addEndpoint('/api/v1/swap/execute', 'POST', 'Execute swap');
  addEndpoint('/api/v1/swap/history', 'GET', 'Get swap history');
  
  // Analytics endpoints
  addEndpoint('/api/v1/analytics/dashboard', 'GET', 'Get dashboard analytics');
  addEndpoint('/api/v1/analytics/revenue', 'GET', 'Get revenue analytics');
  
  // Admin endpoints
  addEndpoint('/api/v1/admin/users', 'GET', 'Get all users (admin)');
  addEndpoint('/api/v1/admin/orders', 'GET', 'Get all orders (admin)');
  addEndpoint('/api/v1/admin/sales', 'GET', 'Get all sales (admin)');
  addEndpoint('/api/v1/admin/system/status', 'GET', 'Get system status (admin)');
  
  return docs;
};

export default api;