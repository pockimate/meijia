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
        <div class="relative bg-white border border-gray-200 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <!-- Close Button -->
          <button
            @click="quickViewStore.closeQuickView()"
            class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-zinc-800 text-white transition-colors"
          >
            <span class="text-2xl">✕</span>
          </button>

          <div class="grid md:grid-cols-2 gap-8 p-8">
            <!-- Left: Image Gallery -->
            <div class="space-y-4">
              <!-- Main Image -->
              <div class="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
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
                      ? 'border-black shadow-lg'
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
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-900">{{ product.category }}</span>
                <div class="flex items-center gap-1">
                  <span class="text-yellow-400">⭐</span>
                  <span class="text-sm text-gray-700">{{ product.rating }}</span>
                  <span class="text-sm text-gray-500">({{ product.reviews?.length || 0 }})</span>
                </div>
              </div>

              <!-- Name -->
              <h2 class="text-3xl font-light tracking-widest uppercase text-gray-900 mb-2">{{ product.name }}</h2>

              <!-- Zodiac -->
              <p class="text-sm text-gray-600 mb-4">{{ product.zodiac }}</p>

              <!-- Price -->
              <div class="mb-6">
                <span class="text-3xl font-light text-gray-900">${{ product.price }}</span>
              </div>

              <!-- Description -->
              <p class="text-gray-700 mb-6 leading-relaxed">{{ product.description }}</p>

              <!-- Size Selection -->
              <div v-if="product.variants && product.variants.length > 0" class="mb-6">
                <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-3">Select Size</label>
                <div class="flex gap-2">
                  <button
                    v-for="variant in product.variants"
                    :key="variant.size"
                    @click="selectedSize = variant.size"
                    :class="[
                      'px-4 py-2 rounded-lg border transition-all',
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
              <div class="mb-6">
                <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-3">Quantity</label>
                <div class="flex items-center gap-3">
                  <button
                    @click="quantity = Math.max(1, quantity - 1)"
                    class="w-10 h-10 rounded-lg border border-gray-200 hover:border-gray-400 text-gray-900 transition-colors"
                  >
                    −
                  </button>
                  <span class="text-xl font-medium text-gray-900 w-12 text-center">{{ quantity }}</span>
                  <button
                    @click="quantity++"
                    class="w-10 h-10 rounded-lg border border-gray-200 hover:border-gray-400 text-gray-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 mt-auto">
                <button
                  @click="handleAddToCart"
                  class="flex-1 bg-black text-white py-4 rounded-lg text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all"
                >
                  Add to Cart 🛒
                </button>
                <button
                  @click="handleToggleWishlist"
                  :class="[
                    'w-14 h-14 rounded-lg border transition-all',
                    wishlistStore.isInWishlist(product.id)
                      ? 'border-gray-900 bg-gray-100 text-2xl'
                      : 'border-gray-200 hover:border-gray-900 text-2xl'
                  ]"
                >
                  {{ wishlistStore.isInWishlist(product.id) ? '💖' : '🤍' }}
                </button>
              </div>

              <!-- View Full Details -->
              <NuxtLink
                :to="`/product/${product.id}`"
                @click="quickViewStore.closeQuickView()"
                class="mt-4 text-center text-sm text-gray-900 hover:opacity-50 transition-opacity"
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
  
  toastStore.success(`${quantity.value}x ${product.value.name} added to cart! 🛒`);
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
