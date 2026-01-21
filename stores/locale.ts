import { defineStore } from 'pinia';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // 相对于 USD 的汇率
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    currencies: [
      { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
      { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
      { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
      { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
      { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
      { code: 'KRW', symbol: '₩', name: 'Korean Won', rate: 1329.50 },
    ] as Currency[],
    currentCurrency: 'USD' as string,
  }),

  getters: {
    // 获取当前货币
    currency: (state) => {
      return state.currencies.find(c => c.code === state.currentCurrency) || state.currencies[0];
    },

    // 获取货币符号
    currencySymbol: (state) => {
      const currency = state.currencies.find(c => c.code === state.currentCurrency);
      return currency?.symbol || '$';
    },

    // 获取汇率
    exchangeRate: (state) => {
      const currency = state.currencies.find(c => c.code === state.currentCurrency);
      return currency?.rate || 1;
    },
  },

  actions: {
    // 初始化（从 localStorage 加载）
    initLocale() {
      if (process.client) {
        const saved = localStorage.getItem('astro_currency');
        if (saved) {
          this.currentCurrency = saved;
        }
      }
    },

    // 切换货币
    setCurrency(code: string) {
      this.currentCurrency = code;
      if (process.client) {
        localStorage.setItem('astro_currency', code);
      }
    },

    // 转换价格
    convertPrice(priceUSD: number): number {
      return priceUSD * this.exchangeRate;
    },

    // 格式化价格
    formatPrice(priceUSD: number, showSymbol: boolean = true): string {
      const converted = this.convertPrice(priceUSD);
      const formatted = converted.toFixed(2);
      
      if (showSymbol) {
        // 对于日元和韩元，不显示小数
        if (this.currentCurrency === 'JPY' || this.currentCurrency === 'KRW') {
          return `${this.currencySymbol}${Math.round(converted).toLocaleString()}`;
        }
        return `${this.currencySymbol}${formatted}`;
      }
      
      return formatted;
    },
  },
});
