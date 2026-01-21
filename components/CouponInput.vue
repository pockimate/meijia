<template>
  <div class="space-y-4">
    <!-- Applied Coupon -->
    <div v-if="couponStore.appliedCoupon" class="bg-green-50 border border-green-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-bold text-green-700">{{ couponStore.appliedCoupon.code }}</span>
              <span class="text-xs text-green-600">Applied</span>
            </div>
            <p class="text-sm text-gray-600">{{ couponStore.appliedCoupon.description }}</p>
          </div>
        </div>
        <button
          @click="handleRemove"
          class="text-gray-400 hover:text-red-600 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Coupon Input -->
    <div v-else class="space-y-3">
      <div class="flex gap-2">
        <input
          v-model="couponCode"
          type="text"
          placeholder="Enter coupon code"
          class="flex-1 bg-astro-card border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-astro-purple transition-colors uppercase"
          @keyup.enter="handleApply"
        />
        <button
          @click="handleApply"
          :disabled="!couponCode.trim() || isApplying"
          class="px-6 py-3 bg-gradient-to-r from-astro-purple to-astro-teal text-white rounded-lg font-medium hover:shadow-lg hover:shadow-astro-purple/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isApplying ? 'Applying...' : 'Apply' }}
        </button>
      </div>

      <!-- Available Coupons -->
      <div v-if="availableCoupons.length > 0" class="space-y-2">
        <button
          @click="showAvailable = !showAvailable"
          class="text-sm text-astro-teal hover:text-white transition-colors flex items-center gap-1"
        >
          <span>{{ showAvailable ? '▼' : '▶' }}</span>
          <span>Available Coupons ({{ availableCoupons.length }})</span>
        </button>

        <Transition name="slide">
          <div v-if="showAvailable" class="space-y-2">
            <button
              v-for="coupon in availableCoupons"
              :key="coupon.code"
              @click="handleQuickApply(coupon.code)"
              class="w-full bg-white/5 border border-white/10 hover:border-astro-purple/50 rounded-lg p-3 text-left transition-all group"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-mono font-bold text-astro-teal text-sm">{{ coupon.code }}</span>
                    <span v-if="coupon.type === 'percentage'" class="text-xs bg-astro-purple/20 text-astro-purple px-2 py-0.5 rounded-full">
                      {{ coupon.value }}% OFF
                    </span>
                    <span v-else-if="coupon.type === 'fixed'" class="text-xs bg-astro-teal/20 text-astro-teal px-2 py-0.5 rounded-full">
                      ${{ coupon.value }} OFF
                    </span>
                    <span v-else class="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                      FREE SHIP
                    </span>
                  </div>
                  <p class="text-xs text-gray-400">{{ coupon.description }}</p>
                </div>
                <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
              </div>
            </button>
          </div>
        </Transition>
      </div>

      <!-- Best Coupon Suggestion -->
      <div v-if="bestCoupon && !couponStore.appliedCoupon" class="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <div>
              <p class="text-sm text-gray-900 font-medium">Best deal for you!</p>
              <p class="text-xs text-gray-600">Use <span class="font-mono text-black">{{ bestCoupon.code }}</span> to save more</p>
            </div>
          </div>
          <button
            @click="handleQuickApply(bestCoupon.code)"
            class="text-xs bg-black hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>

    <!-- Active Promotions -->
    <div v-if="activePromotions.length > 0" class="space-y-2">
      <h4 class="text-sm font-medium text-gray-400">Active Promotions</h4>
      <div class="space-y-2">
        <div
          v-for="promo in activePromotions"
          :key="promo.id"
          class="bg-gray-50 border border-gray-200 rounded-lg p-3"
        >
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg v-if="promo.type === 'flash-sale'" class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h5 class="font-medium text-gray-900">{{ promo.name }}</h5>
                <span v-if="promo.badge" class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  {{ promo.badge.split(' ').slice(1).join(' ') }}
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ promo.description }}</p>
              <p v-if="promo.expiresAt" class="text-xs text-gray-500 mt-1">
                Expires: {{ formatExpiry(promo.expiresAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCouponStore } from '~/stores/coupon';

const props = defineProps<{
  subtotal: number;
}>();

const couponStore = useCouponStore();
const couponCode = ref('');
const isApplying = ref(false);
const showAvailable = ref(false);

const availableCoupons = computed(() => {
  return couponStore.getAvailableCoupons(props.subtotal);
});

const bestCoupon = computed(() => {
  return couponStore.getBestCouponSuggestion(props.subtotal);
});

const activePromotions = computed(() => {
  return couponStore.getActivePromotions;
});

const handleApply = async () => {
  if (!couponCode.value.trim() || isApplying.value) return;
  
  isApplying.value = true;
  await couponStore.applyCoupon(couponCode.value.trim(), props.subtotal);
  isApplying.value = false;
  
  if (couponStore.appliedCoupon) {
    couponCode.value = '';
  }
};

const handleQuickApply = async (code: string) => {
  couponCode.value = code;
  await handleApply();
};

const handleRemove = async () => {
  await couponStore.removeCoupon();
};

const formatExpiry = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Less than 1 hour';
  if (diffHours < 24) return `${diffHours} hours`;
  const diffDays = Math.ceil(diffHours / 24);
  return `${diffDays} days`;
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
