import type { Review } from '~/types';

export interface CreateReviewData {
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  images?: string[];
}

export const useReviewApi = () => {
  const api = useApi();
  
  // 获取产品评论
  const getProductReviews = async (productId: number, params?: {
    rating?: number;
    sortBy?: string;
    limit?: number;
    offset?: number;
  }) => {
    // 模拟评论数据
    const mockReviews: Review[] = [
      {
        id: 1,
        user: 'Sarah M.',
        rating: 5,
        date: '2024-01-15',
        text: 'Absolutely love these! The cosmic design is stunning and they last for weeks.',
        verified: true,
        zodiac: 'Pisces',
        helpful: 24,
        images: [],
      },
      {
        id: 2,
        user: 'Emma K.',
        rating: 4,
        date: '2024-01-10',
        text: 'Great quality and beautiful design. Took a bit to apply but worth it!',
        verified: true,
        zodiac: 'Leo',
        helpful: 18,
        images: [],
      },
      {
        id: 3,
        user: 'Jessica L.',
        rating: 5,
        date: '2024-01-05',
        text: 'Perfect for my zodiac sign! The colors are vibrant and the fit is excellent.',
        verified: false,
        zodiac: 'Aries',
        helpful: 12,
        images: [],
      },
    ];
    
    let filteredReviews = [...mockReviews];
    
    // 应用筛选
    if (params?.rating) {
      filteredReviews = filteredReviews.filter(r => r.rating === params.rating);
    }
    
    // 应用排序
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'helpful':
          filteredReviews.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
          break;
        case 'recent':
          filteredReviews.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          break;
        case 'rating-high':
          filteredReviews.sort((a, b) => b.rating - a.rating);
          break;
        case 'rating-low':
          filteredReviews.sort((a, b) => a.rating - b.rating);
          break;
      }
    }
    
    // 应用分页
    const total = filteredReviews.length;
    if (params?.offset !== undefined) {
      filteredReviews = filteredReviews.slice(params.offset);
    }
    if (params?.limit !== undefined) {
      filteredReviews = filteredReviews.slice(0, params.limit);
    }
    
    return api.get(`/products/${productId}/reviews`, {
      reviews: filteredReviews,
      total,
      averageRating: 4.6,
      ratingDistribution: {
        5: 65,
        4: 20,
        3: 10,
        2: 3,
        1: 2,
      },
    });
  };
  
  // 创建评论
  const createReview = async (data: CreateReviewData) => {
    const newReview: Review = {
      id: Math.floor(Math.random() * 10000),
      user: 'You',
      rating: data.rating,
      date: new Date().toISOString().split('T')[0],
      text: data.comment,
      verified: true,
      helpful: 0,
      images: data.images || [],
    };
    
    return api.post(`/products/${data.productId}/reviews`, data, newReview);
  };
  
  // 更新评论
  const updateReview = async (reviewId: number, data: Partial<CreateReviewData>) => {
    return api.put(`/reviews/${reviewId}`, data, {
      success: true,
      message: 'Review updated successfully',
    });
  };
  
  // 删除评论
  const deleteReview = async (reviewId: number) => {
    return api.delete(`/reviews/${reviewId}`, {
      success: true,
      message: 'Review deleted successfully',
    });
  };
  
  // 点赞评论
  const likeReview = async (reviewId: number) => {
    return api.post(`/reviews/${reviewId}/like`, {}, {
      success: true,
      helpful: Math.floor(Math.random() * 50),
    });
  };
  
  // 取消点赞
  const unlikeReview = async (reviewId: number) => {
    return api.delete(`/reviews/${reviewId}/like`, {
      success: true,
    });
  };
  
  // 举报评论
  const reportReview = async (reviewId: number, reason: string) => {
    return api.post(`/reviews/${reviewId}/report`, { reason }, {
      success: true,
      message: 'Review reported successfully',
    });
  };
  
  return {
    getProductReviews,
    createReview,
    updateReview,
    deleteReview,
    likeReview,
    unlikeReview,
    reportReview,
  };
};
