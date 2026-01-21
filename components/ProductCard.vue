<template>
  <div class="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-astro-purple/50 transition-all duration-300 hover:shadow-xl hover:shadow-astro-purple/20">
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden bg-white/5">
      <NuxtLink :to="`/product/${product.id}`">
        <img
          :src="product.image"
          :alt="product.name"
          loading="lazy"
          width="400"
          height="400"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </NuxtLink>
      
      <!-- Quick View Button (appears on hover) -->
      <button
        @click="handleQuickView"
        class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:from-astro-purple/80"
      >
        {{ $t('common.quickView') }} 👁️
      </button>

      <!-- Wishlist Button -->
      <div class="absolute top-3 right-3">
        <WishlistButton :product="product" />
      </div>

      <!-- Badge -->
      <div v-if="product.badge" class="absolute top-3 left-3">
        <span class="px-3 py-1 bg-astro-purple/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
          {{ product.badge }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Category -->
      <p class="text-xs uppercase tracking-widest text-astro-teal mb-2">{{ product.category }}</p>
      
      <!-- Name -->
      <NuxtLink :to="`/product/${product.id}`">
        <h3 class="text-lg font-serif font-bold text-white mb-2 group-hover:text-astro-teal transition-colors line-clamp-2">
          {{ product.name }}
        </h3>
      </NuxtLink>
      
      <!-- Zodiac -->
      <p class="text-sm text-gray-400 mb-3">{{ product.zodiac }}</p>
      
      <!-- Rating & Price -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-1">
          <span class="text-yellow-400">⭐</span>
          <span class="text-sm text-gray-300">{{ product.rating }}</span>
        </div>
        <span class="text-xl font-bold text-astro-purple">{{ formatPrice(product.price) }}</span>
      </div>

      <!-- Buttons -->
      <div class="space-y-2">
        <button
          @click="handleAddToCart"
          class="w-full bg-gradient-to-r from-astro-purple to-astro-teal text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all"
        >
          {{ $t('common.addToCart') }} 🛒
        </button>
        <CompareButton :product="product" />
      </div>
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
  toastStore.success(`${props.product.name} ${t('common.addToCart')}! 🛒`);
};
</script>
