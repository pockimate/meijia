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
                <h2 class="text-xs font-bold text-gray-900 tracking-[0.3em] uppercase">
                  Shopping Bag ({{ cartStore.cartCount }})
                </h2>
                <button 
                  @click="cartStore.closeCart()"
                  class="text-[10px] text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                >
                  Close
                </button>
              </div>

              <!-- Cart Items -->
              <div class="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                <div v-if="cartStore.cartItems.length === 0" class="h-full flex flex-col items-center justify-center text-center">
                  <p class="text-gray-400 text-xs mt-20 font-light">Your cart is empty.</p>
                </div>

                <div v-else v-for="item in cartStore.cartItems" :key="item.id" class="flex gap-4 pb-6 border-b border-gray-100">
                  <div class="w-20 h-24 flex-shrink-0 overflow-hidden bg-gray-50">
                    <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
                  </div>

                  <div class="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 class="text-[10px] tracking-widest uppercase font-bold text-gray-900">{{ item.name }}</h3>
                      <p class="text-[10px] text-gray-400 mt-1 font-light">{{ formatPrice(item.price) }}</p>
                      <p v-if="item.selectedSize" class="text-[8px] text-gray-400 mt-1 uppercase tracking-wider">Size: {{ item.selectedSize }}</p>
                    </div>
                    <div class="flex items-center justify-between mt-3">
                      <div class="flex items-center gap-3">
                        <button 
                          @click="cartStore.decrementQuantity(item.id)"
                          class="text-[10px] text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          −
                        </button>
                        <span class="text-[10px] text-gray-900 w-4 text-center">{{ item.quantity }}</span>
                        <button 
                          @click="cartStore.incrementQuantity(item.id)"
                          class="text-[10px] text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        @click="cartStore.removeFromCart(item.id)"
                        class="text-[8px] text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-tighter"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer / Checkout -->
              <div v-if="cartStore.cartItems.length > 0" class="border-t border-gray-100 px-8 py-8 space-y-4">
                <div class="flex justify-between text-xs tracking-widest uppercase">
                  <span class="font-light">Subtotal</span>
                  <span class="font-bold text-gray-900">{{ formatPrice(cartStore.cartTotal) }}</span>
                </div>
                <p class="text-[9px] text-gray-400 uppercase tracking-tighter text-center italic">
                  Shipping & taxes calculated at checkout
                </p>
                <NuxtLink 
                  to="/checkout"
                  @click="cartStore.closeCart()"
                  class="w-full flex items-center justify-center bg-black text-white py-5 text-[10px] tracking-[0.4em] uppercase hover:bg-zinc-800 transition-all"
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
