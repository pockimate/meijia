import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWishlistStore } from '~/stores/wishlist';
import type { Product } from '~/types';

describe('Wishlist Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 29.99,
    image: '/test.jpg',
    category: 'press-ons',
    zodiac: 'Aries',
    rating: 4.5,
    description: 'Test description',
    isNew: false,
  };

  it('should initialize with empty wishlist', () => {
    const store = useWishlistStore();
    expect(store.items).toEqual([]);
    expect(store.count).toBe(0);
  });

  it('should add product to wishlist', () => {
    const store = useWishlistStore();
    store.addToWishlist(mockProduct);
    
    expect(store.items).toHaveLength(1);
    expect(store.items[0].id).toBe(mockProduct.id);
    expect(store.count).toBe(1);
  });

  it('should not add duplicate products', () => {
    const store = useWishlistStore();
    store.addToWishlist(mockProduct);
    store.addToWishlist(mockProduct);
    
    expect(store.items).toHaveLength(1);
  });

  it('should remove product from wishlist', () => {
    const store = useWishlistStore();
    store.addToWishlist(mockProduct);
    store.removeFromWishlist(mockProduct.id);
    
    expect(store.items).toHaveLength(0);
    expect(store.count).toBe(0);
  });

  it('should check if product is in wishlist', () => {
    const store = useWishlistStore();
    
    expect(store.isInWishlist(mockProduct.id)).toBe(false);
    
    store.addToWishlist(mockProduct);
    expect(store.isInWishlist(mockProduct.id)).toBe(true);
  });

  it('should toggle product in wishlist', () => {
    const store = useWishlistStore();
    
    store.toggleWishlist(mockProduct);
    expect(store.isInWishlist(mockProduct.id)).toBe(true);
    
    store.toggleWishlist(mockProduct);
    expect(store.isInWishlist(mockProduct.id)).toBe(false);
  });

  it('should clear wishlist', () => {
    const store = useWishlistStore();
    store.addToWishlist(mockProduct);
    store.clearWishlist();
    
    expect(store.items).toHaveLength(0);
    expect(store.count).toBe(0);
  });

  it('should persist to localStorage', () => {
    const store = useWishlistStore();
    store.addToWishlist(mockProduct);
    
    const saved = localStorage.getItem('astro_wishlist');
    expect(saved).toBeTruthy();
    
    const parsed = JSON.parse(saved!);
    expect(parsed.items).toHaveLength(1);
  });
});
