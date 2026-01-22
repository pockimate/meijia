<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6">
    <h3 class="text-sm font-medium tracking-[0.2em] uppercase text-gray-900 mb-6">Pairs Well With</h3>
    
    <div class="space-y-4">
      <div 
        v-for="item in pairingProducts" 
        :key="item.id"
        class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
      >
        <!-- Product Image -->
        <div class="w-20 h-20 flex-shrink-0 bg-white rounded-md overflow-hidden">
          <img 
            :src="item.image" 
            :alt="item.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Product Info -->
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-medium text-gray-900 mb-1 tracking-wide uppercase">
            {{ item.name }}
          </h4>
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-red-600">${{ item.salePrice.toFixed(2) }}</span>
            <span class="text-xs text-gray-400 line-through">${{ item.originalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Add to Cart Button -->
        <button
          @click="handleAddToCart(item)"
          class="flex-shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all group-hover:scale-110"
          :aria-label="`Add ${item.name} to cart`"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Add All Button -->
    <button
      @click="handleAddAllToCart"
      class="w-full mt-6 bg-black text-white py-3 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all"
    >
      Add All to Cart - ${{ totalPrice.toFixed(2) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useToastStore } from '~/stores/toast';
import { products } from '~/data/products';
import type { Product } from '~/types';

const props = defineProps<{
  currentProduct: Product
}>();

const cartStore = useCartStore();
const toastStore = useToastStore();

// Define pairing products based on category
const pairingProducts = computed(() => {
  // For press-on nails, suggest care products
  if (props.currentProduct.category === 'press-on') {
    return [
      {
        id: 4,
        name: 'Starlight Care Kit',
        image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=200&auto=format&fit=crop',
        salePrice: 29.90,
        originalPrice: 35.00,
        product: products.find(p => p.id === 4)
      },
      {
        id: 7,
        name: 'Crystal File',
        image: 'https://images.unsplash.com/photo-1595867359560-a292437651a0?q=80&w=200&auto=format&fit=crop',
        salePrice: 10.90,
        originalPrice: 12.00,
        product: products.find(p => p.id === 7)
      },
      {
        id: 6,
        name: 'Moonstone Polish',
        image: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=200&auto=format&fit=crop',
        salePrice: 14.40,
        originalPrice: 16.00,
        product: products.find(p => p.id === 6)
      }
    ];
  }
  
  // For polish, suggest press-ons
  if (props.currentProduct.category === 'polish') {
    return [
      {
        id: 1,
        name: 'Nebula Noir',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200&auto=format&fit=crop',
        salePrice: 21.60,
        originalPrice: 24.00,
        product: products.find(p => p.id === 1)
      },
      {
        id: 7,
        name: 'Crystal File',
        image: 'https://images.unsplash.com/photo-1595867359560-a292437651a0?q=80&w=200&auto=format&fit=crop',
        salePrice: 10.90,
        originalPrice: 12.00,
        product: products.find(p => p.id === 7)
      }
    ];
  }
  
  // For care products, suggest press-ons
  if (props.currentProduct.category === 'care') {
    return [
      {
        id: 1,
        name: 'Nebula Noir',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200&auto=format&fit=crop',
        salePrice: 21.60,
        originalPrice: 24.00,
        product: products.find(p => p.id === 1)
      },
      {
        id: 2,
        name: 'Cyber Glaze',
        image: 'https://images.unsplash.com/photo-1522337360705-8b13d52043a9?q=80&w=200&auto=format&fit=crop',
        salePrice: 20.25,
        originalPrice: 22.50,
        product: products.find(p => p.id === 2)
      }
    ];
  }
  
  return [];
});

// Calculate total price
const totalPrice = computed(() => {
  return pairingProducts.value.reduce((sum, item) => sum + item.salePrice, 0);
});

// Add single item to cart
const handleAddToCart = (item: any) => {
  if (item.product) {
    cartStore.addToCart(item.product);
    toastStore.success(`${item.name} added to cart!`);
  }
};

// Add all items to cart
const handleAddAllToCart = () => {
  let addedCount = 0;
  pairingProducts.value.forEach(item => {
    if (item.product) {
      cartStore.addToCart(item.product);
      addedCount++;
    }
  });
  
  if (addedCount > 0) {
    toastStore.success(`${addedCount} items added to cart!`);
  }
};
</script>
