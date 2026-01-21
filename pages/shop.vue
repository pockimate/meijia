<template>
  <div class="bg-white min-h-screen pt-32 px-8 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-20">
        <h1 class="text-3xl font-light tracking-[0.2em] uppercase mb-2">Signature Collection</h1>
        <p class="text-xs text-gray-500 tracking-[0.15em] uppercase font-light">Curated for the cosmos</p>
        
        <!-- Filter Tabs -->
        <div class="flex justify-center space-x-8 mt-12 text-xs tracking-[0.15em] uppercase">
          <button 
            v-for="cat in filters" 
            :key="cat" 
            @click="selectedFilter = cat"
            :class="[
              'transition-all pb-2 font-light relative group',
              selectedFilter === cat 
                ? 'text-black' 
                : 'text-gray-400 hover:text-black'
            ]"
          >
            {{ cat === 'all' ? 'All Styles' : cat.charAt(0).toUpperCase() + cat.slice(1) }}
            <span 
              :class="[
                'absolute bottom-0 left-0 h-px bg-black transition-all duration-300',
                selectedFilter === cat ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </button>
        </div>
      </div>

      <!-- Product Count & Sort -->
      <div class="flex justify-between items-center mb-12">
        <p class="text-xs text-gray-500 tracking-[0.15em] uppercase font-light">
          {{ filteredProducts.length }} Products
        </p>
        
        <select 
          v-model="sortBy"
          class="input-base py-2 text-xs tracking-[0.15em] uppercase font-light"
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
