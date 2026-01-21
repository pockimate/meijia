import type { Product } from '~/types';
import { products } from '~/data/products';

export const useProductApi = () => {
  const api = useApi();
  
  // 获取所有产品
  const getProducts = async (params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: string;
    limit?: number;
    offset?: number;
  }) => {
    let filteredProducts = [...products];
    
    // 应用筛选
    if (params?.category) {
      filteredProducts = filteredProducts.filter(p => p.category === params.category);
    }
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }
    
    if (params?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= params.minPrice!);
    }
    
    if (params?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= params.maxPrice!);
    }
    
    if (params?.minRating !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.rating >= params.minRating!);
    }
    
    // 应用排序
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
      }
    }
    
    // 应用分页
    const total = filteredProducts.length;
    if (params?.offset !== undefined) {
      filteredProducts = filteredProducts.slice(params.offset);
    }
    if (params?.limit !== undefined) {
      filteredProducts = filteredProducts.slice(0, params.limit);
    }
    
    return api.get('/products', {
      products: filteredProducts,
      total,
      page: params?.offset ? Math.floor(params.offset / (params?.limit || 10)) + 1 : 1,
      pageSize: params?.limit || 10,
    });
  };
  
  // 获取单个产品
  const getProduct = async (id: number) => {
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return api.get<Product>(`/products/${id}`, undefined);
    }
    
    return api.get(`/products/${id}`, product);
  };
  
  // 获取相关产品
  const getRelatedProducts = async (productId: number, limit: number = 4) => {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return api.get('/products/related', []);
    }
    
    const related = products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
    
    return api.get('/products/related', related);
  };
  
  // 获取热门产品
  const getPopularProducts = async (limit: number = 8) => {
    const popular = products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return api.get('/products/popular', popular);
  };
  
  // 获取新品
  const getNewProducts = async (limit: number = 8) => {
    const newProducts = products
      .filter(p => p.isNew)
      .slice(0, limit);
    
    return api.get('/products/new', newProducts);
  };
  
  // 搜索产品
  const searchProducts = async (query: string, limit: number = 10) => {
    const searchLower = query.toLowerCase();
    const results = products.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower)
    ).slice(0, limit);
    
    return api.get('/products/search', {
      query,
      results,
      total: results.length,
    });
  };
  
  return {
    getProducts,
    getProduct,
    getRelatedProducts,
    getPopularProducts,
    getNewProducts,
    searchProducts,
  };
};
