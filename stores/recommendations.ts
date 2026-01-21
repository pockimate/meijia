import { defineStore } from 'pinia';
import type { Product } from '~/types';
import { products } from '~/data/products';

export const useRecommendationsStore = defineStore('recommendations', {
  state: () => ({
    viewHistory: [] as number[], // 浏览历史（产品ID）
    purchaseHistory: [] as number[], // 购买历史（产品ID）
  }),

  getters: {
    // 获取浏览历史产品
    getViewedProducts: (state) => {
      return state.viewHistory
        .map(id => products.find(p => p.id === id))
        .filter(Boolean) as Product[];
    },
  },

  actions: {
    // 初始化（从 localStorage 加载）
    initRecommendations() {
      if (process.client) {
        const viewHistory = localStorage.getItem('astro_view_history');
        const purchaseHistory = localStorage.getItem('astro_purchase_history');
        
        if (viewHistory) {
          try {
            this.viewHistory = JSON.parse(viewHistory);
          } catch (e) {
            console.error('Failed to parse view history', e);
          }
        }
        
        if (purchaseHistory) {
          try {
            this.purchaseHistory = JSON.parse(purchaseHistory);
          } catch (e) {
            console.error('Failed to parse purchase history', e);
          }
        }
      }
    },

    // 保存到 localStorage
    saveHistory() {
      if (process.client) {
        localStorage.setItem('astro_view_history', JSON.stringify(this.viewHistory));
        localStorage.setItem('astro_purchase_history', JSON.stringify(this.purchaseHistory));
      }
    },

    // 添加浏览记录
    addToViewHistory(productId: number) {
      // 移除旧记录（如果存在）
      const index = this.viewHistory.indexOf(productId);
      if (index !== -1) {
        this.viewHistory.splice(index, 1);
      }
      
      // 添加到开头
      this.viewHistory.unshift(productId);
      
      // 限制历史记录数量
      if (this.viewHistory.length > 20) {
        this.viewHistory = this.viewHistory.slice(0, 20);
      }
      
      this.saveHistory();
    },

    // 添加购买记录
    addToPurchaseHistory(productIds: number[]) {
      this.purchaseHistory.push(...productIds);
      this.saveHistory();
    },

    // 获取相关产品（基于当前产品）
    getRelatedProducts(currentProduct: Product, limit: number = 4): Product[] {
      return products
        .filter(p => {
          if (p.id === currentProduct.id) return false;
          // 同类别或同星座
          return p.category === currentProduct.category || p.zodiac === currentProduct.zodiac;
        })
        .sort((a, b) => {
          // 优先推荐同类别
          const aScore = (a.category === currentProduct.category ? 2 : 0) + 
                        (a.zodiac === currentProduct.zodiac ? 1 : 0);
          const bScore = (b.category === currentProduct.category ? 2 : 0) + 
                        (b.zodiac === currentProduct.zodiac ? 1 : 0);
          return bScore - aScore;
        })
        .slice(0, limit);
    },

    // 获取热门产品
    getTrendingProducts(limit: number = 4): Product[] {
      return products
        .filter(p => p.rating >= 4.5)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
    },

    // 获取新品推荐
    getNewArrivals(limit: number = 4): Product[] {
      return products
        .filter(p => p.isNew)
        .slice(0, limit);
    },

    // 基于浏览历史的推荐
    getRecommendedByHistory(limit: number = 4): Product[] {
      if (this.viewHistory.length === 0) {
        return this.getTrendingProducts(limit);
      }

      // 获取最近浏览的产品
      const recentProducts = this.viewHistory
        .slice(0, 5)
        .map(id => products.find(p => p.id === id))
        .filter(Boolean) as Product[];

      if (recentProducts.length === 0) {
        return this.getTrendingProducts(limit);
      }

      // 统计类别和星座
      const categories = recentProducts.map(p => p.category);
      const zodiacs = recentProducts.map(p => p.zodiac);
      
      const categoryCount: Record<string, number> = {};
      const zodiacCount: Record<string, number> = {};
      
      categories.forEach(c => {
        categoryCount[c] = (categoryCount[c] || 0) + 1;
      });
      
      zodiacs.forEach(z => {
        zodiacCount[z] = (zodiacCount[z] || 0) + 1;
      });

      // 找出最常浏览的类别和星座
      const topCategory = Object.keys(categoryCount).sort((a, b) => 
        categoryCount[b] - categoryCount[a]
      )[0];
      
      const topZodiac = Object.keys(zodiacCount).sort((a, b) => 
        zodiacCount[b] - zodiacCount[a]
      )[0];

      // 推荐相似产品
      return products
        .filter(p => !this.viewHistory.includes(p.id))
        .sort((a, b) => {
          const aScore = (a.category === topCategory ? 2 : 0) + 
                        (a.zodiac === topZodiac ? 1 : 0) +
                        (a.rating * 0.1);
          const bScore = (b.category === topCategory ? 2 : 0) + 
                        (b.zodiac === topZodiac ? 1 : 0) +
                        (b.rating * 0.1);
          return bScore - aScore;
        })
        .slice(0, limit);
    },

    // 经常一起购买的产品
    getFrequentlyBoughtTogether(currentProduct: Product, limit: number = 3): Product[] {
      // 简化版：推荐同类别的高评分产品
      return products
        .filter(p => {
          if (p.id === currentProduct.id) return false;
          return p.category === currentProduct.category && p.rating >= 4.0;
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
    },

    // 为你推荐（综合推荐）
    getPersonalizedRecommendations(limit: number = 8): Product[] {
      const recommendations: Product[] = [];
      const usedIds = new Set<number>();

      // 1. 基于浏览历史 (40%)
      const historyRecs = this.getRecommendedByHistory(Math.ceil(limit * 0.4));
      historyRecs.forEach(p => {
        if (!usedIds.has(p.id)) {
          recommendations.push(p);
          usedIds.add(p.id);
        }
      });

      // 2. 热门产品 (30%)
      const trendingRecs = this.getTrendingProducts(Math.ceil(limit * 0.3));
      trendingRecs.forEach(p => {
        if (!usedIds.has(p.id) && recommendations.length < limit) {
          recommendations.push(p);
          usedIds.add(p.id);
        }
      });

      // 3. 新品 (30%)
      const newRecs = this.getNewArrivals(Math.ceil(limit * 0.3));
      newRecs.forEach(p => {
        if (!usedIds.has(p.id) && recommendations.length < limit) {
          recommendations.push(p);
          usedIds.add(p.id);
        }
      });

      // 如果还不够，用随机产品填充
      if (recommendations.length < limit) {
        const remaining = products.filter(p => !usedIds.has(p.id));
        const shuffled = remaining.sort(() => Math.random() - 0.5);
        recommendations.push(...shuffled.slice(0, limit - recommendations.length));
      }

      return recommendations.slice(0, limit);
    },

    // 清空历史
    clearHistory() {
      this.viewHistory = [];
      this.purchaseHistory = [];
      this.saveHistory();
    },
  },
});
