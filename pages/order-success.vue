<template>
  <div class="bg-white min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-2xl w-full text-center">
      
      <!-- Success Animation -->
      <div class="mb-8 relative">
        <div class="w-32 h-32 mx-auto rounded-full bg-black flex items-center justify-center shadow-soft-lg">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>

      <!-- Success Message -->
      <h1 class="text-4xl md:text-5xl font-light tracking-widest uppercase text-gray-900 mb-4">
        Order Confirmed
      </h1>
      <p class="text-xl text-gray-600 mb-2 font-light">
        Your cosmic cargo is on its way
      </p>
      <p class="text-sm text-gray-400 mb-8 tracking-widest uppercase">
        Order #{{ orderNumber }}
      </p>

      <!-- Details -->
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8 text-left">
        <h2 class="text-xl font-light tracking-widest uppercase text-gray-900 mb-6">What's Next?</h2>
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <span class="text-white text-[10px] font-bold">1</span>
            </div>
            <div>
              <h3 class="text-gray-900 font-medium text-sm tracking-wider uppercase">Confirmation Email</h3>
              <p class="text-xs text-gray-500 mt-1 font-light">We've sent order details to your email</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <span class="text-white text-[10px] font-bold">2</span>
            </div>
            <div>
              <h3 class="text-gray-900 font-medium text-sm tracking-wider uppercase">Processing</h3>
              <p class="text-xs text-gray-500 mt-1 font-light">Your order will be processed within 1-2 business days</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <span class="text-white text-[10px] font-bold">3</span>
            </div>
            <div>
              <h3 class="text-gray-900 font-medium text-sm tracking-wider uppercase">Shipping</h3>
              <p class="text-xs text-gray-500 mt-1 font-light">Estimated delivery: 5-7 business days</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          :to="`/order/${lastOrderId}`"
          class="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all"
        >
          Track Order →
        </NuxtLink>
        <NuxtLink 
          to="/shop"
          class="inline-flex items-center justify-center border border-gray-200 text-gray-900 px-8 py-4 text-xs tracking-[0.2em] uppercase hover:border-black transition-all"
        >
          Continue Shopping
        </NuxtLink>
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
