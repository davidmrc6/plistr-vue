<script setup lang="ts">
  import ShaderBackground from "@/components/background/ShaderBackground.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  import HeaderComponent from "@/components/HeaderComponent.vue";
  import { getStoredAccessToken } from "@/utils/spotifyAuth";

  import { onMounted, ref } from "vue";
  import {
    type SimplifiedPlaylistObject,
    type UserProfile,
  } from "@/types/spotifyTypes";
  import { fetchPlaylists, fetchProfile } from "@/utils/spotifyApi";
  import { logout } from "@/utils/spotifyAuth";
  import PlaylistItem from "@/components/PlaylistItem.vue";

  let token;

  const userProfile = ref<UserProfile | null>(null);
  const userPlaylists = ref<SimplifiedPlaylistObject[]>([]);

  onMounted(async () => {
    token = getStoredAccessToken();

    if (!token) {
      logout();
      return;
    }

    userProfile.value = await fetchProfile(token);
    userPlaylists.value = await fetchPlaylists(token);
  });
</script>

<template>
  <ShaderBackground />

  <div class="relative min-h-screen flex flex-col">
    <HeaderComponent :user-profile="userProfile" />
    <main
      class="flex-1 flex px-6 max-w-[88rem] mx-auto w-full overflow-y-auto mt-8"
    >
      <div class="w-full mx-auto mt-8 flex flex-col">
        <!-- header -->
        <h1
          class="text-4xl md:text-6xl text-gray-900 lowercase tracking-tight leading-tight font-semibold ml-8"
        >
          <span class="font-serif font-thin">{{
            userProfile?.display_name
          }}</span
          >'s playlists
        </h1>

        <!-- playlists -->
        <div class="grid grid-cols-3 gap-0 mt-8">
          <PlaylistItem
            v-for="playlist in userPlaylists"
            :key="playlist"
            :playlist="playlist"
          />
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>
