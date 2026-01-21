<template>
  <div class="space-y-6">
    <!-- Progress Bar -->
    <div class="relative">
      <div class="flex justify-between mb-2">
        <span
          v-for="(step, index) in steps"
          :key="step.status"
          :class="[
            'text-xs font-medium',
            getStepIndex(currentStatus) >= index ? 'text-white' : 'text-gray-500'
          ]"
        >
          {{ step.label }}
        </span>
      </div>
      
      <div class="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          class="absolute top-0 left-0 h-full bg-gradient-to-r from-astro-purple to-astro-teal transition-all duration-500"
          :style="{ width: progressWidth }"
        ></div>
      </div>

      <!-- Step Indicators -->
      <div class="flex justify-between absolute -top-1 left-0 right-0">
        <div
          v-for="(step, index) in steps"
          :key="`indicator-${step.status}`"
          :class="[
            'w-4 h-4 rounded-full border-2 transition-all',
            getStepIndex(currentStatus) >= index
              ? 'bg-astro-purple border-astro-purple shadow-lg shadow-astro-purple/50'
              : 'bg-astro-bg border-white/20'
          ]"
        ></div>
      </div>
    </div>

    <!-- Timeline Events -->
    <div class="space-y-4 mt-8">
      <div
        v-for="(event, index) in timelineEvents"
        :key="index"
        class="flex gap-4"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <div
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center',
              index === 0
                ? 'bg-astro-purple/20 border-2 border-astro-purple'
                : 'bg-white/5 border border-white/10'
            ]"
          >
            <span class="text-lg">{{ event.icon }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 pb-6 border-l-2 border-white/10 pl-4 -ml-5">
          <div class="flex items-start justify-between mb-1">
            <h4
              :class="[
                'font-medium',
                index === 0 ? 'text-white' : 'text-gray-400'
              ]"
            >
              {{ event.title }}
            </h4>
            <span class="text-xs text-gray-500">{{ formatTime(event.timestamp) }}</span>
          </div>
          <p class="text-sm text-gray-400">{{ event.description }}</p>
          <p v-if="event.location" class="text-xs text-gray-500 mt-1">
            📍 {{ event.location }}
          </p>
        </div>
      </div>
    </div>

    <!-- Estimated Delivery -->
    <div v-if="estimatedDelivery" class="bg-astro-teal/10 border border-astro-teal/30 rounded-xl p-4">
      <div class="flex items-center gap-3">
        <span class="text-2xl">📦</span>
        <div>
          <p class="text-sm font-medium text-white">Estimated Delivery</p>
          <p class="text-xs text-gray-400">{{ formatDate(estimatedDelivery) }}</p>
        </div>
      </div>
    </div>

    <!-- Tracking Number -->
    <div v-if="trackingNumber" class="bg-white/5 border border-white/10 rounded-xl p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-400 mb-1">Tracking Number</p>
          <p class="font-mono text-sm text-white">{{ trackingNumber }}</p>
        </div>
        <button
          @click="copyTrackingNumber"
          class="text-astro-teal hover:text-white transition-colors text-sm"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast';

const props = defineProps<{
  currentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  timelineEvents: Array<{
    title: string;
    description: string;
    timestamp: string;
    icon: string;
    location?: string;
  }>;
  estimatedDelivery?: string;
  trackingNumber?: string;
}>();

const toastStore = useToastStore();

const steps = [
  { status: 'pending', label: 'Pending' },
  { status: 'processing', label: 'Processing' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'delivered', label: 'Delivered' },
];

const getStepIndex = (status: string) => {
  return steps.findIndex(s => s.status === status);
};

const progressWidth = computed(() => {
  const index = getStepIndex(props.currentStatus);
  if (index === -1) return '0%';
  return `${(index / (steps.length - 1)) * 100}%`;
});

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};

const copyTrackingNumber = () => {
  if (props.trackingNumber) {
    navigator.clipboard.writeText(props.trackingNumber);
    toastStore.success('Tracking number copied! 📋');
  }
};
</script>
