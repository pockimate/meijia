<template>
  <div class="relative w-full max-w-md">
    <input 
      v-model="query"
      @input="handleInput"
      @keyup.enter="handleSearch"
      @focus="showSuggestions = true"
      type="text" 
      placeholder="Search products..."
      class="input-base pr-10 text-sm"
    />
    <button 
      @click="handleSearch"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:opacity-50 transition-opacity"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </button>

    <!-- Quick Suggestions Dropdown -->
    <div 
      v-if="showSuggestions && (suggestions.length > 0 || recentSearches.length > 0)"
      class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden z-50 shadow-soft-lg"
    >
      <!-- Suggestions -->
      <div v-if="suggestions.length > 0">
        <div class="px-4 py-2 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-light">Suggestions</div>
        <button 
          v-for="suggestion in suggestions" 
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
          class="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 transition-colors font-light"
        >
          <span>{{ suggestion }}</span>
        </button>
      </div>

      <!-- Recent Searches -->
      <div v-if="recentSearches.length > 0 && !query">
        <div class="px-4 py-2 text-[10px] text-gray-500 uppercase tracking-[0.2em] border-t border-gray-200 font-light">Recent</div>
        <button 
          v-for="term in recentSearches.slice(0, 3)" 
          :key="term"
          @click="selectSuggestion(term)"
          class="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-light"
        >
          <span>{{ term }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/stores/search';

const searchStore = useSearchStore();
const router = useRouter();

const query = ref('');
const showSuggestions = ref(false);

const suggestions = computed(() => {
  if (!query.value || query.value.length < 2) return [];
  return searchStore.searchSuggestions;
});

const recentSearches = computed(() => searchStore.searchHistory);

onMounted(() => {
  searchStore.initSearch();
  
  // 点击外部关闭建议
  if (process.client) {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.relative')) {
        showSuggestions.value = false;
      }
    });
  }
});

const handleInput = () => {
  showSuggestions.value = true;
};

const handleSearch = () => {
  if (query.value.trim()) {
    searchStore.setQuery(query.value);
    router.push(`/search?q=${encodeURIComponent(query.value)}`);
    showSuggestions.value = false;
  }
};

const selectSuggestion = (suggestion: string) => {
  query.value = suggestion;
  handleSearch();
};
</script>
