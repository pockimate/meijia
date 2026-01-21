<template>
  <div class="bg-white min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-light tracking-widest uppercase text-gray-900 mb-4">Search Products</h1>
        
        <!-- Search Bar -->
        <div class="relative max-w-2xl">
          <input 
            v-model="searchQuery"
            @input="handleSearch"
            type="text" 
            placeholder="Search for cosmic nails..."
            class="w-full bg-white border border-gray-200 rounded-lg px-6 py-4 pr-12 text-gray-900 focus:outline-none focus:border-black transition-colors"
          />
          <button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:opacity-50">
            🔍
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24 space-y-6">
            
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-light tracking-widest uppercase text-gray-900">Filters</h3>
              <button 
                @click="searchStore.resetFilters()"
                class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-900 hover:opacity-50 transition-opacity"
              >
                Reset
              </button>
            </div>

            <!-- Category Filter -->
            <div>
              <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-3">Category</label>
              <div class="space-y-2">
                <label 
                  v-for="cat in categories" 
                  :key="cat.value"
                  class="flex items-center cursor-pointer group"
                >
                  <input 
                    type="radio" 
                    :value="cat.value"
                    v-model="searchStore.filters.category"
                    class="rounded-full border-gray-300 bg-white text-black focus:ring-black"
                  />
                  <span class="ml-2 text-gray-600 group-hover:opacity-50 transition-opacity">{{ cat.label }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div>
              <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-3">
                Price: ${{ searchStore.filters.minPrice }} - ${{ searchStore.filters.maxPrice }}
              </label>
              <div class="space-y-3">
                <input 
                  type="range" 
                  v-model.number="searchStore.filters.minPrice"
                  :min="0"
                  :max="100"
                  class="w-full accent-black"
                />
                <input 
                  type="range" 
                  v-model.number="searchStore.filters.maxPrice"
                  :min="0"
                  :max="100"
                  class="w-full accent-black"
                />
              </div>
            </div>

            <!-- Rating Filter -->
            <div>
              <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-3">Minimum Rating</label>
              <div class="space-y-2">
                <label 
                  v-for="rating in [0, 3, 4, 4.5]" 
                  :key="rating"
                  class="flex items-center cursor-pointer group"
                >
                  <input 
                    type="radio" 
                    :value="rating"
                    v-model.number="searchStore.filters.minRating"
                    class="rounded-full border-gray-300 bg-white text-black focus:ring-black"
                  />
                  <span class="ml-2 text-gray-600 group-hover:opacity-50 transition-opacity">
                    {{ rating === 0 ? 'All' : `${rating}+ ★` }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-3">
          
          <!-- Sort and Results Count -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <p class="text-gray-600">
              <span class="text-gray-900 font-medium">{{ searchStore.filteredProducts.length }}</span> products found
            </p>
            
            <div class="flex items-center gap-2">
              <label class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-600">Sort by:</label>
              <select 
                v-model="searchStore.filters.sortBy"
                class="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-black transition-colors"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <!-- No Results -->
          <div v-if="searchStore.filteredProducts.length === 0" class="text-center py-20">
            <div class="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <span class="text-5xl">🔍</span>
            </div>
            <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 mb-4">No products found</h2>
            <p class="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
            <button 
              @click="searchStore.resetFilters()"
              class="text-gray-900 hover:opacity-50 transition-opacity"
            >
              Reset Filters →
            </button>
          </div>

          <!-- Products Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="product in searchStore.filteredProducts" 
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/stores/search';

const searchStore = useSearchStore();
const route = useRoute();

const searchQuery = ref('');

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'press-on', label: 'Press-On Nails' },
  { value: 'polish', label: 'Nail Polish' },
  { value: 'care', label: 'Care & Tools' },
];

onMounted(() => {
  searchStore.initSearch();
  
  const q = route.query.q as string;
  if (q) {
    searchQuery.value = q;
    searchStore.setQuery(q);
  }
});

const handleSearch = () => {
  searchStore.setQuery(searchQuery.value);
};

useHead({
  title: 'Search | Astro Nails'
});
</script>
