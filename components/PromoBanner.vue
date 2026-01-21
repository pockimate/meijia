<template>
  <div v-if="activePromo" class="relative overflow-hidden">
    <div class="bg-gradient-to-r from-astro-purple via-astro-pink to-astro-teal py-3">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center gap-4 text-white">
          <span class="text-xl animate-pulse">{{ activePromo.badge?.split(' ')[0] || '🎉' }}</span>
          <p class="text-sm sm:text-base font-medium text-center">
            <span class="font-bold">{{ activePromo.name }}:</span>
            {{ activePromo.description }}
          </p>
          <span v-if="timeLeft" class="text-xs sm:text-sm bg-white/20 px-3 py-1 rounded-full whitespace-nowrap">
            ⏰ {{ timeLeft }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Animated gradient border -->
    <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
  </div>
</template>

<script setup lang="ts">
import { useCouponStore } from '~/stores/coupon';

const couponStore = useCouponStore();
const timeLeft = ref('');
let intervalId: NodeJS.Timeout | null = null;

const activePromo = computed(() => {
  const promos = couponStore.getActivePromotions;
  return promos.find(p => p.expiresAt) || promos[0];
});

const updateTimeLeft = () => {
  if (!activePromo.value?.expiresAt) {
    timeLeft.value = '';
    return;
  }

  const now = new Date();
  const expiry = new Date(activePromo.value.expiresAt);
  const diff = expiry.getTime() - now.getTime();

  if (diff <= 0) {
    timeLeft.value = 'Expired';
    if (intervalId) clearInterval(intervalId);
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (hours > 0) {
    timeLeft.value = `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    timeLeft.value = `${minutes}m ${seconds}s`;
  } else {
    timeLeft.value = `${seconds}s`;
  }
};

onMounted(() => {
  updateTimeLeft();
  intervalId = setInterval(updateTimeLeft, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 3s infinite;
}
</style>
