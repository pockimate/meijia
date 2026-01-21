interface CacheItem<T> {
  data: T;
  expiry: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
}

/**
 * Composable for caching API responses and computed data
 * Reduces redundant API calls and improves performance
 */
export const useCache = () => {
  const cache = new Map<string, CacheItem<any>>();
  const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Get cached data by key
   */
  const get = <T>(key: string): T | null => {
    const item = cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // Check if expired
    if (Date.now() > item.expiry) {
      cache.delete(key);
      return null;
    }
    
    return item.data as T;
  };

  /**
   * Set cached data with expiry
   */
  const set = <T>(key: string, data: T, ttl: number = DEFAULT_TTL): void => {
    cache.set(key, {
      data,
      expiry: Date.now() + ttl,
    });
  };

  /**
   * Check if key exists and is not expired
   */
  const has = (key: string): boolean => {
    const item = cache.get(key);
    
    if (!item) {
      return false;
    }
    
    if (Date.now() > item.expiry) {
      cache.delete(key);
      return false;
    }
    
    return true;
  };

  /**
   * Delete cached data by key
   */
  const remove = (key: string): void => {
    cache.delete(key);
  };

  /**
   * Clear all cached data
   */
  const clear = (): void => {
    cache.clear();
  };

  /**
   * Get cache size
   */
  const size = (): number => {
    return cache.size;
  };

  /**
   * Cached fetch wrapper
   * Automatically caches API responses
   */
  const cachedFetch = async <T>(
    url: string,
    options: CacheOptions = {}
  ): Promise<T> => {
    const { ttl = DEFAULT_TTL, key = url } = options;
    
    // Check cache first
    const cached = get<T>(key);
    if (cached !== null) {
      console.log('📦 Cache hit:', key);
      return cached;
    }
    
    // Fetch and cache
    console.log('🌐 Cache miss, fetching:', key);
    const data = await $fetch<T>(url);
    set(key, data, ttl);
    
    return data;
  };

  /**
   * Cached computed wrapper
   * Caches expensive computed results
   */
  const cachedComputed = <T>(
    key: string,
    computeFn: () => T,
    ttl: number = DEFAULT_TTL
  ): T => {
    // Check cache first
    const cached = get<T>(key);
    if (cached !== null) {
      return cached;
    }
    
    // Compute and cache
    const result = computeFn();
    set(key, result, ttl);
    
    return result;
  };

  return {
    get,
    set,
    has,
    remove,
    clear,
    size,
    cachedFetch,
    cachedComputed,
  };
};
