import { defineStore } from 'pinia';
import type { Product } from '~/types';

export const useQuickViewStore = defineStore('quickview', {
  state: () => ({
    isOpen: false,
    product: null as Product | null,
  }),

  actions: {
    // 打开快速查看
    openQuickView(product: Product) {
      this.product = product;
      this.isOpen = true;
      
      // 禁止页面滚动
      if (process.client) {
        document.body.style.overflow = 'hidden';
      }
    },

    // 关闭快速查看
    closeQuickView() {
      this.isOpen = false;
      this.product = null;
      
      // 恢复页面滚动
      if (process.client) {
        document.body.style.overflow = '';
      }
    },
  },
});
