<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      <span class="text-xl">{{ currentFlag }}</span>
      <span class="text-sm text-gray-400 hidden sm:inline">{{ currentLanguage }}</span>
      <span class="text-gray-400">{{ isOpen ? '▲' : '▼' }}</span>
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-astro-card border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="selectLanguage(lang.code)"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors',
            locale === lang.code ? 'bg-astro-purple/20' : ''
          ]"
        >
          <span class="text-xl">{{ lang.flag }}</span>
          <div class="flex-1 text-left">
            <p class="text-white text-sm">{{ lang.name }}</p>
            <p class="text-gray-500 text-xs">{{ lang.nativeName }}</p>
          </div>
          <span v-if="locale === lang.code" class="text-astro-teal">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
];

const currentLanguage = computed(() => {
  return languages.find(l => l.code === locale.value)?.name || 'English';
});

const currentFlag = computed(() => {
  return languages.find(l => l.code === locale.value)?.flag || '🇺🇸';
});

const selectLanguage = (code: string) => {
  setLocale(code);
  isOpen.value = false;
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
