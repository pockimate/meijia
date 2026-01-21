<template>
  <div class="bg-astro-bg">
    <!-- Promo Banner -->
    <PromoBanner />
    
    <!-- Hero -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-astro-purple/20 to-transparent opacity-70"></div>
        <div class="absolute top-20 right-20 w-72 h-72 bg-astro-teal/20 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-10 left-10 w-96 h-96 bg-astro-pink/10 rounded-full blur-[120px]"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-astro-purple/30 bg-astro-purple/10 text-astro-purple text-xs font-semibold tracking-wider mb-6 animate-pulse">
                ⭐ COSMIC COLLECTION DROPPED
              </div>
              <h1 class="text-4xl tracking-tight font-serif font-bold text-white sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Nails written in</span>
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-astro-teal via-astro-purple to-astro-pink xl:inline"> the stars</span>
              </h1>
              <p class="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Unlock your cosmic energy with our limited edition zodiac press-ons. Hand-painted chrome, cat-eye, and aura designs that align with your planetary chart.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <NuxtLink to="/shop" class="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-medium rounded text-white bg-astro-purple hover:bg-violet-700 transition-all shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  Explore Shop
                </NuxtLink>
                <NuxtLink to="/stylist" class="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-astro-teal/50 text-base font-medium rounded text-astro-teal hover:bg-astro-teal/10 transition-all">
                  Ask Astra AI →
                </NuxtLink>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 overflow-hidden">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90" src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=2511&auto=format&fit=crop" alt="Holographic purple nail art" />
        <div class="absolute inset-0 bg-gradient-to-r from-astro-bg to-transparent lg:via-astro-bg/40"></div>
      </div>
    </div>

    <!-- Marquee -->
    <div class="bg-astro-purple/10 border-y border-astro-purple/20 overflow-hidden py-3">
      <div class="flex whitespace-nowrap animate-marquee">
        <span class="text-astro-teal font-mono text-sm uppercase tracking-widest mx-8">⭐ Free Interstellar Shipping over $50 ⭐ Vegan & Cruelty Free ⭐ AI Powered Styling ⭐ Free Interstellar Shipping over $50 ⭐ Vegan & Cruelty Free ⭐ AI Powered Styling</span>
      </div>
    </div>

    <!-- Categories -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 class="text-2xl font-serif font-bold text-white mb-8">✨ Explore Sectors</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink v-for="cat in categories" :key="cat.name" :to="cat.link" class="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-astro-teal/50 transition-all">
          <img :src="cat.image" :alt="cat.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6">
            <p class="text-astro-teal text-xs font-mono uppercase tracking-widest mb-1">{{ cat.subtitle }}</p>
            <h3 class="text-2xl font-serif font-bold text-white group-hover:translate-x-2 transition-transform">{{ cat.name }}</h3>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 relative overflow-hidden bg-astro-card border-y border-white/5">
      <div class="absolute top-1/2 left-0 w-96 h-96 bg-astro-purple/5 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h2 class="text-3xl font-serif font-bold text-white">Trending in the Cosmos</h2>
            <p class="mt-2 text-gray-400">Curated selections from the latest planetary alignment.</p>
          </div>
          <NuxtLink to="/shop" class="hidden sm:flex items-center text-astro-teal hover:text-white transition-colors">View All →</NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- AI Stylist Promo -->
    <section class="py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-3xl overflow-hidden bg-astro-card border border-white/10">
          <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-astro-purple/20 to-transparent"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 items-center">
            <div class="p-8 md:p-16 relative z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-astro-teal/30 bg-astro-teal/10 text-astro-teal text-xs font-semibold tracking-wider mb-6">
                ✨ ASTRA AI 2.0
              </div>
              <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Not sure what matches your vibe?</h2>
              <p class="text-gray-400 text-lg mb-8 leading-relaxed">
                Let Astra, our Zodiac AI Stylist, scan your star chart and current mood to generate a personalized nail art recommendation.
              </p>
              <NuxtLink to="/stylist" class="inline-flex items-center bg-white text-black px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-astro-teal transition-colors">
                Start Analysis →
              </NuxtLink>
            </div>
            <div class="h-64 md:h-96 bg-[#05050a] flex items-center justify-center relative border-l border-white/5 p-8">
              <div class="w-full max-w-sm bg-astro-bg rounded-xl border border-white/10 p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div class="flex gap-2 mb-4">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div class="space-y-3 font-mono text-xs">
                  <div class="bg-white/5 p-2 rounded text-gray-400">User: I need something for Leo season.</div>
                  <div class="bg-astro-purple/20 p-2 rounded text-astro-teal">Astra: Analyzing... 🔥 Solar energy detected.</div>
                </div>
              </div>
            </div>
          </div>
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
    <section class="py-12 bg-astro-bg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div class="flex flex-col items-center text-center p-6 bg-astro-card rounded-2xl border border-white/5 hover:border-astro-purple/30 transition-colors">
            <div class="text-4xl mb-4">🚀</div>
            <h3 class="text-lg font-serif font-semibold text-white">Interstellar Shipping</h3>
            <p class="text-gray-400 text-sm mt-2">Free on orders over $50</p>
          </div>
          <div class="flex flex-col items-center text-center p-6 bg-astro-card rounded-2xl border border-white/5 hover:border-astro-teal/30 transition-colors">
            <div class="text-4xl mb-4">🛡️</div>
            <h3 class="text-lg font-serif font-semibold text-white">Galaxy Grade Durability</h3>
            <p class="text-gray-400 text-sm mt-2">Lasts up to 2 weeks</p>
          </div>
          <div class="flex flex-col items-center text-center p-6 bg-astro-card rounded-2xl border border-white/5 hover:border-astro-pink/30 transition-colors">
            <div class="text-4xl mb-4">💚</div>
            <h3 class="text-lg font-serif font-semibold text-white">Vegan & Cruelty Free</h3>
            <p class="text-gray-400 text-sm mt-2">Earth-friendly materials</p>
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
