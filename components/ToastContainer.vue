<template>
  <div class="fixed top-4 right-4 z-[200] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto max-w-sm w-full rounded-lg shadow-2xl border backdrop-blur-sm p-4 flex items-start gap-3',
          toastClasses[toast.type]
        ]"
      >
        <!-- Icon -->
        <div class="flex-shrink-0 text-2xl">
          {{ toastIcons[toast.type] }}
        </div>

        <!-- Message -->
        <div class="flex-1 pt-0.5">
          <p class="text-sm font-medium text-white">{{ toast.message }}</p>
        </div>

        <!-- Close Button -->
        <button
          @click="toastStore.remove(toast.id)"
          class="flex-shrink-0 text-white/60 hover:text-white transition-colors"
        >
          <span class="text-lg">✕</span>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();

const toastClasses = {
  success: 'bg-green-500/20 border-green-500/30',
  error: 'bg-red-500/20 border-red-500/30',
  warning: 'bg-yellow-500/20 border-yellow-500/30',
  info: 'bg-blue-500/20 border-blue-500/30',
};

const toastIcons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
