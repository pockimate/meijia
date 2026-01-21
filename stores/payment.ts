import { defineStore } from 'pinia';

export type PaymentMethod = 'card' | 'paypal' | 'apple-pay' | 'google-pay';

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

export interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface PaymentState {
  selectedMethod: PaymentMethod;
  cardDetails: CardDetails;
  savedCards: SavedCard[];
  isProcessing: boolean;
  paymentSuccess: boolean;
  paymentError: string | null;
}

export const usePaymentStore = defineStore('payment', {
  state: (): PaymentState => ({
    selectedMethod: 'card',
    cardDetails: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      saveCard: false,
    },
    savedCards: [],
    isProcessing: false,
    paymentSuccess: false,
    paymentError: null,
  }),

  getters: {
    // 是否有保存的卡片
    hasSavedCards: (state) => state.savedCards.length > 0,

    // 获取默认卡片
    defaultCard: (state) => {
      return state.savedCards.find(card => card.isDefault) || state.savedCards[0];
    },

    // 检测卡片品牌
    cardBrand: (state) => {
      const number = state.cardDetails.cardNumber.replace(/\s/g, '');
      if (/^4/.test(number)) return 'Visa';
      if (/^5[1-5]/.test(number)) return 'Mastercard';
      if (/^3[47]/.test(number)) return 'Amex';
      if (/^6(?:011|5)/.test(number)) return 'Discover';
      return 'Unknown';
    },

    // 验证卡号
    isCardNumberValid: (state) => {
      const number = state.cardDetails.cardNumber.replace(/\s/g, '');
      return number.length >= 13 && number.length <= 19;
    },

    // 验证过期日期
    isExpiryValid: (state) => {
      const expiry = state.cardDetails.expiryDate;
      if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
      
      const [month, year] = expiry.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      
      if (month < 1 || month > 12) return false;
      if (year < currentYear) return false;
      if (year === currentYear && month < currentMonth) return false;
      
      return true;
    },

    // 验证CVV
    isCvvValid: (state) => {
      const cvv = state.cardDetails.cvv;
      return /^\d{3,4}$/.test(cvv);
    },

    // 是否可以提交支付
    canSubmitPayment: (state) => {
      if (state.selectedMethod === 'card') {
        return (
          state.cardDetails.cardNumber.replace(/\s/g, '').length >= 13 &&
          state.cardDetails.cardHolder.length > 0 &&
          /^\d{2}\/\d{2}$/.test(state.cardDetails.expiryDate) &&
          /^\d{3,4}$/.test(state.cardDetails.cvv)
        );
      }
      return true; // PayPal, Apple Pay, Google Pay 不需要额外验证
    },
  },

  actions: {
    // 初始化（从 localStorage 加载）
    initPayment() {
      if (process.client) {
        const saved = localStorage.getItem('astro_saved_cards');
        if (saved) {
          this.savedCards = JSON.parse(saved);
        }
      }
    },

    // 选择支付方式
    selectPaymentMethod(method: PaymentMethod) {
      this.selectedMethod = method;
      this.paymentError = null;
    },

    // 更新卡片详情
    updateCardDetails(details: Partial<CardDetails>) {
      this.cardDetails = { ...this.cardDetails, ...details };
    },

    // 格式化卡号（添加空格）
    formatCardNumber(value: string): string {
      const cleaned = value.replace(/\s/g, '');
      const chunks = cleaned.match(/.{1,4}/g) || [];
      return chunks.join(' ');
    },

    // 格式化过期日期
    formatExpiryDate(value: string): string {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      }
      return cleaned;
    },

    // 保存卡片
    saveCard(card: Omit<SavedCard, 'id'>) {
      const newCard: SavedCard = {
        ...card,
        id: Date.now().toString(),
      };

      // 如果是第一张卡或设置为默认，更新其他卡片的默认状态
      if (newCard.isDefault || this.savedCards.length === 0) {
        this.savedCards.forEach(c => c.isDefault = false);
        newCard.isDefault = true;
      }

      this.savedCards.push(newCard);
      this.persistSavedCards();
    },

    // 删除保存的卡片
    removeSavedCard(cardId: string) {
      this.savedCards = this.savedCards.filter(card => card.id !== cardId);
      
      // 如果删除的是默认卡片，设置第一张为默认
      if (this.savedCards.length > 0 && !this.savedCards.some(c => c.isDefault)) {
        this.savedCards[0].isDefault = true;
      }
      
      this.persistSavedCards();
    },

    // 设置默认卡片
    setDefaultCard(cardId: string) {
      this.savedCards.forEach(card => {
        card.isDefault = card.id === cardId;
      });
      this.persistSavedCards();
    },

    // 持久化保存的卡片
    persistSavedCards() {
      if (process.client) {
        localStorage.setItem('astro_saved_cards', JSON.stringify(this.savedCards));
      }
    },

    // 处理支付
    async processPayment(amount: number): Promise<boolean> {
      this.isProcessing = true;
      this.paymentError = null;
      this.paymentSuccess = false;

      try {
        // 模拟支付处理延迟
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 模拟支付验证
        if (this.selectedMethod === 'card') {
          // 验证卡片信息
          if (!this.canSubmitPayment) {
            throw new Error('Invalid card details');
          }

          // 模拟随机失败（5%概率）
          if (Math.random() < 0.05) {
            throw new Error('Payment declined. Please try another card.');
          }

          // 如果选择保存卡片
          if (this.cardDetails.saveCard) {
            const last4 = this.cardDetails.cardNumber.slice(-4);
            this.saveCard({
              last4,
              brand: this.cardBrand,
              expiryDate: this.cardDetails.expiryDate,
              isDefault: this.savedCards.length === 0,
            });
          }
        } else {
          // PayPal, Apple Pay, Google Pay 模拟处理
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        this.paymentSuccess = true;
        this.isProcessing = false;
        return true;
      } catch (error: any) {
        this.paymentError = error.message || 'Payment failed. Please try again.';
        this.isProcessing = false;
        return false;
      }
    },

    // 重置支付状态
    resetPayment() {
      this.cardDetails = {
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        saveCard: false,
      };
      this.paymentSuccess = false;
      this.paymentError = null;
      this.isProcessing = false;
    },

    // 清空所有数据
    clearPaymentData() {
      this.resetPayment();
      this.savedCards = [];
      if (process.client) {
        localStorage.removeItem('astro_saved_cards');
      }
    },
  },
});
