<template>
  <div v-if="products.length > 0" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-gray-500 text-xs mt-2 font-light">{{ subtitle }}</p>
      </div>
      <NuxtLink 
        v-if="showViewAll"
        to="/shop" 
        class="text-gray-900 hover:opacity-50 transition-opacity text-xs border-b border-black pb-1 tracking-widest uppercase"
      >
        View All
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
  columns?: 2 | 3 | 4;
  showViewAll?: boolean;
}>(), {
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
