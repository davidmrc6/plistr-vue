<template>
  <div class="mb-8 w-[400px] h-[400px] rounded-xl overflow-hidden bg-[#f5f0e6]/50 flex flex-col">
    <div class="w-full h-64 bg-[#e0d8cc]/50 pulse"></div>
    <div class="p-6 flex flex-col flex-1 justify-between">
      <div class="space-y-4">
        <div class="h-6 bg-[#e0d8cc]/50 w-3/4 rounded pulse"></div>
        <div class="h-4 bg-[#e0d8cc]/50 w-1/2 rounded pulse"></div>
      </div>
      <div class="h-4 bg-[#e0d8cc]/50 w-full rounded pulse"></div>
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
