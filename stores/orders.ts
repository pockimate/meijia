import { defineStore } from 'pinia';
import type { Order, Address } from '~/types';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
    addresses: [] as Address[],
  }),

  getters: {
    allOrders: (state) => state.orders,
    allAddresses: (state) => state.addresses,
    defaultAddress: (state) => state.addresses.find(a => a.isDefault),
  },

  actions: {
    // 初始化订单和地址（从 localStorage 加载）
    initOrders() {
      if (process.client) {
        const ordersStr = localStorage.getItem('astro_orders');
        const addressesStr = localStorage.getItem('astro_addresses');
        
        if (ordersStr) {
          try {
            this.orders = JSON.parse(ordersStr);
          } catch (e) {
            console.error('Failed to parse orders', e);
          }
        }

        if (addressesStr) {
          try {
            this.addresses = JSON.parse(addressesStr);
          } catch (e) {
            console.error('Failed to parse addresses', e);
          }
        }
      }
    },

    // 保存到 localStorage
    saveOrders() {
      if (process.client) {
        localStorage.setItem('astro_orders', JSON.stringify(this.orders));
      }
    },

    saveAddresses() {
      if (process.client) {
        localStorage.setItem('astro_addresses', JSON.stringify(this.addresses));
      }
    },

    // 创建订单
    async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
      try {
        // 模拟 API 调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newOrder: Order = {
          ...order,
          id: Math.floor(Math.random() * 100000),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        this.orders.unshift(newOrder);
        this.saveOrders();

        return { success: true, order: newOrder };
      } catch (error) {
        return { success: false, error: 'Failed to create order' };
      }
    },

    // 获取订单详情
    getOrder(orderId: number) {
      return this.orders.find(o => o.id === orderId);
    },

    // 添加地址
    async addAddress(address: Omit<Address, 'id'>) {
      try {
        // 如果是第一个地址或设置为默认，清除其他默认地址
        if (address.isDefault || this.addresses.length === 0) {
          this.addresses.forEach(a => a.isDefault = false);
        }

        const newAddress: Address = {
          ...address,
          id: Math.floor(Math.random() * 10000),
          isDefault: address.isDefault || this.addresses.length === 0,
        };

        this.addresses.push(newAddress);
        this.saveAddresses();

        return { success: true, address: newAddress };
      } catch (error) {
        return { success: false, error: 'Failed to add address' };
      }
    },

    // 更新地址
    async updateAddress(id: number, updates: Partial<Address>) {
      try {
        const address = this.addresses.find(a => a.id === id);
        if (!address) {
          return { success: false, error: 'Address not found' };
        }

        // 如果设置为默认，清除其他默认地址
        if (updates.isDefault) {
          this.addresses.forEach(a => a.isDefault = false);
        }

        Object.assign(address, updates);
        this.saveAddresses();

        return { success: true, address };
      } catch (error) {
        return { success: false, error: 'Failed to update address' };
      }
    },

    // 删除地址
    async deleteAddress(id: number) {
      try {
        const index = this.addresses.findIndex(a => a.id === id);
        if (index === -1) {
          return { success: false, error: 'Address not found' };
        }

        const wasDefault = this.addresses[index].isDefault;
        this.addresses.splice(index, 1);

        // 如果删除的是默认地址，设置第一个为默认
        if (wasDefault && this.addresses.length > 0) {
          this.addresses[0].isDefault = true;
        }

        this.saveAddresses();

        return { success: true };
      } catch (error) {
        return { success: false, error: 'Failed to delete address' };
      }
    },
  },
});
