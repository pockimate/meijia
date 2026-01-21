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
            <div class="w-screen max-w-md bg-[#0f0f18] border-l border-white/10 shadow-2xl flex flex-col h-full">
              
              <!-- Header -->
              <div class="px-6 py-6 border-b border-white/5 flex items-center justify-between bg-astro-bg">
                <h2 class="text-xl font-serif font-bold text-white flex items-center gap-2">
                  🚀 {{ $t('cart.title') }}
                </h2>
                <button 
                  @click="cartStore.closeCart()"
                  class="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                >
                  ✕
                </button>
              </div>

              <!-- Cart Items -->
              <div class="flex-1 overflow-y-auto p-6 space-y-6">
                <div v-if="cartStore.cartItems.length === 0" class="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <span class="text-4xl">🚀</span>
                  </div>
                  <p class="text-gray-400 font-serif text-lg">{{ $t('cart.empty') }}</p>
                  <button @click="cartStore.closeCart()" class="text-astro-teal hover:underline text-sm">
                    {{ $t('cart.continueShopping') }}
                  </button>
                </div>

                <div v-else v-for="item in cartStore.cartItems" :key="item.id" class="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-astro-purple/30 transition-colors">
                  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-white/10">
                    <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center" />
                  </div>

                  <div class="flex flex-1 flex-col justify-between">
                    <div>
                      <div class="flex justify-between text-base font-medium text-white">
                        <h3 class="font-serif">{{ item.name }}</h3>
                        <p class="ml-4 font-mono text-astro-teal">{{ formatPrice(item.price * item.quantity) }}</p>
                      </div>
                      <p class="mt-1 text-xs text-gray-500 capitalize">
                        {{ item.category }}
                        <span v-if="item.selectedSize" class="ml-2">• Size: {{ item.selectedSize }}</span>
                      </p>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                      <div class="flex items-center gap-3 bg-black/20 rounded-lg p-1 border border-white/5">
                        <button 
                          @click="cartStore.decrementQuantity(item.id)"
                          class="p-1 hover:text-astro-pink disabled:opacity-50 text-white"
                        >
                          −
                        </button>
                        <span class="font-mono text-white w-4 text-center">{{ item.quantity }}</span>
                        <button 
                          @click="cartStore.incrementQuantity(item.id)"
                          class="p-1 hover:text-astro-teal text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        @click="cartStore.removeFromCart(item.id)"
                        class="font-medium text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1 text-xs"
                      >
                        🗑️ {{ $t('common.delete') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer / Checkout -->
              <div v-if="cartStore.cartItems.length > 0" class="border-t border-white/10 px-6 py-6 bg-[#05050a]">
                <div class="flex justify-between text-base font-medium text-white mb-4">
                  <p>{{ $t('cart.subtotal') }}</p>
                  <p class="font-mono text-xl text-astro-purple">{{ formatPrice(cartStore.cartTotal) }}</p>
                </div>
                <p class="mt-0.5 text-xs text-gray-500 mb-6">
                  {{ $t('cart.shipping') }} and {{ $t('cart.tax') }} calculated at next step.
                </p>
                <NuxtLink 
                  to="/checkout"
                  @click="cartStore.closeCart()"
                  class="w-full flex items-center justify-center rounded-sm border border-transparent bg-astro-purple px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-violet-700 transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  {{ $t('cart.checkout') }} →
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
