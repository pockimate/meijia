<template>
  <div class="bg-astro-bg min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-serif font-bold text-white">My Wishlist</h1>
          <p class="text-gray-400 mt-1">Your cosmic favorites</p>
        </div>
        
        <div v-if="wishlistStore.wishlistCount > 0" class="mt-4 md:mt-0 flex gap-3">
          <button 
            @click="moveAllToCart"
            class="bg-astro-purple text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-700 transition-all flex items-center gap-2"
          >
            🛒 Add All to Cart
          </button>
          <button 
            @click="clearWishlist"
            class="border border-white/20 text-gray-400 hover:text-white hover:border-white/40 px-6 py-3 rounded-lg font-medium transition-all"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="wishlistStore.wishlistCount === 0" class="text-center py-20">
        <div class="w-24 h-24 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
          <span class="text-5xl">💫</span>
        </div>
        <h2 class="text-2xl font-serif font-bold text-white mb-4">Your wishlist is empty</h2>
        <p class="text-gray-400 mb-8">Start adding products you love!</p>
        <NuxtLink 
          to="/shop"
          class="inline-flex items-center bg-astro-purple text-white px-8 py-3 rounded-lg font-medium hover:bg-violet-700 transition-all"
        >
          Explore Shop →
        </NuxtLink>
      </div>

      <!-- Wishlist Grid -->
      <div v-else>
        <p class="text-gray-400 mb-6">
          <span class="text-white font-medium">{{ wishlistStore.wishlistCount }}</span> items in your wishlist
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="product in wishlistStore.wishlistItems" 
            :key="product.id"
            class="group bg-astro-card border border-white/5 hover:border-astro-purple/50 rounded-xl overflow-hidden transition-all relative"
          >
            <!-- Remove Button -->
            <button 
              @click="removeFromWishlist(product.id)"
              class="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all"
              title="Remove from wishlist"
            >
              ✕
            </button>

            <NuxtLink :to="`/product/${product.id}`">
              <div class="h-64 overflow-hidden relative">
                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span v-if="product.isNew" class="absolute top-2 left-2 bg-astro-teal text-astro-bg text-[10px] px-2 py-1 uppercase tracking-widest font-bold rounded-sm">New Drop</span>
              </div>
            </NuxtLink>

            <div class="p-4">
              <NuxtLink :to="`/product/${product.id}`">
                <div class="flex justify-between items-start mb-2">
                  <div class="flex-1">
                    <h3 class="text-lg font-serif text-white group-hover:text-astro-teal transition-colors">{{ product.name }}</h3>
                    <p class="mt-1 text-xs text-gray-400 capitalize font-mono">{{ product.category }}</p>
                  </div>
                  <p class="text-lg font-medium text-astro-purple ml-2">${{ product.price.toFixed(2) }}</p>
                </div>
                <div class="flex items-center mb-3">
                  <span class="text-astro-teal text-xs">{{ '★'.repeat(Math.floor(product.rating)) }}{{ '☆'.repeat(5 - Math.floor(product.rating)) }}</span>
                  <span class="ml-2 text-xs text-gray-500">{{ product.rating }}</span>
                </div>
              </NuxtLink>

              <button 
                @click="addToCart(product)"
                class="w-full bg-astro-purple hover:bg-violet-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div v-if="wishlistStore.wishlistCount > 0" class="mt-16">
        <h2 class="text-2xl font-serif font-bold text-white mb-6">You Might Also Like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="product in recommendations" 
            :key="product.id"
            :to="`/product/${product.id}`"
            class="group bg-astro-card border border-white/5 hover:border-astro-purple/50 rounded-xl overflow-hidden transition-all"
          >
            <div class="h-48 overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div class="p-4">
              <h3 class="text-lg font-serif text-white group-hover:text-astro-teal transition-colors">{{ product.name }}</h3>
              <div class="flex justify-between items-center mt-2">
                <p class="text-astro-purple">${{ product.price.toFixed(2) }}</p>
                <button 
                  @click.prevent="wishlistStore.addToWishlist(product)"
                  class="text-gray-400 hover:text-astro-pink transition-colors"
                >
                  💫
                </button>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '~/stores/wishlist';
import { useCartStore } from '~/stores/cart';
import { products } from '~/data/products';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const router = useRouter();

onMounted(() => {
  wishlistStore.initWishlist();
});

const recommendations = computed(() => {
  // 获取不在愿望清单中的产品
  const wishlistIds = wishlistStore.wishlistItems.map(item => item.id);
  return products.filter(p => !wishlistIds.includes(p.id)).slice(0, 4);
});

const removeFromWishlist = (productId: number) => {
  wishlistStore.removeFromWishlist(productId);
};

const addToCart = (product: any) => {
  cartStore.addToCart(product);
};

const moveAllToCart = () => {
  wishlistStore.moveAllToCart(cartStore);
};

const clearWishlist = () => {
  if (confirm('Are you sure you want to clear your wishlist?')) {
    wishlistStore.clearWishlist();
  }
};

useHead({
  title: 'My Wishlist | Astro Nails'
});
</script>
