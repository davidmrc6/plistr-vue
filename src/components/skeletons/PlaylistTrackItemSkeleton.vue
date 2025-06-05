<template>
  <div class="flex items-center gap-4 p-4 rounded-lg font-sans">
    <div class="text-stone-400 w-8 flex justify-end">
      <div class="h-4 w-5 bg-[#e0d8cc]/50 rounded pulse"></div>
    </div>
    <div class="w-12 h-12 flex-shrink-0">
      <div class="w-full h-full bg-[#e0d8cc]/50 rounded pulse"></div>
    </div>
    <div class="flex-1 min-w-0">
      <div class="h-6 bg-[#e0d8cc]/50 w-3/4 rounded mb-2 pulse"></div>
      <div class="h-4 bg-[#e0d8cc]/50 w-1/2 rounded pulse"></div>
    </div>
    <div class="text-stone-400">
      <div class="h-4 w-8 bg-[#e0d8cc]/50 rounded pulse"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
