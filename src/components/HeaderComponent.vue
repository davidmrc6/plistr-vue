<script setup lang="ts">
import type { UserProfile } from '@/types/spotifyTypes';
import { defineProps } from 'vue';

defineProps<{
  userProfile?: UserProfile | null;
}>();
</script>

<template>
  <header class="pt-8 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-medium text-gray-900 lowercase tracking-wide font-serif">
          plistr
        </h1>
        <img
          v-if="userProfile?.images[0]"
          :src="userProfile?.images[0].url"
          class="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </header>
</template>
