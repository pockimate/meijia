<template>
  <div class="bg-gray-50 py-16">
    <div class="max-w-7xl mx-auto px-8 lg:px-12">
      <div class="text-center mb-12">
        <h2 class="text-2xl font-light tracking-[0.1em] uppercase text-gray-900 mb-3">Product Details</h2>
        <p class="text-sm text-gray-600 font-light">Explore every aspect of this product</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(detail, idx) in details" :key="idx" class="group">
          <div class="aspect-square bg-white rounded-lg overflow-hidden mb-4">
            <img 
              :src="detail.image" 
              :alt="detail.title" 
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
            />
          </div>
          <h3 class="text-xs font-medium tracking-[0.2em] uppercase text-gray-900 mb-2">{{ detail.title }}</h3>
          <p class="text-xs text-gray-600 font-light leading-relaxed">{{ detail.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const details = [
  {
    title: 'Premium Materials',
    description: 'Made with high-quality, skin-safe materials that last.',
    image: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Easy Application',
    description: 'Apply in seconds with our patented magnetic technology.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Unique Design',
    description: 'Each design is inspired by cosmic aesthetics and astrology.',
    image: 'https://images.unsplash.com/photo-1522337360705-8b13d52043a9?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Long-Lasting',
    description: 'Reusable up to 180 days with proper care and storage.',
    image: 'https://images.unsplash.com/photo-1599695683918-1c491566378e?q=80&w=400&auto=format&fit=crop'
  }
];
</script>
