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
            getStepIndex(currentStatus) >= index ? 'text-gray-900' : 'text-gray-400'
          ]"
        >
          {{ step.label }}
        </span>
      </div>
      
      <div class="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="absolute top-0 left-0 h-full bg-black transition-all duration-500"
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
              ? 'bg-black border-black'
              : 'bg-white border-gray-300'
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
                ? 'bg-black text-white border-2 border-black'
                : 'bg-gray-100 border border-gray-200 text-gray-600'
            ]"
          >
            <span class="text-sm">{{ event.icon }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 pb-6 border-l-2 border-gray-200 pl-4 -ml-5">
          <div class="flex items-start justify-between mb-1">
            <h4
              :class="[
                'font-medium',
                index === 0 ? 'text-gray-900' : 'text-gray-600'
              ]"
            >
              {{ event.title }}
            </h4>
            <span class="text-xs text-gray-500">{{ formatTime(event.timestamp) }}</span>
          </div>
          <p class="text-sm text-gray-600">{{ event.description }}</p>
          <p v-if="event.location" class="text-xs text-gray-500 mt-1">
            {{ event.location }}
          </p>
        </div>
      </div>
    </div>

    <!-- Estimated Delivery -->
    <div v-if="estimatedDelivery" class="bg-gray-100 border border-gray-200 rounded-lg p-4">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <div>
          <p class="text-sm font-medium text-gray-900">Estimated Delivery</p>
          <p class="text-xs text-gray-600">{{ formatDate(estimatedDelivery) }}</p>
        </div>
      </div>
    </div>

    <!-- Tracking Number -->
    <div v-if="trackingNumber" class="bg-gray-100 border border-gray-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-600 mb-1">Tracking Number</p>
          <p class="font-mono text-sm text-gray-900">{{ trackingNumber }}</p>
        </div>
        <button
          @click="copyTrackingNumber"
          class="text-gray-900 hover:opacity-50 transition-opacity text-sm"
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
    toastStore.success('Tracking number copied!');
  }
};
</script>
