<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span class="text-sm text-gray-900 font-mono font-bold">{{ localeStore.currencySymbol }}</span>
      <span class="text-sm text-gray-600 hidden sm:inline">{{ localeStore.currentCurrency }}</span>
      <span class="text-gray-600">{{ isOpen ? '▲' : '▼' }}</span>
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50"
      >
        <button
          v-for="currency in localeStore.currencies"
          :key="currency.code"
          @click="selectCurrency(currency.code)"
          :class="[
            'w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors',
            localeStore.currentCurrency === currency.code ? 'bg-astro-purple/10' : ''
          ]"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg font-mono font-bold">{{ currency.symbol }}</span>
            <div class="text-left">
              <p class="text-gray-900 text-sm font-medium">{{ currency.code }}</p>
              <p class="text-gray-500 text-xs">{{ currency.name }}</p>
            </div>
          </div>
          <span v-if="localeStore.currentCurrency === currency.code" class="text-astro-purple">✓</span>
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
