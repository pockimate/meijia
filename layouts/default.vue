<template>
  <div class="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-lg border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-8 lg:px-12">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="text-sm font-light text-gray-900 tracking-[0.3em] uppercase hover:opacity-50 transition-opacity">
            ASTRO NAILS
          </NuxtLink>

          <!-- Desktop Search Bar -->
          <div class="hidden lg:block flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          <div class="hidden md:flex space-x-10 items-center">
            <NuxtLink to="/shop" class="text-[10px] text-gray-900 hover:opacity-50 transition-opacity tracking-[0.2em] uppercase font-light">{{ $t('nav.shop') }}</NuxtLink>
            <NuxtLink to="/recommendations" class="text-[10px] text-gray-900 hover:opacity-50 transition-opacity tracking-[0.2em] uppercase font-light">{{ $t('nav.forYou') }}</NuxtLink>
            <NuxtLink to="/zodiac-guide" class="text-[10px] text-gray-900 hover:opacity-50 transition-opacity tracking-[0.2em] uppercase font-light">{{ $t('nav.zodiacGuide') }}</NuxtLink>
            <NuxtLink to="/stylist" class="text-[10px] text-gray-900 hover:opacity-50 transition-opacity tracking-[0.2em] uppercase font-light">{{ $t('nav.astraAI') }}</NuxtLink>
            
            <!-- Right side actions -->
            <div class="flex items-center space-x-6 text-[10px] tracking-[0.2em] uppercase font-light">
              <NuxtLink to="/wishlist" class="hover:opacity-50 transition-opacity relative">
                <span>Wishlist</span>
                <span v-if="wishlistStore.wishlistCount > 0" class="absolute -top-2 -right-3 w-4 h-4 bg-black text-white text-[8px] rounded-full flex items-center justify-center">{{ wishlistStore.wishlistCount }}</span>
              </NuxtLink>
              
              <NuxtLink v-if="authStore.isLoggedIn" to="/account" class="hover:opacity-50 transition-opacity">
                Account
              </NuxtLink>
              <NuxtLink v-else to="/auth/login" class="hover:opacity-50 transition-opacity">
                {{ $t('nav.signIn') }}
              </NuxtLink>
              
              <div class="flex items-center gap-4 border-l border-gray-200 pl-6">
                <LanguageSwitcher />
                <CurrencySwitcher />
              </div>
              
              <button @click="cartStore.toggleCart()" class="hover:opacity-50 transition-opacity relative">
                <span>Cart ({{ cartStore.cartCount }})</span>
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center gap-4">
            <NuxtLink to="/compare" class="text-gray-600 hover:text-astro-purple relative">
              <span class="text-2xl">📊</span>
              <span v-if="compareStore.compareCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-astro-purple rounded-full"></span>
            </NuxtLink>
            <NuxtLink to="/wishlist" class="text-gray-600 hover:text-astro-purple relative">
              <span class="text-2xl">💫</span>
              <span v-if="wishlistStore.wishlistCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-astro-teal rounded-full"></span>
            </NuxtLink>
            <NuxtLink to="/search" class="text-gray-600 hover:text-astro-purple">
              <span class="text-2xl">🔍</span>
            </NuxtLink>
            <button 
              @click="cartStore.toggleCart()"
              class="text-gray-600 hover:text-astro-purple relative"
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

onMounted(() => {
  authStore.initAuth();
  wishlistStore.initWishlist();
  compareStore.initCompare();
  localeStore.initLocale();
});
</script>
