<template>
  <div class="bg-white min-h-screen pt-32 px-8 lg:px-12">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-light tracking-widest uppercase text-gray-900 mb-4">Your Wishlist</h1>
        <p class="text-gray-500 text-sm font-light">{{ wishlistStore.wishlistCount }} items saved</p>
      </div>

      <!-- Empty State -->
      <div v-if="wishlistStore.wishlistCount === 0" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
          <span class="text-5xl">💫</span>
        </div>
        <h2 class="text-2xl font-light text-gray-900 mb-4">Your wishlist is empty</h2>
        <p class="text-gray-500 mb-8 font-light">Start adding products you love</p>
        <NuxtLink 
          to="/shop"
          class="inline-flex items-center bg-black text-white px-8 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all"
        >
          Explore Shop
        </NuxtLink>
      </div>

      <!-- Wishlist Items -->
      <div v-else>
        <!-- Actions Bar -->
        <div class="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
          <p class="text-xs text-gray-500 tracking-widest uppercase">{{ wishlistStore.wishlistCount }} Products</p>
          <button 
            @click="moveAllToCart"
            class="bg-black text-white px-6 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all flex items-center gap-2"
          >
            Add All to Bag
          </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          <div
            v-for="product in wishlistStore.wishlistItems" 
            :key="product.id"
            class="group relative"
          >
            <!-- Remove Button -->
            <button
              @click="wishlistStore.removeFromWishlist(product.id)"
              class="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-colors shadow-md"
            >
              ✕
            </button>

            <!-- Product Card -->
            <NuxtLink :to="`/product/${product.id}`">
              <div class="aspect-[3/4] bg-gray-50 overflow-hidden mb-4">
                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </NuxtLink>

            <div class="text-center">
              <NuxtLink :to="`/product/${product.id}`">
                <h3 class="text-xs tracking-widest uppercase font-medium text-gray-900 hover:opacity-50 transition-opacity">{{ product.name }}</h3>
              </NuxtLink>
              <p class="text-xs text-gray-500 mt-2 font-light">${{ product.price.toFixed(2) }}</p>
              
              <button 
                @click="addToCart(product)"
                class="w-full mt-4 bg-black hover:bg-zinc-800 text-white py-2 px-4 text-[10px] tracking-[0.3em] uppercase transition-all"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '~/stores/wishlist';
import { useCartStore } from '~/stores/cart';
import { useToastStore } from '~/stores/toast';
import type { Product } from '~/types';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

onMounted(() => {
  wishlistStore.initWishlist();
});

const addToCart = (product: Product) => {
  cartStore.addToCart(product);
  toastStore.success(`${product.name} added to bag!`);
};

const moveAllToCart = () => {
  wishlistStore.wishlistItems.forEach(product => {
    cartStore.addToCart(product);
  });
  toastStore.success('All items added to bag!');
};

useHead({
  title: 'Wishlist | Astro Nails'
});
</script>
