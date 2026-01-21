<template>
  <div class="space-y-4">
    <h3 class="text-lg font-light tracking-widest uppercase text-gray-900 mb-4">Select Payment Method</h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <!-- Credit/Debit Card -->
      <button
        @click="selectMethod('card')"
        :class="[
          'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
          paymentStore.selectedMethod === 'card'
            ? 'border-black bg-gray-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        ]"
      >
        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke-width="2"/>
            <path d="M2 10h20" stroke-width="2"/>
          </svg>
        </div>
        <div class="text-left flex-1">
          <p class="text-gray-900 font-medium text-sm">Card</p>
          <p class="text-xs text-gray-500">Credit or Debit</p>
        </div>
        <svg v-if="paymentStore.selectedMethod === 'card'" class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- PayPal -->
      <button
        @click="selectMethod('paypal')"
        :class="[
          'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
          paymentStore.selectedMethod === 'paypal'
            ? 'border-black bg-gray-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        ]"
      >
        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="text-left flex-1">
          <p class="text-gray-900 font-medium text-sm">PayPal</p>
          <p class="text-xs text-gray-500">Fast & Secure</p>
        </div>
        <svg v-if="paymentStore.selectedMethod === 'paypal'" class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Apple Pay -->
      <button
        @click="selectMethod('apple-pay')"
        :class="[
          'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
          paymentStore.selectedMethod === 'apple-pay'
            ? 'border-black bg-gray-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        ]"
      >
        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <svg class="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
        </div>
        <div class="text-left flex-1">
          <p class="text-gray-900 font-medium text-sm">Apple Pay</p>
          <p class="text-xs text-gray-500">One-tap payment</p>
        </div>
        <svg v-if="paymentStore.selectedMethod === 'apple-pay'" class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Google Pay -->
      <button
        @click="selectMethod('google-pay')"
        :class="[
          'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
          paymentStore.selectedMethod === 'google-pay'
            ? 'border-black bg-gray-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        ]"
      >
        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <svg class="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div class="text-left flex-1">
          <p class="text-gray-900 font-medium text-sm">Google Pay</p>
          <p class="text-xs text-gray-500">Quick checkout</p>
        </div>
        <svg v-if="paymentStore.selectedMethod === 'google-pay'" class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
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
