<template>
  <div class="bg-white">
    <!-- Marquee Banner -->
    <div class="bg-black text-white py-2 overflow-hidden">
      <div class="flex animate-marquee whitespace-nowrap">
        <div class="flex items-center gap-12 px-6">
          <span class="text-xs tracking-[0.2em] uppercase font-light">Free Shipping Over $50</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Buy 3 Get 15% Off</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Reusable & Eco-Friendly</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">3-Second Application</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Free Shipping Over $50</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Buy 3 Get 15% Off</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Reusable & Eco-Friendly</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">3-Second Application</span>
        </div>
        <div class="flex items-center gap-12 px-6">
          <span class="text-xs tracking-[0.2em] uppercase font-light">Free Shipping Over $50</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Buy 3 Get 15% Off</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Reusable & Eco-Friendly</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">3-Second Application</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Free Shipping Over $50</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Buy 3 Get 15% Off</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">Reusable & Eco-Friendly</span>
          <span class="text-xs tracking-[0.2em] uppercase font-light">3-Second Application</span>
        </div>
      </div>
    </div>

    <!-- Hero Section with Parallax -->
    <section 
      class="relative h-[85vh] flex items-center justify-center overflow-hidden"
      @mousemove="handleMouseMove"
    >
      <!-- Background Image with Parallax -->
      <div 
        class="absolute inset-0 transition-transform duration-300 ease-out"
        :style="{ transform: `scale(1.1) translate(${parallaxX}px, ${parallaxY}px)` }"
      >
        <img 
          src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero Background"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>
      
      <!-- Hero Content with Fade-in Animation -->
      <div 
        class="relative z-10 text-center px-4 max-w-4xl mx-auto"
        :class="{ 'opacity-0': !heroVisible, 'animate-fade-in': heroVisible }"
      >
        <p class="text-[10px] tracking-[0.3em] uppercase text-white/80 mb-6 font-light animate-slide-up">
          Astro Nails Collection
        </p>
        <h1 class="text-5xl md:text-7xl font-extralight tracking-[0.05em] mb-6 text-white leading-tight animate-slide-up" style="animation-delay: 0.1s">
          DESIGNED IN THE STARS,<br>
          WORN ON EARTH.
        </h1>
        <p class="text-sm text-white/90 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-slide-up" style="animation-delay: 0.2s">
          Astro Nails isn't just a beauty brand. It's a cosmic transmission. We bridge the gap between digital aesthetics and physical self-expression.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.3s">
          <NuxtLink 
            to="/shop" 
            class="inline-block bg-white text-black px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Explore Collection
          </NuxtLink>
          <button
            @click="scrollToProducts"
            class="inline-block bg-transparent border border-white text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all transform hover:scale-105"
          >
            View Best Sellers
          </button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <button 
        @click="scrollToProducts"
        class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:opacity-70 transition-opacity"
      >
        <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </button>
    </section>

    <!-- Featured Image Section with Hover Effects -->
    <section class="py-24 px-8 lg:px-12 max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Image with Reveal Effect -->
        <div 
          class="relative aspect-[4/5] bg-gray-100 overflow-hidden group cursor-pointer"
          @mouseenter="imageHovered = true"
          @mouseleave="imageHovered = false"
        >
          <img 
            src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=1200&auto=format&fit=crop" 
            alt="Astro Nails Product"
            class="w-full h-full object-cover transition-all duration-700"
            :class="imageHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale'"
          />
          <div 
            class="absolute inset-0 bg-black transition-opacity duration-700"
            :class="imageHovered ? 'opacity-0' : 'opacity-10'"
          ></div>
          <!-- Hover Overlay -->
          <div 
            class="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            :class="imageHovered ? 'opacity-100' : 'opacity-0'"
          >
            <NuxtLink 
              to="/about"
              class="bg-white text-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>

        <!-- Content with Scroll Animation -->
        <div 
          class="space-y-8"
          :class="{ 'opacity-0': !contentVisible, 'animate-slide-up': contentVisible }"
        >
          <div>
            <p class="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-light">
              Origin Story
            </p>
            <h2 class="text-3xl font-light tracking-[0.05em] mb-6 text-gray-900">
              THE FUTURE OF FINGERTIPS
            </h2>
            <p class="text-sm text-gray-600 leading-relaxed font-light mb-6">
              Born in 2024 from a collision of astrology, AI technology, and high-fashion nail art, Astro Nails was created for the digital nomad. We realized that in a world where we live through screens, our hands are always visible.
            </p>
            <p class="text-sm text-gray-600 leading-relaxed font-light">
              Every design is algorithmically generated based on your zodiac sign, birth chart, and personal aesthetic preferences. No two sets are exactly alike.
            </p>
          </div>

          <div class="space-y-4 pt-4">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              class="flex items-start gap-4 group cursor-pointer"
              @mouseenter="hoveredFeature = index"
              @mouseleave="hoveredFeature = null"
            >
              <div 
                class="flex-shrink-0 transition-all duration-300"
                :class="hoveredFeature === index ? 'w-2 h-12 bg-black' : 'w-1 h-12 bg-black'"
              ></div>
              <div>
                <h4 class="text-xs font-medium tracking-[0.2em] uppercase mb-1 transition-colors" :class="hoveredFeature === index ? 'text-black' : 'text-gray-900'">
                  {{ feature.title }}
                </h4>
                <p class="text-xs text-gray-500 font-light">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <NuxtLink 
            to="/about" 
            class="inline-block text-xs tracking-[0.2em] uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity"
          >
            Learn More 鈫?
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Best Sellers with Quick View -->
    <section ref="productsSection" class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-8 lg:px-12">
        <div class="text-center mb-16">
          <p class="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-light">
            Shop Collection
          </p>
          <h2 class="text-3xl font-light tracking-[0.05em] text-gray-900">
            BEST SELLERS
          </h2>
        </div>
        
        <!-- Filter Tabs -->
        <div class="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="px-6 py-2 text-xs tracking-[0.2em] uppercase font-light transition-all"
            :class="selectedCategory === category 
              ? 'bg-black text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'"
          >
            {{ category }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            class="transform transition-all duration-300 hover:-translate-y-2"
          />
        </div>

        <div class="text-center mt-16">
          <NuxtLink 
            to="/shop" 
            class="inline-block bg-black text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all transform hover:scale-105"
          >
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Style Showcase -->
    <StyleShowcase />

    <!-- Premium Promo Section -->
    <PremiumPromoSection />

    <!-- Technology Section -->
    <section class="py-24 px-8 lg:px-12 max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Content -->
        <div class="space-y-8 order-2 md:order-1">
          <div>
            <p class="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-light">
              Innovation
            </p>
            <h2 class="text-3xl font-light tracking-[0.05em] mb-6 text-gray-900">
              AI-POWERED STYLING
            </h2>
            <p class="text-sm text-gray-600 leading-relaxed font-light mb-6">
              Our Astra AI analyzes your zodiac sign, personal style, and current trends to recommend the perfect nail designs for you. It's like having a personal stylist in your pocket.
            </p>
            <p class="text-sm text-gray-600 leading-relaxed font-light">
              Upload a photo of your outfit, and Astra will suggest complementary nail designs. The future of beauty is personalized, intelligent, and effortless.
            </p>
          </div>

          <NuxtLink 
            to="/stylist" 
            class="inline-block bg-black text-white px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all"
          >
            Try AI Stylist
          </NuxtLink>
        </div>

        <!-- Image -->
        <div class="relative aspect-square bg-gray-100 overflow-hidden order-1 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop" 
            alt="AI Technology"
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>

    <!-- Categories Grid with Hover Effects -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-8 lg:px-12">
        <div class="text-center mb-16">
          <p class="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-light">
            Collections
          </p>
          <h2 class="text-3xl font-light tracking-[0.05em] text-gray-900">
            EXPLORE BY ZODIAC
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink 
            v-for="zodiac in zodiacSigns" 
            :key="zodiac.name"
            :to="`/shop?zodiac=${zodiac.name}`"
            class="group relative aspect-square overflow-hidden bg-gray-100"
            @mouseenter="hoveredZodiac = zodiac.name"
            @mouseleave="hoveredZodiac = null"
          >
            <img 
              :src="zodiac.image" 
              :alt="zodiac.name"
              class="w-full h-full object-cover transition-all duration-700"
              :class="hoveredZodiac === zodiac.name ? 'scale-110 grayscale-0' : 'scale-100 grayscale'"
            />
            <div 
              class="absolute inset-0 transition-all duration-500"
              :class="hoveredZodiac === zodiac.name ? 'bg-black/20' : 'bg-black/0'"
            ></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p class="text-white text-xs tracking-[0.2em] uppercase font-light">{{ zodiac.name }}</p>
              <p 
                class="text-white/70 text-[10px] mt-1 transition-all duration-300"
                :class="hoveredZodiac === zodiac.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
              >
                {{ zodiac.date }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials with Auto-play Controls -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-4xl mx-auto px-8 lg:px-12">
        <div class="text-center mb-16">
          <p class="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 font-light">
            Testimonials
          </p>
          <h2 class="text-3xl font-light tracking-[0.05em] text-gray-900">
            WHAT THEY SAY
          </h2>
        </div>

        <div class="relative">
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-out"
              :style="{ transform: `translateX(-${currentReview * 100}%)` }"
            >
              <div 
                v-for="(review, index) in customerReviews"
                :key="index"
                class="w-full flex-shrink-0 px-4"
              >
                <div class="text-center space-y-6">
                  <div class="flex justify-center gap-1">
                    <svg v-for="star in 5" :key="star" class="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <p class="text-base text-gray-700 leading-relaxed font-light italic">"{{ review.text }}"</p>
                  <div>
                    <p class="text-xs font-medium tracking-[0.2em] uppercase text-gray-900">{{ review.author }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ review.location }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button
            @click="previousReview"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
            aria-label="Previous review"
          >
            <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            @click="nextReview"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
            aria-label="Next review"
          >
            <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Navigation Dots with Play/Pause -->
          <div class="flex justify-center items-center gap-4 mt-12">
            <button
              @click="toggleAutoplay"
              class="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
              :aria-label="isPlaying ? 'Pause' : 'Play'"
            >
              <svg v-if="isPlaying" class="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <svg v-else class="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div class="flex gap-2">
              <button
                v-for="(review, index) in customerReviews"
                :key="index"
                @click="goToReview(index)"
                class="transition-all duration-300"
                :class="currentReview === index ? 'w-8 h-2 bg-black' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-24 bg-black text-white">
      <div class="max-w-2xl mx-auto px-8 lg:px-12 text-center">
        <p class="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-4 font-light">
          Stay Connected
        </p>
        <h2 class="text-3xl font-light tracking-[0.05em] mb-6">
          JOIN THE COSMIC CLUB
        </h2>
        <p class="text-sm text-gray-400 mb-12 font-light">
          Get exclusive access to new drops, styling tips, and cosmic insights.
        </p>
        
        <form @submit.prevent="handleNewsletterSubmit" class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input 
            v-model="newsletterEmail"
            type="email" 
            placeholder="Enter your email"
            required
            class="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-sm"
          />
          <button 
            type="submit"
            class="px-8 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-gray-200 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 bg-white border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-8 lg:px-12">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div class="text-center space-y-3">
            <svg class="w-8 h-8 mx-auto text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
            </svg>
            <h3 class="text-xs font-medium tracking-[0.2em] uppercase">Free Shipping</h3>
            <p class="text-xs text-gray-500 font-light">On orders over $50</p>
          </div>
          <div class="text-center space-y-3">
            <svg class="w-8 h-8 mx-auto text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <h3 class="text-xs font-medium tracking-[0.2em] uppercase">Reusable</h3>
            <p class="text-xs text-gray-500 font-light">Lasts up to 180 days</p>
          </div>
          <div class="text-center space-y-3">
            <svg class="w-8 h-8 mx-auto text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            <h3 class="text-xs font-medium tracking-[0.2em] uppercase">Vegan & Cruelty Free</h3>
            <p class="text-xs text-gray-500 font-light">Earth-friendly materials</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { products } from '~/data/products';
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();

// Hero parallax effect
const parallaxX = ref(0);
const parallaxY = ref(0);
const heroVisible = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY, currentTarget } = e;
  const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
  const x = (clientX / width - 0.5) * 20;
  const y = (clientY / height - 0.5) * 20;
  parallaxX.value = x;
  parallaxY.value = y;
};

