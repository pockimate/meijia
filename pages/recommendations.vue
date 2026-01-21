<template>
  <div class="min-h-screen bg-astro-bg py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-serif font-bold text-white mb-4">Your Cosmic Recommendations</h1>
        <p class="text-gray-400 text-lg">Discover products aligned with your unique energy</p>
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
            <h2 class="text-2xl font-serif font-bold text-white flex items-center gap-2 mb-2">
              <span>👁️</span>
              <span>Recently Viewed</span>
            </h2>
            <p class="text-gray-400 text-sm">Continue your cosmic exploration</p>
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
            class="text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            Clear History
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="!hasAnyRecommendations" class="text-center py-20">
          <div class="w-32 h-32 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
            <span class="text-6xl">🔮</span>
          </div>
          <h2 class="text-2xl font-serif font-bold text-white mb-4">Start Your Cosmic Journey</h2>
          <p class="text-gray-400 mb-8">Browse products to get personalized recommendations</p>
          <NuxtLink
            to="/shop"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-astro-purple to-astro-teal text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all"
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
