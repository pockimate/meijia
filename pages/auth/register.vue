<template>
  <div class="bg-astro-bg min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-3xl font-serif font-bold text-white">
          <span class="w-10 h-10 rounded-full bg-gradient-to-tr from-astro-purple to-astro-teal flex items-center justify-center">✨</span>
          ASTRO
        </NuxtLink>
        <p class="mt-2 text-gray-400">Join the cosmic community</p>
      </div>

      <!-- Register Form -->
      <div class="bg-astro-card border border-white/10 rounded-2xl p-8">
        <h2 class="text-2xl font-serif font-bold text-white mb-6">Create Account</h2>
        
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              required
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
              placeholder="cosmic@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input 
              v-model="form.password" 
              type="password" 
              required
              minlength="6"
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Zodiac Sign (Optional)</label>
            <select 
              v-model="form.zodiacSign"
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
            >
              <option value="">Select your sign</option>
              <option v-for="sign in zodiacSigns" :key="sign" :value="sign">{{ sign }}</option>
            </select>
          </div>

          <div class="flex items-start">
            <input type="checkbox" required class="mt-1 rounded border-white/20 bg-astro-bg text-astro-purple focus:ring-astro-purple" />
            <label class="ml-2 text-sm text-gray-400">
              I agree to the <a href="#" class="text-astro-teal hover:text-white">Terms of Service</a> and <a href="#" class="text-astro-teal hover:text-white">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-astro-purple text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-violet-700 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-400 text-sm">
            Already have an account? 
            <NuxtLink to="/auth/login" class="text-astro-teal hover:text-white transition-colors font-medium">Sign In</NuxtLink>
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
