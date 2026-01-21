<template>
  <div class="bg-white min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-3xl font-light tracking-widest uppercase text-gray-900">
          <span class="w-10 h-10 rounded-full bg-black flex items-center justify-center">✨</span>
          ASTRO
        </NuxtLink>
        <p class="mt-2 text-gray-600">Join the cosmic community</p>
      </div>

      <!-- Register Form -->
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 mb-6">Create Account</h2>
        
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-2">Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              required
              class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-2">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors"
              placeholder="cosmic@example.com"
            />
          </div>

          <div>
            <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-2">Password</label>
            <input 
              v-model="form.password" 
              type="password" 
              required
              minlength="6"
              class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-600 mb-2">Zodiac Sign (Optional)</label>
            <select 
              v-model="form.zodiacSign"
              class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors"
            >
              <option value="">Select your sign</option>
              <option v-for="sign in zodiacSigns" :key="sign" :value="sign">{{ sign }}</option>
            </select>
          </div>

          <div class="flex items-start">
            <input type="checkbox" required class="mt-1 rounded border-gray-300 bg-white text-black focus:ring-black" />
            <label class="ml-2 text-sm text-gray-600">
              I agree to the <a href="#" class="text-gray-900 hover:opacity-50">Terms of Service</a> and <a href="#" class="text-gray-900 hover:opacity-50">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-black text-white px-6 py-4 rounded-lg text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 text-sm">
            Already have an account? 
            <NuxtLink to="/auth/login" class="text-gray-900 hover:opacity-50 transition-opacity font-medium">Sign In</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: false
});

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  name: '',
  email: '',
  password: '',
  zodiacSign: ''
});

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const isLoading = ref(false);

const handleRegister = async () => {
  isLoading.value = true;
  
  const result = await authStore.register(
    form.value.email, 
    form.value.password, 
    form.value.name,
    form.value.zodiacSign || undefined
  );
  
  isLoading.value = false;
  
  if (result.success) {
    router.push('/account');
  }
};

useHead({
  title: 'Sign Up | Astro Nails'
});
</script>