// Scroll animations
const contentVisible = ref(false);
const productsSection = ref<HTMLElement | null>(null);

const scrollToProducts = () => {
  productsSection.value?.scrollIntoView({ behavior: 'smooth' });
};

// Product filtering
const selectedCategory = ref('All');
const categories = ['All', 'New Arrivals', 'Best Sellers', 'Limited Edition'];

const featuredProducts = computed(() => products.slice(0, 8));

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') {
    return featuredProducts.value;
  }
  // Simple filter logic - can be enhanced
  return featuredProducts.value.filter((_, index) => {
    if (selectedCategory.value === 'New Arrivals') return index < 4;
    if (selectedCategory.value === 'Best Sellers') return index >= 2 && index < 6;
    if (selectedCategory.value === 'Limited Edition') return index >= 4;
    return true;
  });
});

// Feature hover
const hoveredFeature = ref<number | null>(null);
const features = [
  { title: '3-Second Application', description: 'Patented magnetic technology' },
  { title: 'Reusable Design', description: 'Lasts 90-180 days with care' },
  { title: 'Zero Glue', description: 'No chemical contact with skin' }
];

// Image hover
const imageHovered = ref(false);

// Reviews
const currentReview = ref(0);
const isPlaying = ref(true);
const newsletterEmail = ref('');

