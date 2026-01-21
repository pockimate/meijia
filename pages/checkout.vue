<template>
  <div class="bg-astro-bg min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Empty Cart State -->
      <div v-if="cartStore.cartItems.length === 0" class="max-w-md mx-auto text-center py-20">
        <div class="w-24 h-24 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
          <span class="text-5xl">🚀</span>
        </div>
        <h2 class="text-2xl font-serif font-bold text-white mb-4">Your orbit is empty</h2>
        <p class="text-gray-400 mb-8">Add some cosmic items to your cart before checking out.</p>
        <NuxtLink to="/shop" class="inline-flex items-center bg-astro-purple text-white px-8 py-3 rounded-lg font-medium hover:bg-violet-700 transition-all">
          Explore Shop →
        </NuxtLink>
      </div>

      <!-- Checkout Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <!-- Left: Form -->
        <div>
          <h1 class="text-3xl font-serif font-bold text-white mb-8">Checkout</h1>
          
          <form @submit.prevent="handleSubmit" class="space-y-8">
            
            <!-- Contact Information -->
            <div class="bg-astro-card border border-white/10 rounded-xl p-6">
              <h2 class="text-xl font-serif font-bold text-white mb-4">Contact Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    required
                    class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
                    placeholder="cosmic@example.com"
                  />
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="bg-astro-card border border-white/10 rounded-xl p-6">
              <h2 class="text-xl font-serif font-bold text-white mb-4">Shipping Address</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                    <input 
                      v-model="form.firstName" 
                      type="text" 
                      required
                      class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                    <input 
                      v-model="form.lastName" 
                      type="text" 
                      required
                      class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Address</label>
                  <input 
                    v-model="form.address" 
                    type="text" 
                    required
                    class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">City</label>
                    <input 
                      v-model="form.city" 
                      type="text" 
                      required
                      class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2">Postal Code</label>
                    <input 
                      v-model="form.postalCode" 
                      type="text" 
                      required
                      class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2">Country</label>
                  <input 
                    v-model="form.country" 
                    type="text" 
                    required
                    class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors"
                  />
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-astro-card border border-white/10 rounded-xl p-6">
              <PaymentMethodSelector />
              
              <!-- Card Payment Form -->
              <div v-if="paymentStore.selectedMethod === 'card'" class="mt-6">
                <CardPaymentForm />
              </div>
              
              <!-- PayPal Notice -->
              <div v-else-if="paymentStore.selectedMethod === 'paypal'" class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p class="text-blue-400 text-sm flex items-center gap-2">
                  <span>💰</span>
                  <span>You will be redirected to PayPal to complete your payment</span>
                </p>
              </div>
              
              <!-- Apple Pay Notice -->
              <div v-else-if="paymentStore.selectedMethod === 'apple-pay'" class="mt-6 p-4 bg-white/10 border border-white/20 rounded-lg">
                <p class="text-gray-300 text-sm flex items-center gap-2">
                  <span>📱</span>
                  <span>Click "Complete Order" to pay with Apple Pay</span>
                </p>
              </div>
              
              <!-- Google Pay Notice -->
              <div v-else-if="paymentStore.selectedMethod === 'google-pay'" class="mt-6 p-4 bg-white/10 border border-white/20 rounded-lg">
                <p class="text-gray-300 text-sm flex items-center gap-2">
                  <span>🤖</span>
                  <span>Click "Complete Order" to pay with Google Pay</span>
                </p>
              </div>
            </div>

            <!-- Payment Error -->
            <div v-if="paymentStore.paymentError" class="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p class="text-red-400 text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>{{ paymentStore.paymentError }}</span>
              </p>
            </div>

            <button 
              type="submit"
              :disabled="paymentStore.isProcessing || !canSubmit"
              class="w-full bg-astro-purple text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-violet-700 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="paymentStore.isProcessing">
                <span class="inline-block animate-spin mr-2">⏳</span>
                Processing Payment...
              </span>
              <span v-else>🚀 Complete Order</span>
            </button>
          </form>
        </div>

        <!-- Right: Order Summary -->
        <div>
          <div class="bg-astro-card border border-white/10 rounded-xl p-6 sticky top-24">
            <h2 class="text-xl font-serif font-bold text-white mb-6">Order Summary</h2>
            
            <div class="space-y-4 mb-6 max-h-96 overflow-y-auto">
              <div v-for="item in cartStore.cartItems" :key="item.id" class="flex gap-4 pb-4 border-b border-white/5">
                <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-white/10">
                  <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
                </div>
                <div class="flex-1">
                  <h3 class="text-white font-serif">{{ item.name }}</h3>
                  <p class="text-xs text-gray-500 capitalize mt-1">
                    {{ item.category }}
                    <span v-if="item.selectedSize" class="ml-2">• Size: {{ item.selectedSize }}</span>
                  </p>
                  <div class="flex justify-between items-center mt-2">
                    <span class="text-sm text-gray-400">Qty: {{ item.quantity }}</span>
                    <span class="text-astro-teal font-mono">${{ (item.price * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Coupon Input -->
            <div class="border-t border-white/10 pt-6 mb-6">
              <CouponInput :subtotal="cartStore.cartTotal" />
            </div>

            <div class="space-y-3 border-t border-white/10 pt-6">
              <div class="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span class="font-mono">${{ cartStore.cartTotal.toFixed(2) }}</span>
              </div>
              
              <!-- Discounts -->
              <div v-if="discounts.couponDiscount > 0" class="flex justify-between text-green-400">
                <span class="flex items-center gap-1">
                  <span>🎉</span>
                  <span>Coupon Discount</span>
                </span>
                <span class="font-mono">-${{ discounts.couponDiscount.toFixed(2) }}</span>
              </div>
              <div v-if="discounts.promotionDiscount > 0" class="flex justify-between text-astro-purple">
                <span class="flex items-center gap-1">
                  <span>⚡</span>
                  <span>Promotion Discount</span>
                </span>
                <span class="font-mono">-${{ discounts.promotionDiscount.toFixed(2) }}</span>
              </div>
              
              <div class="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span v-if="discounts.freeShipping" class="text-green-400 font-mono">FREE</span>
                <span v-else class="font-mono">${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-400">
                <span>Tax</span>
                <span class="font-mono">${{ tax.toFixed(2) }}</span>
              </div>
              
              <!-- Total Savings -->
              <div v-if="discounts.totalDiscount > 0" class="flex justify-between text-green-400 text-sm pt-2 border-t border-white/5">
                <span>Total Savings</span>
                <span class="font-mono font-bold">-${{ discounts.totalDiscount.toFixed(2) }}</span>
              </div>
              
              <div class="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                <span>Total</span>
                <span class="text-astro-purple font-mono">${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <div class="mt-6 p-4 bg-astro-teal/10 border border-astro-teal/30 rounded-lg">
              <p class="text-astro-teal text-xs flex items-center gap-2">
                <span>✨</span>
                <span>Free shipping on orders over $50!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { useOrdersStore } from '~/stores/orders';
import { useCouponStore } from '~/stores/coupon';
import { usePaymentStore } from '~/stores/payment';
import { useToastStore } from '~/stores/toast';
import type { Address } from '~/types';

const cartStore = useCartStore();
const couponStore = useCouponStore();
const authStore = useAuthStore();
const ordersStore = useOrdersStore();
const paymentStore = usePaymentStore();
const toastStore = useToastStore();
const router = useRouter();

const form = ref({
  email: authStore.user?.email || '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  country: ''
});

// 计算折扣
const discounts = computed(() => {
  return couponStore.calculateTotalDiscount(cartStore.cartItems, cartStore.cartTotal);
});

const shipping = computed(() => {
  if (discounts.value.freeShipping) return 0;
  return cartStore.cartTotal >= 50 ? 0 : 8.99;
});

const tax = computed(() => {
  const subtotalAfterDiscount = cartStore.cartTotal - discounts.value.totalDiscount;
  return subtotalAfterDiscount * 0.1; // 10% tax
});

const total = computed(() => {
  const subtotalAfterDiscount = cartStore.cartTotal - discounts.value.totalDiscount;
  return subtotalAfterDiscount + shipping.value + tax.value;
});

// 是否可以提交
const canSubmit = computed(() => {
  const hasShippingInfo = form.value.firstName && 
                          form.value.lastName && 
                          form.value.address && 
                          form.value.city && 
                          form.value.postalCode && 
                          form.value.country;
  
  return hasShippingInfo && paymentStore.canSubmitPayment;
});

onMounted(() => {
  authStore.initAuth();
  ordersStore.initOrders();
  paymentStore.initPayment();
  
  // 如果用户已登录，使用默认地址
  if (authStore.isLoggedIn && ordersStore.defaultAddress) {
    const addr = ordersStore.defaultAddress;
    form.value.firstName = addr.name.split(' ')[0] || '';
    form.value.lastName = addr.name.split(' ').slice(1).join(' ') || '';
    form.value.address = addr.address;
    form.value.city = addr.city;
    form.value.postalCode = addr.postalCode;
    form.value.country = addr.country;
  }
});

const handleSubmit = async () => {
  // 处理支付
  const paymentSuccess = await paymentStore.processPayment(total.value);
  
  if (!paymentSuccess) {
    toastStore.error(paymentStore.paymentError || 'Payment failed');
    return;
  }
  
  // Create shipping address
  const shippingAddress: Address = {
    id: 0,
    userId: authStore.user?.id || 0,
    name: `${form.value.firstName} ${form.value.lastName}`,
    phone: '',
    address: form.value.address,
    city: form.value.city,
    postalCode: form.value.postalCode,
    country: form.value.country,
    isDefault: false
  };

  // Create order
  if (authStore.isLoggedIn) {
    await ordersStore.createOrder({
      userId: authStore.user!.id,
      orderNumber: 'AST' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      items: cartStore.cartItems,
      subtotal: cartStore.cartTotal,
      shipping: shipping.value,
      tax: tax.value,
      total: total.value,
      status: 'processing',
      shippingAddress,
      paymentMethod: paymentStore.selectedMethod
    });
  }
  
  toastStore.success('Order placed successfully! 🚀');
  
  // Clear cart and redirect to success page
  cartStore.clearCart();
  paymentStore.resetPayment();
  router.push('/order-success');
};

useHead({
  title: 'Checkout | Astro Nails'
});
</script>
