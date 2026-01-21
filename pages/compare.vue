<template>
  <div class="min-h-screen bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-4xl font-light tracking-widest uppercase text-gray-900 mb-2">Product Comparison</h1>
        <p class="text-gray-600">Compare features, prices, and ratings side by side</p>
      </div>

      <div v-if="compareStore.compareCount === 0" class="text-center py-20">
        <div class="w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 mb-4">No Products to Compare</h2>
        <p class="text-gray-600 mb-8">Add products from the shop to start comparing</p>
        <NuxtLink
          to="/shop"
          class="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all"
        >
          Browse Products
        </NuxtLink>
      </div>

      <div v-else class="space-y-8">
        <div class="flex justify-between items-center">
          <p class="text-gray-600">
            Comparing <span class="text-gray-900 font-medium">{{ compareStore.compareCount }}</span> products
          </p>
          <button
            @click="handleClearAll"
            class="text-red-600 hover:text-red-700 text-sm transition-colors"
          >
            Clear All
          </button>
        </div>

        <div class="hidden lg:block overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="w-48 p-4 text-left text-gray-600 font-light tracking-widest uppercase border-b border-gray-200">
                  Feature
                </th>
                <th
                  v-for="product in compareStore.compareItems"
                  :key="product.id"
                  class="p-4 border-b border-gray-200"
                >
                  <div class="space-y-3">
                    <div class="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        :src="product.image"
                        :alt="product.name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      @click="compareStore.removeFromCompare(product.id)"
                      class="text-red-600 hover:text-red-700 text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-100">
                <td class="p-4 text-gray-600 font-light tracking-widest uppercase text-sm">Product Name</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`name-${product.id}`"
                  class="p-4"
                >
                  <NuxtLink
                    :to="`/product/${product.id}`"
                    class="text-gray-900 font-light tracking-widest uppercase hover:opacity-50 transition-opacity"
                  >
                    {{ product.name }}
                  </NuxtLink>
                </td>
              </tr>

              <tr class="border-b border-gray-100">
                <td class="p-4 text-gray-600 font-light tracking-widest uppercase text-sm">Price</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`price-${product.id}`"
                  class="p-4"
                >
                  <span class="text-2xl font-light text-gray-900">${{ product.price }}</span>
                </td>
              </tr>

              <tr class="border-b border-gray-100">
                <td class="p-4 text-gray-600 font-light tracking-widest uppercase text-sm">Rating</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`rating-${product.id}`"
                  class="p-4"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-gray-900 font-medium">{{ product.rating }}</span>
                  </div>
                </td>
              </tr>

              <tr class="border-b border-gray-100">
                <td class="p-4 text-gray-600 font-light tracking-widest uppercase text-sm">Category</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`category-${product.id}`"
                  class="p-4"
                >
                  <span class="text-gray-900 text-xs tracking-[0.2em] uppercase font-light">{{ product.category }}</span>
                </td>
              </tr>

              <tr class="border-b border-gray-100">
                <td class="p-4 text-gray-600 font-light tracking-widest uppercase text-sm">Zodiac Sign</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`zodiac-${product.id}`"
                  class="p-4"
                >
                  <span class="text-gray-900">{{ product.zodiac }}</span>
                </td>
              </tr>

              <tr class="border-b border-gray-100">
                <td class="p-4 text-gray-600 font-light tracking-widest uppercase text-sm">Description</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`desc-${product.id}`"
                  class="p-4"
                >
                  <p class="text-gray-700 text-sm leading-relaxed">{{ product.description }}</p>
                </td>
              </tr>

              <tr>
                <td class="p-4 text-gray-600 font-light tracking-widest uppercase text-sm">Actions</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`actions-${product.id}`"
                  class="p-4"
                >
                  <div class="space-y-2">
                    <button
                      @click="handleAddToCart(product)"
                      class="w-full bg-black text-white py-3 px-4 rounded-lg text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all"
                    >
                      Add to Cart
                    </button>
                    <NuxtLink
                      :to="`/product/${product.id}`"
                      class="block w-full text-center text-gray-900 hover:opacity-50 text-sm transition-opacity"
                    >
                      View Details
                    </NuxtLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="lg:hidden space-y-6">
          <div
            v-for="product in compareStore.compareItems"
            :key="product.id"
            class="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div class="flex gap-4">
              <div class="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-light tracking-widest uppercase text-gray-900 mb-2">{{ product.name }}</h3>
                <p class="text-2xl font-light text-gray-900">${{ product.price }}</p>
              </div>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Rating:</span>
                <span class="text-gray-900">{{ product.rating }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Category:</span>
                <span class="text-gray-900 uppercase text-xs tracking-[0.2em]">{{ product.category }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Zodiac:</span>
                <span class="text-gray-900">{{ product.zodiac }}</span>
              </div>
            </div>

            <div class="flex gap-2 pt-2">
              <button
                @click="handleAddToCart(product)"
                class="flex-1 bg-black text-white py-3 px-4 rounded-lg text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all"
              >
                Add to Cart
              </button>
              <button
                @click="compareStore.removeFromCompare(product.id)"
                class="px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import { useCompareStore } from '~/stores/compare';
import { useCartStore } from '~/stores/cart';
import { useToastStore } from '~/stores/toast';

const compareStore = useCompareStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

onMounted(() => {
  compareStore.initCompare();
});

const handleAddToCart = (product: Product) => {
  cartStore.addToCart(product);
  toastStore.success(`${product.name} added to cart!`);
};

const handleClearAll = async () => {
  await compareStore.clearCompare();
};

useHead({
  title: 'Compare Products | Astro Nails'
});
</script>
