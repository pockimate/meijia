<template>
  <div class="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-light tracking-widest uppercase text-gray-900 mb-4">Cosmic Alignment Chart</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Discover the nail aesthetics written in your star chart. 
          Find your sign below to reveal your power color and style recommendation.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="sign in signs" :key="sign.name" class="group relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:border-black transition-all duration-300 hover:-translate-y-1">
          <div :class="`h-2 w-full bg-gradient-to-r ${sign.color}`"></div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-2xl font-light tracking-widest uppercase text-gray-900">{{ sign.name }}</h3>
                <p class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mt-1">{{ sign.dates }}</p>
              </div>
              <div class="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-[10px] tracking-[0.2em] uppercase font-light text-gray-700">
                {{ sign.icon }} {{ sign.element }}
              </div>
            </div>

            <div class="space-y-4 mb-6">
              <div>
                <span class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-500">Vibe</span>
                <p class="text-gray-700">{{ sign.vibe }}</p>
              </div>
              <div>
                <span class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-500">Recommendation</span>
                <p class="text-gray-900">{{ sign.recommendation }}</p>
              </div>
            </div>

            <NuxtLink to="/shop" class="inline-flex items-center text-sm text-gray-600 hover:opacity-50 transition-opacity group-hover:underline decoration-black underline-offset-4">
              Shop the Vibe →
            </NuxtLink>
          </div>

          <div :class="`absolute inset-0 bg-gradient-to-br ${sign.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const signs = [
  { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire', icon: '🔥', vibe: 'Fierce & Unstoppable', color: 'from-red-500 to-orange-500', recommendation: 'Stiletto shape with bold chrome red.' },
  { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth', icon: '🌍', vibe: 'Luxurious & Grounded', color: 'from-green-500 to-emerald-700', recommendation: 'Square shape in matte forest green.' },
  { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air', icon: '💨', vibe: 'Dual & Dynamic', color: 'from-yellow-300 to-yellow-500', recommendation: 'Mismatched hands or split designs.' },
  { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water', icon: '💧', vibe: 'Intuitive & Moon-ruled', color: 'from-gray-200 to-blue-200', recommendation: 'Pearl finish or silver cat-eye.' },
  { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire', icon: '🔥', vibe: 'Royal & Radiant', color: 'from-yellow-500 to-orange-400', recommendation: 'Gold flakes or sun-inspired art.' },
  { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth', icon: '🌍', vibe: 'Pristine & Perfect', color: 'from-stone-400 to-stone-600', recommendation: 'Clean french tips with a twist.' },
  { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air', icon: '💨', vibe: 'Balanced & Beautiful', color: 'from-pink-300 to-rose-400', recommendation: 'Soft aura gradients in pastel.' },
  { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water', icon: '💧', vibe: 'Intense & Mysterious', color: 'from-purple-900 to-black', recommendation: 'Black void or blood red ombre.' },
  { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire', icon: '🔥', vibe: 'Adventurous & Wild', color: 'from-purple-600 to-indigo-600', recommendation: 'Galaxy prints or constellation art.' },
  { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth', icon: '🌍', vibe: 'Ambitious & Structured', color: 'from-gray-700 to-gray-900', recommendation: 'Deep charcoal or classic tortie.' },
  { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air', icon: '💨', vibe: 'Unique & Futurist', color: 'from-cyan-400 to-blue-500', recommendation: 'Electric blue or holographic silver.' },
  { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water', icon: '💧', vibe: 'Dreamy & Ethereal', color: 'from-teal-300 to-cyan-300', recommendation: 'Iridescent scales or water droplets.' },
];

useHead({
  title: 'Zodiac Guide | Astro Nails'
});
</script>
