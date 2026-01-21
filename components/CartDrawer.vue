<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cartStore.isCartOpen" class="fixed inset-0 z-[100] overflow-hidden">
        <!-- 背景遮罩 -->
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          @click="cartStore.closeCart()"
        />

        <!-- 购物车抽屉 -->
        <Transition name="slide">
          <div v-if="cartStore.isCartOpen" class="absolute inset-y-0 right-0 max-w-full flex">
            <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">
              
              <!-- Header -->
              <div class="px-8 py-8 border-b border-gray-100 flex items-center justify-between">
                <h2 class="text-xs font-medium text-gray-900 tracking-[0.2em] uppercase">
                  Shopping Bag ({{ cartStore.cartCount }})
                </h2>
                <button 
                  @click="cartStore.closeCart()"
                  class="text-xs text-gray-900 hover:opacity-50 transition-opacity uppercase tracking-[0.15em] font-light"
                >
                  Close
                </button>
              </div>

              <!-- Cart Items -->
              <div class="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                <div v-if="cartStore.cartItems.length === 0" class="h-full flex flex-col items-center justify-center text-center">
                  <div class="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                  </div>
                  <p class="text-gray-500 text-xs font-light tracking-[0.15em] uppercase">Your bag is empty</p>
                </div>

                <div v-else v-for="item in cartStore.cartItems" :key="item.id" class="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                  <div class="w-20 h-24 flex-shrink-0 overflow-hidden bg-gray-50 rounded-lg">
                    <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
                  </div>

                  <div class="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 class="text-xs tracking-[0.15em] uppercase font-medium text-gray-900">{{ item.name }}</h3>
                      <p class="text-xs text-gray-500 mt-1 font-light">{{ formatPrice(item.price) }}</p>
                      <p v-if="item.selectedSize" class="text-[10px] text-gray-400 mt-1 uppercase tracking-[0.15em] font-light">Size: {{ item.selectedSize }}</p>
                    </div>
                    <div class="flex items-center justify-between mt-3">
                      <div class="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-1">
                        <button 
                          @click="cartStore.decrementQuantity(item.id)"
                          class="text-sm text-gray-900 hover:opacity-50 transition-opacity w-5 h-5 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span class="text-xs text-gray-900 w-6 text-center font-medium">{{ item.quantity }}</span>
                        <button 
                          @click="cartStore.incrementQuantity(item.id)"
                          class="text-sm text-gray-900 hover:opacity-50 transition-opacity w-5 h-5 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <button
                        @click="cartStore.removeFromCart(item.id)"
                        class="text-[10px] text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-[0.15em] font-light"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer / Checkout -->
              <div v-if="cartStore.cartItems.length > 0" class="border-t border-gray-100 px-8 py-8 space-y-4 bg-gray-50">
                <div class="flex justify-between text-xs tracking-[0.15em] uppercase">
                  <span class="font-light text-gray-600">Subtotal</span>
                  <span class="font-medium text-gray-900">{{ formatPrice(cartStore.cartTotal) }}</span>
                </div>
                <p class="text-[10px] text-gray-500 uppercase tracking-[0.15em] text-center font-light">
                  Shipping & taxes calculated at checkout
                </p>
                <NuxtLink 
                  to="/checkout"
                  @click="cartStore.closeCart()"
                  class="btn-primary w-full flex items-center justify-center"
                >
                  Proceed to Checkout
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const { formatPrice } = useCurrency();

// 初始化购物车
onMounted(() => {
  cartStore.initCart();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
