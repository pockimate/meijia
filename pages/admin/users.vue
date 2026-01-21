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
            <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl">
              👥
            </div>
            <div>
              <p class="text-gray-400 text-sm">Total Users</p>
              <p class="text-2xl font-bold text-white">{{ mockUsers.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p class="text-gray-400 text-sm">Active Users</p>
              <p class="text-2xl font-bold text-white">{{ mockUsers.filter(u => u.status === 'active').length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl">
              🆕
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
