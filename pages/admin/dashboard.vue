<template>
  <div class="min-h-screen bg-astro-bg">
    <!-- Admin Navbar -->
    <nav class="bg-astro-card border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-4">
            <NuxtLink to="/" class="text-xl font-serif font-bold text-white flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-gradient-to-tr from-astro-purple to-astro-teal flex items-center justify-center">✨</span>
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
            <span class="text-3xl">💰</span>
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
            <span class="text-3xl">📦</span>
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
            <span class="text-3xl">👥</span>
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
            <span class="text-3xl">📊</span>
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
            <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📦
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
            <div class="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              💅
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
            <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              👥
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
