<template>
  <div class="min-h-screen bg-astro-bg">
    <!-- Admin Navbar -->
    <nav class="bg-astro-card border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/admin/dashboard" class="text-xl font-serif font-bold text-white flex items-center gap-2">
            <span>←</span>
            <span>Products Management</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-serif font-bold text-white mb-2">Products</h2>
          <p class="text-gray-400 text-sm">Manage your product catalog</p>
        </div>
        <button
          class="bg-gradient-to-r from-astro-purple to-astro-teal text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          + Add Product
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-astro-card border border-white/10 rounded-xl overflow-hidden hover:border-astro-purple/50 transition-all"
        >
          <!-- Product Image -->
          <div class="aspect-square bg-white/5 relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-if="product.badge" class="absolute top-3 left-3">
              <span class="px-3 py-1 bg-astro-purple/90 text-white text-xs font-bold rounded-full">
                {{ product.badge }}
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <div class="mb-3">
              <p class="text-xs text-astro-teal uppercase mb-1">{{ product.category }}</p>
              <h3 class="text-white font-serif font-bold mb-1">{{ product.name }}</h3>
              <div class="flex items-center gap-2">
                <span class="text-yellow-400">⭐</span>
                <span class="text-sm text-gray-400">{{ product.rating }}</span>
                <span class="text-sm text-gray-500">({{ product.reviewCount || 0 }})</span>
              </div>
            </div>

            <div class="flex items-center justify-between mb-3">
              <span class="text-xl font-bold text-astro-purple">${{ product.price }}</span>
              <span class="text-sm text-gray-400">ID: {{ product.id }}</span>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button
                class="flex-1 bg-astro-bg border border-white/10 text-white px-4 py-2 rounded-lg hover:border-astro-purple transition-colors text-sm"
              >
                Edit
              </button>
              <button
                class="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="products.length === 0" class="text-center py-20">
        <div class="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
          <span class="text-4xl">💅</span>
        </div>
        <p class="text-gray-400 mb-4">No products yet</p>
        <button
          class="bg-astro-purple text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors"
        >
          Add Your First Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products';

definePageMeta({
  layout: false,
  middleware: 'admin',
});

const adminStore = useAdminStore();
const router = useRouter();

onMounted(() => {
  adminStore.initAdmin();
  
  if (!adminStore.isAuthenticated) {
    router.push('/admin/login');
  }
});

useHead({
  title: 'Products Management | Admin',
});
</script>
