import { defineStore } from 'pinia';
import type { Product } from '~/types';

export const useCompareStore = defineStore('compare', {
  state: () => ({
    items: [] as Product[],
    maxItems: 4, // 最多比较 4 个产品
  }),

  getters: {
    compareItems: (state) => state.items,
    compareCount: (state) => state.items.length,
    isInCompare: (state) => (productId: number) => {
      return state.items.some(item => item.id === productId);
    },
    canAddMore: (state) => state.items.length < state.maxItems,
  },

  actions: {
    // 初始化比较列表（从 localStorage 加载）
    initCompare() {
      if (process.client) {
        const saved = localStorage.getItem('astro_compare');
        if (saved) {
          try {
            this.items = JSON.parse(saved);
          } catch (e) {
            console.error('Failed to parse compare list', e);
          }
        }
      }
    },

    // 保存到 localStorage
    saveCompare() {
      if (process.client) {
        localStorage.setItem('astro_compare', JSON.stringify(this.items));
      }
    },

    // 添加到比较列表
    async addToCompare(product: Product) {
      const exists = this.items.find(item => item.id === product.id);
      
      if (exists) {
        if (process.client) {
          const { useToastStore } = await import('~/stores/toast');
          const toastStore = useToastStore();
          toastStore.info('Product already in comparison');
        }
        return { success: false, message: 'Already in comparison' };
      }

      if (this.items.length >= this.maxItems) {
        if (process.client) {
          const { useToastStore } = await import('~/stores/toast');
          const toastStore = useToastStore();
          toastStore.warning(`Maximum ${this.maxItems} products can be compared`);
        }
        return { success: false, message: 'Maximum limit reached' };
      }

      this.items.push(product);
      this.saveCompare();
      
      if (process.client) {
        const { useToastStore } = await import('~/stores/toast');
        const toastStore = useToastStore();
        toastStore.success(`${product.name} added to comparison! 📊`);
      }
      
      return { success: true, message: 'Added to comparison' };
    },

    // 从比较列表移除
    async removeFromCompare(productId: number) {
      const index = this.items.findIndex(item => item.id === productId);
      
      if (index !== -1) {
        const product = this.items[index];
        this.items.splice(index, 1);
        this.saveCompare();
        
        if (process.client) {
          const { useToastStore } = await import('~/stores/toast');
          const toastStore = useToastStore();
          toastStore.info(`${product.name} removed from comparison`);
        }
        
        return { success: true, message: 'Removed from comparison' };
      }
      
      return { success: false, message: 'Product not found' };
    },

    // 切换比较状态
    async toggleCompare(product: Product) {
      if (this.isInCompare(product.id)) {
        return await this.removeFromCompare(product.id);
      } else {
        return await this.addToCompare(product);
      }
    },

    // 清空比较列表
    async clearCompare() {
      this.items = [];
      this.saveCompare();
      
      if (process.client) {
        const { useToastStore } = await import('~/stores/toast');
        const toastStore = useToastStore();
        toastStore.info('Comparison cleared');
      }
    },
  },
});
