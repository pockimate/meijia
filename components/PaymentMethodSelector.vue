<template>
  <div class="space-y-4">
    <h3 class="text-lg font-serif font-bold text-white mb-4">Select Payment Method</h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <!-- Credit/Debit Card -->
      <button
        @click="selectMethod('card')"
        :class="[
          'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
          paymentStore.selectedMethod === 'card'
            ? 'border-astro-purple bg-astro-purple/10'
            : 'border-white/10 bg-astro-bg hover:border-white/20'
        ]"
      >
        <div class="text-2xl">💳</div>
        <div class="text-left flex-1">
          <p class="text-white font-medium">Card</p>
          <p class="text-xs text-gray-500">Credit or Debit</p>
        </div>
        <div v-if="paymentStore.selectedMethod === 'card'" class="text-astro-purple">✓</div>
      </button>

      <!-- PayPal -->
      <button
        @click="selectMethod('paypal')"
        :class="[
          'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
          paymentStore.selectedMethod === 'paypal'
            ? 'border-astro-purple bg-astro-purple/10'
            : 'border-white/10 bg-astro-bg hover:border-white/20'
        ]"
      >
        <div class="text-2xl">💰</div>
        <div class="text-left flex-1">
          <p class="text-white font-medium">PayPal</p>
          <p class="text-xs text-gray-500">Fast & Secure</p>
        </div>
        <div v-if="paymentStore.selectedMethod === 'paypal'" class="text-astro-purple">✓</div>
      </button>

      <!-- Apple Pay -->
      <button
        @click="selectMethod('apple-pay')"
        :class="[
          'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
          paymentStore.selectedMethod === 'apple-pay'
            ? 'border-astro-purple bg-astro-purple/10'
            : 'border-white/10 bg-astro-bg hover:border-white/20'
        ]"
      >
        <div class="text-2xl">📱</div>
        <div class="text-left flex-1">
          <p class="text-white font-medium">Apple Pay</p>
          <p class="text-xs text-gray-500">One-tap payment</p>
        </div>
        <div v-if="paymentStore.selectedMethod === 'apple-pay'" class="text-astro-purple">✓</div>
      </button>

      <!-- Google Pay -->
      <button
        @click="selectMethod('google-pay')"
        :class="[
          'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
          paymentStore.selectedMethod === 'google-pay'
            ? 'border-astro-purple bg-astro-purple/10'
            : 'border-white/10 bg-astro-bg hover:border-white/20'
        ]"
      >
        <div class="text-2xl">🤖</div>
        <div class="text-left flex-1">
          <p class="text-white font-medium">Google Pay</p>
          <p class="text-xs text-gray-500">Quick checkout</p>
        </div>
        <div v-if="paymentStore.selectedMethod === 'google-pay'" class="text-astro-purple">✓</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from '~/stores/payment';
import type { PaymentMethod } from '~/stores/payment';

const paymentStore = usePaymentStore();

const selectMethod = (method: PaymentMethod) => {
  paymentStore.selectPaymentMethod(method);
};

onMounted(() => {
  paymentStore.initPayment();
});
</script>
