<template>
  <div v-if="product" class="bg-white">
    <div class="max-w-7xl mx-auto px-8 lg:px-12 py-12">
      <nav class="flex items-center text-[10px] text-gray-500 mb-8 tracking-[0.2em] uppercase font-light">
        <NuxtLink to="/" class="hover:opacity-50 transition-opacity">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/shop" class="hover:opacity-50 transition-opacity">Shop</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ product.name }}</span>
      </nav>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-24">
        <div class="space-y-4">
          <div class="aspect-square bg-gray-50 overflow-hidden rounded-lg">
            <img :src="selectedImage" :alt="product.name" class="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300" @click="openImageZoom()" />
          </div>
          <div class="grid grid-cols-4 gap-3">
            <div v-for="(img, idx) in productImages" :key="idx" @click="selectedImage = img" :class="['aspect-square bg-gray-50 overflow-hidden cursor-pointer border-2 transition-all rounded-md', selectedImage === img ? 'border-black' : 'border-transparent hover:border-gray-300']">
              <img :src="img" :alt="`${product.name} view ${idx + 1}`" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div class="space-y-6">
          <div class="flex gap-2">
            <span v-if="product.badge" class="px-3 py-1 bg-black text-white text-[9px] font-medium tracking-[0.2em] uppercase">{{ product.badge }}</span>
            <span v-if="isLowStock" class="px-3 py-1 bg-red-600 text-white text-[9px] font-medium tracking-[0.2em] uppercase">Low Stock</span>
            <span v-if="hasPromotion" class="px-3 py-1 bg-red-600 text-white text-[9px] font-medium tracking-[0.2em] uppercase">{{ promotionDiscount }}% OFF</span>
          </div>
          <div>
            <p class="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2 font-light">{{ product.category }}</p>
            <h1 class="text-3xl font-extralight tracking-[0.1em] uppercase text-gray-900 mb-4">{{ product.name }}</h1>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center gap-3">
                <p v-if="hasPromotion" class="text-2xl font-light text-red-600">${{ promotionPrice.toFixed(2) }}</p>
                <p :class="hasPromotion ? 'text-lg font-light text-gray-400 line-through' : 'text-2xl font-light'">${{ product.price.toFixed(2) }}</p>
              </div>
              <div class="flex items-center gap-1">
                <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= Math.floor(product.rating) ? 'text-gray-900' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span class="text-sm text-gray-900 font-medium ml-2">{{ product.rating }}</span>
                <span class="text-xs text-gray-500">({{ product.reviewCount || 0 }})</span>
              </div>
            </div>
            <div v-if="hasPromotion" class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span class="text-xs font-medium text-red-600 tracking-[0.15em] uppercase">Limited Time Offer</span>
              </div>
              <p class="text-xs text-red-700 mt-1 font-light">Save {{ promotionDiscount }}% - Offer ends soon!</p>
            </div>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed font-light">{{ product.description }}</p>
          <div class="space-y-3 pt-4 border-t border-gray-100">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>
              <span class="text-xs text-gray-600 font-light">3-Second Application</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>
              <span class="text-xs text-gray-600 font-light">Reusable up to 180 days</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>
              <span class="text-xs text-gray-600 font-light">Zero glue, no damage</span>
            </div>
          </div>
          <div v-if="bundleDeals.length > 0" class="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-orange-50">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
              <h3 class="text-xs font-medium tracking-[0.2em] uppercase text-gray-900">Bundle & Save</h3>
            </div>
            <div class="space-y-2">
              <div v-for="(bundle, idx) in bundleDeals" :key="idx" @click="selectedBundle = selectedBundle === idx ? null : idx" :class="['flex items-center justify-between p-3 rounded-md cursor-pointer transition-all', selectedBundle === idx ? 'bg-white border-2 border-amber-600' : 'bg-white/50 border border-gray-200 hover:border-amber-400']">
                <div class="flex items-center gap-3">
                  <div :class="['w-4 h-4 rounded-full border-2 flex items-center justify-center', selectedBundle === idx ? 'border-amber-600' : 'border-gray-300']">
                    <div v-if="selectedBundle === idx" class="w-2 h-2 rounded-full bg-amber-600"></div>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-gray-900">{{ bundle.title }}</p>
                    <p class="text-[10px] text-gray-600 font-light">{{ bundle.description }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-amber-600">${{ bundle.price.toFixed(2) }}</p>
                  <p class="text-[10px] text-gray-500 line-through">${{ bundle.originalPrice.toFixed(2) }}</p>
                </div>
              </div>
            </div>
            <p class="text-[10px] text-gray-600 mt-3 font-light">
              <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
              Bundle items will be added to your cart together
            </p>
          </div>
          <div class="pt-4">
            <label class="block text-[10px] font-light tracking-[0.2em] uppercase text-gray-500 mb-3">Quantity</label>
            <div class="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 w-fit">
              <button @click="decrementQuantity" class="w-8 h-8 flex items-center justify-center text-gray-900 hover:opacity-50 transition-opacity" aria-label="Decrease quantity">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
              </button>
              <span class="text-sm font-medium text-gray-900 w-8 text-center">{{ quantity }}</span>
              <button @click="incrementQuantity" class="w-8 h-8 flex items-center justify-center text-gray-900 hover:opacity-50 transition-opacity" aria-label="Increase quantity">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
          </div>
          <div class="space-y-3">
            <button @click="handleAddToCart" :disabled="!isInStock" class="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isInStock ? 'Add to Bag' : 'Out of Stock' }}
            </button>
            <button @click="handleBuyNow" :disabled="!isInStock" class="w-full border border-black text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Buy Now
            </button>
            <div class="flex gap-3">
              <WishlistButton :product="product" class="flex-1" />
              <CompareButton :product="product" class="flex-1" />
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 space-y-2 text-xs border-t border-gray-100 pt-6">
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
              <span class="font-light">Free shipping on orders over $50</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span class="font-light">30-day return policy</span>
            </div>

          <!-- Pairs Well With -->
          <div class="pt-6 border-t border-gray-100">
            <PairsWellWith :current-product="product" />
          </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Detail Tabs -->
    <ProductDetailTabs v-if="product" :product="product" />

    <!-- Product Detail Images -->
    <ProductDetailImages />

    <!-- Trust Badges -->
    <TrustBadges />

    <!-- Related Products -->
    <RelatedProducts v-if="product" :current-product="product" />

    <!-- Social Share -->
    <ProductSocialShare v-if="product" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products';
import { useCartStore } from '~/stores/cart';
import { useWishlistStore } from '~/stores/wishlist';
import { useToastStore } from '~/stores/toast';
import type { Product } from '~/types';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const toastStore = useToastStore();

const productId = computed(() => parseInt(route.params.id as string));
const product = computed(() => products.find(p => p.id === productId.value));

const selectedImage = ref('');
const quantity = ref(1);
const selectedBundle = ref<number | null>(null);
const showImageZoom = ref(false);
const imageHovered = ref(false);

const stockLevel = computed(() => {
  if (!product.value) return 0;
  return Math.floor(Math.random() * 50) + 10;
});

const hasPromotion = computed(() => {
  if (!product.value) return false;
  return [1, 4, 5].includes(product.value.id);
});

const promotionDiscount = computed(() => {
  if (!hasPromotion.value) return 0;
  if (product.value?.id === 1) return 20;
  if (product.value?.id === 4) return 15;
  return 10;
});

const promotionPrice = computed(() => {
  if (!product.value || !hasPromotion.value) return 0;
  return product.value.price * (1 - promotionDiscount.value / 100);
});

const bundleDeals = computed(() => {
  if (!product.value) return [];
  const basePrice = product.value.price;
  return [
    { title: 'Buy 2 Sets', description: 'Save 10%', quantity: 2, discount: 10, price: basePrice * 2 * 0.9, originalPrice: basePrice * 2 },
    { title: 'Buy 3 Sets', description: 'Save 15%', quantity: 3, discount: 15, price: basePrice * 3 * 0.85, originalPrice: basePrice * 3 },
    { title: 'Buy 5 Sets', description: 'Save 20%', quantity: 5, discount: 20, price: basePrice * 5 * 0.8, originalPrice: basePrice * 5 }
  ];
});

const productImages = computed(() => {
  if (!product.value) return [];
  if (product.value.gallery && product.value.gallery.length > 0) {
    return product.value.gallery;
  }
  return [product.value.image, product.value.image, product.value.image, product.value.image];
});

const isInStock = computed(() => stockLevel.value > 0);
const isLowStock = computed(() => stockLevel.value > 0 && stockLevel.value < 10);

const incrementQuantity = () => {
  if (quantity.value < stockLevel.value) {
    quantity.value++;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const handleAddToCart = () => {
  if (!product.value || !isInStock.value) return;
  if (selectedBundle.value !== null) {
    const bundle = bundleDeals.value[selectedBundle.value];
    for (let i = 0; i < bundle.quantity; i++) {
      cartStore.addToCart(product.value);
    }
    toastStore.success(`${bundle.title} added to cart!`);
  } else {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(product.value);
    }
  }
  quantity.value = 1;
  selectedBundle.value = null;
};

const handleBuyNow = () => {
  if (!product.value || !isInStock.value) return;
  handleAddToCart();
  router.push('/checkout');
};

const openImageZoom = () => {
  showImageZoom.value = true;
};

const closeImageZoom = () => {
  showImageZoom.value = false;
};

const selectImage = (img: string) => {
  selectedImage.value = img;
};

onMounted(() => {
  if (product.value) {
    selectedImage.value = productImages.value[0] || product.value.image;
  }
  if (!product.value) {
    router.push('/shop');
    toastStore.error('Product not found');
  }
});

watch(product, (newProduct) => {
  if (newProduct) {
    selectedImage.value = productImages.value[0] || newProduct.image;
  }
}, { immediate: true });

useHead(() => ({
  title: product.value ? `${product.value.name} | Astro Nails` : 'Product | Astro Nails',
  meta: [
    { name: 'description', content: product.value?.description || 'Shop cosmic-themed press-on nails and nail care products' },
    { name: 'keywords', content: `${product.value?.name}, ${product.value?.category}, nail art, press-on nails, astro nails` },
    { property: 'og:title', content: product.value?.name || 'Product' },
    { property: 'og:description', content: product.value?.description || '' },
    { property: 'og:image', content: product.value?.image || '' },
    { property: 'og:type', content: 'product' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: product.value?.name || 'Product' },
    { name: 'twitter:description', content: product.value?.description || '' },
    { name: 'twitter:image', content: product.value?.image || '' },
  ],
}));
</script>
