<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="quickViewStore.isOpen && quickViewStore.product"
        class="fixed inset-0 z-[300] flex items-center justify-center p-4"
        @click.self="quickViewStore.closeQuickView()"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-soft-lg">
          <!-- Close Button -->
          <button
            @click="quickViewStore.closeQuickView()"
            class="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-black text-gray-900 transition-all hover-lift"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="grid md:grid-cols-2 gap-12 p-12">
            <!-- Left: Image Gallery -->
            <div class="space-y-4">
              <!-- Main Image -->
              <div class="aspect-square rounded-lg overflow-hidden bg-gray-50">
                <img
                  :src="currentImage"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Thumbnails -->
              <div v-if="product.gallery && product.gallery.length > 1" class="flex gap-2 overflow-x-auto">
                <button
                  v-for="(img, idx) in product.gallery"
                  :key="idx"
                  @click="currentImageIndex = idx"
                  :class="[
                    'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                    currentImageIndex === idx
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-400'
                  ]"
                >
                  <img :src="img" :alt="`${product.name} ${idx + 1}`" class="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            <!-- Right: Product Info -->
            <div class="flex flex-col">
              <!-- Category & Rating -->
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-500">{{ product.category }}</span>
                <div class="flex items-center gap-1">
                  <svg class="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-xs text-gray-900 font-medium">{{ product.rating }}</span>
                  <span class="text-xs text-gray-500">({{ product.reviews?.length || 0 }})</span>
                </div>
              </div>

              <!-- Name -->
              <h2 class="text-2xl font-light tracking-[0.15em] uppercase text-gray-900 mb-2">{{ product.name }}</h2>

              <!-- Zodiac -->
              <p class="text-xs text-gray-500 mb-6 font-light tracking-[0.1em]">{{ product.zodiac }}</p>

              <!-- Price -->
              <div class="mb-6">
                <span class="text-2xl font-medium text-gray-900">${{ product.price }}</span>
              </div>

              <!-- Description -->
              <p class="text-sm text-gray-600 mb-8 leading-relaxed font-light">{{ product.description }}</p>

              <!-- Size Selection -->
              <div v-if="product.variants && product.variants.length > 0" class="mb-6">
                <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-3">Select Size</label>
                <div class="flex gap-2">
                  <button
                    v-for="variant in product.variants"
                    :key="variant.size"
                    @click="selectedSize = variant.size"
                    :class="[
                      'px-4 py-2 rounded-lg border text-xs tracking-[0.1em] uppercase transition-all font-light',
                      selectedSize === variant.size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    ]"
                  >
                    {{ variant.size }}
                  </button>
                </div>
              </div>

              <!-- Quantity -->
              <div class="mb-8">
                <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-3">Quantity</label>
                <div class="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 w-fit">
                  <button
                    @click="quantity = Math.max(1, quantity - 1)"
                    class="w-8 h-8 flex items-center justify-center text-gray-900 hover:opacity-50 transition-opacity"
                  >
                    −
                  </button>
                  <span class="text-sm font-medium text-gray-900 w-8 text-center">{{ quantity }}</span>
                  <button
                    @click="quantity++"
                    class="w-8 h-8 flex items-center justify-center text-gray-900 hover:opacity-50 transition-opacity"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 mt-auto">
                <button
                  @click="handleAddToCart"
                  class="btn-primary flex-1"
                >
                  Add to Bag
                </button>
                <button
                  @click="handleToggleWishlist"
                  :class="[
                    'w-14 h-14 rounded-lg border transition-all hover-lift',
                    wishlistStore.isInWishlist(product.id)
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  ]"
                >
                  <svg class="w-5 h-5 mx-auto" :fill="wishlistStore.isInWishlist(product.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>

              <!-- View Full Details -->
            <NuxtLink
              :to="`/product/${product.id}`"
              @click="quickViewStore.closeQuickView()"
              class="mt-6 text-center text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light"
            >
              View Full Details →
            </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useQuickViewStore } from '~/stores/quickview';
import { useCartStore } from '~/stores/cart';
import { useWishlistStore } from '~/stores/wishlist';
import { useToastStore } from '~/stores/toast';

const quickViewStore = useQuickViewStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const toastStore = useToastStore();

const product = computed(() => quickViewStore.product);
const currentImageIndex = ref(0);
const selectedSize = ref('');
const quantity = ref(1);

// 当前显示的图片
const currentImage = computed(() => {
  if (!product.value) return '';
  if (product.value.gallery && product.value.gallery.length > 0) {
    return product.value.gallery[currentImageIndex.value];
  }
  return product.value.image;
});

// 监听产品变化，重置状态
watch(product, (newProduct) => {
  if (newProduct) {
    currentImageIndex.value = 0;
    quantity.value = 1;
    // 设置默认尺寸
    if (newProduct.variants && newProduct.variants.length > 0) {
      selectedSize.value = newProduct.variants[0].size;
    }
  }
});

// 添加到购物车
const handleAddToCart = () => {
  if (!product.value) return;
  
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(product.value, selectedSize.value);
  }
  
  toastStore.success(`${quantity.value}x ${product.value.name} added to cart!`);
  quickViewStore.closeQuickView();
};

// 切换愿望清单
const handleToggleWishlist = async () => {
  if (!product.value) return;
  await wishlistStore.toggleWishlist(product.value);
};

// ESC 键关闭
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      quickViewStore.closeQuickView();
    }
  };
  window.addEventListener('keydown', handleEscape);
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
  });
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
  opacity: 0;
}
</style>
