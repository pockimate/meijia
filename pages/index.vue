<template>
  <div class="bg-astro-bg">
    <!-- Promo Banner -->
    <PromoBanner />
    
    <!-- Hero -->
    <div class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-black/10 z-10" />
      <img 
        src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=2511&auto=format&fit=crop" 
        class="absolute inset-0 w-full h-full object-cover scale-105"
        alt="Cosmic Nail Art"
      />
      
      <!-- Hero Content -->
      <div class="relative z-20 text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-extralight tracking-tighter mb-6">
          BEAUTY IN SECONDS
        </h1>
        <p class="text-sm tracking-[0.4em] uppercase font-light mb-10">
          Revolutionary Magnetic Technology
        </p>
        <NuxtLink 
          to="/shop" 
          class="inline-block px-12 py-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-500"
        >
          Explore Now
        </NuxtLink>
      </div>
    </div>

    <!-- Marquee -->
    <div class="bg-black text-white overflow-hidden py-3">
      <div class="flex whitespace-nowrap animate-marquee">
        <span class="text-white font-light text-[10px] uppercase tracking-[0.3em] mx-8">⭐ Free Shipping over $50 ⭐ Vegan & Cruelty Free ⭐ AI Powered Styling ⭐ Free Shipping over $50 ⭐ Vegan & Cruelty Free ⭐ AI Powered Styling</span>
      </div>
    </div>

    <!-- Categories -->
    <section class="py-24 px-8 lg:px-12 max-w-7xl mx-auto">
      <h2 class="text-2xl font-light tracking-widest uppercase mb-16">Explore Collections</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="cat in categories" 
          :key="cat.name" 
          :to="cat.link" 
          class="group relative h-96 overflow-hidden"
        >
          <img 
            :src="cat.image" 
            :alt="cat.name" 
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <p class="text-white text-[10px] font-light uppercase tracking-[0.2em] mb-2">{{ cat.subtitle }}</p>
            <h3 class="text-2xl font-light text-white tracking-wide">{{ cat.name }}</h3>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-8 lg:px-12">
        <div class="flex justify-between items-end mb-16">
          <h2 class="text-2xl font-light tracking-widest uppercase">Best Sellers</h2>
          <NuxtLink to="/shop" class="text-xs border-b border-black pb-1 tracking-widest uppercase hover:opacity-50 transition-opacity">
            View All
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          <ProductCard
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- AI Stylist Promo -->
    <section class="bg-stone-50 py-24">
      <div class="max-w-5xl mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-16 items-center">
        <div class="space-y-8">
          <h2 class="text-3xl font-light tracking-tight italic">Why ASTRO NAILS?</h2>
          <div class="space-y-6">
            <div class="border-l border-gray-300 pl-6">
              <h4 class="text-xs font-bold tracking-widest uppercase">NO GLUE</h4>
              <p class="text-sm text-gray-500 mt-1 font-light">Zero chemical contact with skin.</p>
            </div>
            <div class="border-l border-gray-300 pl-6">
              <h4 class="text-xs font-bold tracking-widest uppercase">REUSABLE</h4>
              <p class="text-sm text-gray-500 mt-1 font-light">Lasts up to 90-180 days with proper care.</p>
            </div>
            <div class="border-l border-gray-300 pl-6">
              <h4 class="text-xs font-bold tracking-widest uppercase">3 SECONDS</h4>
              <p class="text-sm text-gray-500 mt-1 font-light">Patented technology for instant application.</p>
            </div>
          </div>
          <NuxtLink 
            to="/stylist" 
            class="inline-block px-8 py-3 bg-black text-white text-[10px] tracking-[0.3em] uppercase hover:bg-gray-800 transition-all"
          >
            Try AI Stylist →
          </NuxtLink>
        </div>
        <div class="aspect-square bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000" 
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            alt="technology" 
          />
        </div>
      </div>
    </section>

    <!-- Personalized Recommendations -->
    <section v-if="personalizedRecommendations.length > 0" class="py-16 bg-astro-bg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecommendedProducts
          :products="personalizedRecommendations"
          title="Curated For Your Cosmic Journey"
          subtitle="Personalized recommendations based on your preferences"
          icon="🔮"
          :columns="4"
          :show-view-all="true"
        />
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 bg-white border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-8 lg:px-12">
        <div class="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div class="text-center space-y-4">
            <div class="text-3xl">🚀</div>
            <h3 class="text-xs font-bold tracking-widest uppercase">Free Shipping</h3>
            <p class="text-xs text-gray-500 font-light">On orders over $50</p>
          </div>
          <div class="text-center space-y-4">
            <div class="text-3xl">🛡️</div>
            <h3 class="text-xs font-bold tracking-widest uppercase">Long Lasting</h3>
            <p class="text-xs text-gray-500 font-light">Lasts up to 2 weeks</p>
          </div>
          <div class="text-center space-y-4">
            <div class="text-3xl">💚</div>
            <h3 class="text-xs font-bold tracking-widest uppercase">Vegan & Cruelty Free</h3>
            <p class="text-xs text-gray-500 font-light">Earth-friendly materials</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products';
import { useRecommendationsStore } from '~/stores/recommendations';

const recommendationsStore = useRecommendationsStore();

const featuredProducts = products.slice(0, 4);

// 个性化推荐
const personalizedRecommendations = computed(() => {
  return recommendationsStore.getPersonalizedRecommendations(8);
});

onMounted(() => {
  recommendationsStore.initRecommendations();
});

const categories = [
  { name: "Press-ons", image: "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=800&auto=format&fit=crop", link: "/shop", subtitle: "Instant Manicure" },
  { name: "Cosmic Polish", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop", link: "/shop", subtitle: "Liquid Stardust" },
  { name: "Care Tools", image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=800&auto=format&fit=crop", link: "/shop", subtitle: "Maintenance Protocols" },
];

// SEO: Meta tags and structured data for homepage
useHead({
  title: 'Astro Nails | Cosmic Nail Art',
  meta: [
    { name: 'description', content: 'Future-forward nail art for the digital age. Shop cosmic-themed press-on nails, polishes, and nail care products.' },
    { name: 'keywords', content: 'nail art, press-on nails, cosmic nails, astrology nails, zodiac nails, nail polish, vegan nails' },
    { property: 'og:title', content: 'Astro Nails | Cosmic Nail Art' },
    { property: 'og:description', content: 'Unlock your cosmic energy with our limited edition zodiac press-ons' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://astronails.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: 'https://astronails.com' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Astro Nails',
        url: 'https://astronails.com',
        description: 'Future-forward nail art for the digital age',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://astronails.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Astro Nails',
        url: 'https://astronails.com',
        logo: 'https://astronails.com/logo.png',
        description: 'Cosmic-themed nail art and beauty products',
        sameAs: [
          'https://instagram.com/astronails',
          'https://twitter.com/astronails',
          'https://facebook.com/astronails',
        ],
      }),
    },
  ],
});
</script>
