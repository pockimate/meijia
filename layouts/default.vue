<template>
  <div class="flex flex-col min-h-screen bg-white text-gray-900 font-sans layout-wrapper">
    <!-- Navbar -->
    <nav class="sticky top-0 w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-soft">
      <div class="max-w-7xl mx-auto px-8 lg:px-12">
        <div class="flex justify-between items-center h-20">
          <NuxtLink to="/" class="text-sm font-light text-gray-900 tracking-[0.25em] uppercase hover:opacity-50 transition-opacity">
            ASTRO NAILS
          </NuxtLink>

          <!-- Desktop Search Bar -->
          <div class="hidden lg:block flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          <div class="hidden md:flex space-x-10 items-center">
            <NuxtLink to="/shop" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light relative group">
              {{ $t('nav.shop') }}
              <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink to="/recommendations" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light relative group">
              {{ $t('nav.forYou') }}
              <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink to="/zodiac-guide" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light relative group">
              {{ $t('nav.zodiacGuide') }}
              <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink to="/stylist" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light relative group">
              {{ $t('nav.astraAI') }}
              <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            
            <!-- Right side actions -->
            <div class="flex items-center space-x-6 pl-6 border-l border-gray-200">
              <!-- Language Switcher -->
              <LanguageSwitcher />
              
              <!-- Currency Switcher -->
              <CurrencySwitcher />
              
              <!-- Search Icon -->
              <NuxtLink to="/search" class="hover:opacity-50 transition-opacity group">
                <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </NuxtLink>
              
              <!-- Wishlist Icon -->
              <NuxtLink to="/wishlist" class="hover:opacity-50 transition-opacity relative group">
                <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span v-if="wishlistStore.wishlistCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full animate-pulse"></span>
              </NuxtLink>
              
              <!-- Account Icon -->
              <NuxtLink v-if="authStore.isLoggedIn" to="/account" class="hover:opacity-50 transition-opacity group">
                <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </NuxtLink>
              <NuxtLink v-else to="/auth/login" class="hover:opacity-50 transition-opacity group">
                <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </NuxtLink>
              
              <!-- Cart Icon -->
              <button @click="cartStore.toggleCart()" class="hover:opacity-50 transition-opacity relative group">
                <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <span 
                  v-if="cartStore.cartCount > 0" 
                  class="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-medium animate-scale-in"
                >
                  {{ cartStore.cartCount }}
                </span>
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center gap-4">
            <!-- Mobile Search Icon -->
            <NuxtLink to="/search" class="hover:opacity-50 transition-opacity">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </NuxtLink>
            
            <!-- Mobile Wishlist Icon -->
            <NuxtLink to="/wishlist" class="hover:opacity-50 transition-opacity relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span v-if="wishlistStore.wishlistCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full"></span>
            </NuxtLink>
            
            <!-- Mobile Cart Icon -->
            <button 
              @click="cartStore.toggleCart()"
              class="hover:opacity-50 transition-opacity relative"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span v-if="cartStore.cartCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full"></span>
            </button>
            
            <!-- Mobile Menu Icon -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="hover:opacity-50 transition-opacity">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <Transition name="slide-down">
          <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-100 py-4">
            <div class="flex flex-col space-y-4">
              <NuxtLink to="/shop" @click="mobileMenuOpen = false" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light">{{ $t('nav.shop') }}</NuxtLink>
              <NuxtLink to="/recommendations" @click="mobileMenuOpen = false" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light">{{ $t('nav.forYou') }}</NuxtLink>
              <NuxtLink to="/zodiac-guide" @click="mobileMenuOpen = false" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light">{{ $t('nav.zodiacGuide') }}</NuxtLink>
              <NuxtLink to="/stylist" @click="mobileMenuOpen = false" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light">{{ $t('nav.astraAI') }}</NuxtLink>
              <div class="border-t border-gray-100 pt-4">
                <NuxtLink v-if="authStore.isLoggedIn" to="/account" @click="mobileMenuOpen = false" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light">Account</NuxtLink>
                <NuxtLink v-else to="/auth/login" @click="mobileMenuOpen = false" class="text-xs text-gray-900 hover:opacity-50 transition-opacity tracking-[0.15em] uppercase font-light">Login</NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
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
    <main class="flex-grow relative main-content">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-stone-50 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-8 lg:px-12 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 class="text-sm font-light text-gray-900 mb-6 tracking-[0.3em] uppercase">ASTRO NAILS</h3>
            <p class="text-xs text-gray-500 font-light leading-relaxed">{{ $t('footer.description') }}</p>
          </div>
          <div>
            <h4 class="font-light text-gray-900 mb-6 uppercase text-[10px] tracking-[0.2em]">{{ $t('footer.coordinates') }}</h4>
            <ul class="space-y-3 text-xs text-gray-600 font-light">
              <li><NuxtLink to="/shop" class="hover:opacity-50 transition-opacity">{{ $t('nav.shop') }}</NuxtLink></li>
              <li><NuxtLink to="/zodiac-guide" class="hover:opacity-50 transition-opacity">{{ $t('nav.zodiacGuide') }}</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-light text-gray-900 mb-6 uppercase text-[10px] tracking-[0.2em]">{{ $t('footer.support') }}</h4>
            <ul class="space-y-3 text-xs text-gray-600 font-light">
              <li><NuxtLink to="/faq" class="hover:opacity-50 transition-opacity">FAQ</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:opacity-50 transition-opacity">About</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-light text-gray-900 mb-6 uppercase text-[10px] tracking-[0.2em]">{{ $t('footer.aiStylist') }}</h4>
            <NuxtLink to="/stylist" class="text-xs text-gray-900 hover:opacity-50 transition-opacity font-light border-b border-gray-900 pb-1">Ask Astra →</NuxtLink>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-gray-200 text-center text-[10px] text-gray-400 tracking-[0.2em] uppercase font-light">
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

const mobileMenuOpen = ref(false);

onMounted(() => {
  authStore.initAuth();
  wishlistStore.initWishlist();
  compareStore.initCompare();
  localeStore.initLocale();
});
</script>

<style scoped>
/* 确保 layout 不干扰 sticky */
.layout-wrapper {
  transform: none !important;
  will-change: auto !important;
}

.main-content {
  overflow: visible;
  transform: none !important;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
