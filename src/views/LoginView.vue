<script setup lang="ts">
  import ShaderBackground from "@/components/background/ShaderBackground.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  import HeaderComponent from "@/components/HeaderComponent.vue";

  import { Icon } from "@iconify/vue";

  import { redirectToAuthCodeFlow } from "@/utils/spotifyAuth";

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;

  function handleSpotifyLogin() {
    redirectToAuthCodeFlow(clientId);
  }
</script>

<template>
  <ShaderBackground />

  <div class="relative min-h-screen flex flex-col text-sans">
    <HeaderComponent />
    <main class="flex-1 flex items-center justify-center px-6 mt-8">
      <div class="text-center max-w-2xl mx-auto space-y-8">
        <div class="space-y-6">
          <h2
            class="text-6xl md:text-8xl text-stone-800 lowercase tracking-tight leading-tight font-semibold"
          >
            connect <span class="font-serif font-thi text-teal-600 italic">your</span> music
          </h2>
          <p
            class="text-lg text-stone-600 font-normal leading-relaxed tracking-tight"
          >
            access your spotify playlists and discover new ways to enjoy your
            music
          </p>
        </div>
        <button
          @click="handleSpotifyLogin"
          class="inline-flex items-center justify-center px-6 py-4 bg-[#1DB954] hover:bg-[#1ed760] text-white font-medium rounded-full transition-all ease-in-out duration-200 text-base lowercase gap-x-3 tracking-tight hover:scale-105"
        >
          <Icon icon="mdi:spotify" width="24" height="24" />
          connect with spotify
        </button>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>
