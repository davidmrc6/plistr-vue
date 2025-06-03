<script setup lang="ts">
  import { Icon } from "@iconify/vue";

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.REDIRECT_URI;
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-modify-private",
    "playlist-modify-public",
  ].join("%20");
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const authUrl =
    `${authEndpoint}?client_id=${clientId}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scopes}` +
    `&show_dialog=true`;

  function loginWithSpotify(): void {
    window.location.href = authUrl;
  }
</script>

<template>
  <main class="flex-1 flex items-center justify-center px-6 -mt-8">
    <div class="text-center max-w-2xl mx-auto space-y-12">
      <div class="space-y-6">
        <h2
          class="text-6xl md:text-8xl text-gray-900 lowercase tracking-tight leading-tight font-semibold"
        >
          connect your music
        </h2>
        <p
          class="text-lg text-gray-600 font-normal leading-relaxed tracking-tight"
        >
          access your spotify playlists and discover new ways to enjoy your
          music
        </p>
      </div>
      <button
        @click="loginWithSpotify"
        class="inline-flex items-center justify-center px-8 py-4 bg-[#1DB954] hover:bg-[#1ed760] text-white font-medium rounded-full transition-all ease-in-out duration-200 text-base lowercase gap-x-3 tracking-tight hover:scale-105"
      >
        <Icon icon="mdi:spotify" width="24" height="24" />
        connect with spotify
      </button>
    </div>
  </main>
</template>
