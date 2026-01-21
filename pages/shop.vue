<template>
  <div class="bg-white min-h-screen pt-32 px-8 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-20">
        <h1 class="text-3xl font-light tracking-widest uppercase">Signature Collection</h1>
        
        <!-- Filter Tabs -->
        <div class="flex justify-center space-x-6 mt-8 text-[10px] tracking-widest uppercase">
          <button 
            v-for="cat in filters" 
            :key="cat" 
            @click="selectedFilter = cat"
            :class="[
              'transition-all pb-1',
              selectedFilter === cat 
                ? 'text-black border-b border-black' 
                : 'text-gray-400 hover:text-black'
            ]"
          >
            {{ cat === 'all' ? 'All Styles' : cat.charAt(0).toUpperCase() + cat.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Product Count & Sort -->
      <div class="flex justify-between items-center mb-12">
        <p class="text-[10px] text-gray-400 tracking-widest uppercase">
          {{ filteredProducts.length }} Products
        </p>
        
        <select 
          v-model="sortBy"
          class="bg-white border border-gray-200 text-[10px] tracking-widest uppercase px-4 py-2 focus:outline-none focus:border-black transition-colors"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16 pb-24">
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
    default:
      return items;
  }
});

useHead({
  title: 'Shop | Astro Nails'
});
</script>
