<template>
  <div class="min-h-screen bg-astro-bg">
    <!-- Admin Navbar -->
    <nav class="bg-astro-card border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/admin/dashboard" class="text-xl font-serif font-bold text-white flex items-center gap-2">
            <span>←</span>
            <span>Orders Management</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="bg-astro-card border border-white/10 rounded-xl p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Status</label>
            <select
              v-model="filters.status"
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-astro-purple"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Search</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Order number..."
              class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-astro-purple"
            />
          </div>

          <div class="flex items-end">
            <button
              @click="applyFilters"
              class="w-full bg-astro-purple text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>

          <div class="flex items-end">
            <button
              @click="resetFilters"
              class="w-full bg-astro-bg border border-white/10 text-gray-400 px-4 py-2 rounded-lg hover:border-white/20 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-astro-card border border-white/10 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-astro-bg border-b border-white/10">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Order #</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Items</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Total</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr
                v-for="order in filteredOrders"
                :key="order.id"
                class="hover:bg-white/5 transition-colors"
              >
                <td class="px-6 py-4">
                  <span class="text-white font-mono text-sm">{{ order.orderNumber }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-400 text-sm">{{ formatDate(order.createdAt) }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-white text-sm">{{ order.shippingAddress.name }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-gray-400 text-sm">{{ order.items.length }} items</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-white font-mono text-sm">${{ order.total.toFixed(2) }}</span>
                </td>
                <td class="px-6 py-4">
                  <select
                    :value="order.status"
                    @change="updateStatus(order.id, ($event.target as HTMLSelectElement).value)"
                    :class="[
                      'text-xs px-3 py-1 rounded border-0 focus:outline-none focus:ring-2 focus:ring-astro-purple',
                      getStatusColor(order.status)
                    ]"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td class="px-6 py-4">
                  <NuxtLink
                    :to="`/order/${order.id}`"
                    class="text-astro-teal hover:text-astro-purple transition-colors text-sm"
                  >
                    View Details →
                  </NuxtLink>
                </td>
              </tr>

              <tr v-if="filteredOrders.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex items-center justify-center gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-astro-card border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-astro-purple transition-colors"
        >
          Previous
        </button>
        <span class="text-gray-400 text-sm">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-astro-card border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-astro-purple transition-colors"
        >
          Next
        </button>
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

const orders = ref<any[]>([]);
const currentPage = ref(1);
const pageSize = 10;

const filters = ref({
  status: '',
  search: '',
});

onMounted(async () => {
  adminStore.initAdmin();
  
  if (!adminStore.isAuthenticated) {
    router.push('/admin/login');
    return;
  }

  loadOrders();
});

const loadOrders = () => {
  if (process.client) {
    const ordersData = localStorage.getItem('astro_orders');
    if (ordersData) {
      orders.value = JSON.parse(ordersData).sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }
};

const filteredOrders = computed(() => {
  let result = [...orders.value];

  // Apply status filter
  if (filters.value.status) {
    result = result.filter(o => o.status === filters.value.status);
  }

  // Apply search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase();
    result = result.filter(o => 
      o.orderNumber.toLowerCase().includes(search) ||
      o.shippingAddress.name.toLowerCase().includes(search)
    );
  }

  // Apply pagination
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return result.slice(start, end);
});

const totalPages = computed(() => {
  let result = [...orders.value];

  if (filters.value.status) {
    result = result.filter(o => o.status === filters.value.status);
  }

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase();
    result = result.filter(o => 
      o.orderNumber.toLowerCase().includes(search) ||
      o.shippingAddress.name.toLowerCase().includes(search)
    );
  }

  return Math.ceil(result.length / pageSize);
});

const applyFilters = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  filters.value = {
    status: '',
    search: '',
  };
  currentPage.value = 1;
};

const updateStatus = async (orderId: number, newStatus: string) => {
  const success = await adminStore.updateOrderStatus(orderId, newStatus);
  
  if (success) {
    toastStore.success('Order status updated successfully');
    loadOrders();
  } else {
    toastStore.error('Failed to update order status');
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric',
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
  title: 'Orders Management | Admin',
});
</script>
