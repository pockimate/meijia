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
          icon="🔮"
          :columns="4"
        />

        <!-- Trending -->
        <RecommendedProducts
          :products="trendingProducts"
          title="Trending in the Cosmos"
          subtitle="What other cosmic souls are loving right now"
          icon="🌟"
          :columns="4"
        />

        <!-- New Arrivals -->
        <RecommendedProducts
          v-if="newArrivals.length > 0"
          :products="newArrivals"
          title="New Cosmic Arrivals"
          subtitle="Fresh designs from the astral plane"
          icon="✨"
          :columns="4"
        />

        <!-- Recently Viewed -->
        <div v-if="recentlyViewed.length > 0" class="space-y-6">
          <div>
            <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 flex items-center gap-2 mb-2">
              <span>👁️</span>
              <span>Recently Viewed</span>
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
            <span class="text-6xl">🔮</span>
          </div>
          <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 mb-4">Start Your Cosmic Journey</h2>
          <p class="text-gray-600 mb-8">Browse products to get personalized recommendations</p>
          <NuxtLink
            to="/shop"
            class="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all"
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
