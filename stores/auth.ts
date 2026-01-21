import { defineStore } from 'pinia';
import type { User } from '~/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    // 初始化认证状态（从 localStorage 加载）
    initAuth() {
      if (process.client) {
        const token = localStorage.getItem('astro_token');
        const userStr = localStorage.getItem('astro_user');
        
        if (token && userStr) {
          try {
            this.token = token;
            this.user = JSON.parse(userStr);
            this.isAuthenticated = true;
          } catch (e) {
            console.error('Failed to parse user data', e);
            this.logout();
          }
        }
      }
    },

    // 保存认证信息
    saveAuth() {
      if (process.client) {
        if (this.token && this.user) {
          localStorage.setItem('astro_token', this.token);
          localStorage.setItem('astro_user', JSON.stringify(this.user));
        }
      }
    },

    // 登录
    async login(email: string, password: string) {
      try {
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟登录成功
        const mockUser: User = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          zodiacSign: 'Leo',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
          createdAt: new Date().toISOString(),
        };

        const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(7);

        this.user = mockUser;
        this.token = mockToken;
        this.isAuthenticated = true;
        this.saveAuth();

        // 显示成功通知
        if (process.client) {
          import('~/stores/toast').then(({ useToastStore }) => {
            const toastStore = useToastStore();
            toastStore.success(`Welcome back, ${mockUser.name}! ✨`);
          });
        }

        return { success: true, user: mockUser };
      } catch (error) {
        // 显示错误通知
        if (process.client) {
          import('~/stores/toast').then(({ useToastStore }) => {
            const toastStore = useToastStore();
            toastStore.error('Login failed. Please try again.');
          });
        }
        return { success: false, error: 'Login failed' };
      }
    },

    // 注册
    async register(email: string, password: string, name: string, zodiacSign?: string) {
      try {
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟注册成功
        const mockUser: User = {
          id: Math.floor(Math.random() * 10000),
          email: email,
          name: name,
          zodiacSign: zodiacSign,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
          createdAt: new Date().toISOString(),
        };

        const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(7);

        this.user = mockUser;
        this.token = mockToken;
        this.isAuthenticated = true;
        this.saveAuth();

        // 显示成功通知
        if (process.client) {
          import('~/stores/toast').then(({ useToastStore }) => {
            const toastStore = useToastStore();
            toastStore.success(`Welcome to Astro Nails, ${name}! 🚀`);
          });
        }

        return { success: true, user: mockUser };
      } catch (error) {
        // 显示错误通知
        if (process.client) {
          import('~/stores/toast').then(({ useToastStore }) => {
            const toastStore = useToastStore();
            toastStore.error('Registration failed. Please try again.');
          });
        }
        return { success: false, error: 'Registration failed' };
      }
    },

    // 登出
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      
      if (process.client) {
        localStorage.removeItem('astro_token');
        localStorage.removeItem('astro_user');
        
        // 显示信息通知
        import('~/stores/toast').then(({ useToastStore }) => {
          const toastStore = useToastStore();
          toastStore.info('Signed out successfully');
        });
      }
    },

    // 更新用户信息
    async updateProfile(updates: Partial<User>) {
      if (!this.user) return { success: false, error: 'Not authenticated' };

      try {
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.user = { ...this.user, ...updates };
        this.saveAuth();

        // 显示成功通知
        if (process.client) {
          import('~/stores/toast').then(({ useToastStore }) => {
            const toastStore = useToastStore();
            toastStore.success('Profile updated successfully! ✨');
          });
        }

        return { success: true, user: this.user };
      } catch (error) {
        // 显示错误通知
        if (process.client) {
          import('~/stores/toast').then(({ useToastStore }) => {
            const toastStore = useToastStore();
            toastStore.error('Failed to update profile');
          });
        }
        return { success: false, error: 'Update failed' };
      }
    },
  },
});
