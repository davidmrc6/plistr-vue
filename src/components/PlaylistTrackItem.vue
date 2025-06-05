<script setup lang="ts">
  import { computed } from "vue";
  import type { PlaylistTrack } from "@/types/spotifyTypes";

  const props = defineProps<{
    track: PlaylistTrack;
    index: number;
  }>();
  const MAX_CHARS = 40;
  const truncatedName = computed(() => {
    const name = props.track.track.name;
    return name.length > MAX_CHARS ? name.slice(0, MAX_CHARS) + "..." : name;
  });
</script>
<template>
  <div
    class="flex items-center gap-4 p-4 rounded-lg transition-colors group font-sans hover:bg-white/30 hover:backdrop-blur-2xl"
  >
    <span class="text-stone-400 w-8 text-right">{{ index + 1 }}</span>
    <div class="w-12 h-12 flex-shrink-0">
      <img
        :src="track.track.album.images[2]?.url"
        :alt="track.track.name"
        class="w-full h-full object-cover rounded"
      />
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-stone-800 font-semibold text-xl">
        {{ truncatedName }}
      </h3>
      <div class="flex items-center gap-2">
        <span
          v-if="track.track.explicit"
          class="inline-flex items-center justify-center w-4 h-4 text-[10px] font-extrabold text-gray-600 rounded-sm flex-shrink-0"
        >
          E
        </span>
        <p class="text-stone-600 text-sm truncate">
          {{ track.track.artists.map((artist) => artist.name).join(", ") }}
        </p>
      </div>
    </div>
    <div class="text-stone-400 text-sm">
      {{ Math.floor(track.track.duration_ms / 60000) }}:{{
        String(Math.floor((track.track.duration_ms % 60000) / 1000)).padStart(2, "0")
      }}
    </div>
  </div>
</template>
