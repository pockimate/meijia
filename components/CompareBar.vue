<template>
  <Transition name="slide-up">
    <div
      v-if="compareStore.compareCount > 0"
      class="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl"
    >
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between gap-4">
          <!-- Left: Products -->
          <div class="flex items-center gap-3 flex-1 overflow-x-auto">
            <div class="flex items-center gap-2 text-gray-900 font-medium whitespace-nowrap">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span>Compare ({{ compareStore.compareCount }}/{{ compareStore.maxItems }})</span>
            </div>

            <div class="flex gap-2">
              <div
                v-for="product in compareStore.compareItems"
                :key="product.id"
                class="relative group flex-shrink-0"
              >
                <div class="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <button
                  @click="compareStore.removeFromCompare(product.id)"
                  class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- Empty Slots -->
              <div
                v-for="i in (compareStore.maxItems - compareStore.compareCount)"
                :key="`empty-${i}`"
                class="w-16 h-16 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-500 text-xs flex-shrink-0"
              >
                +
              </div>
            </div>
          </div>

          <!-- Right: Actions -->
          <div class="flex items-center gap-3">
            <button
              @click="compareStore.clearCompare()"
              class="text-gray-600 hover:text-gray-900 text-sm transition-colors whitespace-nowrap"
            >
              Clear All
            </button>
            <NuxtLink
              to="/compare"
              class="bg-black text-white px-6 py-3 rounded-lg text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all whitespace-nowrap"
            >
              Compare Now →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCompareStore } from '~/stores/compare';

const compareStore = useCompareStore();

onMounted(() => {
  compareStore.initCompare();
});
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
