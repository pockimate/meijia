<template>
  <button 
    @click.prevent="toggleWishlist"
    :class="[
      'transition-all duration-300',
      isInWishlist ? 'text-astro-pink scale-110' : 'text-gray-400 hover:text-astro-pink'
    ]"
    :title="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
  >
    <span class="text-2xl">{{ isInWishlist ? '💖' : '🤍' }}</span>
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
