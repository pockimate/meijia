<template>
  <div class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-8 lg:px-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-light tracking-[0.1em] uppercase text-gray-900 mb-3">
          Pick Your Style: 3 Gorgeous Looks!
        </h2>
        <p class="text-sm text-gray-600 font-light">
          Three Cuts, Boundless Charm — Smoothly Pinpoint Your Perfect Style Match!
        </p>
      </div>

      <!-- Style Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Natural Style -->
        <div 
          class="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
          @click="navigateToStyle('natural')"
        >
          <!-- Image -->
          <img 
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
            alt="Natural Style"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h3 class="text-lg font-light tracking-[0.15em] uppercase text-white mb-3">
              Natural Style
            </h3>
            <button 
              class="bg-white text-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
            >
              Shop the Look
            </button>
          </div>
        </div>

        <!-- Full Style -->
        <div 
          class="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
          @click="navigateToStyle('full')"
        >
          <!-- Image -->
          <img 
            src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=800&auto=format&fit=crop"
            alt="Full Style"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h3 class="text-lg font-light tracking-[0.15em] uppercase text-white mb-3">
              Full Style
            </h3>
            <button 
              class="bg-white text-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
            >
              Shop the Look
            </button>
          </div>
        </div>

        <!-- Current Style (Featured) -->
        <div 
          class="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
          @click="navigateToStyle('current')"
        >
          <!-- Badge -->
          <div class="absolute top-4 left-4 z-10">
            <span class="bg-white text-black px-4 py-2 text-[9px] font-medium tracking-[0.2em] uppercase shadow-lg">
              Current Style
            </span>
          </div>

          <!-- Image -->
          <img 
            src="https://images.unsplash.com/photo-1522337360705-8b13d52043a9?q=80&w=800&auto=format&fit=crop"
            alt="Current Style"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h3 class="text-lg font-light tracking-[0.15em] uppercase text-white mb-3">
              Signature Style
            </h3>
            <button 
              class="bg-black text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
            >
              Shop the Look
            </button>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 text-center">
        <p class="text-xs text-gray-500 font-light">
          Each style is carefully curated to match your unique personality and preferences
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const navigateToStyle = (style: string) => {
  // Navigate to shop page with style filter
  router.push(`/shop?style=${style}`);
};
</script>
