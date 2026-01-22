<template>
  <div class="max-w-7xl mx-auto px-8 lg:px-12 py-16 border-t border-gray-100">
    <!-- Tab Headers -->
    <div class="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'pb-4 text-xs tracking-[0.2em] uppercase font-light transition-all relative whitespace-nowrap',
          activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ tab.label }}
        <span 
          v-if="activeTab === tab.id" 
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
        ></span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="min-h-[300px]">
      <!-- Description Tab -->
      <div v-if="activeTab === 'description'" class="space-y-6 animate-fade-in">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-sm font-medium tracking-[0.2em] uppercase mb-4">Product Details</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-light">
              {{ product.description }}
            </p>
            <ul v-if="product.benefits" class="mt-6 space-y-3">
              <li v-for="benefit in product.benefits" :key="benefit" class="flex items-start gap-3 text-sm text-gray-600 font-light">
                <svg class="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ benefit }}
              </li>
            </ul>
          </div>
          <div v-if="product.howToUse">
            <h3 class="text-sm font-medium tracking-[0.2em] uppercase mb-4">How to Use</h3>
            <ol class="space-y-3">
              <li v-for="(step, idx) in product.howToUse" :key="idx" class="flex gap-3 text-sm text-gray-600 font-light">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-900">{{ idx + 1 }}</span>
                <span class="pt-0.5">{{ step }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Ingredients Tab -->
      <div v-if="activeTab === 'ingredients'" class="animate-fade-in">
        <h3 class="text-sm font-medium tracking-[0.2em] uppercase mb-6">Ingredients</h3>
        <div v-if="product.ingredients && product.ingredients.length > 0" class="grid md:grid-cols-2 gap-4">
          <div v-for="ingredient in product.ingredients" :key="ingredient" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <svg class="w-4 h-4 text-gray-900 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm text-gray-600 font-light">{{ ingredient }}</span>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 font-light">No ingredients information available for this product.</p>
      </div>

      <!-- Reviews Tab -->
      <div v-if="activeTab === 'reviews'" class="animate-fade-in">
        <ReviewList :product-id="product.id" />
      </div>

      <!-- Shipping Tab -->
      <div v-if="activeTab === 'shipping'" class="animate-fade-in">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-sm font-medium tracking-[0.2em] uppercase mb-4">Shipping Information</h3>
            <div class="space-y-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Free Standard Shipping</p>
                  <p class="text-xs text-gray-600 font-light mt-1">On orders over $50. Delivery in 5-7 business days.</p>
                </div>
              </div>
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Express Shipping</p>
                  <p class="text-xs text-gray-600 font-light mt-1">$9.99 flat rate. Delivery in 2-3 business days.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium tracking-[0.2em] uppercase mb-4">Returns & Exchanges</h3>
            <div class="space-y-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">30-Day Returns</p>
                  <p class="text-xs text-gray-600 font-light mt-1">Free returns within 30 days of purchase.</p>
                </div>
              </div>
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Quality Guarantee</p>
                  <p class="text-xs text-gray-600 font-light mt-1">We stand behind our products 100%.</p>
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
import type { Product } from '~/types';

const props = defineProps<{
  product: Product
}>();

const activeTab = ref('description');

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'shipping', label: 'Shipping' }
];
</script>
