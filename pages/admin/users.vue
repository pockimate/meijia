<template>
  <div class="min-h-screen bg-astro-bg">
    <!-- Admin Navbar -->
    <nav class="bg-astro-card border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/admin/dashboard" class="text-xl font-serif font-bold text-white flex items-center gap-2">
            <span>←</span>
            <span>Users Management</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-2xl font-serif font-bold text-white mb-2">Users</h2>
        <p class="text-gray-400 text-sm">Manage user accounts and permissions</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Total Users</p>
              <p class="text-2xl font-bold text-white">{{ mockUsers.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-gray-400 text-sm">Active Users</p>
              <p class="text-2xl font-bold text-white">{{ mockUsers.filter(u => u.status === 'active').length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </div>
            <div>
              <p class="text-gray-400 text-sm">New This Month</p>
              <p class="text-2xl font-bold text-white">{{ Math.floor(mockUsers.length * 0.3) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-astro-card border border-white/10 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-astro-bg border-b border-white/10">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">User</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Zodiac</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Orders</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Total Spent</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr
                v-for="user in mockUsers"
                :key="user.id"
                class="hover:bg-white/5 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="user.avatar"
                      :alt="user.name"
                      class="w-10 h-10 rounded-full"
                    />
                    <span class="text-white font-medium">{{ user.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-400 text-sm">{{ user.email }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-400 text-sm">{{ user.zodiacSign }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-white text-sm">{{ user.orders }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-white font-mono text-sm">${{ user.totalSpent.toFixed(2) }}</span>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'text-xs px-3 py-1 rounded',
                      user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    ]"
                  >
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-400 text-sm">{{ formatDate(user.createdAt) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin';

definePageMeta({
  layout: false,
  middleware: 'admin',
});

const adminStore = useAdminStore();
const router = useRouter();

// Mock users data
const mockUsers = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    zodiacSign: 'Pisces',
    orders: 5,
    totalSpent: 245.50,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    zodiacSign: 'Leo',
    orders: 3,
    totalSpent: 156.00,
    status: 'active',
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    name: 'Jessica Brown',
    email: 'jessica@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jessica',
    zodiacSign: 'Aries',
    orders: 8,
    totalSpent: 432.75,
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    zodiacSign: 'Gemini',
    orders: 2,
    totalSpent: 89.99,
    status: 'active',
    createdAt: '2024-01-25',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    zodiacSign: 'Virgo',
    orders: 12,
    totalSpent: 678.25,
    status: 'active',
    createdAt: '2024-01-05',
  },
]);

onMounted(() => {
  adminStore.initAdmin();
  
  if (!adminStore.isAuthenticated) {
    router.push('/admin/login');
  }
});

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

useHead({
  title: 'Users Management | Admin',
});
</script>
