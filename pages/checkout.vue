<template>
  <div class="bg-white min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Empty Cart State -->
      <div v-if="cartStore.cartItems.length === 0" class="max-w-md mx-auto text-center py-20">
        <div class="w-24 h-24 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-light tracking-[0.2em] uppercase text-gray-900 mb-4">Your bag is empty</h2>
        <p class="text-sm text-gray-500 mb-8 font-light tracking-[0.1em]">Add some items to your bag before checking out.</p>
        <NuxtLink to="/shop" class="btn-primary inline-flex items-center">
          Explore Shop →
        </NuxtLink>
      </div>

      <!-- Checkout Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <!-- Left: Form -->
        <div>
          <h1 class="text-3xl font-light tracking-[0.2em] uppercase text-gray-900 mb-8">Checkout</h1>
          
          <form @submit.prevent="handleSubmit" class="space-y-8">
            
            <!-- Contact Information -->
            <div class="card-base">
              <h2 class="text-lg font-light tracking-[0.15em] uppercase text-gray-900 mb-6">Contact Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Email</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    required
                    class="input-base"
                    placeholder="cosmic@example.com"
                  />
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="card-base">
              <h2 class="text-lg font-light tracking-[0.15em] uppercase text-gray-900 mb-6">Shipping Address</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">First Name</label>
                    <input 
                      v-model="form.firstName" 
                      type="text" 
                      required
                      class="input-base"
                    />
                  </div>
                  <div>
                    <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Last Name</label>
                    <input 
                      v-model="form.lastName" 
                      type="text" 
                      required
                      class="input-base"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Address</label>
                  <input 
                    v-model="form.address" 
                    type="text" 
                    required
                    class="input-base"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">City</label>
                    <input 
                      v-model="form.city" 
                      type="text" 
                      required
                      class="input-base"
                    />
                  </div>
                  <div>
                    <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Postal Code</label>
                    <input 
                      v-model="form.postalCode" 
                      type="text" 
                      required
                      class="input-base"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] tracking-[0.2em] uppercase font-light text-gray-500 mb-2">Country</label>
                  <input 
                    v-model="form.country" 
                    type="text" 
                    required
                    class="input-base"
                  />
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="card-base">
              <PaymentMethodSelector />
              
              <!-- Card Payment Form -->
              <div v-if="paymentStore.selectedMethod === 'card'" class="mt-6">
                <CardPaymentForm />
              </div>
              
              <!-- PayPal Notice -->
              <div v-else-if="paymentStore.selectedMethod === 'paypal'" class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-blue-600 text-xs font-light">
                  You will be redirected to PayPal to complete your payment
                </p>
              </div>
              
              <!-- Apple Pay Notice -->
              <div v-else-if="paymentStore.selectedMethod === 'apple-pay'" class="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                <p class="text-gray-700 text-xs font-light">
                  Click "Complete Order" to pay with Apple Pay
                </p>
              </div>
              
              <!-- Google Pay Notice -->
              <div v-else-if="paymentStore.selectedMethod === 'google-pay'" class="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                <p class="text-gray-700 text-xs font-light">
                  Click "Complete Order" to pay with Google Pay
                </p>
              </div>
            </div>

            <!-- Payment Error -->
            <div v-if="paymentStore.paymentError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-600 text-xs flex items-center gap-2 font-light">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <span>{{ paymentStore.paymentError }}</span>
              </p>
            </div>

            <button 
              type="submit"
              :disabled="paymentStore.isProcessing || !canSubmit"
              class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="paymentStore.isProcessing">
                Processing Payment...
              </span>
              <span v-else>Complete Order</span>
            </button>
          </form>
        </div>

        <!-- Right: Order Summary -->
        <div>
          <div class="card-base sticky top-24">
            <h2 class="text-lg font-light tracking-[0.15em] uppercase text-gray-900 mb-6">Order Summary</h2>
            
            <div class="space-y-4 mb-6 max-h-96 overflow-y-auto">
              <div v-for="item in cartStore.cartItems" :key="item.id" class="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                  <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
                </div>
                <div class="flex-1">
                  <h3 class="text-gray-900 font-light tracking-[0.1em] uppercase text-sm">{{ item.name }}</h3>
                  <p class="text-[10px] tracking-[0.15em] uppercase font-light text-gray-500 capitalize mt-1">
                    {{ item.category }}
                    <span v-if="item.selectedSize" class="ml-2">• Size: {{ item.selectedSize }}</span>
                  </p>
                  <div class="flex justify-between items-center mt-2">
                    <span class="text-xs text-gray-500 font-light">Qty: {{ item.quantity }}</span>
                    <span class="text-sm text-gray-900 font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Coupon Input -->
            <div class="border-t border-gray-200 pt-6 mb-6">
              <CouponInput :subtotal="cartStore.cartTotal" />
            </div>

            <div class="space-y-3 border-t border-gray-200 pt-6">
              <div class="flex justify-between text-xs text-gray-500 font-light tracking-[0.1em] uppercase">
                <span>Subtotal</span>
                <span class="font-medium text-gray-900">${{ cartStore.cartTotal.toFixed(2) }}</span>
              </div>
              
              <!-- Discounts -->
              <div v-if="discounts.couponDiscount > 0" class="flex justify-between text-xs text-green-600 font-light tracking-[0.1em] uppercase">
                <span>Coupon Discount</span>
                <span class="font-medium">-${{ discounts.couponDiscount.toFixed(2) }}</span>
              </div>
              <div v-if="discounts.promotionDiscount > 0" class="flex justify-between text-xs text-gray-900 font-light tracking-[0.1em] uppercase">
                <span>Promotion Discount</span>
                <span class="font-medium">-${{ discounts.promotionDiscount.toFixed(2) }}</span>
              </div>
              
              <div class="flex justify-between text-xs text-gray-500 font-light tracking-[0.1em] uppercase">
                <span>Shipping</span>
                <span v-if="discounts.freeShipping" class="text-green-600 font-medium">FREE</span>
                <span v-else class="font-medium text-gray-900">${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-xs text-gray-500 font-light tracking-[0.1em] uppercase">
                <span>Tax</span>
                <span class="font-medium text-gray-900">${{ tax.toFixed(2) }}</span>
              </div>
              
              <!-- Total Savings -->
              <div v-if="discounts.totalDiscount > 0" class="flex justify-between text-xs text-green-600 pt-2 border-t border-gray-100 font-light tracking-[0.1em] uppercase">
                <span>Total Savings</span>
                <span class="font-medium">-${{ discounts.totalDiscount.toFixed(2) }}</span>
              </div>
              
              <div class="flex justify-between text-lg font-medium text-gray-900 pt-3 border-t border-gray-200 tracking-[0.1em] uppercase">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <div class="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
              <p class="text-gray-700 text-xs font-light tracking-[0.1em]">
                Free shipping on orders over $50
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
  
  toastStore.success('Order placed successfully!');
  
  // Clear cart and redirect to success page
  cartStore.clearCart();
  paymentStore.resetPayment();
  router.push('/order-success');
};

useHead({
  title: 'Checkout | Astro Nails'
});
</script>
