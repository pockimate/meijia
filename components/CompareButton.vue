<template>
  <button
    @click.stop="handleToggle"
    :class="[
      'w-10 h-10 rounded-full border transition-all flex items-center justify-center bg-white/95 backdrop-blur-sm hover-lift',
      compareStore.isInCompare(product.id)
        ? 'border-black'
        : 'border-gray-200 hover:border-gray-400'
    ]"
    :disabled="!compareStore.canAddMore && !compareStore.isInCompare(product.id)"
    :title="compareStore.isInCompare(product.id) ? 'Remove from comparison' : 'Add to comparison'"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import { useCompareStore } from '~/stores/compare';

const props = defineProps<{
  product: Product;
}>();

const compareStore = useCompareStore();

const handleToggle = async () => {
  await compareStore.toggleCompare(props.product);
};

onMounted(() => {
  compareStore.initCompare();
});
</script>
