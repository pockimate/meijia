<template>
  <div class="min-h-screen bg-astro-bg py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-4xl font-serif font-bold text-white mb-2">Product Comparison</h1>
        <p class="text-gray-400">Compare features, prices, and ratings side by side</p>
      </div>

      <div v-if="compareStore.compareCount === 0" class="text-center py-20">
        <div class="w-32 h-32 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
          <span class="text-6xl">📊</span>
        </div>
        <h2 class="text-2xl font-serif font-bold text-white mb-4">No Products to Compare</h2>
        <p class="text-gray-400 mb-8">Add products from the shop to start comparing</p>
        <NuxtLink
          to="/shop"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-astro-purple to-astro-teal text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all"
        >
          Browse Products
        </NuxtLink>
      </div>

      <div v-else class="space-y-8">
        <div class="flex justify-between items-center">
          <p class="text-gray-400">
            Comparing <span class="text-white font-medium">{{ compareStore.compareCount }}</span> products
          </p>
          <button
            @click="handleClearAll"
            class="text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            Clear All
          </button>
        </div>

        <div class="hidden lg:block overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="w-48 p-4 text-left text-gray-400 font-medium border-b border-white/10">
                  Feature
                </th>
                <th
                  v-for="product in compareStore.compareItems"
                  :key="product.id"
                  class="p-4 border-b border-white/10"
                >
                  <div class="space-y-3">
                    <div class="aspect-square rounded-xl overflow-hidden bg-white/5">
                      <img
                        :src="product.image"
                        :alt="product.name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      @click="compareStore.removeFromCompare(product.id)"
                      class="text-red-400 hover:text-red-300 text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-white/5">
                <td class="p-4 text-gray-400 font-medium">Product Name</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`name-${product.id}`"
                  class="p-4"
                >
                  <NuxtLink
                    :to="`/product/${product.id}`"
                    class="text-white font-serif font-bold hover:text-astro-teal transition-colors"
                  >
                    {{ product.name }}
                  </NuxtLink>
                </td>
              </tr>

              <tr class="border-b border-white/5">
                <td class="p-4 text-gray-400 font-medium">Price</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`price-${product.id}`"
                  class="p-4"
                >
                  <span class="text-2xl font-bold text-astro-purple">${{ product.price }}</span>
                </td>
              </tr>

              <tr class="border-b border-white/5">
                <td class="p-4 text-gray-400 font-medium">Rating</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`rating-${product.id}`"
                  class="p-4"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-yellow-400">⭐</span>
                    <span class="text-white font-medium">{{ product.rating }}</span>
                  </div>
                </td>
              </tr>

              <tr class="border-b border-white/5">
                <td class="p-4 text-gray-400 font-medium">Category</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`category-${product.id}`"
                  class="p-4"
                >
                  <span class="text-astro-teal text-sm uppercase tracking-widest">{{ product.category }}</span>
                </td>
              </tr>

              <tr class="border-b border-white/5">
                <td class="p-4 text-gray-400 font-medium">Zodiac Sign</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`zodiac-${product.id}`"
                  class="p-4"
                >
                  <span class="text-white">{{ product.zodiac }}</span>
                </td>
              </tr>

              <tr class="border-b border-white/5">
                <td class="p-4 text-gray-400 font-medium">Description</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`desc-${product.id}`"
                  class="p-4"
                >
                  <p class="text-gray-300 text-sm leading-relaxed">{{ product.description }}</p>
                </td>
              </tr>

              <tr>
                <td class="p-4 text-gray-400 font-medium">Actions</td>
                <td
                  v-for="product in compareStore.compareItems"
                  :key="`actions-${product.id}`"
                  class="p-4"
                >
                  <div class="space-y-2">
                    <button
                      @click="handleAddToCart(product)"
                      class="w-full bg-gradient-to-r from-astro-purple to-astro-teal text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all"
                    >
                      Add to Cart
                    </button>
                    <NuxtLink
                      :to="`/product/${product.id}`"
                      class="block w-full text-center text-astro-teal hover:text-white text-sm transition-colors"
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
            class="bg-astro-card border border-white/10 rounded-xl p-6 space-y-4"
          >
            <div class="flex gap-4">
              <div class="w-24 h-24 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-serif font-bold text-white mb-2">{{ product.name }}</h3>
                <p class="text-2xl font-bold text-astro-purple">${{ product.price }}</p>
              </div>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Rating:</span>
                <span class="text-white">{{ product.rating }} ⭐</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Category:</span>
                <span class="text-astro-teal uppercase">{{ product.category }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Zodiac:</span>
                <span class="text-white">{{ product.zodiac }}</span>
              </div>
            </div>

            <div class="flex gap-2 pt-2">
              <button
                @click="handleAddToCart(product)"
                class="flex-1 bg-gradient-to-r from-astro-purple to-astro-teal text-white py-2 px-4 rounded-lg text-sm font-medium"
              >
                Add to Cart
              </button>
              <button
                @click="compareStore.removeFromCompare(product.id)"
                class="px-4 py-2 border border-red-400/50 text-red-400 rounded-lg text-sm hover:bg-red-400/10 transition-colors"
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
