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
            <div class="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col h-full">
              
              <!-- Header -->
              <div class="px-6 py-6 border-b border-gray-200 flex items-center justify-between bg-white">
                <h2 class="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                  🛒 {{ $t('cart.title') }}
                </h2>
                <button 
                  @click="cartStore.closeCart()"
                  class="text-gray-500 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  ✕
                </button>
              </div>

              <!-- Cart Items -->
              <div class="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                <div v-if="cartStore.cartItems.length === 0" class="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <span class="text-4xl">🛒</span>
                  </div>
                  <p class="text-gray-500 font-serif text-lg">{{ $t('cart.empty') }}</p>
                  <button @click="cartStore.closeCart()" class="text-astro-purple hover:underline text-sm font-medium">
                    {{ $t('cart.continueShopping') }}
                  </button>
                </div>

                <div v-else v-for="item in cartStore.cartItems" :key="item.id" class="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 group hover:border-astro-purple transition-colors shadow-sm">
                  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                    <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center" />
                  </div>

                  <div class="flex flex-1 flex-col justify-between">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3 class="font-serif">{{ item.name }}</h3>
                        <p class="ml-4 font-mono text-astro-purple font-bold">{{ formatPrice(item.price * item.quantity) }}</p>
                      </div>
                      <p class="mt-1 text-xs text-gray-500 capitalize">
                        {{ item.category }}
                        <span v-if="item.selectedSize" class="ml-2">• Size: {{ item.selectedSize }}</span>
                      </p>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                      <div class="flex items-center gap-3 bg-gray-100 rounded-lg p-1 border border-gray-200">
                        <button 
                          @click="cartStore.decrementQuantity(item.id)"
                          class="p-1 hover:text-astro-purple disabled:opacity-50 text-gray-700 font-bold"
                        >
                          −
                        </button>
                        <span class="font-mono text-gray-900 w-4 text-center font-medium">{{ item.quantity }}</span>
                        <button 
                          @click="cartStore.incrementQuantity(item.id)"
                          class="p-1 hover:text-astro-purple text-gray-700 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        @click="cartStore.removeFromCart(item.id)"
                        class="font-medium text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 text-xs"
                      >
                        🗑️ {{ $t('common.delete') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer / Checkout -->
              <div v-if="cartStore.cartItems.length > 0" class="border-t border-gray-200 px-6 py-6 bg-white">
                <div class="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>{{ $t('cart.subtotal') }}</p>
                  <p class="font-mono text-xl text-astro-purple font-bold">{{ formatPrice(cartStore.cartTotal) }}</p>
                </div>
                <p class="mt-0.5 text-xs text-gray-500 mb-6">
                  {{ $t('cart.shipping') }} and {{ $t('cart.tax') }} calculated at next step.
                </p>
                <NuxtLink 
                  to="/checkout"
                  @click="cartStore.closeCart()"
                  class="w-full flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-astro-purple to-astro-teal px-6 py-4 text-base font-medium text-white shadow-md hover:shadow-lg transition-all"
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
