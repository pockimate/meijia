<template>
  <div class="group">
    <!-- Image Container -->
    <NuxtLink :to="`/product/${product.id}`" class="block relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-lg cursor-pointer">
      <!-- Main Image -->
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        width="400"
        height="533"
        class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
      />
      <!-- Hover Image -->
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        width="400"
        height="533"
        class="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 scale-105 grayscale group-hover:grayscale-0"
      />

      <!-- Quick Add Button - slides up from bottom -->
      <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <button
          @click.prevent.stop="handleQuickView"
          class="w-full bg-white/95 backdrop-blur-sm text-black text-xs text-center tracking-[0.15em] uppercase font-medium hover:bg-black hover:text-white transition-all py-3 shadow-soft"
        >
          Quick View
        </button>
      </div>

      <!-- Action Buttons - top right -->
      <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <WishlistButton :product="product" />
        <CompareButton :product="product" />
      </div>

      <!-- Badge - top left -->
      <div v-if="product.badge" class="absolute top-3 left-3">
        <span class="px-3 py-1 bg-black text-white text-[9px] font-medium tracking-[0.2em] uppercase shadow-soft">
          {{ product.badge }}
        </span>
      </div>
    </NuxtLink>

    <!-- Product Info -->
    <div class="mt-6 text-center space-y-2">
      <NuxtLink :to="`/product/${product.id}`">
        <h3 class="text-sm tracking-[0.1em] uppercase font-medium text-gray-900 hover:opacity-50 transition-opacity">
          {{ product.name }}
        </h3>
      </NuxtLink>
      <p class="text-xs text-gray-500 font-light">{{ product.zodiac }}</p>
      <div class="flex items-center justify-center gap-1">
        <svg class="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span class="text-xs text-gray-900 font-medium">{{ product.rating }}</span>
      </div>
      <p class="mt-3 text-sm text-gray-900 font-medium">{{ formatPrice(product.price) }}</p>
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
  toastStore.success(`${props.product.name} added to bag!`);
};
</script>
