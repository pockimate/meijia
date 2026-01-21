<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <div class="relative py-24 sm:py-32 overflow-hidden bg-gray-50">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop" 
          alt="Abstract space texture" 
          class="w-full h-full object-cover opacity-10" 
        />
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-widest uppercase">
          Designed in the Stars,<br/>
          <span class="text-gray-600">Worn on Earth.</span>
        </h1>
        <p class="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed font-light">
          Astro Nails isn't just a beauty brand. It's a cosmic transmission. We bridge the gap between digital aesthetics and physical self-expression.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <!-- Origin Story -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <div>
          <div class="flex items-center gap-2 text-gray-900 font-medium tracking-[0.2em] uppercase text-xs mb-4">
            Origin Story
          </div>
          <h2 class="text-3xl font-light text-gray-900 mb-6 tracking-widest uppercase">The Future of Fingertips</h2>
          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Born in 2024 from a collision of astrology, AI technology, and high-fashion nail art, Astro Nails was created for the digital nomad. We realized that in a world where we express ourselves through screens, our hands are always in view—typing, swiping, creating.
            </p>
            <p>
              Our designs are generated using a proprietary blend of trend forecasting algorithms and actual astrological transits. When Mercury is in Retrograde, we drop protective amulets. When Leo season hits, we bring the gold.
            </p>
          </div>
        </div>
        <div class="relative">
          <img 
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" 
            alt="Futuristic fashion" 
            class="relative rounded-lg shadow-lg border border-gray-200" 
          />
        </div>
      </div>

      <!-- Values Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:border-gray-900 transition-colors">
          <svg class="w-12 h-12 mb-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <h3 class="text-xl font-light text-gray-900 mb-3 tracking-widest uppercase">Inclusive by Design</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Genderless, ageless, and boundless. The cosmos doesn't judge, and neither do we.
          </p>
        </div>
        
        <div class="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:border-gray-900 transition-colors">
          <svg class="w-12 h-12 mb-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          <h3 class="text-xl font-light text-gray-900 mb-3 tracking-widest uppercase">AI Powered Styling</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Meet Astra, our resident AI stylist. Trained on thousands of years of astrological data.
          </p>
        </div>
        
        <div class="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:border-gray-900 transition-colors">
          <svg class="w-12 h-12 mb-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-xl font-light text-gray-900 mb-3 tracking-widest uppercase">Earth Friendly</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            We love space, but we live on Earth. Our press-ons are made from recycled ABS plastic.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About | Astro Nails'
});
</script>
