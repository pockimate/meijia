<template>
  <div class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-8 lg:px-12">
      <div class="text-center mb-12">
        <h2 class="text-2xl font-light tracking-[0.1em] uppercase text-gray-900 mb-3">You May Also Like</h2>
        <p class="text-sm text-gray-600 font-light">Complete your cosmic collection</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in relatedProducts"
          :key="product.id"
          :product="product"
          class="transform transition-all duration-300 hover:-translate-y-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products';
import type { Product } from '~/types';

const props = defineProps<{
  currentProduct: Product
}>();

const relatedProducts = computed(() => {
  // Get products from same category, excluding current product
  return products
    .filter(p => p.category === props.currentProduct.category && p.id !== props.currentProduct.id)
    .slice(0, 4);
});
</script>
