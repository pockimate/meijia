<template>
  <div v-if="product" class="bg-astro-bg min-h-screen py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <nav class="flex items-center text-sm text-gray-500 mb-8 font-mono">
        <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/shop" class="hover:text-white transition-colors">Shop</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-astro-teal">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        <!-- Left: Image Gallery -->
        <div>
          <div class="relative rounded-2xl overflow-hidden border border-white/10 bg-astro-card mb-4">
            <img :src="selectedImage" :alt="product.name" class="w-full aspect-square object-cover" />
            <span v-if="product.isNew" class="absolute top-4 left-4 bg-astro-teal text-astro-bg text-xs px-3 py-1 uppercase tracking-widest font-bold rounded-sm">New Drop</span>
          </div>
          
          <!-- Gallery Thumbnails -->
          <div v-if="product.gallery && product.gallery.length > 1" class="grid grid-cols-4 gap-2">
            <button 
              v-for="(img, idx) in product.gallery" 
              :key="idx"
              @click="selectedImage = img"
              :class="[
                'relative rounded-lg overflow-hidden border-2 transition-all',
                selectedImage === img ? 'border-astro-purple' : 'border-white/10 hover:border-white/30'
              ]"
            >
              <img :src="img" :alt="`${product.name} view ${idx + 1}`" class="w-full aspect-square object-cover" />
            </button>
          </div>
        </div>

        <!-- Right: Product Info -->
        <div class="flex flex-col">
          <div class="flex justify-between items-start mb-2">
            <span class="text-astro-teal text-xs font-bold tracking-[0.2em] uppercase">{{ product.category }}</span>
            <WishlistButton :product="product" />
          </div>
          <h1 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{{ product.name }}</h1>
          
          <div class="flex items-center gap-4 mb-6">
            <p class="text-2xl font-mono text-astro-purple">${{ product.price.toFixed(2) }}</p>
            <div class="flex items-center border-l border-white/10 pl-4">
              <span class="text-astro-teal text-sm">{{ '★'.repeat(Math.floor(product.rating)) }}{{ '☆'.repeat(5 - Math.floor(product.rating)) }}</span>
              <span class="ml-2 text-gray-400 text-xs">{{ product.rating }} ({{ product.reviewCount || 0 }} reviews)</span>
            </div>
          </div>

          <p class="text-gray-400 leading-relaxed mb-6">{{ product.description }}</p>

          <!-- Size Selector -->
          <div v-if="product.variants?.sizes" class="mb-6">
            <label class="block text-sm font-medium text-white mb-3">Select Size</label>
            <div class="grid grid-cols-4 gap-2">
              <button 
                v-for="size in product.variants.sizes" 
                :key="size.id"
                @click="selectedSize = size.value"
                :disabled="!size.inStock"
                :class="[
                  'py-3 px-4 rounded-lg border text-sm font-medium transition-all',
                  selectedSize === size.value 
                    ? 'bg-astro-purple border-astro-purple text-white' 
                    : size.inStock 
                      ? 'bg-transparent border-white/20 text-gray-300 hover:border-white/40' 
                      : 'bg-transparent border-white/10 text-gray-600 cursor-not-allowed line-through'
                ]"
              >
                {{ size.value }}
              </button>
            </div>
            <p v-if="!selectedSize" class="text-xs text-gray-500 mt-2">Please select a size</p>
          </div>

          <ul v-if="product.benefits" class="space-y-2 mb-8">
            <li v-for="(b, i) in product.benefits" :key="i" class="flex items-start gap-2 text-gray-300 text-sm">
              <span class="text-astro-teal">✦</span> {{ b }}
            </li>
          </ul>

          <div class="flex gap-4 mb-8">
            <button 
              @click="handleAddToCart"
              :disabled="product.variants?.sizes && !selectedSize"
              class="flex-1 inline-flex items-center justify-center bg-astro-purple text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-violet-600 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🛒 Add to Cart
            </button>
            <button 
              @click="handleBuyNow"
              :disabled="product.variants?.sizes && !selectedSize"
              class="flex-1 inline-flex items-center justify-center bg-astro-teal text-astro-bg px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now →
            </button>
          </div>

          <!-- Accordion Sections -->
          <div class="space-y-2">
            <details class="bg-astro-card border border-white/10 rounded-lg overflow-hidden">
              <summary class="px-6 py-4 cursor-pointer text-white font-medium hover:bg-white/5 transition-colors flex justify-between items-center">
                <span>How to Use</span>
                <span class="text-astro-teal">+</span>
              </summary>
              <div class="px-6 pb-4 text-gray-400 text-sm space-y-2">
                <ol v-if="product.howToUse" class="list-decimal list-inside space-y-1">
                  <li v-for="(step, i) in product.howToUse" :key="i">{{ step }}</li>
                </ol>
                <p v-else>Apply as directed on packaging.</p>
              </div>
            </details>

            <details class="bg-astro-card border border-white/10 rounded-lg overflow-hidden">
              <summary class="px-6 py-4 cursor-pointer text-white font-medium hover:bg-white/5 transition-colors flex justify-between items-center">
                <span>Ingredients</span>
                <span class="text-astro-teal">+</span>
              </summary>
              <div class="px-6 pb-4 text-gray-400 text-sm">
                <p v-if="product.ingredients">{{ product.ingredients.join(', ') }}</p>
                <p v-else>Vegan, cruelty-free, and 7-free formula.</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div v-if="product.reviews && product.reviews.length > 0" class="mb-16">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-serif font-bold text-white">Cosmic Reviews</h2>
          <div class="flex items-center gap-2">
            <span class="text-astro-teal text-xl">{{ '★'.repeat(Math.floor(product.rating)) }}</span>
            <span class="text-white font-mono">{{ product.rating }}</span>
            <span class="text-gray-500 text-sm">({{ product.reviewCount }} reviews)</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Review Form -->
          <div class="lg:col-span-1">
            <ReviewForm />
          </div>

          <!-- Reviews List -->
          <div class="lg:col-span-2">
            <ReviewList :reviews="convertedReviews" />
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-24 space-y-16">
        <!-- 相关产品 -->
        <RecommendedProducts
          :products="relatedProducts"
          title="Cosmic Companions"
          subtitle="Products that align with your cosmic energy"
          icon="🌟"
          :columns="4"
        />

        <!-- 经常一起购买 -->
        <RecommendedProducts
          v-if="frequentlyBought.length > 0"
          :products="frequentlyBought"
          title="Frequently Bought Together"
          subtitle="Complete your cosmic collection"
          icon="🎁"
          :columns="3"
        />

        <!-- 基于浏览历史的推荐 -->
        <RecommendedProducts
          v-if="recommendedByHistory.length > 0"
          :products="recommendedByHistory"
          title="Recommended For You"
          subtitle="Based on your cosmic journey"
          icon="✨"
          :columns="4"
          :show-view-all="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/types';
