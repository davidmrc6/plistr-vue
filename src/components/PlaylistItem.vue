<script setup lang="ts">
  import { defineProps } from "vue";
  import type { SimplifiedPlaylistObject } from "@/types/spotifyTypes";
  import { Icon } from "@iconify/vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  defineProps<{
    playlist: SimplifiedPlaylistObject;
  }>();

  async function navigateToPlaylist(id: string) {
    await router.push(`/playlists/${id}`);
  }
</script>

<template>
  <div
    class="mb-8 backdrop-blur-2xl bg-white/30 w-[400px] h-[400px] border border-transparent hover:cursor-pointer hover:border-gray-200 transition-all duration-300 ease-in-out rounded-xl overflow-hidden group flex flex-col"
    @click="navigateToPlaylist(playlist.id)"
  >
    <!-- Playlist Image -->
    <div class="relative w-full h-64 overflow-hidden">
      <img
        v-if="playlist.images"
        :src="playlist.images[0]?.url"
        :alt="playlist.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <!-- Status Indicators -->
      <div class="absolute top-4 right-4 flex gap-2">
        <div v-if="playlist.collaborative" class="bg-black/50 backdrop-blur-sm p-2 rounded-full">
          <Icon icon="mdi:account-group" class="w-5 h-5 text-white" />
        </div>

        <div v-if="playlist.public" class="bg-black/50 backdrop-blur-sm p-2 rounded-full">
          <Icon icon="mdi:earth" class="w-5 h-5 text-white" />
        </div>
      </div>
    </div>

    <!-- Playlist Info -->
    <div class="p-6 flex flex-col justify-between flex-1">
      <div>
        <h3 class="text-3xl font-semibold text-stone-800 truncate font-sans tracking-tight">
          {{ playlist.name }}
        </h3>
        <p class="text-stone-600 mt-2 flex items-center gap-2 font-sans">
          <Icon icon="mdi:music-note" class="w-5 h-5" />
          {{ playlist.tracks.total }} tracks
        </p>
      </div>
      <p v-if="playlist.description" class="text-stone-500 mt-2 line-clamp-2 text-sm font-sans">
        {{ playlist.description }}
      </p>
    </div>
  </div>
</template>
