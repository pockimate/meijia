<template>
  <div class="bg-white min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      
      <!-- Logo -->
      <div class="text-center mb-12">
        <NuxtLink to="/" class="inline-flex flex-col items-center gap-3">
          <span class="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-xs font-medium tracking-[0.2em]">AN</span>
          <span class="text-2xl font-light tracking-[0.25em] uppercase text-gray-900">ASTRO NAILS</span>
        </NuxtLink>
        <p class="mt-4 text-sm text-gray-500 font-light tracking-[0.1em]">Welcome back to the cosmos</p>
      </div>

      <!-- Login Form -->
      <div class="card-base">
        <h2 class="text-xl font-light tracking-[0.15em] uppercase text-gray-900 mb-8">Sign In</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
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
              class="input-base"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 bg-white text-black focus:ring-black" />
              <span class="ml-2 text-xs text-gray-600 font-light">Remember me</span>
            </label>
            <a href="#" class="text-xs text-gray-900 hover:opacity-50 transition-opacity font-light">Forgot password?</a>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 text-xs font-light">
            Don't have an account? 
            <NuxtLink to="/auth/register" class="text-gray-900 hover:opacity-50 transition-opacity font-medium">Sign Up</NuxtLink>
          </p>
        </div>

        <!-- Social Login -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-2 bg-gray-50 text-gray-500 font-light tracking-[0.1em] uppercase">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button class="btn-secondary flex items-center justify-center gap-2">
              <span class="text-xs font-light">Google</span>
            </button>
            <button class="btn-secondary flex items-center justify-center gap-2">
              <span class="text-xs font-light">GitHub</span>
            </button>
          </div>
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
  email: '',
  password: ''
});

const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  
  const result = await authStore.login(form.value.email, form.value.password);
  
  isLoading.value = false;
  
  if (result.success) {
    router.push('/account');
  }
};

useHead({
  title: 'Sign In | Astro Nails'
});
</script>
