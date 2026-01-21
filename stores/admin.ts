import { defineStore } from 'pinia';

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  ordersToday: number;
  revenueToday: number;
  newUsersToday: number;
  averageOrderValue: number;
}

export interface SalesData {
  date: string;
  orders: number;
  revenue: number;
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAdmin: false,
    adminUser: null as any,
    stats: null as AdminStats | null,
    salesData: [] as SalesData[],
    recentOrders: [] as any[],
  }),

  getters: {
    // 是否已登录管理员
    isAuthenticated: (state) => state.isAdmin && state.adminUser !== null,

    // 今日增长率
    todayGrowth: (state) => {
      if (!state.stats) return { orders: 0, revenue: 0, users: 0 };
      
      return {
        orders: state.stats.ordersToday > 0 ? 
          ((state.stats.ordersToday / state.stats.totalOrders) * 100).toFixed(1) : 0,
        revenue: state.stats.revenueToday > 0 ? 
          ((state.stats.revenueToday / state.stats.totalRevenue) * 100).toFixed(1) : 0,
        users: state.stats.newUsersToday > 0 ? 
          ((state.stats.newUsersToday / state.stats.totalUsers) * 100).toFixed(1) : 0,
      };
    },
  },

  actions: {
    // 初始化管理员
    initAdmin() {
      if (process.client) {
        const adminData = localStorage.getItem('astro_admin');
        if (adminData) {
          const { isAdmin, adminUser } = JSON.parse(adminData);
          this.isAdmin = isAdmin;
          this.adminUser = adminUser;
        }
      }
    },

    // 管理员登录
    adminLogin(email: string, password: string): boolean {
      // 简单的管理员验证（实际应该调用 API）
      if (email === 'admin@astronails.com' && password === 'admin123') {
        this.isAdmin = true;
        this.adminUser = {
          id: 1,
          email,
          name: 'Admin User',
          role: 'admin',
        };

        if (process.client) {
          localStorage.setItem('astro_admin', JSON.stringify({
            isAdmin: true,
            adminUser: this.adminUser,
          }));
        }

        return true;
      }

      return false;
    },

    // 管理员登出
    adminLogout() {
      this.isAdmin = false;
      this.adminUser = null;

      if (process.client) {
        localStorage.removeItem('astro_admin');
      }
    },

    // 加载统计数据
    async loadStats() {
      // 从 localStorage 获取数据
      if (process.client) {
        const ordersData = localStorage.getItem('astro_orders');
        const authData = localStorage.getItem('astro_auth');

        let orders: any[] = [];
        let users = 0;

        if (ordersData) {
          orders = JSON.parse(ordersData);
        }

        if (authData) {
          users = 1; // 简化处理
        }

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = orders.filter(o => o.createdAt.startsWith(today));
        const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

        this.stats = {
          totalOrders: orders.length,
          totalRevenue,
          totalUsers: users + Math.floor(Math.random() * 100) + 50, // 模拟用户数
          totalProducts: 24, // 从 products.ts
          ordersToday: todayOrders.length,
          revenueToday: todayRevenue,
          newUsersToday: Math.floor(Math.random() * 10) + 1,
          averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        };

        // 生成最近7天的销售数据
        this.generateSalesData(orders);

        // 获取最近订单
        this.recentOrders = orders
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
      }
    },

    // 生成销售数据
    generateSalesData(orders: any[]) {
      const last7Days = [];
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const dayOrders = orders.filter(o => o.createdAt.startsWith(dateStr));
        const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total, 0);

        last7Days.push({
          date: dateStr,
          orders: dayOrders.length,
          revenue: dayRevenue,
        });
      }

      this.salesData = last7Days;
    },

    // 更新订单状态
    async updateOrderStatus(orderId: number, status: string) {
      if (process.client) {
        const ordersData = localStorage.getItem('astro_orders');
        if (ordersData) {
          const orders = JSON.parse(ordersData);
          const orderIndex = orders.findIndex((o: any) => o.id === orderId);

          if (orderIndex !== -1) {
            orders[orderIndex].status = status;
            orders[orderIndex].updatedAt = new Date().toISOString();
            localStorage.setItem('astro_orders', JSON.stringify(orders));

            // 重新加载统计数据
            await this.loadStats();
            return true;
          }
        }
      }

      return false;
    },
  },
});
