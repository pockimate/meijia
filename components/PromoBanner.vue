<template>
  <div v-if="activePromo" class="relative overflow-hidden">
    <div class="bg-black py-3">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center gap-4 text-white">
          <svg v-if="activePromo.type === 'flash-sale'" class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <svg v-else class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
          </svg>
          <p class="text-sm sm:text-base font-light text-center">
            <span class="font-medium tracking-widest uppercase">{{ activePromo.name }}:</span>
            {{ activePromo.description }}
          </p>
          <span v-if="timeLeft" class="text-xs sm:text-sm bg-white/20 px-3 py-1 rounded-full whitespace-nowrap">
            {{ timeLeft }}
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
