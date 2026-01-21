<template>
  <div class="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-gray-50 border border-gray-200 shadow-lg overflow-hidden rounded-lg">
      
      <div class="bg-white border-b border-gray-200 p-6">
        <div class="flex items-center gap-3">
          <span class="text-2xl">⭐</span>
          <div>
            <h1 class="text-xl font-light tracking-widest uppercase text-gray-900">ASTRA AI</h1>
            <p class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-500">ZODIAC NAIL STYLIST</p>
          </div>
        </div>
      </div>

      <div class="h-96 overflow-y-auto p-6 space-y-4">
        <div v-for="msg in messages" :key="msg.id" :class="['flex gap-4', msg.role === 'user' ? 'flex-row-reverse' : '']">
          <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', msg.role === 'user' ? 'bg-gray-200' : 'bg-black']">
            {{ msg.role === 'user' ? '👤' : '🤖' }}
          </div>
          <div :class="['p-4 rounded-lg max-w-[80%]', msg.role === 'user' ? 'bg-gray-200 rounded-tr-none' : 'bg-gray-100 rounded-tl-none border border-gray-200']">
            <p class="text-gray-900 text-sm">{{ msg.text }}</p>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-gray-200 bg-white">
        <form @submit.prevent="handleSend" class="flex gap-2">
          <input
            v-model="inputValue"
            type="text"
            placeholder="Enter transmission... (e.g., I'm a Scorpio)"
            class="flex-1 p-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 text-sm"
          />
          <button type="submit" class="bg-black hover:bg-zinc-800 text-white p-4 rounded-lg transition-all">
            ➤
          </button>
        </form>
        <p class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mt-2 text-center">Note: This is a demo with preset responses.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const inputValue = ref('');
const messages = ref([
  {
    id: '1',
    role: 'model',
    text: 'Greetings, Earthling. I am Astra. 🪐 Tell me your zodiac sign, your current mood, or describe an outfit, and I will align your nails with the stars.'
  }
]);

const responses: Record<string, string> = {
  'scorpio': '🦂 Scorpio energy detected! You need something dark and mysterious. I recommend our "Nebula Noir" set - deep void black with holographic glitter. Perfect for channeling that intense Scorpio magnetism. ✨',
  'leo': '🦁 Leo season vibes! Your nails should be as bold as your personality. Go for gold chrome or our "Sun God" collection. You were born to shine! 👑',
  'pisces': '🐟 Dreamy Pisces! Your aura calls for iridescent, water-inspired designs. Try our "Moonstone" polish or mermaid scales. Let your nails flow like the ocean. 🌊',
  'aries': '🔥 Aries fire! Bold, red, and unapologetic. Stiletto shape with chrome red finish. You\'re a warrior - your nails should match! 💪',
  'default': '🔮 Interesting energy... Tell me more about your zodiac sign or current mood, and I\'ll find the perfect cosmic nail match for you! Try saying "I\'m a [sign]" or describe your vibe.'
};

const handleSend = () => {
  const text = inputValue.value.trim().toLowerCase();
  if (!text) return;

  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    text: inputValue.value
  });

  let response = responses['default'];
  for (const [key, val] of Object.entries(responses)) {
    if (text.includes(key)) {
      response = val;
      break;
    }
  }

  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response
    });
  }, 800);

  inputValue.value = '';
};

useHead({
  title: 'Astra AI Stylist | Astro Nails'
});
</script>
