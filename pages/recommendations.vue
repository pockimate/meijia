<template>
  <div class="min-h-screen bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-light tracking-widest uppercase text-gray-900 mb-4">Your Cosmic Recommendations</h1>
        <p class="text-gray-600 text-lg">Discover products aligned with your unique energy</p>
      </div>

      <!-- Personalized Recommendations -->
      <div class="space-y-16">
        <!-- For You -->
        <RecommendedProducts
          :products="personalizedRecommendations"
          title="Curated For You"
          subtitle="Based on your browsing history and preferences"
          :columns="4"
        />

        <!-- Trending -->
        <RecommendedProducts
          :products="trendingProducts"
          title="Trending in the Cosmos"
          subtitle="What other cosmic souls are loving right now"
          :columns="4"
        />

        <!-- New Arrivals -->
        <RecommendedProducts
          v-if="newArrivals.length > 0"
          :products="newArrivals"
          title="New Cosmic Arrivals"
          subtitle="Fresh designs from the astral plane"
          :columns="4"
        />

        <!-- Recently Viewed -->
        <div v-if="recentlyViewed.length > 0" class="space-y-6">
          <div>
            <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 mb-2">
              Recently Viewed
            </h2>
            <p class="text-gray-600 text-sm">Continue your cosmic exploration</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              v-for="product in recentlyViewed"
              :key="product.id"
              :product="product"
            />
          </div>

          <button
            @click="handleClearHistory"
            class="text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            Clear History
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="!hasAnyRecommendations" class="text-center py-20">
          <div class="w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 mb-4">Start Your Cosmic Journey</h2>
          <p class="text-gray-600 mb-8">Browse products to get personalized recommendations</p>
          <NuxtLink
            to="/shop"
            class="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all"
          >
            Explore Shop →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecommendationsStore } from '~/stores/recommendations';
import { useToastStore } from '~/stores/toast';

const recommendationsStore = useRecommendationsStore();
const toastStore = useToastStore();

onMounted(() => {
  recommendationsStore.initRecommendations();
});

const personalizedRecommendations = computed(() => {
  return recommendationsStore.getPersonalizedRecommendations(8);
});

const trendingProducts = computed(() => {
  return recommendationsStore.getTrendingProducts(4);
});

const newArrivals = computed(() => {
  return recommendationsStore.getNewArrivals(4);
});

const recentlyViewed = computed(() => {
  return recommendationsStore.getViewedProducts.slice(0, 8);
});

const hasAnyRecommendations = computed(() => {
  return personalizedRecommendations.value.length > 0 || 
         trendingProducts.value.length > 0 || 
         recentlyViewed.value.length > 0;
});

const handleClearHistory = () => {
  recommendationsStore.clearHistory();
  toastStore.success('Browsing history cleared');
};

useHead({
  title: 'Recommendations | Astro Nails'
});
</script>
