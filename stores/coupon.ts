import { defineStore } from 'pinia';

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt?: string;
  description: string;
  isActive: boolean;
  usageLimit?: number;
  usedCount?: number;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'bundle';
  value: number;
  minPurchase?: number;
  conditions?: string[];
  expiresAt?: string;
  isActive: boolean;
  badge?: string;
}

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    appliedCoupon: null as Coupon | null,
    availableCoupons: [
      {
        code: 'COSMIC10',
        type: 'percentage' as const,
        value: 10,
        minPurchase: 30,
        description: '10% off orders over $30',
        isActive: true,
      },
      {
        code: 'ASTRO20',
        type: 'percentage' as const,
        value: 20,
        minPurchase: 50,
        maxDiscount: 20,
        description: '20% off orders over $50 (max $20)',
        isActive: true,
      },
      {
        code: 'FREESHIP',
        type: 'shipping' as const,
        value: 0,
        minPurchase: 25,
        description: 'Free shipping on orders over $25',
        isActive: true,
      },
      {
        code: 'SAVE15',
        type: 'fixed' as const,
        value: 15,
        minPurchase: 40,
        description: '$15 off orders over $40',
        isActive: true,
      },
      {
        code: 'NEWUSER',
        type: 'percentage' as const,
        value: 15,
        description: '15% off for new users',
        isActive: true,
        usageLimit: 1,
      },
    ] as Coupon[],
    activePromotions: [
      {
        id: 'flash-sale',
        name: 'Flash Sale',
        description: 'Extra 10% off all press-ons',
        type: 'percentage' as const,
        value: 10,
        conditions: ['category:press-on'],
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        badge: '⚡ Flash Sale',
      },
      {
        id: 'bundle-deal',
        name: 'Bundle & Save',
        description: 'Buy 3+ items, get 15% off',
        type: 'percentage' as const,
        value: 15,
        minPurchase: 0,
        conditions: ['minItems:3'],
        isActive: true,
        badge: '🎁 Bundle Deal',
      },
    ] as Promotion[],
  }),

  getters: {
    // 获取可用的优惠券（满足条件的）
    getAvailableCoupons: (state) => (subtotal: number) => {
      return state.availableCoupons.filter(
        coupon => coupon.isActive && (!coupon.minPurchase || subtotal >= coupon.minPurchase)
      );
    },

    // 获取当前激活的促销
    getActivePromotions: (state) => {
      return state.activePromotions.filter(promo => {
        if (!promo.isActive) return false;
        if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) return false;
        return true;
      });
    },

    // 检查促销是否适用于购物车
    isPromotionApplicable: (state) => (promotion: Promotion, cartItems: any[]) => {
      if (!promotion.conditions) return true;

      for (const condition of promotion.conditions) {
        const [key, value] = condition.split(':');
        
        if (key === 'category') {
          const hasCategory = cartItems.some(item => item.category === value);
          if (!hasCategory) return false;
        }
        
        if (key === 'minItems') {
          const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
          if (totalItems < parseInt(value)) return false;
        }
      }

      return true;
    },
  },

  actions: {
    // 应用优惠券
    async applyCoupon(code: string, subtotal: number) {
      const coupon = this.availableCoupons.find(
        c => c.code.toLowerCase() === code.toLowerCase() && c.isActive
      );

      if (!coupon) {
        if (process.client) {
          const { useToastStore } = await import('~/stores/toast');
          const toastStore = useToastStore();
          toastStore.error('Invalid coupon code');
        }
        return { success: false, message: 'Invalid coupon code' };
      }

      if (coupon.minPurchase && subtotal < coupon.minPurchase) {
        if (process.client) {
          const { useToastStore } = await import('~/stores/toast');
          const toastStore = useToastStore();
          toastStore.warning(`Minimum purchase of $${coupon.minPurchase} required`);
        }
        return { success: false, message: `Minimum purchase of $${coupon.minPurchase} required` };
      }

      this.appliedCoupon = coupon;
      
      if (process.client) {
        const { useToastStore } = await import('~/stores/toast');
        const toastStore = useToastStore();
        toastStore.success(`Coupon "${code}" applied! 🎉`);
      }

      return { success: true, coupon };
    },

    // 移除优惠券
    async removeCoupon() {
      this.appliedCoupon = null;
      
      if (process.client) {
        const { useToastStore } = await import('~/stores/toast');
        const toastStore = useToastStore();
        toastStore.info('Coupon removed');
      }
    },

    // 计算优惠券折扣
    calculateCouponDiscount(subtotal: number): number {
      if (!this.appliedCoupon) return 0;

      const coupon = this.appliedCoupon;
      let discount = 0;

      if (coupon.type === 'percentage') {
        discount = subtotal * (coupon.value / 100);
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
      } else if (coupon.type === 'fixed') {
        discount = coupon.value;
      }

      return Math.min(discount, subtotal);
    },

    // 计算促销折扣
    calculatePromotionDiscount(cartItems: any[], subtotal: number): number {
      let totalDiscount = 0;

      for (const promotion of this.getActivePromotions) {
        if (!this.isPromotionApplicable(promotion, cartItems)) continue;

        if (promotion.type === 'percentage') {
          // 只对符合条件的商品应用折扣
          let applicableSubtotal = subtotal;
          
          if (promotion.conditions) {
            applicableSubtotal = cartItems
              .filter(item => {
                for (const condition of promotion.conditions!) {
                  const [key, value] = condition.split(':');
                  if (key === 'category' && item.category === value) return true;
                }
                return !promotion.conditions!.some(c => c.startsWith('category:'));
              })
              .reduce((sum, item) => sum + item.price * item.quantity, 0);
          }

          totalDiscount += applicableSubtotal * (promotion.value / 100);
        }
      }

      return Math.min(totalDiscount, subtotal);
    },

    // 计算总折扣
    calculateTotalDiscount(cartItems: any[], subtotal: number): {
      couponDiscount: number;
      promotionDiscount: number;
      totalDiscount: number;
      freeShipping: boolean;
    } {
      const couponDiscount = this.calculateCouponDiscount(subtotal);
      const promotionDiscount = this.calculatePromotionDiscount(cartItems, subtotal);
      const freeShipping = this.appliedCoupon?.type === 'shipping';

      return {
        couponDiscount,
        promotionDiscount,
        totalDiscount: couponDiscount + promotionDiscount,
        freeShipping,
      };
    },

    // 获取最佳优惠券建议
    getBestCouponSuggestion(subtotal: number): Coupon | null {
      const applicable = this.getAvailableCoupons(subtotal);
      if (applicable.length === 0) return null;

      // 计算每个优惠券的实际折扣金额
      let bestCoupon = applicable[0];
      let bestDiscount = 0;

      for (const coupon of applicable) {
        let discount = 0;
        if (coupon.type === 'percentage') {
          discount = subtotal * (coupon.value / 100);
          if (coupon.maxDiscount) {
            discount = Math.min(discount, coupon.maxDiscount);
          }
        } else if (coupon.type === 'fixed') {
          discount = coupon.value;
        }

        if (discount > bestDiscount) {
          bestDiscount = discount;
          bestCoupon = coupon;
        }
      }

      return bestCoupon;
    },

    // 自动应用最佳优惠券
    async autoApplyBestCoupon(subtotal: number) {
      if (this.appliedCoupon) return; // 已有优惠券，不自动应用

      const bestCoupon = this.getBestCouponSuggestion(subtotal);
      if (bestCoupon) {
        await this.applyCoupon(bestCoupon.code, subtotal);
      }
    },
  },
});
