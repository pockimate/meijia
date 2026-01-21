import type { Order, Address } from '~/types';

export interface CreateOrderData {
  userId: number;
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  paymentMethod?: string;
  couponCode?: string;
}

export const useOrderApi = () => {
  const api = useApi();
  
  // 创建订单
  const createOrder = async (data: CreateOrderData) => {
    const orderNumber = 'AST' + Math.random().toString(36).substring(2, 9).toUpperCase();
    
    const newOrder: Order = {
      id: Math.floor(Math.random() * 10000),
      userId: data.userId,
      orderNumber,
      items: data.items,
      subtotal: data.subtotal,
      shipping: data.shipping,
      tax: data.tax,
      total: data.total,
      status: 'processing',
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return api.post('/orders', data, newOrder);
  };
  
  // 获取用户订单列表
  const getUserOrders = async (userId: number, params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) => {
    // 从 localStorage 获取订单
    let orders: Order[] = [];
    
    if (process.client) {
      const ordersData = localStorage.getItem('astro_orders');
      if (ordersData) {
        const allOrders = JSON.parse(ordersData);
        orders = allOrders.filter((o: Order) => o.userId === userId);
        
        // 应用筛选
        if (params?.status) {
          orders = orders.filter(o => o.status === params.status);
        }
        
        // 排序（最新的在前）
        orders.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        // 应用分页
        if (params?.offset !== undefined) {
          orders = orders.slice(params.offset);
        }
        if (params?.limit !== undefined) {
          orders = orders.slice(0, params.limit);
        }
      }
    }
    
    return api.get(`/users/${userId}/orders`, {
      orders,
      total: orders.length,
    });
  };
  
  // 获取单个订单
  const getOrder = async (orderId: number) => {
    if (process.client) {
      const ordersData = localStorage.getItem('astro_orders');
      if (ordersData) {
        const orders: Order[] = JSON.parse(ordersData);
        const order = orders.find(o => o.id === orderId);
        
        if (order) {
          return api.get(`/orders/${orderId}`, order);
        }
      }
    }
    
    return api.get<Order>(`/orders/${orderId}`, undefined);
  };
  
  // 通过订单号获取订单
  const getOrderByNumber = async (orderNumber: string) => {
    if (process.client) {
      const ordersData = localStorage.getItem('astro_orders');
      if (ordersData) {
        const orders: Order[] = JSON.parse(ordersData);
        const order = orders.find(o => o.orderNumber === orderNumber);
        
        if (order) {
          return api.get(`/orders/number/${orderNumber}`, order);
        }
      }
    }
    
    return api.get<Order>(`/orders/number/${orderNumber}`, undefined);
  };
  
  // 更新订单状态
  const updateOrderStatus = async (orderId: number, status: Order['status']) => {
    if (process.client) {
      const ordersData = localStorage.getItem('astro_orders');
      if (ordersData) {
        const orders: Order[] = JSON.parse(ordersData);
        const orderIndex = orders.findIndex(o => o.id === orderId);
        
        if (orderIndex !== -1) {
          orders[orderIndex].status = status;
          orders[orderIndex].updatedAt = new Date().toISOString();
          localStorage.setItem('astro_orders', JSON.stringify(orders));
          
          return api.patch(`/orders/${orderId}/status`, { status }, orders[orderIndex]);
        }
      }
    }
    
    return api.patch<Order>(`/orders/${orderId}/status`, { status }, undefined);
  };
  
  // 取消订单
  const cancelOrder = async (orderId: number, reason?: string) => {
    return updateOrderStatus(orderId, 'cancelled');
  };
  
  // 获取订单统计
  const getOrderStats = async (userId: number) => {
    let orders: Order[] = [];
    
    if (process.client) {
      const ordersData = localStorage.getItem('astro_orders');
      if (ordersData) {
        const allOrders = JSON.parse(ordersData);
        orders = allOrders.filter((o: Order) => o.userId === userId);
      }
    }
    
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
    };
    
    return api.get(`/users/${userId}/orders/stats`, stats);
  };
  
  return {
    createOrder,
    getUserOrders,
    getOrder,
    getOrderByNumber,
    updateOrderStatus,
    cancelOrder,
    getOrderStats,
  };
};
