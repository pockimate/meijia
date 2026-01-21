<template>
  <div class="space-y-6">
    <!-- Controls -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
      <!-- Sort -->
      <div class="flex items-center gap-3 flex-wrap">
        <label class="text-sm text-gray-400">Sort by:</label>
        <select
          v-model="reviewsStore.sortBy"
          class="bg-astro-card border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-astro-purple transition-colors"
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
        <label class="text-sm text-gray-400">Filter:</label>
        <select
          v-model="reviewsStore.filterBy"
          class="bg-astro-card border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-astro-purple transition-colors"
        >
          <option value="all">All Reviews</option>
          <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
          <option value="4">⭐⭐⭐⭐ (4 stars)</option>
          <option value="3">⭐⭐⭐ (3 stars)</option>
          <option value="2">⭐⭐ (2 stars)</option>
          <option value="1">⭐ (1 star)</option>
          <option value="withPhotos">📷 With Photos</option>
          <option value="verified">✓ Verified Purchase</option>
        </select>
      </div>
    </div>

    <!-- Reviews Count -->
    <div class="text-gray-400 text-sm">
      Showing <span class="text-white font-medium">{{ processedReviews.length }}</span> of 
      <span class="text-white font-medium">{{ reviews.length }}</span> reviews
    </div>

    <!-- Reviews List -->
    <div v-if="processedReviews.length > 0" class="space-y-6">
      <div
        v-for="review in processedReviews"
        :key="review.id"
        class="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
      >
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-astro-purple to-astro-teal flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {{ review.user.charAt(0).toUpperCase() }}
            </div>

            <div>
              <!-- User & Verified -->
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-medium text-white">{{ review.user }}</h4>
                <span v-if="review.verified" class="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                  ✓ Verified
                </span>
              </div>

              <!-- Rating & Date -->
              <div class="flex items-center gap-3 text-sm">
                <div class="flex items-center">
                  <span v-for="i in 5" :key="i" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-600'">
                    ⭐
                  </span>
                </div>
                <span class="text-gray-500">{{ formatDate(review.date) }}</span>
                <span v-if="review.zodiac" class="text-gray-500">{{ review.zodiac }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Review Text -->
        <p class="text-gray-300 leading-relaxed mb-4">{{ review.text }}</p>

        <!-- Images -->
        <div v-if="review.images && review.images.length > 0" class="mb-4">
          <div class="flex gap-2 overflow-x-auto">
            <button
              v-for="(img, idx) in review.images"
              :key="idx"
              @click="openImageModal(review.images, idx)"
              class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-white/20 hover:border-astro-purple transition-colors"
            >
              <img :src="img" :alt="`Review image ${idx + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4 pt-4 border-t border-white/5">
          <button
            @click="handleLike(review.id)"
            :class="[
              'flex items-center gap-2 text-sm transition-colors',
              reviewsStore.isLiked(review.id)
                ? 'text-astro-pink'
                : 'text-gray-400 hover:text-astro-pink'
            ]"
          >
            <span class="text-lg">{{ reviewsStore.isLiked(review.id) ? '❤️' : '🤍' }}</span>
            <span>Helpful ({{ (review.helpful || 0) + (reviewsStore.isLiked(review.id) ? 1 : 0) }})</span>
          </button>

          <button class="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <span>💬</span>
            <span>Reply</span>
          </button>

          <button class="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors ml-auto">
            <span>🚩</span>
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
        <span class="text-4xl">💬</span>
      </div>
      <p class="text-gray-400">No reviews match your filters</p>
      <button
        @click="reviewsStore.reset()"
        class="mt-4 text-astro-teal hover:text-white transition-colors text-sm"
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
            <span class="text-2xl">✕</span>
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
