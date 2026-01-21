<template>
  <div class="min-h-screen bg-astro-bg flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-astro-purple to-astro-teal mb-4">
          <span class="text-3xl">🔐</span>
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
              <span>⚠️</span>
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
