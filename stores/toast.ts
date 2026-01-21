import { defineStore } from 'pinia';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),

  actions: {
    // 显示通知
    show(type: ToastType, message: string, duration: number = 3000) {
      const id = Math.random().toString(36).substring(7);
      
      const toast: Toast = {
        id,
        type,
        message,
        duration,
      };

      this.toasts.push(toast);

      // 自动移除
      if (duration > 0) {
        setTimeout(() => {
          this.remove(id);
        }, duration);
      }

      return id;
    },

    // 成功通知
    success(message: string, duration?: number) {
      return this.show('success', message, duration);
    },

    // 错误通知
    error(message: string, duration?: number) {
      return this.show('error', message, duration);
    },

    // 警告通知
    warning(message: string, duration?: number) {
      return this.show('warning', message, duration);
    },

    // 信息通知
    info(message: string, duration?: number) {
      return this.show('info', message, duration);
    },

    // 移除通知
    remove(id: string) {
      const index = this.toasts.findIndex(t => t.id === id);
      if (index !== -1) {
        this.toasts.splice(index, 1);
      }
    },

    // 清空所有通知
    clear() {
      this.toasts = [];
    },
  },
});
