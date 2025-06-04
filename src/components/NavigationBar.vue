<script setup lang="ts">
  import type { UserProfile } from "@/types/spotifyTypes";
  import { defineProps, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";

  defineProps<{
    userProfile?: UserProfile | null;
  }>();

  const route = useRoute();
  const router = useRouter();

  const isPlaylistsActive = computed(
    () => route.path === "/" || route.path === "/playlists"
  );
  const isRecommendationsActive = computed(
    () => route.path === "/recommendations"
  );

  async function navigateToPlaylists() {
    await router.push("/playlists");
  }
  async function navigateToRecommendations() {
    await router.push("/recommendations");
  }
</script>

<template>
  <nav class="pt-8 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-medium text-gray-900 lowercase  font-serif">
          plistr
        </h1>
        <div class="flex items-center">
          <div
            @click="navigateToPlaylists"
            :class="[
              'text-xl font-medium lowercase font-sans cursor-pointer transition-colors duration-200 mr-4 hover:text-teal-600',
              { 'text-teal-600 font-bold': isPlaylistsActive, 'text-gray-600': !isPlaylistsActive }
            ]"
          >
            playlists
          </div>
          <div
            @click="navigateToRecommendations"
            :class="[
              'text-xl font-medium lowercase font-sans cursor-pointer transition-colors duration-200 mr-6 hover:text-teal-600',
              { 'text-teal-600 font-bold': isRecommendationsActive, 'text-gray-600': !isRecommendationsActive }
            ]"
          >
            discover
          </div>
          <img
            v-if="userProfile?.images[0]"
            :src="userProfile?.images[0].url"
            class="w-10 h-10 rounded-full object-cover transition-all duration-300 ease-in-out profile-glow hover:cursor-pointer"
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .profile-glow:hover {
    box-shadow: 0 0 30px rgba(240, 230, 210, 0.95), 0 0 60px rgba(240, 230, 210, 0.8);
  }
</style>