// Zodiac hover
const hoveredZodiac = ref<string | null>(null);

// Zodiac signs with dates
const zodiacSigns = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', image: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=400' },
  { name: 'Taurus', date: 'Apr 20 - May 20', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400' },
  { name: 'Gemini', date: 'May 21 - Jun 20', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=400' },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=400' },
  { name: 'Leo', date: 'Jul 23 - Aug 22', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400' },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=400' },
  { name: 'Libra', date: 'Sep 23 - Oct 22', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400' },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=400' },
];

// Customer reviews
const customerReviews = [
  {
    text: 'These nails are absolutely stunning! The quality is incredible and they last so much longer than any other press-ons I have tried.',
    author: 'Sarah M.',
    location: 'New York, NY'
  },
  {
    text: 'I love that they are reusable and eco-friendly. The AI stylist helped me find the perfect design for my zodiac sign!',
    author: 'Emma L.',
    location: 'Los Angeles, CA'
  },
  {
    text: 'Game changer! No more salon appointments. These look professional and are so easy to apply.',
    author: 'Jessica K.',
    location: 'London, UK'
  }
];

// Review navigation
const nextReview = () => {
  currentReview.value = (currentReview.value + 1) % customerReviews.length;
  resetAutoplay();
};

const previousReview = () => {
  currentReview.value = currentReview.value === 0 ? customerReviews.length - 1 : currentReview.value - 1;
  resetAutoplay();
};

