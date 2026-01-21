<template>
  <button
    @click.stop="handleToggle"
    :class="[
      'flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
      compareStore.isInCompare(product.id)
        ? 'bg-gray-100 border border-gray-900 text-gray-900'
        : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900'
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
