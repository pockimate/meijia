<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span class="text-xs text-gray-900 font-mono font-bold">{{ localeStore.currencySymbol }}</span>
      <span class="text-xs text-gray-900 uppercase tracking-wider hidden sm:inline">{{ localeStore.currentCurrency }}</span>
      <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50"
      >
        <button
          v-for="currency in localeStore.currencies"
          :key="currency.code"
          @click="selectCurrency(currency.code)"
          :class="[
            'w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors',
            localeStore.currentCurrency === currency.code ? 'bg-gray-100' : ''
          ]"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg font-mono font-bold text-gray-900">{{ currency.symbol }}</span>
            <div class="text-left">
              <p class="text-gray-900 text-sm font-medium">{{ currency.code }}</p>
              <p class="text-gray-500 text-xs">{{ currency.name }}</p>
            </div>
          </div>
          <svg v-if="localeStore.currentCurrency === currency.code" class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useLocaleStore } from '~/stores/locale';
import { useToastStore } from '~/stores/toast';

const localeStore = useLocaleStore();
const toastStore = useToastStore();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

onMounted(() => {
  localeStore.initLocale();
});

const selectCurrency = (code: string) => {
  localeStore.setCurrency(code);
  isOpen.value = false;
  toastStore.success(`Currency changed to ${code}`);
};

// 点击外部关闭
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  };

  document.addEventListener('click', handleClickOutside);
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
