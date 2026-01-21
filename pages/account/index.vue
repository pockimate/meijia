<template>
  <div class="bg-white min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Redirect if not logged in -->
      <div v-if="!authStore.isLoggedIn" class="text-center py-20">
        <div class="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-light tracking-widest uppercase text-gray-900 mb-4">Please Sign In</h2>
        <p class="text-gray-600 mb-8">You need to be logged in to view your account.</p>
        <NuxtLink to="/auth/login" class="inline-flex items-center bg-black text-white px-8 py-4 rounded-lg text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all">
          Sign In →
        </NuxtLink>
      </div>

      <!-- Account Dashboard -->
      <div v-else>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 class="text-3xl font-light tracking-widest uppercase text-gray-900">My Account</h1>
            <p class="text-gray-600 mt-1">Manage your cosmic profile</p>
          </div>
          <button 
            @click="handleLogout"
            class="mt-4 md:mt-0 text-gray-600 hover:text-red-600 transition-colors text-sm"
          >
            Sign Out →
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
              
              <!-- User Avatar -->
              <div class="text-center mb-6">
                <img 
                  :src="authStore.user?.avatar" 
                  :alt="authStore.user?.name"
                  class="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-black"
                />
                <h2 class="text-xl font-light tracking-widest uppercase text-gray-900">{{ authStore.user?.name }}</h2>
                <p class="text-sm text-gray-600">{{ authStore.user?.email }}</p>
                <p v-if="authStore.user?.zodiacSign" class="text-xs text-gray-900 mt-2">{{ authStore.user.zodiacSign }}</p>
              </div>

              <!-- Navigation -->
              <nav class="space-y-2">
                <button 
                  @click="activeTab = 'profile'"
                  :class="[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-[10px] tracking-[0.2em] uppercase font-light',
                    activeTab === 'profile' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Profile
                </button>
                <button 
                  @click="activeTab = 'orders'"
                  :class="[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-[10px] tracking-[0.2em] uppercase font-light',
                    activeTab === 'orders' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                  Orders
                </button>
                <button 
                  @click="activeTab = 'addresses'"
                  :class="[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-[10px] tracking-[0.2em] uppercase font-light',
                    activeTab === 'addresses' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Addresses
                </button>
              </nav>
            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-2">
            
            <!-- Profile Tab -->
            <div v-if="activeTab === 'profile'" class="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-light tracking-widest uppercase text-gray-900 mb-6">Profile Information</h3>
              
              <form @submit.prevent="handleUpdateProfile" class="space-y-6">
                <div>
                  <label class="block text-xs tracking-[0.2em] uppercase font-light text-gray-600 mb-2">Name</label>
                  <input 
                    v-model="profileForm.name" 
                    type="text" 
                    class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-xs tracking-[0.2em] uppercase font-light text-gray-600 mb-2">Email</label>
                  <input 
                    v-model="profileForm.email" 
                    type="email" 
                    class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-xs tracking-[0.2em] uppercase font-light text-gray-600 mb-2">Zodiac Sign</label>
                  <select 
                    v-model="profileForm.zodiacSign"
                    class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="">Select your sign</option>
                    <option v-for="sign in zodiacSigns" :key="sign" :value="sign">{{ sign }}</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  class="bg-black text-white px-6 py-3 rounded-lg text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all"
                >
                  Save Changes
                </button>
              </form>
            </div>

            <!-- Orders Tab -->
            <div v-if="activeTab === 'orders'" class="space-y-6">
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-light tracking-widest uppercase text-gray-900 mb-6">Order History</h3>
                
                <div v-if="ordersStore.allOrders.length === 0" class="text-center py-12">
                  <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                    </svg>
                  </div>
                  <p class="text-gray-600 mb-4">No orders yet</p>
                  <NuxtLink to="/shop" class="text-gray-900 hover:opacity-50 transition-opacity">
                    Start Shopping →
                  </NuxtLink>
                </div>

                <div v-else class="space-y-4">
                  <div 
                    v-for="order in ordersStore.allOrders" 
                    :key="order.id"
                    class="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
                  >
                    <div class="flex justify-between items-start mb-3">
                      <div>
                        <p class="text-gray-900 font-medium">Order #{{ order.orderNumber }}</p>
                        <p class="text-xs text-gray-500 mt-1">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
                      </div>
                      <span :class="[
                        'text-xs px-3 py-1 rounded-full',
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      ]">
                        {{ order.status }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center">
                      <div>
                        <p class="text-sm text-gray-600">{{ order.items.length }} items</p>
                        <p class="text-gray-900 font-mono">${{ order.total.toFixed(2) }}</p>
                      </div>
                      <NuxtLink
                        :to="`/order/${order.id}`"
                        class="text-sm text-gray-900 hover:opacity-50 transition-opacity"
                      >
                        View Details →
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Addresses Tab -->
            <div v-if="activeTab === 'addresses'" class="space-y-6">
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 class="text-xl font-light tracking-widest uppercase text-gray-900 mb-6">Saved Addresses</h3>

                <div v-if="ordersStore.allAddresses.length === 0" class="text-center py-12">
                  <div class="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <p class="text-gray-600 mb-4">No saved addresses</p>
                </div>

                <div v-else class="space-y-4">
                  <div 
                    v-for="address in ordersStore.allAddresses" 
                    :key="address.id"
                    class="border border-gray-200 rounded-lg p-4"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-gray-900 font-medium">{{ address.name }}</p>
                        <p class="text-sm text-gray-600 mt-1">{{ address.address }}</p>
                        <p class="text-sm text-gray-600">{{ address.city }}, {{ address.postalCode }}</p>
                        <p class="text-sm text-gray-600">{{ address.country }}</p>
                        <span v-if="address.isDefault" class="inline-block mt-2 text-xs px-2 py-1 bg-gray-200 text-gray-900 rounded">Default</span>
                      </div>
                      <button 
                        @click="deleteAddress(address.id)"
                        class="text-gray-500 hover:text-red-600 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useOrdersStore } from '~/stores/orders';

const authStore = useAuthStore();
const ordersStore = useOrdersStore();
const router = useRouter();

const activeTab = ref('profile');

const profileForm = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  zodiacSign: authStore.user?.zodiacSign || ''
});

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

onMounted(() => {
  authStore.initAuth();
  ordersStore.initOrders();
});

const handleUpdateProfile = async () => {
  await authStore.updateProfile(profileForm.value);
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

const deleteAddress = async (id: number) => {
  if (confirm('Are you sure you want to delete this address?')) {
    await ordersStore.deleteAddress(id);
  }
};

useHead({
  title: 'My Account | Astro Nails'
});
</script>
