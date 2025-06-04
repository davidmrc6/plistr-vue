<script setup lang="ts">
  import { useRoute } from "vue-router";
  import ShaderBackground from "@/components/background/ShaderBackground.vue";
  import HeaderComponent from "@/components/HeaderComponent.vue";
  import { onMounted, ref } from "vue";
  import { getStoredAccessToken, logout } from "@/utils/spotifyAuth.ts";
  import type { PlaylistObject, UserProfile } from "@/types/spotifyTypes.ts";
  import { fetchPlaylist, fetchProfile } from "@/utils/spotifyApi.ts";
  import NavigationBar from "@/components/NavigationBar.vue";

  const route = useRoute();
  const playlistId = route.params.id as string;

  let token;

  const userProfile = ref<UserProfile | null>(null);
  const playlist = ref<PlaylistObject | null>(null);

  onMounted(async () => {
    token = getStoredAccessToken();

    if (!token) {
      logout();
      return;
    }

    userProfile.value = await fetchProfile(token);
    playlist.value = await fetchPlaylist(token, playlistId);
  });
</script>

<template>
  <ShaderBackground />

  <div class="relative min-h-screen flex flex-col">
    <NavigationBar :user-profile="userProfile" />
    <main class="flex-1 flex px-6 max-w-[82rem] mx-auto w-full overflow-y-auto mt-12">
      <div class="w-full mx-auto mt-8 flex flex-col">
        <!-- header -->
        <h1
          class="text-4xl md:text-6xl text-stone-800 lowercase tracking-tight leading-tight font-semibold"
        >
          <span class="font-serif text-teal-600 italic font-light mr-4">playlist </span>
          {{ playlist?.name }}
        </h1>
      </div>
    </main>
  </div>
</template>
