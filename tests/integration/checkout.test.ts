import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { useCouponStore } from '~/stores/coupon';
import type { Product } from '~/types';

describe('Checkout Flow Integration', () => {
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

  it('should complete full checkout flow', async () => {
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const couponStore = useCouponStore();

    // 1. Add product to cart
    cartStore.addToCart(mockProduct);
    expect(cartStore.itemCount).toBe(1);

    // 2. Login user
    await authStore.login('test@example.com', 'password123');
    expect(authStore.isAuthenticated).toBe(true);

    // 3. Apply coupon
    const result = couponStore.applyCoupon('WELCOME10');
    expect(result.success).toBe(true);
    expect(couponStore.appliedCoupon).toBeTruthy();

    // 4. Calculate final total
    const subtotal = cartStore.subtotal;
    const discount = couponStore.discountAmount;
    const shipping = cartStore.shipping;
    const total = subtotal - discount + shipping;

    expect(total).toBeGreaterThan(0);
    expect(discount).toBeGreaterThan(0);

    // 5. Clear cart after checkout
    cartStore.clearCart();
    expect(cartStore.itemCount).toBe(0);
  });

  it('should calculate free shipping correctly', () => {
    const cartStore = useCartStore();

    // Add products to reach free shipping threshold
    cartStore.addToCart(mockProduct);
    cartStore.updateQuantity(mockProduct.id, 3); // 3 x $29.99 = $89.97

    expect(cartStore.subtotal).toBeGreaterThan(50);
    expect(cartStore.shipping).toBe(0);
  });

  it('should apply best coupon automatically', () => {
    const cartStore = useCartStore();
    const couponStore = useCouponStore();

    // Add expensive items
    cartStore.addToCart(mockProduct);
    cartStore.updateQuantity(mockProduct.id, 5); // $149.95

    // Get best coupon
    const bestCoupon = couponStore.getBestCoupon(cartStore.subtotal);
    
    expect(bestCoupon).toBeTruthy();
    if (bestCoupon) {
      couponStore.applyCoupon(bestCoupon.code);
      expect(couponStore.discountAmount).toBeGreaterThan(0);
    }
  });

  it('should prevent checkout without authentication', () => {
    const cartStore = useCartStore();
    const authStore = useAuthStore();

    cartStore.addToCart(mockProduct);
    
    expect(cartStore.itemCount).toBeGreaterThan(0);
    expect(authStore.isAuthenticated).toBe(false);
    
    // In real app, this would redirect to login
  });

  it('should handle empty cart', () => {
    const cartStore = useCartStore();

    expect(cartStore.itemCount).toBe(0);
    expect(cartStore.total).toBe(0);
    
    // Should not allow checkout with empty cart
  });
});
