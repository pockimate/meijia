<template>
  <div class="bg-astro-bg min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-2xl w-full text-center">
      
      <!-- Success Animation -->
      <div class="mb-8 relative">
        <div class="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-astro-purple to-astro-teal flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.5)] animate-pulse">
          <span class="text-6xl">✨</span>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-40 h-40 rounded-full border-4 border-astro-purple/30 animate-ping"></div>
        </div>
      </div>

      <!-- Success Message -->
      <h1 class="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
        Order Confirmed!
      </h1>
      <p class="text-xl text-gray-400 mb-2">
        Your cosmic cargo is on its way
      </p>
      <p class="text-sm text-gray-500 mb-8">
        Order #{{ orderNumber }}
      </p>

      <!-- Details -->
      <div class="bg-astro-card border border-white/10 rounded-xl p-8 mb-8 text-left">
        <h2 class="text-xl font-serif font-bold text-white mb-4">What's Next?</h2>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <span class="text-2xl">📧</span>
            <div>
              <h3 class="text-white font-medium">Confirmation Email</h3>
              <p class="text-sm text-gray-400">We've sent order details to your email</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-2xl">📦</span>
            <div>
              <h3 class="text-white font-medium">Processing</h3>
              <p class="text-sm text-gray-400">Your order will be processed within 1-2 business days</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-2xl">🚀</span>
            <div>
              <h3 class="text-white font-medium">Shipping</h3>
              <p class="text-sm text-gray-400">Estimated delivery: 5-7 business days</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          :to="`/order/${lastOrderId}`"
          class="inline-flex items-center justify-center bg-gradient-to-r from-astro-purple to-astro-teal text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all"
        >
          Track Order →
        </NuxtLink>
        <NuxtLink 
          to="/shop"
          class="inline-flex items-center justify-center border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/5 transition-all"
        >
          Continue Shopping
        </NuxtLink>
      </div>

      <!-- Social Share -->
      <div class="mt-12 pt-8 border-t border-white/10">
        <p class="text-gray-400 text-sm mb-4">Share your cosmic style</p>
        <div class="flex justify-center gap-4">
          <button class="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-xl">
            📷
          </button>
          <button class="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-xl">
            🐦
          </button>
          <button class="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-xl">
            💬
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '~/stores/orders';

const ordersStore = useOrdersStore();
const orderNumber = ref('');
const lastOrderId = ref(0);

onMounted(() => {
  // Get the last order
  const orders = ordersStore.allOrders;
  if (orders.length > 0) {
    const lastOrder = orders[orders.length - 1];
    orderNumber.value = lastOrder.orderNumber;
    lastOrderId.value = lastOrder.id;
  } else {
    // Generate random order number if no orders
    orderNumber.value = 'AST' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
});

useHead({
  title: 'Order Success | Astro Nails'
});
</script>
