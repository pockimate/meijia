<template>
  <div class="bg-astro-bg min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <div class="text-4xl mb-4">❓</div>
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Mission Control / FAQ</h1>
        <p class="text-gray-400">Answers to common questions about your cosmic cargo.</p>
      </div>

      <div class="space-y-8">
        <div v-for="(section, idx) in faqs" :key="idx" class="bg-astro-card border border-white/5 rounded-2xl overflow-hidden">
          <div class="px-6 py-4 bg-white/5 border-b border-white/5">
            <h2 class="text-lg font-serif font-semibold text-white">{{ section.category }}</h2>
          </div>
          <div class="divide-y divide-white/5">
            <details v-for="(item, qIdx) in section.questions" :key="qIdx" class="group bg-astro-bg">
              <summary class="px-6 py-4 cursor-pointer flex justify-between items-center text-left focus:outline-none">
                <span class="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{{ item.q }}</span>
                <span class="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div class="px-6 pb-5 text-sm text-gray-400 leading-relaxed">
                {{ item.a }}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    category: "🚀 Launch Protocols (Shipping)",
    questions: [
      { q: "How long does shipping take?", a: "Standard earth shipping takes 3-5 business days. Interstellar express (priority) takes 1-2 days. Orders are processed within 24 hours." },
      { q: "Do you ship internationally?", a: "Yes, we ship to most sectors on Earth. International duties may apply depending on your region's customs protocols." },
    ]
  },
  {
    category: "📏 Equipment Calibration (Sizing)",
    questions: [
      { q: "How do I measure my nails?", a: "Use a piece of tape across the widest part of your nail bed, mark the edges, and measure with a ruler in millimeters." },
      { q: "What if they don't fit?", a: "If you ordered a standard size set and they don't fit, we accept returns on unworn sets. Custom size orders are final sale." },
    ]
  },
  {
    category: "🛡️ System Maintenance (Wear & Care)",
    questions: [
      { q: "How long do they last?", a: "With sticky tabs: 1-3 days (reusable). With nail glue: 2-3 weeks. Proper prep is key to longevity!" },
      { q: "Are they reusable?", a: "Yes! If you use sticky tabs, they are infinitely reusable. If using glue, file away the dried glue from the back of the nail to reuse." },
    ]
  }
];

useHead({
  title: 'FAQ | Astro Nails'
});
</script>