const goToReview = (index: number) => {
  currentReview.value = index;
  resetAutoplay();
};

const toggleAutoplay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
};

// Newsletter submit
const handleNewsletterSubmit = () => {
  if (newsletterEmail.value) {
    toastStore.success('Thank you for subscribing!');
    newsletterEmail.value = '';
  }
};

// Auto-rotate reviews
let reviewInterval: NodeJS.Timeout | null = null;

const startAutoplay = () => {
  if (reviewInterval) clearInterval(reviewInterval);
  reviewInterval = setInterval(() => {
    if (isPlaying.value) {
      currentReview.value = (currentReview.value + 1) % customerReviews.length;
    }
  }, 5000);
};

const stopAutoplay = () => {
  if (reviewInterval) {
    clearInterval(reviewInterval);
    reviewInterval = null;
  }
};

const resetAutoplay = () => {
  if (isPlaying.value) {
    stopAutoplay();
    startAutoplay();
  }
};

// Intersection Observer for scroll animations
const setupScrollAnimations = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('hero-content')) {
            heroVisible.value = true;
          } else if (entry.target.classList.contains('content-section')) {
            contentVisible.value = true;
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe elements after mount
  setTimeout(() => {
    heroVisible.value = true;
    contentVisible.value = true;
  }, 100);
};

onMounted(() => {
  setupScrollAnimations();
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});

// SEO
useHead({
  title: 'Astro Nails | Cosmic Nail Art',
  meta: [
    { name: 'description', content: 'Designed in the stars, worn on earth. Shop cosmic-themed press-on nails with AI-powered styling.' },
    { name: 'keywords', content: 'nail art, press-on nails, cosmic nails, astrology nails, zodiac nails, AI stylist' },
  ],
});
</script>
 
