import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '~/stores/cart';
import type { Product } from '~/types';

describe('Cart Store', () => {
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

  it('should initialize with empty cart', () => {
    const store = useCartStore();
    expect(store.items).toEqual([]);
    expect(store.itemCount).toBe(0);
    expect(store.total).toBe(0);
  });

  it('should add product to cart', () => {
    const store = useCartStore();
    store.addToCart(mockProduct);
    
    expect(store.items).toHaveLength(1);
    expect(store.items[0].product.id).toBe(mockProduct.id);
    expect(store.items[0].quantity).toBe(1);
    expect(store.itemCount).toBe(1);
  });

  it('should increase quantity when adding same product', () => {
    const store = useCartStore();
    store.addToCart(mockProduct);
    store.addToCart(mockProduct);
    
    expect(store.items).toHaveLength(1);
    expect(store.items[0].quantity).toBe(2);
    expect(store.itemCount).toBe(2);
  });

  it('should calculate total correctly', () => {
    const store = useCartStore();
    store.addToCart(mockProduct);
    store.addToCart(mockProduct);
    
    expect(store.total).toBe(59.98);
  });

  it('should remove product from cart', () => {
    const store = useCartStore();
    store.addToCart(mockProduct);
    store.removeFromCart(mockProduct.id);
    
    expect(store.items).toHaveLength(0);
    expect(store.itemCount).toBe(0);
  });

  it('should update product quantity', () => {
    const store = useCartStore();
    store.addToCart(mockProduct);
    store.updateQuantity(mockProduct.id, 5);
    
    expect(store.items[0].quantity).toBe(5);
    expect(store.itemCount).toBe(5);
  });

  it('should clear cart', () => {
    const store = useCartStore();
    store.addToCart(mockProduct);
    store.clearCart();
    
    expect(store.items).toHaveLength(0);
    expect(store.itemCount).toBe(0);
  });

  it('should calculate subtotal correctly', () => {
    const store = useCartStore();
    store.addToCart(mockProduct);
    
    expect(store.subtotal).toBe(29.99);
  });

  it('should calculate shipping correctly', () => {
    const store = useCartStore();
    
    // Under $50 - should have shipping cost
    store.addToCart(mockProduct);
    expect(store.shipping).toBeGreaterThan(0);
    
    // Over $50 - free shipping
    store.updateQuantity(mockProduct.id, 3);
    expect(store.shipping).toBe(0);
  });

  it('should persist to localStorage', () => {
    const store = useCartStore();
    store.addToCart(mockProduct);
    
    const saved = localStorage.getItem('astro_cart');
    expect(saved).toBeTruthy();
    
    const parsed = JSON.parse(saved!);
    expect(parsed.items).toHaveLength(1);
  });

  it('should load from localStorage', () => {
    // Save to localStorage
    const cartData = {
      items: [{ product: mockProduct, quantity: 2 }],
    };
    localStorage.setItem('astro_cart', JSON.stringify(cartData));
    
    // Create new store instance
    const store = useCartStore();
    
    expect(store.items).toHaveLength(1);
    expect(store.items[0].quantity).toBe(2);
  });
});
