// Distributed cache implementation for IKABAY

// Cache configuration
const CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000, // 5 minutes in milliseconds
  maxSize: 100, // Maximum number of items in cache
  storagePrefix: 'ikabay_cache_',
  version: '1.0',
};

// Cache entry interface
interface CacheEntry<T> {
  value: T;
  expires: number;
  tags?: string[];
}

// Cache storage interface
interface CacheStorage {
  get<T>(key: string): Promise<CacheEntry<T> | null>;
  set<T>(key: string, entry: CacheEntry<T>): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}

// Local storage implementation
class LocalStorageCache implements CacheStorage {
  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    try {
      const item = localStorage.getItem(`${CACHE_CONFIG.storagePrefix}${key}`);
      if (!item) return null;
      
      const entry = JSON.parse(item) as CacheEntry<T>;
      
      // Check if entry has expired
      if (entry.expires < Date.now()) {
        await this.delete(key);
        return null;
      }
      
      return entry;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  
  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    try {
      // Ensure we don't exceed max size
      const keys = await this.keys();
      if (keys.length >= CACHE_CONFIG.maxSize && !keys.includes(key)) {
        // Remove oldest entry
        if (keys.length > 0) {
          await this.delete(keys[0]);
        }
      }
      
      localStorage.setItem(
        `${CACHE_CONFIG.storagePrefix}${key}`,
        JSON.stringify(entry)
      );
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
  
  async delete(key: string): Promise<void> {
    try {
      localStorage.removeItem(`${CACHE_CONFIG.storagePrefix}${key}`);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
  
  async clear(): Promise<void> {
    try {
      const keys = await this.keys();
      for (const key of keys) {
        await this.delete(key);
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
  
  async keys(): Promise<string[]> {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(CACHE_CONFIG.storagePrefix)) {
          keys.push(key.substring(CACHE_CONFIG.storagePrefix.length));
        }
      }
      return keys;
    } catch (error) {
      console.error('Cache keys error:', error);
      return [];
    }
  }
}

// IndexedDB implementation for larger data
class IndexedDBCache implements CacheStorage {
  private dbName = 'ikabay_cache';
  private storeName = 'cache_store';
  private version = 1;
  
  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' });
        }
      };
    });
  }
  
  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(`${CACHE_CONFIG.storagePrefix}${key}`);
        
        request.onerror = () => reject(request.error);
        
        request.onsuccess = () => {
          const result = request.result;
          if (!result) {
            resolve(null);
            return;
          }
          
          const entry = result.value as CacheEntry<T>;
          
          // Check if entry has expired
          if (entry.expires < Date.now()) {
            this.delete(key).then(() => resolve(null));
            return;
          }
          
          resolve(entry);
        };
      });
    } catch (error) {
      console.error('IndexedDB get error:', error);
      return null;
    }
  }
  
  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.put({
          key: `${CACHE_CONFIG.storagePrefix}${key}`,
          value: entry
        });
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error('IndexedDB set error:', error);
    }
  }
  
  async delete(key: string): Promise<void> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(`${CACHE_CONFIG.storagePrefix}${key}`);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error('IndexedDB delete error:', error);
    }
  }
  
  async clear(): Promise<void> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.clear();
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error('IndexedDB clear error:', error);
    }
  }
  
  async keys(): Promise<string[]> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAllKeys();
        
        request.onerror = () => reject(request.error);
        
        request.onsuccess = () => {
          const keys = request.result as string[];
          resolve(
            keys
              .filter(key => key.startsWith(CACHE_CONFIG.storagePrefix))
              .map(key => key.substring(CACHE_CONFIG.storagePrefix.length))
          );
        };
      });
    } catch (error) {
      console.error('IndexedDB keys error:', error);
      return [];
    }
  }
}

// Main cache class
class Cache {
  private storage: CacheStorage;
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  
  constructor(storageType: 'local' | 'indexed' = 'local') {
    this.storage = storageType === 'indexed' 
      ? new IndexedDBCache() 
      : new LocalStorageCache();
    
    // Clean up expired items periodically
    setInterval(() => this.cleanExpired(), 60 * 1000); // Every minute
  }
  