import { products } from '~/data/products';
import { useCartStore } from '~/stores/cart';
import { useRecommendationsStore } from '~/stores/recommendations';

const cartStore = useCartStore();
const recommendationsStore = useRecommendationsStore();
const route = useRoute();
const router = useRouter();
const productId = parseInt(route.params.id as string);

const product = products.find(p => p.id === productId);

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' });
}

// 记录浏览历史
onMounted(() => {
  recommendationsStore.initRecommendations();
  recommendationsStore.addToViewHistory(productId);
});

// 推荐产品
const relatedProducts = computed(() => {
  return recommendationsStore.getRelatedProducts(product, 4);
});

const frequentlyBought = computed(() => {
  return recommendationsStore.getFrequentlyBoughtTogether(product, 3);
});

const recommendedByHistory = computed(() => {
  return recommendationsStore.getRecommendedByHistory(4);
});

// 转换 ProductReview 到 Review 格式
const convertedReviews = computed((): Review[] => {
  if (!product?.reviews) return [];
  
  return product.reviews.map(r => ({
    id: r.id,
    user: r.author,
    rating: r.rating,
    date: r.date,
    text: r.comment,
    verified: r.verified,
    zodiac: r.zodiacSign,
    helpful: Math.floor(Math.random() * 20), // 模拟点赞数
    images: Math.random() > 0.7 ? [ // 30% 的评论有图片
      'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?w=400',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'
    ] : undefined
  }));
});

const selectedImage = ref(product.image);
const selectedSize = ref<string>('');

const handleAddToCart = () => {
  if (product.variants?.sizes && !selectedSize.value) {
    return;
  }
  
  const productToAdd = {
    ...product,
    selectedSize: selectedSize.value || undefined
  };
  
  cartStore.addToCart(productToAdd);
};

const handleBuyNow = () => {
  handleAddToCart();
  router.push('/checkout');
};

// SEO: Meta tags and structured data
useHead({
  title: `${product.name} | Astro Nails`,
  meta: [
    { name: 'description', content: product.description },
    { name: 'keywords', content: `${product.name}, ${product.category}, nail art, astro nails` },
    { property: 'og:title', content: `${product.name} | Astro Nails` },
    { property: 'og:description', content: product.description },
    { property: 'og:image', content: product.image },
    { property: 'og:type', content: 'product' },
    { property: 'product:price:amount', content: product.price.toString() },
    { property: 'product:price:currency', content: 'USD' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${product.name} | Astro Nails` },
    { name: 'twitter:description', content: product.description },
    { name: 'twitter:image', content: product.image },
  ],
  link: [
    { rel: 'canonical', href: `https://astronails.com/product/${product.id}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.gallery || [product.image],
        description: product.description,
        brand: {
          '@type': 'Brand',
          name: 'Astro Nails',
        },
        category: product.category,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `https://astronails.com/product/${product.id}`,
        },
        aggregateRating: product.reviewCount ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        } : undefined,
      }),
    },
  ],
});
</script>
