<template>
  <div class="flex flex-col min-h-screen bg-astro-bg text-gray-200 font-sans">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-astro-bg/80 backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <NuxtLink to="/" class="text-2xl font-serif font-bold text-white tracking-widest flex items-center gap-2 group">
            <span class="w-8 h-8 rounded-full bg-gradient-to-tr from-astro-purple to-astro-teal flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">✨</span>
            ASTRO
          </NuxtLink>

          <!-- Desktop Search Bar -->
          <div class="hidden lg:block flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          <div class="hidden md:flex space-x-8 items-center">
            <NuxtLink to="/" class="text-gray-400 hover:text-astro-teal transition-colors">{{ $t('nav.home') }}</NuxtLink>
            <NuxtLink to="/shop" class="text-gray-400 hover:text-astro-teal transition-colors">{{ $t('nav.shop') }}</NuxtLink>
            <NuxtLink to="/recommendations" class="text-gray-400 hover:text-astro-purple transition-colors">{{ $t('nav.forYou') }}</NuxtLink>
            <NuxtLink to="/zodiac-guide" class="text-gray-400 hover:text-astro-teal transition-colors">{{ $t('nav.zodiacGuide') }}</NuxtLink>
            <NuxtLink to="/stylist" class="text-gray-400 hover:text-astro-teal transition-colors">{{ $t('nav.astraAI') }}</NuxtLink>
            
            <!-- Compare -->
            <NuxtLink 
              to="/compare"
              class="text-gray-400 hover:text-astro-purple transition-colors relative"
            >
              <span class="text-2xl">📊</span>
              <span 
                v-if="compareStore.compareCount > 0" 
                class="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-astro-purple text-[10px] font-bold text-white rounded-full border border-astro-bg"
              >
                {{ compareStore.compareCount }}
              </span>
            </NuxtLink>
            
            <!-- Wishlist -->
            <NuxtLink 
              to="/wishlist"
              class="text-gray-400 hover:text-astro-pink transition-colors relative"
            >
              <span class="text-2xl">💫</span>
              <span 
                v-if="wishlistStore.wishlistCount > 0" 
                class="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-astro-pink text-[10px] font-bold text-white rounded-full border border-astro-bg"
              >
                {{ wishlistStore.wishlistCount }}
              </span>
            </NuxtLink>
            
            <!-- User Account -->
            <NuxtLink 
              v-if="authStore.isLoggedIn"
              to="/account"
              class="text-gray-400 hover:text-astro-teal transition-colors relative"
            >
              <span class="text-2xl">👤</span>
            </NuxtLink>
            <NuxtLink 
              v-else
              to="/auth/login"
              class="text-gray-400 hover:text-astro-teal transition-colors text-sm"
            >
              {{ $t('nav.signIn') }}
            </NuxtLink>
            
            <!-- Language & Currency Switchers -->
            <div class="flex items-center gap-2 border-l border-white/10 pl-4">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
            
            <!-- 购物车图标 -->
            <button 
              @click="cartStore.toggleCart()"
              class="text-gray-400 hover:text-astro-teal transition-colors relative p-1"
            >
              <span class="text-2xl">🛒</span>
              <span 
                v-if="cartStore.cartCount > 0" 
                class="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-astro-purple text-[10px] font-bold text-white rounded-full border border-astro-bg animate-bounce"
              >
                {{ cartStore.cartCount }}
              </span>
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center gap-4">
            <NuxtLink to="/compare" class="text-gray-400 hover:text-white relative">
              <span class="text-2xl">📊</span>
              <span v-if="compareStore.compareCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-astro-purple rounded-full"></span>
            </NuxtLink>
            <NuxtLink to="/wishlist" class="text-gray-400 hover:text-white relative">
              <span class="text-2xl">💫</span>
              <span v-if="wishlistStore.wishlistCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-astro-pink rounded-full"></span>
            </NuxtLink>
            <NuxtLink to="/search" class="text-gray-400 hover:text-white">
              <span class="text-2xl">🔍</span>
            </NuxtLink>
            <button 
              @click="cartStore.toggleCart()"
              class="text-gray-400 hover:text-white relative"
            >
              <span class="text-2xl">🛒</span>
              <span v-if="cartStore.cartCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-astro-purple rounded-full"></span>
            </button>
          </div>
        </div>

        <!-- Mobile Search Bar -->
        <div class="lg:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </nav>

    <!-- Cart Drawer -->
    <CartDrawer />

    <!-- Quick View Modal -->
    <QuickViewModal />

    <!-- Compare Bar -->
    <CompareBar />

    <!-- Toast Notifications -->
    <ToastContainer />

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-[#05050a] border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-serif font-bold text-white mb-4">✨ ASTRO</h3>
            <p class="text-gray-500 text-sm">{{ $t('footer.description') }}</p>
          </div>
          <div>
            <h4 class="font-bold text-white mb-4 uppercase text-xs tracking-widest">{{ $t('footer.coordinates') }}</h4>
            <ul class="space-y-2 text-sm text-gray-500">
              <li><NuxtLink to="/shop" class="hover:text-astro-teal transition-colors">{{ $t('nav.shop') }}</NuxtLink></li>
              <li><NuxtLink to="/zodiac-guide" class="hover:text-astro-teal transition-colors">{{ $t('nav.zodiacGuide') }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-white mb-4 uppercase text-xs tracking-widest">{{ $t('footer.support') }}</h4>
            <ul class="space-y-2 text-sm text-gray-500">
              <li><NuxtLink to="/faq" class="hover:text-astro-teal transition-colors">FAQ</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-astro-teal transition-colors">About</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-white mb-4 uppercase text-xs tracking-widest">{{ $t('footer.aiStylist') }}</h4>
            <NuxtLink to="/stylist" class="text-astro-teal hover:text-white transition-colors text-sm">Ask Astra →</NuxtLink>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          {{ $t('footer.copyright') }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { useWishlistStore } from '~/stores/wishlist';
import { useCompareStore } from '~/stores/compare';
import { useLocaleStore } from '~/stores/locale';

const cartStore = useCartStore();
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();
const compareStore = useCompareStore();
const localeStore = useLocaleStore();

onMounted(() => {
  authStore.initAuth();
  wishlistStore.initWishlist();
  compareStore.initCompare();
  localeStore.initLocale();
});
</script>
