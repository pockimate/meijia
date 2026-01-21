<template>
  <div class="fixed top-24 right-4 z-[200] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto max-w-sm w-full rounded-lg shadow-soft-lg border p-4 flex items-start gap-3 bg-white',
          toastClasses[toast.type]
        ]"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <svg :class="['w-5 h-5', toastIconColors[toast.type]]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="toast.type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            <path v-else-if="toast.type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            <path v-else-if="toast.type === 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>

        <!-- Message -->
        <div class="flex-1">
          <p :class="['text-sm font-light tracking-[0.05em]', toastTextColors[toast.type]]">{{ toast.message }}</p>
        </div>

        <!-- Close Button -->
        <button
          @click="toastStore.remove(toast.id)"
          class="flex-shrink-0 text-gray-400 hover:text-gray-900 transition-opacity hover:opacity-50"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();

const toastClasses = {
  success: 'border-gray-200',
  error: 'border-gray-200',
  warning: 'border-gray-200',
  info: 'border-gray-200',
};

const toastIconColors = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-orange-500',
  info: 'text-gray-900',
};

const toastTextColors = {
  success: 'text-gray-900',
  error: 'text-gray-900',
  warning: 'text-gray-900',
  info: 'text-gray-900',
};
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
