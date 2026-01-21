<template>
  <div class="space-y-6">
    <!-- Controls -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between card-base">
      <!-- Sort -->
      <div class="flex items-center gap-3 flex-wrap">
        <label class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-500">Sort by:</label>
        <select
          v-model="reviewsStore.sortBy"
          class="input-base py-2 text-xs"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      <!-- Filter -->
      <div class="flex items-center gap-3 flex-wrap">
        <label class="text-[10px] tracking-[0.2em] uppercase font-light text-gray-500">Filter:</label>
        <select
          v-model="reviewsStore.filterBy"
          class="input-base py-2 text-xs"
        >
          <option value="all">All Reviews</option>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
          <option value="withPhotos">With Photos</option>
          <option value="verified">Verified Purchase</option>
        </select>
      </div>
    </div>

    <!-- Reviews Count -->
    <div class="text-gray-500 text-xs tracking-[0.15em] uppercase font-light">
      Showing <span class="text-gray-900 font-medium">{{ processedReviews.length }}</span> of 
      <span class="text-gray-900 font-medium">{{ reviews.length }}</span> reviews
    </div>

    <!-- Reviews List -->
    <div v-if="processedReviews.length > 0" class="space-y-6">
      <div
        v-for="review in processedReviews"
        :key="review.id"
        class="card-base hover-lift"
      >
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <div class="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
              {{ review.user.charAt(0).toUpperCase() }}
            </div>

            <div>
              <!-- User & Verified -->
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-medium text-gray-900 text-sm">{{ review.user }}</h4>
                <span v-if="review.verified" class="text-[9px] bg-black text-white px-2 py-0.5 rounded-full tracking-[0.1em] uppercase">
                  Verified
                </span>
              </div>

              <!-- Rating & Date -->
              <div class="flex items-center gap-3 text-xs">
                <div class="flex items-center gap-1">
                  <svg class="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-gray-900 font-medium">{{ review.rating }}</span>
                </div>
                <span class="text-gray-500 font-light">{{ formatDate(review.date) }}</span>
                <span v-if="review.zodiac" class="text-gray-500 font-light">{{ review.zodiac }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Review Text -->
        <p class="text-sm text-gray-600 leading-relaxed mb-4 font-light">{{ review.text }}</p>

        <!-- Images -->
        <div v-if="review.images && review.images.length > 0" class="mb-4">
          <div class="flex gap-2 overflow-x-auto">
            <button
              v-for="(img, idx) in review.images"
              :key="idx"
              @click="openImageModal(review.images, idx)"
              class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200 hover:border-black transition-colors"
            >
              <img :src="img" :alt="`Review image ${idx + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-6 pt-4 border-t border-gray-200">
          <button
            @click="handleLike(review.id)"
            :class="[
              'flex items-center gap-2 text-xs transition-opacity tracking-[0.1em] uppercase font-light',
              reviewsStore.isLiked(review.id)
                ? 'text-gray-900'
                : 'text-gray-500 hover:opacity-50'
            ]"
          >
            <svg class="w-4 h-4" :fill="reviewsStore.isLiked(review.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span>Helpful ({{ (review.helpful || 0) + (reviewsStore.isLiked(review.id) ? 1 : 0) }})</span>
          </button>

          <button class="flex items-center gap-2 text-xs text-gray-500 hover:opacity-50 transition-opacity tracking-[0.1em] uppercase font-light">
            Reply
          </button>

          <button class="flex items-center gap-2 text-xs text-gray-500 hover:text-red-600 transition-colors ml-auto tracking-[0.1em] uppercase font-light">
            Report
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>
      <p class="text-gray-600">No reviews match your filters</p>
      <button
        @click="reviewsStore.reset()"
        class="mt-4 text-gray-900 hover:opacity-50 transition-opacity text-sm"
      >
        Reset Filters
      </button>
    </div>

    <!-- Image Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="imageModalOpen"
          class="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/90"
          @click="closeImageModal"
        >
          <button
            @click="closeImageModal"
            class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="relative max-w-4xl w-full" @click.stop>
            <img
              :src="currentModalImage"
              alt="Review image"
              class="w-full h-auto rounded-xl"
            />

            <!-- Navigation -->
            <button
              v-if="modalImages.length > 1"
              @click="prevImage"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              ←
            </button>
            <button
              v-if="modalImages.length > 1"
              @click="nextImage"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              →
            </button>

            <!-- Counter -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {{ currentImageIndex + 1 }} / {{ modalImages.length }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/types';
import { useReviewsStore } from '~/stores/reviews';
import { useToastStore } from '~/stores/toast';

const props = defineProps<{
  reviews: Review[];
}>();

const reviewsStore = useReviewsStore();
const toastStore = useToastStore();

// 图片模态框
const imageModalOpen = ref(false);
const modalImages = ref<string[]>([]);
const currentImageIndex = ref(0);

const currentModalImage = computed(() => modalImages.value[currentImageIndex.value]);

const openImageModal = (images: string[], index: number) => {
  modalImages.value = images;
  currentImageIndex.value = index;
  imageModalOpen.value = true;
  if (process.client) {
    document.body.style.overflow = 'hidden';
  }
};

const closeImageModal = () => {
  imageModalOpen.value = false;
  if (process.client) {
    document.body.style.overflow = '';
  }
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + modalImages.value.length) % modalImages.value.length;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % modalImages.value.length;
};

// 处理后的评论列表
const processedReviews = computed(() => {
  return reviewsStore.processReviews(props.reviews);
});

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// 点赞
const handleLike = async (reviewId: number) => {
  const result = await reviewsStore.toggleLike(reviewId);
  if (result.liked) {
    toastStore.success('Marked as helpful! 👍');
  } else {
    toastStore.info('Removed from helpful');
  }
};

onMounted(() => {
  reviewsStore.initReviews();
});

// ESC 键关闭图片模态框
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && imageModalOpen.value) {
      closeImageModal();
    }
  };
  window.addEventListener('keydown', handleEscape);
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
  });
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
