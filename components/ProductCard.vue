<template>
  <div class="group cursor-pointer">
    <!-- Image Container -->
    <div class="relative aspect-[3/4] overflow-hidden bg-gray-50">
      <NuxtLink :to="`/product/${product.id}`">
        <!-- Main Image -->
        <img
          :src="product.image"
          :alt="product.name"
          loading="lazy"
          width="400"
          height="533"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
        <!-- Hover Image (same image with slight transform for demo) -->
        <img
          :src="product.image"
          :alt="product.name"
          loading="lazy"
          width="400"
          height="533"
          class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 scale-105"
        />
      </NuxtLink>

      <!-- Quick Add Button - slides up from bottom -->
      <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm">
        <button
          @click.stop="handleQuickView"
          class="w-full text-[9px] text-center tracking-widest uppercase font-bold hover:opacity-50 transition-opacity py-3 shadow-xl"
        >
          Quick View
        </button>
      </div>

      <!-- Wishlist Button - top right -->
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <WishlistButton :product="product" />
      </div>

      <!-- Badge - top left -->
      <div v-if="product.badge" class="absolute top-3 left-3">
        <span class="px-3 py-1 bg-black text-white text-[8px] font-light tracking-[0.2em] uppercase">
          {{ product.badge }}
        </span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="mt-6 text-center">
      <NuxtLink :to="`/product/${product.id}`">
        <h3 class="text-xs tracking-[0.15em] uppercase font-medium text-gray-900 hover:opacity-50 transition-opacity">
          {{ product.name }}
        </h3>
      </NuxtLink>
      <p class="text-xs text-gray-500 mt-2 font-light">{{ product.zodiac }}</p>
      <div class="flex items-center justify-center gap-2 mt-2">
        <span class="text-[10px] text-gray-400">⭐</span>
        <span class="text-[10px] text-gray-500 font-light">{{ product.rating }}</span>
      </div>
      <p class="mt-3 text-xs text-gray-900 font-light">{{ formatPrice(product.price) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import { useQuickViewStore } from '~/stores/quickview';
import { useCartStore } from '~/stores/cart';
import { useToastStore } from '~/stores/toast';

const props = defineProps<{
  product: Product;
}>();

const quickViewStore = useQuickViewStore();
const cartStore = useCartStore();
const toastStore = useToastStore();
const { formatPrice } = useCurrency();
const { t } = useI18n();

// 打开快速查看
const handleQuickView = () => {
  quickViewStore.openQuickView(props.product);
};

// 添加到购物车
const handleAddToCart = () => {
  cartStore.addToCart(props.product);
  toastStore.success(`${props.product.name} added to bag! 🛒`);
};
</script>
