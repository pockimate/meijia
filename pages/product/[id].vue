<template>
  <div v-if="product" class="bg-white min-h-screen pt-32 px-8 lg:px-12">
    <div class="max-w-6xl mx-auto">
      
      <!-- Breadcrumb -->
      <nav class="flex items-center text-[10px] text-gray-400 mb-12 tracking-widest uppercase">
        <NuxtLink to="/" class="hover:text-black transition-opacity">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/shop" class="hover:text-black transition-opacity">Shop</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-black">{{ product.name }}</span>
      </nav>

      <div class="grid md:grid-cols-2 gap-20 mb-24">
        
        <!-- Left: Image -->
        <div>
          <div class="aspect-[3/4] bg-gray-50 mb-4">
            <img :src="selectedImage" :alt="product.name" class="w-full h-full object-cover" />
          </div>
          
          <!-- Gallery Thumbnails -->
          <div v-if="product.gallery && product.gallery.length > 1" class="grid grid-cols-4 gap-2">
            <button 
              v-for="(img, idx) in product.gallery" 
              :key="idx"
              @click="selectedImage = img"
              :class="[
                'aspect-square bg-gray-50 overflow-hidden border transition-all',
                selectedImage === img ? 'border-black' : 'border-gray-200 hover:border-gray-400'
              ]"
            >
              <img :src="img" :alt="`${product.name} view ${idx + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Right: Product Info -->
        <div class="flex flex-col justify-center space-y-8">
          <div>
            <span class="text-[10px] tracking-widest text-gray-400 uppercase">{{ product.category }}</span>
            <h1 class="text-4xl font-light tracking-tighter mt-2 uppercase">{{ product.name }}</h1>
            <p class="text-xl mt-4 font-light">${{ product.price.toFixed(2) }}</p>
          </div>

          <p class="text-sm text-gray-500 leading-relaxed font-light">{{ product.description }}</p>

          <!-- Product Details -->
          <div class="space-y-4 border-t border-gray-200 pt-8">
            <div class="flex justify-between text-[10px] tracking-widest uppercase">
              <span class="text-gray-500">Zodiac Sign</span>
              <span class="font-bold text-black">{{ product.zodiac }}</span>
            </div>
            <div class="flex justify-between text-[10px] tracking-widest uppercase">
              <span class="text-gray-500">Rating</span>
              <span class="font-bold text-black">{{ product.rating }} / 5.0</span>
            </div>
            <div v-if="product.benefits" class="flex justify-between text-[10px] tracking-widest uppercase">
              <span class="text-gray-500">Features</span>
              <span class="font-bold text-black">{{ product.benefits.length }} Benefits</span>
            </div>
          </div>

          <!-- Size Selector -->
          <div v-if="product.variants?.sizes" class="space-y-4">
            <label class="block text-[10px] font-bold tracking-widest uppercase">Select Size</label>
            <div class="grid grid-cols-4 gap-2">
              <button 
                v-for="size in product.variants.sizes" 
                :key="size.id"
                @click="selectedSize = size.value"
                :disabled="!size.inStock"
                :class="[
                  'py-3 px-4 border text-[10px] font-medium transition-all uppercase tracking-wider',
                  selectedSize === size.value 
                    ? 'bg-black border-black text-white' 
                    : size.inStock 
                      ? 'bg-white border-gray-200 text-gray-900 hover:border-black' 
                      : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed line-through'
                ]"
              >
                {{ size.value }}
              </button>
            </div>
          </div>

          <!-- Add to Cart Button -->
          <button 
            @click="handleAddToCart"
            :disabled="product.variants?.sizes && !selectedSize"
            class="w-full bg-black text-white py-5 text-[10px] tracking-[0.4em] uppercase hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Bag
          </button>

          <!-- Wishlist Button -->
          <div class="flex justify-center">
            <WishlistButton :product="product" />
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div v-if="product.reviews && product.reviews.length > 0" class="mb-16 border-t border-gray-100 pt-16">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900">Customer Reviews</h2>
          <div class="flex items-center gap-2">
            <span class="text-gray-900 text-xl">{{ '★'.repeat(Math.floor(product.rating)) }}</span>
            <span class="text-gray-900 font-light">{{ product.rating }}</span>
            <span class="text-gray-400 text-xs">({{ product.reviewCount }} reviews)</span>
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
