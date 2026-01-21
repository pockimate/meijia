import { defineStore } from 'pinia';
import type { Product } from '~/types';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as Product[],
  }),

  getters: {
    wishlistItems: (state) => state.items,
    wishlistCount: (state) => state.items.length,
    isInWishlist: (state) => (productId: number) => {
      return state.items.some(item => item.id === productId);
    },
  },

  actions: {
    // 初始化愿望清单（从 localStorage 加载）
    initWishlist() {
      if (process.client) {
        const saved = localStorage.getItem('astro_wishlist');
        if (saved) {
          try {
            this.items = JSON.parse(saved);
          } catch (e) {
            console.error('Failed to parse wishlist', e);
          }
        }
      }
    },

    // 保存到 localStorage
    saveWishlist() {
      if (process.client) {
        localStorage.setItem('astro_wishlist', JSON.stringify(this.items));
      }
    },

    // 添加到愿望清单
    async addToWishlist(product: Product) {
      const exists = this.items.find(item => item.id === product.id);
      
      if (!exists) {
        this.items.push(product);
        this.saveWishlist();
        
        // 显示成功通知
        if (process.client) {
          const { useToastStore } = await import('~/stores/toast');
          const toastStore = useToastStore();
          toastStore.success(`${product.name} added to wishlist! 💫`);
        }
        
        return { success: true, message: 'Added to wishlist' };
      }
      
      return { success: false, message: 'Already in wishlist' };
    },

    // 从愿望清单移除
    async removeFromWishlist(productId: number) {
      const index = this.items.findIndex(item => item.id === productId);
      
      if (index !== -1) {
        const product = this.items[index];
        this.items.splice(index, 1);
        this.saveWishlist();
        
        // 显示信息通知
        if (process.client) {
          const { useToastStore } = await import('~/stores/toast');
          const toastStore = useToastStore();
          toastStore.info(`${product.name} removed from wishlist`);
        }
        
        return { success: true, message: 'Removed from wishlist' };
      }
      
      return { success: false, message: 'Product not found' };
    },

    // 切换愿望清单状态
    async toggleWishlist(product: Product) {
      if (this.isInWishlist(product.id)) {
        return await this.removeFromWishlist(product.id);
      } else {
        return await this.addToWishlist(product);
      }
    },

    // 清空愿望清单
    async clearWishlist() {
      this.items = [];
      this.saveWishlist();
      
      // 显示信息通知
      if (process.client) {
        const { useToastStore } = await import('~/stores/toast');
        const toastStore = useToastStore();
        toastStore.info('Wishlist cleared');
      }
    },

    // 批量添加到购物车
    async moveAllToCart(cartStore: any) {
      let count = 0;
      this.items.forEach(item => {
        cartStore.addToCart(item);
        count++;
      });
      
      // 清空愿望清单
      this.items = [];
      this.saveWishlist();
      
      // 显示成功通知
      if (process.client) {
        const { useToastStore } = await import('~/stores/toast');
        const toastStore = useToastStore();
        toastStore.success(`${count} items added to cart! 🛒`);
      }
      
      return { success: true, count };
    },
  },
});
