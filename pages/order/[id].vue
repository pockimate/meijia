<template>
  <div class="min-h-screen bg-astro-bg py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <NuxtLink
        to="/account"
        class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <span>←</span>
        <span>Back to Orders</span>
      </NuxtLink>

      <!-- Order Not Found -->
      <div v-if="!order" class="text-center py-20">
        <div class="w-32 h-32 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
          <span class="text-6xl">📦</span>
        </div>
        <h2 class="text-2xl font-serif font-bold text-white mb-4">Order Not Found</h2>
        <p class="text-gray-400 mb-8">The order you're looking for doesn't exist</p>
        <NuxtLink
          to="/account"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-astro-purple to-astro-teal text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all"
        >
          View All Orders
        </NuxtLink>
      </div>

      <!-- Order Details -->
      <div v-else class="space-y-8">
        <!-- Header -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-2xl font-serif font-bold text-white mb-2">
                Order #{{ order.orderNumber }}
              </h1>
              <p class="text-sm text-gray-400">
                Placed on {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div>
              <span
                :class="[
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                  statusColors[order.status]
                ]"
              >
                <span>{{ statusIcons[order.status] }}</span>
                <span>{{ statusLabels[order.status] }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Order Timeline -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <h2 class="text-xl font-serif font-bold text-white mb-6">Order Tracking</h2>
          <OrderTimeline
            :current-status="order.status"
            :timeline-events="timelineEvents"
            :estimated-delivery="estimatedDelivery"
            :tracking-number="trackingNumber"
          />
        </div>

        <!-- Shipping Address -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <h2 class="text-xl font-serif font-bold text-white mb-4">Shipping Address</h2>
          <div class="text-gray-300 space-y-1">
            <p class="font-medium text-white">{{ order.shippingAddress.name }}</p>
            <p>{{ order.shippingAddress.address }}</p>
            <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.postalCode }}</p>
            <p>{{ order.shippingAddress.country }}</p>
            <p class="text-sm text-gray-400 mt-2">📞 {{ order.shippingAddress.phone }}</p>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <h2 class="text-xl font-serif font-bold text-white mb-4">Order Items</h2>
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex gap-4 pb-4 border-b border-white/5 last:border-0"
            >
              <div class="w-20 h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-white">{{ item.name }}</h3>
                <p class="text-sm text-gray-400">{{ item.category }}</p>
                <p v-if="item.selectedSize" class="text-xs text-gray-500 mt-1">
                  Size: {{ item.selectedSize }}
                </p>
              </div>
              <div class="text-right">
                <p class="font-medium text-white">${{ (item.price * item.quantity).toFixed(2) }}</p>
                <p class="text-sm text-gray-400">Qty: {{ item.quantity }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-astro-card border border-white/10 rounded-xl p-6">
          <h2 class="text-xl font-serif font-bold text-white mb-4">Order Summary</h2>
          <div class="space-y-3">
            <div class="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span class="font-mono">${{ order.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span class="font-mono">${{ order.shipping.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Tax</span>
              <span class="font-mono">${{ order.tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
              <span>Total</span>
              <span class="text-astro-purple font-mono">${{ order.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            v-if="order.status === 'delivered'"
            class="flex-1 bg-gradient-to-r from-astro-purple to-astro-teal text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all"
          >
            Leave a Review
          </button>
          <button
            class="flex-1 border border-white/20 text-white py-3 px-6 rounded-xl font-medium hover:bg-white/5 transition-all"
          >
            Contact Support
          </button>
          <button
            v-if="order.status === 'pending'"
            @click="handleCancelOrder"
            class="flex-1 border border-red-400/50 text-red-400 py-3 px-6 rounded-xl font-medium hover:bg-red-400/10 transition-all"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '~/stores/orders';
import { useToastStore } from '~/stores/toast';

const route = useRoute();
const ordersStore = useOrdersStore();
const toastStore = useToastStore();

const orderId = parseInt(route.params.id as string);
const order = computed(() => ordersStore.orders.find(o => o.id === orderId));

// 状态配置
const statusLabels = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const statusIcons = {
  pending: '⏳',
  processing: '⚙️',
  shipped: '🚚',
  delivered: '✅',
  cancelled: '❌',
};

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  shipped: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  delivered: 'bg-green-500/20 text-green-400 border border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

// 模拟物流信息
const trackingNumber = computed(() => {
  if (!order.value || order.value.status === 'pending') return undefined;
  return `AST${order.value.orderNumber}${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
});

const estimatedDelivery = computed(() => {
  if (!order.value || order.value.status === 'delivered' || order.value.status === 'cancelled') {
    return undefined;
  }
  const date = new Date(order.value.createdAt);
  date.setDate(date.getDate() + 5); // 5天后送达
  return date.toISOString();
});

// 时间线事件
const timelineEvents = computed(() => {
  if (!order.value) return [];

  const events = [];
  const orderDate = new Date(order.value.createdAt);

  // 订单创建
  events.push({
    title: 'Order Placed',
    description: 'Your order has been received and is being processed',
    timestamp: order.value.createdAt,
    icon: '📝',
    location: 'Online',
  });

  if (order.value.status !== 'pending') {
    // 处理中
    const processingDate = new Date(orderDate);
    processingDate.setHours(processingDate.getHours() + 2);
    events.push({
      title: 'Order Processing',
      description: 'Your order is being prepared for shipment',
      timestamp: processingDate.toISOString(),
      icon: '⚙️',
      location: 'Warehouse',
    });
  }

  if (order.value.status === 'shipped' || order.value.status === 'delivered') {
    // 已发货
    const shippedDate = new Date(orderDate);
    shippedDate.setDate(shippedDate.getDate() + 1);
    events.push({
      title: 'Order Shipped',
      description: 'Your package is on its way',
      timestamp: shippedDate.toISOString(),
      icon: '🚚',
      location: 'Distribution Center',
    });

    // 运输中
    const transitDate = new Date(orderDate);
    transitDate.setDate(transitDate.getDate() + 2);
    events.push({
      title: 'In Transit',
      description: 'Package is moving through the delivery network',
      timestamp: transitDate.toISOString(),
      icon: '📦',
      location: 'Regional Hub',
    });
  }

  if (order.value.status === 'delivered') {
    // 已送达
    const deliveredDate = new Date(orderDate);
    deliveredDate.setDate(deliveredDate.getDate() + 4);
    events.push({
      title: 'Delivered',
      description: 'Package has been delivered successfully',
      timestamp: deliveredDate.toISOString(),
      icon: '✅',
      location: order.value.shippingAddress.city,
    });
  }

  if (order.value.status === 'cancelled') {
    events.push({
      title: 'Order Cancelled',
      description: 'This order has been cancelled',
      timestamp: order.value.updatedAt,
      icon: '❌',
      location: 'System',
    });
  }

  return events.reverse(); // 最新的在前面
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const handleCancelOrder = () => {
  if (confirm('Are you sure you want to cancel this order?')) {
    // 这里应该调用 API 取消订单
    toastStore.success('Order cancelled successfully');
  }
};

useHead({
  title: order.value ? `Order #${order.value.orderNumber}` : 'Order Details',
});
</script>
