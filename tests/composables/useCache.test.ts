import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCache } from '~/composables/useCache';

describe('useCache', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should store and retrieve data', () => {
    const cache = useCache();
    
    cache.set('test-key', { data: 'test-value' });
    const result = cache.get('test-key');
    
    expect(result).toEqual({ data: 'test-value' });
  });

  it('should return null for non-existent key', () => {
    const cache = useCache();
    
    const result = cache.get('non-existent');
    
    expect(result).toBeNull();
  });

  it('should expire data after TTL', () => {
    const cache = useCache();
    const ttl = 1000; // 1 second
    
    cache.set('test-key', 'test-value', ttl);
    
    // Before expiry
    expect(cache.get('test-key')).toBe('test-value');
    
    // After expiry
    vi.advanceTimersByTime(ttl + 1);
    expect(cache.get('test-key')).toBeNull();
  });

  it('should check if key exists', () => {
    const cache = useCache();
    
    expect(cache.has('test-key')).toBe(false);
    
    cache.set('test-key', 'test-value');
    expect(cache.has('test-key')).toBe(true);
  });

  it('should remove data', () => {
    const cache = useCache();
    
    cache.set('test-key', 'test-value');
    expect(cache.has('test-key')).toBe(true);
    
    cache.remove('test-key');
    expect(cache.has('test-key')).toBe(false);
  });

  it('should clear all data', () => {
    const cache = useCache();
    
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    expect(cache.size()).toBe(2);
    
    cache.clear();
    expect(cache.size()).toBe(0);
  });

  it('should return cache size', () => {
    const cache = useCache();
    
    expect(cache.size()).toBe(0);
    
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    expect(cache.size()).toBe(2);
  });

  it('should cache computed results', () => {
    const cache = useCache();
    const computeFn = vi.fn(() => 'computed-value');
    
    // First call - should compute
    const result1 = cache.cachedComputed('test-key', computeFn);
    expect(result1).toBe('computed-value');
    expect(computeFn).toHaveBeenCalledTimes(1);
    
    // Second call - should use cache
    const result2 = cache.cachedComputed('test-key', computeFn);
    expect(result2).toBe('computed-value');
    expect(computeFn).toHaveBeenCalledTimes(1); // Not called again
  });
});
