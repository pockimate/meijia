<template>
  <button
    @click.stop="handleToggle"
    :class="[
      'flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
      compareStore.isInCompare(product.id)
        ? 'bg-astro-teal/20 border border-astro-teal text-astro-teal'
        : 'bg-white/5 border border-white/20 text-gray-400 hover:border-astro-teal hover:text-astro-teal'
    ]"
    :disabled="!compareStore.canAddMore && !compareStore.isInCompare(product.id)"
    :title="compareStore.isInCompare(product.id) ? 'Remove from comparison' : 'Add to comparison'"
  >
    <span class="text-sm">{{ compareStore.isInCompare(product.id) ? '✓' : '📊' }}</span>
    <span>Compare</span>
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
