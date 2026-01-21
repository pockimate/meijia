import { defineStore } from 'pinia';
import type { Product, CartItem } from '~/types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isCartOpen: false,
  }),

  getters: {
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    
    cartCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0);
    },
    
    cartItems: (state) => state.items,
  },

  actions: {
    // 初始化购物车（从 localStorage 加载）
    initCart() {
      if (process.client) {
        const saved = localStorage.getItem('astro_cart');
        if (saved) {
          try {
            this.items = JSON.parse(saved);
          } catch (e) {
            console.error('Failed to parse cart', e);
          }
        }
      }
    },

    // 保存到 localStorage
    saveCart() {
      if (process.client) {
        localStorage.setItem('astro_cart', JSON.stringify(this.items));
      }
    },

    // 添加商品到购物车
    addToCart(product: Product & { selectedSize?: string; selectedColor?: string }) {
      const existing = this.items.find(item => 
        item.id === product.id && 
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
      );
      
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ 
          ...product, 
          quantity: 1,
          selectedSize: product.selectedSize,
          selectedColor: product.selectedColor
        });
      }
      
      this.saveCart();
      this.isCartOpen = true;
      
      // 显示成功通知
      if (process.client) {
        import('~/stores/toast').then(({ useToastStore }) => {
          const toastStore = useToastStore();
          toastStore.success(`${product.name} added to cart! 🛒`);
        });
      }
    },

    // 从购物车移除商品
    removeFromCart(id: number) {
      const item = this.items.find(item => item.id === id);
      this.items = this.items.filter(item => item.id !== id);
      this.saveCart();
      
      // 显示信息通知
      if (process.client && item) {
        import('~/stores/toast').then(({ useToastStore }) => {
          const toastStore = useToastStore();
          toastStore.info(`${item.name} removed from cart`);
        });
      }
    },

    // 更新商品数量
    updateQuantity(id: number, quantity: number) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        this.saveCart();
      }
    },

    // 增加数量
    incrementQuantity(id: number) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
        this.saveCart();
      }
    },

    // 减少数量
    decrementQuantity(id: number) {
      const item = this.items.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        this.saveCart();
      }
    },

    // 清空购物车
    clearCart() {
      this.items = [];
      this.saveCart();
    },

    // 切换购物车显示
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },

    // 打开购物车
    openCart() {
      this.isCartOpen = true;
    },

    // 关闭购物车
    closeCart() {
      this.isCartOpen = false;
    },
  },
});
