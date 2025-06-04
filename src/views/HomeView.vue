<script setup lang="ts">
  import ShaderBackground from "@/components/background/ShaderBackground.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  import { getStoredAccessToken } from "@/utils/spotifyAuth";

  import { onMounted, ref } from "vue";
  import {
    type SimplifiedPlaylistObject,
    type UserProfile,
  } from "@/types/spotifyTypes";
  import { fetchPlaylists, fetchProfile } from "@/utils/spotifyApi";
  import { logout } from "@/utils/spotifyAuth";
  import PlaylistItem from "@/components/PlaylistItem.vue";
  import PlaylistItemSkeleton from "@/components/skeletons/PlaylistItemSkeleton.vue";
  import NavigationBar from "@/components/NavigationBar.vue";

  let token;

  const userProfile = ref<UserProfile | null>(null);
  const userPlaylists = ref<SimplifiedPlaylistObject[]>([]);
  const isLoading = ref(false);

  onMounted(async () => {
    token = getStoredAccessToken();

    if (!token) {
      logout();
      return;
    }

    userProfile.value = await fetchProfile(token);

    isLoading.value = true;
    userPlaylists.value = await fetchPlaylists(token);
    isLoading.value = false;
  });
</script>

<template>
  <ShaderBackground />

  <div class="relative min-h-screen flex flex-col">
    <NavigationBar :user-profile="userProfile" />
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
        <div class="grid w-full grid-cols-3 gap-6 mt-16">
          <template v-if="isLoading">
            <PlaylistItemSkeleton v-for="i in 6" :key="i" />
          </template>
          <template v-else>
            <PlaylistItem
              v-for="playlist in userPlaylists"
              :key="playlist.id"
              :playlist="playlist"
            />
          </template>
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>
