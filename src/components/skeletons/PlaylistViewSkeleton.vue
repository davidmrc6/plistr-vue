<template>
  <div class="relative min-h-screen flex flex-col">
    <div class="flex-1 flex px-6 max-w-[82rem] mx-auto w-full overflow-y-auto mt-12">
      <div class="w-full mx-auto mt-8 flex flex-col">
        <!-- Header skeleton -->
        <div class="w-full flex flex-row justify-between items-center">
          <div class="h-16 bg-[#e0d8cc]/50 w-3/4 rounded pulse"></div>
        </div>

        <!-- View options skeleton -->
        <div class="flex items-center self-end gap-2 px-1 py-1 mt-2">
          <div class="h-8 w-24 bg-[#e0d8cc]/50 rounded pulse"></div>
        </div>

        <!-- Column headers skeleton -->
        <div class="flex gap-12 mt-4">
          <div class="w-[400px]"></div>
          <div class="flex-1">
            <div class="flex items-center gap-4 px-4 py-2">
              <div class="w-8 h-5 bg-[#e0d8cc]/50 rounded pulse"></div>
              <div class="w-12"></div>
              <div class="h-5 bg-[#e0d8cc]/50 w-1/4 rounded pulse"></div>
              <div class="h-5 w-8 bg-[#e0d8cc]/50 rounded pulse"></div>
            </div>
          </div>
        </div>

        <!-- Content skeleton -->
        <div class="flex gap-12 mt-2">
          <!-- Left side skeleton -->
          <div class="w-[400px] flex-shrink-0">
            <div class="aspect-square w-full bg-[#e0d8cc]/50 rounded-xl pulse"></div>
            <div class="mt-6 space-y-4 flex flex-col items-center">
              <div class="flex gap-2">
                <div class="h-8 w-24 bg-[#e0d8cc]/50 rounded-full pulse"></div>
                <div class="h-8 w-24 bg-[#e0d8cc]/50 rounded-full pulse"></div>
              </div>
              <div class="h-20 w-full bg-[#e0d8cc]/50 rounded pulse"></div>
            </div>
          </div>

          <!-- Right side skeleton - track list -->
          <div class="flex-1">
            <div class="space-y-2">
              <PlaylistTrackItemSkeleton v-for="i in 10" :key="i" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaylistTrackItemSkeleton from './PlaylistTrackItemSkeleton.vue';
</script>

<style scoped>
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
.pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
