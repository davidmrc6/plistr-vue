<script setup lang="ts">
  import { useRoute } from "vue-router";
  import ShaderBackground from "@/components/background/ShaderBackground.vue";
  import { onMounted, ref } from "vue";
  import { getStoredAccessToken, logout } from "@/utils/spotifyAuth.ts";
  import type { PlaylistObject, UserProfile } from "@/types/spotifyTypes.ts";
  import { fetchPlaylist, fetchProfile } from "@/utils/spotifyApi.ts";
  import NavigationBar from "@/components/NavigationBar.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  import PlaylistTrackItem from "@/components/PlaylistTrackItem.vue";

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
        <div class="w-full flex flex-row justify-between items-center">
          <!-- header -->
          <h1
            class="text-4xl md:text-6xl text-stone-800 lowercase tracking-tight leading-tight font-semibold"
          >
            <span class="font-serif text-teal-600 italic font-light mr-4">playlist </span>
            {{ playlist?.name }}
          </h1>

          <!-- choose view option -->
          <div class="flex items-center gap-2 bg-stone-100/50 backdrop-blur-sm rounded-full px-1 py-1">
            <button class="px-4 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors">
              compact
            </button>
            <button class="px-4 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors">
              detailed
            </button>
          </div>
        </div>

        <!-- playlist content -->
        <div class="mt-12 flex gap-12">
          <!-- left side: playlist image and description -->
          <div class="w-[400px] flex-shrink-0">
            <div class="aspect-square w-full overflow-hidden rounded-xl shadow-xl">
              <img
                :src="playlist?.images[0]?.url"
                :alt="playlist?.name"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="mt-6 space-y-4">
              <p class="text-stone-600 text-lg leading-relaxed">
                {{ playlist?.description }}
              </p>

              <div class="flex gap-2">
                <span class="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm">
                  {{ playlist?.tracks.total }} tracks
                </span>
                <span class="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm">
                  {{ playlist?.followers.total }} followers
                </span>
              </div>
            </div>
          </div>

          <!-- right side: track list -->
          <div class="flex-1">
            <div class="space-y-2">
              <PlaylistTrackItem
                v-for="(item, index) in playlist?.tracks.items"
                :key="item.track.id"
                :track="item"
                :index="index"
              />
            </div>
          </div>
        </div>
      </div>
    </main>

    <FooterComponent />
  </div>
</template>
