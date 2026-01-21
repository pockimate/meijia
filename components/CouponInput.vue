<template>
  <div class="space-y-4">
    <!-- Applied Coupon -->
    <div v-if="couponStore.appliedCoupon" class="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <span class="text-xl">🎉</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-bold text-green-400">{{ couponStore.appliedCoupon.code }}</span>
              <span class="text-xs text-green-400">Applied</span>
            </div>
            <p class="text-sm text-gray-400">{{ couponStore.appliedCoupon.description }}</p>
          </div>
        </div>
        <button
          @click="handleRemove"
          class="text-gray-400 hover:text-red-400 transition-colors"
        >
          <span class="text-xl">✕</span>
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
      <div v-if="bestCoupon && !couponStore.appliedCoupon" class="bg-astro-purple/10 border border-astro-purple/30 rounded-lg p-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">💡</span>
            <div>
              <p class="text-sm text-white font-medium">Best deal for you!</p>
              <p class="text-xs text-gray-400">Use <span class="font-mono text-astro-purple">{{ bestCoupon.code }}</span> to save more</p>
            </div>
          </div>
          <button
            @click="handleQuickApply(bestCoupon.code)"
            class="text-xs bg-astro-purple hover:bg-astro-purple/80 text-white px-3 py-1.5 rounded-lg transition-colors"
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
          class="bg-gradient-to-r from-astro-purple/10 to-astro-teal/10 border border-white/10 rounded-lg p-3"
        >
          <div class="flex items-start gap-3">
            <span class="text-2xl">{{ promo.badge?.split(' ')[0] || '🎁' }}</span>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h5 class="font-medium text-white">{{ promo.name }}</h5>
                <span v-if="promo.badge" class="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                  {{ promo.badge.split(' ').slice(1).join(' ') }}
                </span>
              </div>
              <p class="text-sm text-gray-400">{{ promo.description }}</p>
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
