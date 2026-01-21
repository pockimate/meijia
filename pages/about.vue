<template>
  <div class="bg-astro-bg min-h-screen">
    <div class="relative py-24 sm:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-b from-astro-purple/20 to-astro-bg z-0"></div>
        <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop" alt="Abstract space texture" class="w-full h-full object-cover opacity-20" />
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
          Designed in the Stars,<br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-astro-teal to-astro-purple">Worn on Earth.</span>
        </h1>
        <p class="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
          Astro Nails isn't just a beauty brand. It's a cosmic transmission. We bridge the gap between digital aesthetics and physical self-expression.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div class="flex items-center gap-2 text-astro-teal font-bold tracking-widest uppercase text-sm mb-4">
            ✨ Origin Story
          </div>
          <h2 class="text-3xl font-serif text-white font-bold mb-6">The Future of Fingertips</h2>
          <div class="space-y-4 text-gray-400 leading-relaxed">
            <p>
              Born in 2024 from a collision of astrology, AI technology, and high-fashion nail art, Astro Nails was created for the digital nomad. We realized that in a world where we express ourselves through screens, our hands are always in view—typing, swiping, creating.
            </p>
            <p>
              Our designs are generated using a proprietary blend of trend forecasting algorithms and actual astrological transits. When Mercury is in Retrograde, we drop protective amulets. When Leo season hits, we bring the gold.
            </p>
          </div>
        </div>
        <div class="relative">
          <div class="absolute -inset-4 bg-gradient-to-r from-astro-purple to-astro-pink opacity-30 rounded-2xl blur-lg transform rotate-2"></div>
          <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" alt="Futuristic fashion" class="relative rounded-2xl shadow-2xl border border-white/10" />
        </div>
      </div>

      <div class="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-astro-card p-8 rounded-2xl border border-white/5 hover:border-astro-purple/50 transition-colors">
          <div class="text-4xl mb-6">👥</div>
          <h3 class="text-xl font-serif text-white font-bold mb-3">Inclusive by Design</h3>
          <p class="text-gray-400 text-sm">
            Genderless, ageless, and boundless. The cosmos doesn't judge, and neither do we.
          </p>
        </div>
        <div class="bg-astro-card p-8 rounded-2xl border border-white/5 hover:border-astro-teal/50 transition-colors">
          <div class="text-4xl mb-6">⭐</div>
          <h3 class="text-xl font-serif text-white font-bold mb-3">AI Powered Styling</h3>
          <p class="text-gray-400 text-sm">
            Meet Astra, our resident AI stylist. Trained on thousands of years of astrological data.
          </p>
        </div>
        <div class="bg-astro-card p-8 rounded-2xl border border-white/5 hover:border-astro-pink/50 transition-colors">
          <div class="text-4xl mb-6">🌿</div>
          <h3 class="text-xl font-serif text-white font-bold mb-3">Earth Friendly</h3>
          <p class="text-gray-400 text-sm">
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
