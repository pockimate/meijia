<template>
  <div class="bg-astro-bg min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 class="text-3xl font-serif font-bold text-white">Galactic Archive</h1>
          <p class="text-gray-400 text-sm mt-1">Explore the full collection.</p>
        </div>
        
        <div class="mt-4 md:mt-0 flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
          <span class="text-sm font-medium text-gray-400">🔍 Filter:</span>
          <button 
            v-for="cat in filters" 
            :key="cat" 
            @click="selectedFilter = cat"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-full border transition-colors whitespace-nowrap',
              selectedFilter === cat 
                ? 'bg-astro-purple text-white border-astro-purple' 
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white'
            ]"
          >
            {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Sort Options -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <p class="text-gray-400">
          <span class="text-white font-medium">{{ filteredProducts.length }}</span> products
        </p>
        
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-400">Sort by:</label>
          <select 
            v-model="sortBy"
            class="bg-astro-card border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-astro-purple transition-colors"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in sortedProducts" 
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products';

const selectedFilter = ref<string>('all');
const sortBy = ref<string>('default');
const filters = ['all', 'press-on', 'polish', 'care'];

const filteredProducts = computed(() => {
  if (selectedFilter.value === 'all') return products;
  return products.filter(p => p.category === selectedFilter.value);
});

const sortedProducts = computed(() => {
  const items = [...filteredProducts.value];
  
  switch (sortBy.value) {
    case 'price-asc':
      return items.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return items.sort((a, b) => b.price - a.price);
    case 'rating':
      return items.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    default:
      return items;
  }
});

useHead({
  title: 'Shop | Astro Nails'
});
</script>
