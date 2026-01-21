<template>
  <div class="bg-white min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-3xl font-light tracking-widest uppercase text-gray-900">
          <span class="w-10 h-10 rounded-full bg-black flex items-center justify-center">✨</span>
          ASTRO
        </NuxtLink>
        <p class="mt-2 text-gray-600">Welcome back to the cosmos</p>
      </div>

      <!-- Login Form -->
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 mb-6">Sign In</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
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
              class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 bg-white text-black focus:ring-black" />
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-sm text-gray-900 hover:opacity-50 transition-opacity">Forgot password?</a>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-black text-white px-6 py-4 rounded-lg text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 text-sm">
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
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button class="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 hover:bg-gray-100 transition-colors">
              <span>🌐</span>
              <span class="text-sm font-medium">Google</span>
            </button>
            <button class="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 hover:bg-gray-100 transition-colors">
              <span>👤</span>
              <span class="text-sm font-medium">GitHub</span>
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
