<template>
  <div class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-8 lg:px-12">
      <!-- Main Promo -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <!-- Left: Image -->
        <div class="relative aspect-[4/5] overflow-hidden rounded-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop"
            alt="Featured Collection"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700"></div>
        </div>

        <!-- Right: Content -->
        <div class="space-y-8">
          <div>
            <p class="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-light">
              Limited Edition
            </p>
            <h2 class="text-4xl md:text-5xl font-extralight tracking-[0.05em] uppercase text-gray-900 mb-6 leading-tight">
              Cosmic<br>Collection
            </h2>
            <p class="text-base text-gray-600 leading-relaxed font-light mb-8">
              Discover our exclusive collection inspired by the mysteries of the universe. Each design tells a story written in the stars.
            </p>
          </div>

          <!-- Features -->
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h4 class="text-xs font-medium tracking-[0.2em] uppercase">Handcrafted</h4>
              <p class="text-xs text-gray-600 font-light">Each piece is meticulously crafted</p>
            </div>
            <div class="space-y-2">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 class="text-xs font-medium tracking-[0.2em] uppercase">Long-Lasting</h4>
              <p class="text-xs text-gray-600 font-light">Reusable up to 180 days</p>
            </div>
          </div>

          <!-- CTA -->
          <div class="flex gap-4">
            <NuxtLink 
              to="/shop" 
              class="inline-block bg-black text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all"
            >
              Explore Collection
            </NuxtLink>
            <button 
              class="inline-block border border-black text-black px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <!-- Secondary Promos -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Promo 1 -->
        <div class="relative aspect-square overflow-hidden rounded-xl group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=600&auto=format&fit=crop"
            alt="New Arrivals"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <p class="text-xs tracking-[0.2em] uppercase text-white/80 mb-2 font-light">New</p>
            <h3 class="text-xl font-light tracking-[0.1em] uppercase text-white mb-3">
              Fresh Arrivals
            </h3>
            <button class="text-xs tracking-[0.2em] uppercase text-white border-b border-white pb-1 hover:opacity-70 transition-opacity">
              Shop Now →
            </button>
          </div>
        </div>

        <!-- Promo 2 -->
        <div class="relative aspect-square overflow-hidden rounded-xl group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1522337360705-8b13d52043a9?q=80&w=600&auto=format&fit=crop"
            alt="Best Sellers"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <p class="text-xs tracking-[0.2em] uppercase text-white/80 mb-2 font-light">Popular</p>
            <h3 class="text-xl font-light tracking-[0.1em] uppercase text-white mb-3">
              Best Sellers
            </h3>
            <button class="text-xs tracking-[0.2em] uppercase text-white border-b border-white pb-1 hover:opacity-70 transition-opacity">
              Discover →
            </button>
          </div>
        </div>

        <!-- Promo 3 -->
        <div class="relative aspect-square overflow-hidden rounded-xl group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1599695683918-1c491566378e?q=80&w=600&auto=format&fit=crop"
            alt="Limited Edition"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div class="absolute top-4 right-4">
            <span class="bg-red-600 text-white px-3 py-1 text-[9px] font-medium tracking-[0.2em] uppercase">
              Limited
            </span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <p class="text-xs tracking-[0.2em] uppercase text-white/80 mb-2 font-light">Exclusive</p>
            <h3 class="text-xl font-light tracking-[0.1em] uppercase text-white mb-3">
              Limited Edition
            </h3>
            <button class="text-xs tracking-[0.2em] uppercase text-white border-b border-white pb-1 hover:opacity-70 transition-opacity">
              View Collection →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here if needed
</script>
