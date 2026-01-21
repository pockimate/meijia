import { defineStore } from 'pinia';
import type { Product } from '~/types';
import { products } from '~/data/products';

export interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    filters: {
      query: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 100,
      minRating: 0,
      sortBy: 'relevance' as const,
    } as SearchFilters,
    searchHistory: [] as string[],
  }),

  getters: {
    filteredProducts: (state): Product[] => {
      let results = [...products];

      // 搜索关键词
      if (state.filters.query) {
        const query = state.filters.query.toLowerCase();
        results = results.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      }

      // 分类筛选
      if (state.filters.category !== 'all') {
        results = results.filter(p => p.category === state.filters.category);
      }

      // 价格范围
      results = results.filter(p => 
        p.price >= state.filters.minPrice && 
        p.price <= state.filters.maxPrice
      );

      // 评分筛选
      if (state.filters.minRating > 0) {
        results = results.filter(p => p.rating >= state.filters.minRating);
      }

      // 排序
      switch (state.filters.sortBy) {
        case 'price-asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          // relevance - keep original order
          break;
      }

      return results;
    },

    searchSuggestions: (state): string[] => {
      if (!state.filters.query || state.filters.query.length < 2) {
        return [];
      }

      const query = state.filters.query.toLowerCase();
      const suggestions = new Set<string>();

      products.forEach(p => {
        if (p.name.toLowerCase().includes(query)) {
          suggestions.add(p.name);
        }
        if (p.category.toLowerCase().includes(query)) {
          suggestions.add(p.category);
        }
      });

      return Array.from(suggestions).slice(0, 5);
    },

    priceRange: () => {
      const prices = products.map(p => p.price);
      return {
        min: Math.min(...prices),
        max: Math.max(...prices),
      };
    },
  },

  actions: {
    // 初始化搜索历史
    initSearch() {
      if (process.client) {
        const history = localStorage.getItem('astro_search_history');
        if (history) {
          try {
            this.searchHistory = JSON.parse(history);
          } catch (e) {
            console.error('Failed to parse search history', e);
          }
        }
      }
    },

    // 保存搜索历史
    saveSearchHistory() {
      if (process.client) {
        localStorage.setItem('astro_search_history', JSON.stringify(this.searchHistory));
      }
    },

    // 设置搜索查询
    setQuery(query: string) {
      this.filters.query = query;
      
      // 添加到搜索历史
      if (query && !this.searchHistory.includes(query)) {
        this.searchHistory.unshift(query);
        if (this.searchHistory.length > 10) {
          this.searchHistory = this.searchHistory.slice(0, 10);
        }
        this.saveSearchHistory();
      }
    },

    // 设置分类
    setCategory(category: string) {
      this.filters.category = category;
    },

    // 设置价格范围
    setPriceRange(min: number, max: number) {
      this.filters.minPrice = min;
      this.filters.maxPrice = max;
    },

    // 设置最低评分
    setMinRating(rating: number) {
      this.filters.minRating = rating;
    },

    // 设置排序方式
    setSortBy(sortBy: SearchFilters['sortBy']) {
      this.filters.sortBy = sortBy;
    },

    // 重置筛选
    resetFilters() {
      this.filters = {
        query: '',
        category: 'all',
        minPrice: 0,
        maxPrice: 100,
        minRating: 0,
        sortBy: 'relevance',
      };
    },

    // 清除搜索历史
    clearSearchHistory() {
      this.searchHistory = [];
      if (process.client) {
        localStorage.removeItem('astro_search_history');
      }
    },
  },
});
