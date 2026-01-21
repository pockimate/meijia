<template>
  <div class="bg-astro-bg min-h-screen flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-3xl font-serif font-bold text-white">
          <span class="w-10 h-10 rounded-full bg-gradient-to-tr from-astro-purple to-astro-teal flex items-center justify-center">✨</span>
          ASTRO
        </NuxtLink>
        <p class="mt-2 text-gray-400">Welcome back to the cosmos</p>
      </div>

      <!-- Login Form -->
      <div class="bg-astro-card border border-white/10 rounded-2xl p-8">
        <h2 class="text-2xl font-serif font-bold text-white mb-6">Sign In</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
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
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-white/20 bg-astro-bg text-astro-purple focus:ring-astro-purple" />
              <span class="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
            <a href="#" class="text-sm text-astro-teal hover:text-white transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-astro-purple text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-violet-700 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-400 text-sm">
            Don't have an account? 
            <NuxtLink to="/auth/register" class="text-astro-teal hover:text-white transition-colors font-medium">Sign Up</NuxtLink>
          </p>
        </div>

        <!-- Social Login -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/10"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-astro-card text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button class="flex items-center justify-center gap-2 bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/5 transition-colors">
              <span>🌐</span>
              <span class="text-sm font-medium">Google</span>
            </button>
            <button class="flex items-center justify-center gap-2 bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/5 transition-colors">
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
