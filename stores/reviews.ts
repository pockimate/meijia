import { defineStore } from 'pinia';
import type { Review } from '~/types';

export type ReviewSortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
export type ReviewFilterOption = 'all' | '5' | '4' | '3' | '2' | '1' | 'withPhotos' | 'verified';

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    sortBy: 'newest' as ReviewSortOption,
    filterBy: 'all' as ReviewFilterOption,
    likedReviews: [] as number[], // 用户点赞的评论 ID
  }),

  getters: {
    // 检查用户是否点赞了某个评论
    isLiked: (state) => (reviewId: number) => {
      return state.likedReviews.includes(reviewId);
    },
  },

  actions: {
    // 初始化（从 localStorage 加载）
    initReviews() {
      if (process.client) {
        const saved = localStorage.getItem('astro_liked_reviews');
        if (saved) {
          try {
            this.likedReviews = JSON.parse(saved);
          } catch (e) {
            console.error('Failed to parse liked reviews', e);
          }
        }
      }
    },

    // 保存到 localStorage
    saveLikedReviews() {
      if (process.client) {
        localStorage.setItem('astro_liked_reviews', JSON.stringify(this.likedReviews));
      }
    },

    // 切换点赞
    async toggleLike(reviewId: number) {
      const index = this.likedReviews.indexOf(reviewId);
      
      if (index !== -1) {
        // 取消点赞
        this.likedReviews.splice(index, 1);
      } else {
        // 点赞
        this.likedReviews.push(reviewId);
      }
      
      this.saveLikedReviews();
      return { success: true, liked: index === -1 };
    },

    // 排序评论
    sortReviews(reviews: Review[]): Review[] {
      const sorted = [...reviews];
      
      switch (this.sortBy) {
        case 'newest':
          return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case 'oldest':
          return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'highest':
          return sorted.sort((a, b) => b.rating - a.rating);
        case 'lowest':
          return sorted.sort((a, b) => a.rating - b.rating);
        case 'helpful':
          return sorted.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
        default:
          return sorted;
      }
    },

    // 筛选评论
    filterReviews(reviews: Review[]): Review[] {
      let filtered = [...reviews];
      
      switch (this.filterBy) {
        case 'all':
          return filtered;
        case '5':
        case '4':
        case '3':
        case '2':
        case '1':
          return filtered.filter(r => r.rating === parseInt(this.filterBy));
        case 'withPhotos':
          return filtered.filter(r => r.images && r.images.length > 0);
        case 'verified':
          return filtered.filter(r => r.verified);
        default:
          return filtered;
      }
    },

    // 排序并筛选
    processReviews(reviews: Review[]): Review[] {
      const filtered = this.filterReviews(reviews);
      return this.sortReviews(filtered);
    },

    // 设置排序方式
    setSortBy(sortBy: ReviewSortOption) {
      this.sortBy = sortBy;
    },

    // 设置筛选方式
    setFilterBy(filterBy: ReviewFilterOption) {
      this.filterBy = filterBy;
    },

    // 重置
    reset() {
      this.sortBy = 'newest';
      this.filterBy = 'all';
    },
  },
});
