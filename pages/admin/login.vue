<template>
  <div class="min-h-screen bg-astro-bg flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-astro-purple to-astro-teal mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-serif font-bold text-white mb-2">Admin Portal</h1>
        <p class="text-gray-400">Sign in to access the dashboard</p>
      </div>

      <!-- Login Form -->
      <div class="bg-astro-card border border-white/10 rounded-2xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="admin@astronails.com"
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input
              v-model="form.password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p class="text-red-400 text-sm flex items-center gap-2">
              <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <span>{{ errorMessage }}</span>
            </p>
          </div>

          <!-- Demo Credentials -->
          <div class="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p class="text-blue-400 text-xs mb-1 font-medium">Demo Credentials:</p>
            <p class="text-blue-300 text-xs">Email: admin@astronails.com</p>
            <p class="text-blue-300 text-xs">Password: admin123</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-astro-purple to-astro-teal text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Back to Store -->
        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-sm text-gray-400 hover:text-astro-teal transition-colors">
            ← Back to Store
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin';
import { useToastStore } from '~/stores/toast';

definePageMeta({
  layout: false,
});

const adminStore = useAdminStore();
const toastStore = useToastStore();
const router = useRouter();

const form = ref({
  email: '',
  password: '',
});

const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  const success = adminStore.adminLogin(form.value.email, form.value.password);

  if (success) {
    toastStore.success('Welcome back, Admin! 🚀');
    router.push('/admin/dashboard');
  } else {
    errorMessage.value = 'Invalid email or password';
  }

  isLoading.value = false;
};

useHead({
  title: 'Admin Login | Astro Nails',
});
</script>
