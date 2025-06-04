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
      class="flex-1 flex px-6 max-w-[82rem] mx-auto w-full overflow-y-auto mt-12"
    >
      <div class="w-full mx-auto mt-8 flex flex-col">
        <!-- header -->
        <h1
          class="text-4xl md:text-6xl text-stone-800 lowercase tracking-tight leading-tight font-semibold"
        >
          <a :href="userProfile?.uri" class="font-serif font-thin text-teal-600 underline">{{
            userProfile?.display_name
          }}</a
          >'s playlists
        </h1>

        <!-- playlists -->
        <div class="grid w-full grid-cols-[auto_auto_auto] justify-between mt-16">
          <PlaylistItem
            v-for="playlist in userPlaylists"
            :key="playlist.id"
            :playlist="playlist"
          />
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>
