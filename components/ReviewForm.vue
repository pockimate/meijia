<template>
  <div class="bg-astro-card border border-white/10 rounded-xl p-6">
    <h3 class="text-xl font-serif font-bold text-white mb-4">Write a Review</h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
        <input 
          v-model="form.name" 
          type="text" 
          required
          class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-astro-purple transition-colors"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Rating</label>
        <div class="flex gap-2">
          <button 
            v-for="star in 5" 
            :key="star"
            type="button"
            @click="form.rating = star"
            class="text-2xl transition-colors"
            :class="star <= form.rating ? 'text-astro-teal' : 'text-gray-600'"
          >
            {{ star <= form.rating ? '★' : '☆' }}
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Your Review</label>
        <textarea 
          v-model="form.comment" 
          required
          rows="4"
          class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-astro-purple transition-colors resize-none"
          placeholder="Share your cosmic experience..."
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Zodiac Sign (Optional)</label>
        <select 
          v-model="form.zodiacSign"
          class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-astro-purple transition-colors"
        >
          <option value="">Select your sign</option>
          <option v-for="sign in zodiacSigns" :key="sign" :value="sign">{{ sign }}</option>
        </select>
      </div>

      <button 
        type="submit"
        class="w-full bg-astro-purple text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-700 transition-all"
      >
        Submit Review
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  rating: 5,
  comment: '',
  zodiacSign: ''
});

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const handleSubmit = () => {
  // In a real app, this would send to an API
  console.log('Review submitted:', form.value);
  alert('Thank you for your review! 🌟');
  
  // Reset form
  form.value = {
    name: '',
    rating: 5,
    comment: '',
    zodiacSign: ''
  };
};
</script>
