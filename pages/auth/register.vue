<template>
  <div class="bg-white min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      
      <!-- Logo -->
      <div class="text-center mb-12">
        <NuxtLink to="/" class="inline-flex flex-col items-center gap-3">
          <span class="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-xs font-medium tracking-[0.2em]">AN</span>
          <span class="text-2xl font-light tracking-[0.25em] uppercase text-gray-900">ASTRO NAILS</span>
        </NuxtLink>
        <p class="mt-4 text-sm text-gray-500 font-light tracking-[0.1em]">Join the cosmic community</p>
      </div>

      <!-- Register Form -->
      <div class="card-base">
        <h2 class="text-xl font-light tracking-[0.15em] uppercase text-gray-900 mb-8">Create Account</h2>
        
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              required
              class="input-base"
              placeholder="Your name"
            />
          </div>

          <div>
            <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              class="input-base"
              placeholder="cosmic@example.com"
            />
          </div>

          <div>
            <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Password</label>
            <input 
              v-model="form.password" 
              type="password" 
              required
              minlength="6"
              class="input-base"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Zodiac Sign (Optional)</label>
            <select 
              v-model="form.zodiacSign"
              class="input-base"
            >
              <option value="">Select your sign</option>
              <option v-for="sign in zodiacSigns" :key="sign" :value="sign">{{ sign }}</option>
            </select>
          </div>

          <div class="flex items-start">
            <input type="checkbox" required class="mt-1 rounded border-gray-300 bg-white text-black focus:ring-black" />
            <label class="ml-2 text-xs text-gray-600 font-light">
              I agree to the <a href="#" class="text-gray-900 hover:opacity-50">Terms of Service</a> and <a href="#" class="text-gray-900 hover:opacity-50">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 text-xs font-light">
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