  // Get item from cache
  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && memoryEntry.expires > Date.now()) {
      return memoryEntry.value;
    }
    
    // Try persistent storage
    const entry = await this.storage.get<T>(key);
    if (!entry) return null;
    
    // Update memory cache
    this.memoryCache.set(key, entry);
    
    return entry.value;
  }
  
  // Set item in cache
  async set<T>(
    key: string, 
    value: T, 
    options: { ttl?: number; tags?: string[] } = {}
  ): Promise<void> {
    const ttl = options.ttl || CACHE_CONFIG.defaultTTL;
    const expires = Date.now() + ttl;
    
    const entry: CacheEntry<T> = {
      value,
      expires,
      tags: options.tags
    };
    
    // Update memory cache
    this.memoryCache.set(key, entry);
    
    // Update persistent storage
    await this.storage.set(key, entry);
  }
  
  // Delete item from cache
  async delete(key: string): Promise<void> {
    this.memoryCache.delete(key);
    await this.storage.delete(key);
  }
  
  // Clear entire cache
  async clear(): Promise<void> {
    this.memoryCache.clear();
    await this.storage.clear();
  }
  
  // Invalidate cache by tag
  async invalidateByTag(tag: string): Promise<void> {
    // Clear from memory cache
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.tags?.includes(tag)) {
        this.memoryCache.delete(key);
      }
    }
    
    // Clear from persistent storage
    const keys = await this.storage.keys();
    for (const key of keys) {
      const entry = await this.storage.get(key);
      if (entry?.tags?.includes(tag)) {
        await this.storage.delete(key);
      }
    }
  }
  
  // Clean expired items
  private async cleanExpired(): Promise<void> {
    const now = Date.now();
    
    // Clean memory cache
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.expires < now) {
        this.memoryCache.delete(key);
      }
    }
    
    // Clean persistent storage
    const keys = await this.storage.keys();
    for (const key of keys) {
      const entry = await this.storage.get(key);
      if (entry && entry.expires < now) {
        await this.storage.delete(key);
      }
    }
  }
}

// Create cache instances
export const memoryCache = new Cache('local');
export const persistentCache = new Cache('indexed');

// Cache hook for React components
export const useCache = <T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number;
    tags?: string[];
    revalidate?: boolean;
  } = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to get from cache first
        let cachedData = options.revalidate ? null : await memoryCache.get<T>(key);
        
        if (cachedData === null) {
          // Fetch fresh data
          const freshData = await fetcher();
          
          // Cache the result
          await memoryCache.set(key, freshData, {
            ttl: options.ttl,
            tags: options.tags
          });
          
          cachedData = freshData;
        }
        
        setData(cachedData);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [key, options.revalidate]);
  
  return { data, loading, error };
};

// API request cache wrapper
export const cachedFetch = async <T>(
  url: string,
  options: RequestInit & {
    cacheTTL?: number;
    cacheTags?: string[];
    forceRefresh?: boolean;
  } = {}
): Promise<T> => {
  const { cacheTTL, cacheTags, forceRefresh, ...fetchOptions } = options;
  
  // Generate cache key from URL and options
  const cacheKey = `fetch_${url}_${JSON.stringify(fetchOptions)}`;
  
  // Check cache first if not forcing refresh
  if (!forceRefresh) {
    const cachedResponse = await memoryCache.get<T>(cacheKey);
    if (cachedResponse !== null) {
      return cachedResponse;
    }
  }
  
  // Perform the fetch
  const response = await fetch(url, fetchOptions);
  
  // Handle non-OK responses
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  // Parse the response
  const data = await response.json();
  
  // Cache the response
  await memoryCache.set(cacheKey, data, {
    ttl: cacheTTL,
    tags: cacheTags
  });
  
  return data;
};

export default {
  memoryCache,
  persistentCache,
  useCache,
  cachedFetch
};