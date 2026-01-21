<template>
  <button 
    @click.prevent="toggleWishlist"
    :class="[
      'w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center bg-white/95 backdrop-blur-sm hover-lift',
      isInWishlist ? 'border-black' : 'border-gray-200 hover:border-gray-400'
    ]"
    :title="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
  >
    <svg class="w-4 h-4" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useWishlistStore } from '~/stores/wishlist';
import type { Product } from '~/types';

const props = defineProps<{
  product: Product
}>();

const wishlistStore = useWishlistStore();

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id));

const toggleWishlist = () => {
  const result = wishlistStore.toggleWishlist(props.product);
  
  // 可选：显示提示消息
  if (process.client) {
    const message = result.message;
    // 简单的提示，可以替换为更好的 toast 通知
    console.log(message);
  }
};

onMounted(() => {
  wishlistStore.initWishlist();
});
</script>
