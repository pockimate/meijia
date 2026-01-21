<template>
  <div class="min-h-screen bg-astro-bg">
    <!-- Admin Navbar -->
    <nav class="bg-astro-card border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-4">
            <NuxtLink to="/" class="text-xl font-serif font-bold text-white flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-gradient-to-tr from-astro-purple to-astro-teal flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </span>
              ASTRO Admin
            </NuxtLink>
          </div>

          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-400">{{ adminStore.adminUser?.email }}</span>
            <button
              @click="handleLogout"
              class="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-serif font-bold text-white mb-2">Dashboard</h1>
        <p class="text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Revenue -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
              +{{ todayGrowth.revenue }}%
            </span>
          </div>
          <p class="text-gray-400 text-sm mb-1">Total Revenue</p>
          <p class="text-2xl font-bold text-white">${{ stats?.totalRevenue.toFixed(2) || 0 }}</p>
          <p class="text-xs text-gray-500 mt-2">
            ${{ stats?.revenueToday.toFixed(2) || 0 }} today
          </p>
        </div>

        <!-- Total Orders -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
              +{{ todayGrowth.orders }}%
            </span>
          </div>
          <p class="text-gray-400 text-sm mb-1">Total Orders</p>
          <p class="text-2xl font-bold text-white">{{ stats?.totalOrders || 0 }}</p>
          <p class="text-xs text-gray-500 mt-2">
            {{ stats?.ordersToday || 0 }} today
          </p>
        </div>

        <!-- Total Users -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
              +{{ todayGrowth.users }}%
            </span>
          </div>
          <p class="text-gray-400 text-sm mb-1">Total Users</p>
          <p class="text-2xl font-bold text-white">{{ stats?.totalUsers || 0 }}</p>
          <p class="text-xs text-gray-500 mt-2">
            {{ stats?.newUsersToday || 0 }} new today
          </p>
        </div>

        <!-- Average Order Value -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <p class="text-gray-400 text-sm mb-1">Avg Order Value</p>
          <p class="text-2xl font-bold text-white">${{ stats?.averageOrderValue.toFixed(2) || 0 }}</p>
          <p class="text-xs text-gray-500 mt-2">
            {{ stats?.totalProducts || 0 }} products
          </p>
        </div>
      </div>

      <!-- Charts & Recent Orders -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Sales Chart -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <h3 class="text-lg font-serif font-bold text-white mb-4">Sales Overview (Last 7 Days)</h3>
          <div class="space-y-3">
            <div v-for="day in salesData" :key="day.date" class="flex items-center gap-4">
              <span class="text-xs text-gray-500 w-20">{{ formatDate(day.date) }}</span>
              <div class="flex-1 bg-astro-bg rounded-full h-8 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-astro-purple to-astro-teal h-full flex items-center justify-end px-3 transition-all"
                  :style="{ width: `${(day.revenue / maxRevenue) * 100}%` }"
                >
                  <span class="text-xs text-white font-medium">${{ day.revenue.toFixed(0) }}</span>
                </div>
              </div>
              <span class="text-xs text-gray-400 w-16 text-right">{{ day.orders }} orders</span>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-serif font-bold text-white">Recent Orders</h3>
            <NuxtLink to="/admin/orders" class="text-sm text-astro-teal hover:text-astro-purple transition-colors">
              View All →
            </NuxtLink>
          </div>
          <div class="space-y-3">
            <div
              v-for="order in recentOrders"
              :key="order.id"
              class="flex items-center justify-between p-3 bg-astro-bg rounded-lg hover:bg-white/5 transition-colors"
            >
              <div class="flex-1">
                <p class="text-white font-medium text-sm">{{ order.orderNumber }}</p>
                <p class="text-xs text-gray-500">{{ formatDateTime(order.createdAt) }}</p>
              </div>
              <div class="text-right">
                <p class="text-white font-mono text-sm">${{ order.total.toFixed(2) }}</p>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded',
                    getStatusColor(order.status)
                  ]"
                >
                  {{ order.status }}
                </span>
              </div>
            </div>

            <div v-if="recentOrders.length === 0" class="text-center py-8 text-gray-500">
              No orders yet
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          to="/admin/orders"
          class="bg-astro-card border border-white/10 rounded-xl p-6 hover:border-astro-purple/50 transition-all group"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div>
              <p class="text-white font-medium">Manage Orders</p>
              <p class="text-xs text-gray-500">View and update orders</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/products"
          class="bg-astro-card border border-white/10 rounded-xl p-6 hover:border-astro-purple/50 transition-all group"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
            </div>
            <div>
              <p class="text-white font-medium">Manage Products</p>
              <p class="text-xs text-gray-500">Add, edit, or remove products</p>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/users"
          class="bg-astro-card border border-white/10 rounded-xl p-6 hover:border-astro-purple/50 transition-all group"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-white font-medium">Manage Users</p>
              <p class="text-xs text-gray-500">View user accounts</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin';
import { useToastStore } from '~/stores/toast';

definePageMeta({
  layout: false,
  middleware: 'admin',
});

const adminStore = useAdminStore();
const toastStore = useToastStore();
const router = useRouter();

const stats = computed(() => adminStore.stats);
const salesData = computed(() => adminStore.salesData);
const recentOrders = computed(() => adminStore.recentOrders);
const todayGrowth = computed(() => adminStore.todayGrowth);

const maxRevenue = computed(() => {
  if (salesData.value.length === 0) return 1;
  return Math.max(...salesData.value.map(d => d.revenue));
});

onMounted(async () => {
  adminStore.initAdmin();
  
  if (!adminStore.isAuthenticated) {
    router.push('/admin/login');
    return;
  }

  await adminStore.loadStats();
});

const handleLogout = () => {
  adminStore.adminLogout();
  toastStore.success('Logged out successfully');
  router.push('/admin/login');
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    processing: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-purple-500/20 text-purple-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };
  return colors[status] || 'bg-gray-500/20 text-gray-400';
};

useHead({
  title: 'Dashboard | Admin',
});
</script>
