<template>
  <div v-if="products.length > 0" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <span>{{ icon }}</span>
          <span>{{ title }}</span>
        </h2>
        <p v-if="subtitle" class="text-gray-400 text-sm mt-1">{{ subtitle }}</p>
      </div>
      <NuxtLink 
        v-if="showViewAll"
        to="/shop" 
        class="text-astro-teal hover:text-white transition-colors text-sm flex items-center gap-1"
      >
        <span>View All</span>
        <span>→</span>
      </NuxtLink>
    </div>

    <!-- Products Grid -->
    <div :class="gridClass">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

const props = withDefaults(defineProps<{
  products: Product[];
  title: string;
  subtitle?: string;
  icon?: string;
  columns?: 2 | 3 | 4;
  showViewAll?: boolean;
}>(), {
  icon: '✨',
  columns: 4,
  showViewAll: false,
});

const gridClass = computed(() => {
  const cols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  return `grid ${cols[props.columns]} gap-6`;
});
</script>
