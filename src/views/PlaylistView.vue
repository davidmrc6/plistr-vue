ok
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
  import type { TrackViewType } from "@/types/miscTypes.ts";
  import { Icon } from "@iconify/vue";
  import PlaylistViewSkeleton from "@/components/skeletons/PlaylistViewSkeleton.vue";

  const route = useRoute();
  const playlistId = route.params.id as string;

  let token;

  const userProfile = ref<UserProfile | null>(null);
  const playlist = ref<PlaylistObject | null>(null);
  const isPlaylistLoading = ref(true);

  const activeViewType = ref<TrackViewType>("compact");

  onMounted(async () => {
    // Reset scroll position
    window.scrollTo(0, 0);

    token = getStoredAccessToken();

    if (!token) {
      logout();
      return;
    }

    userProfile.value = await fetchProfile(token);
    playlist.value = await fetchPlaylist(token, playlistId);
    isPlaylistLoading.value = false;
  });
</script>

<template>
  <ShaderBackground />

  <div class="relative min-h-screen flex flex-col">
    <NavigationBar :user-profile="userProfile" />

    <PlaylistViewSkeleton v-if="isPlaylistLoading" />

    <main v-else class="flex-1 flex px-4 sm:px-6 max-w-[82rem] mx-auto w-full overflow-y-auto mt-8 sm:mt-12">
      <div class="w-full mx-auto mt-4 sm:mt-8 flex flex-col">
        <div class="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <!-- header -->
          <h1
            class="text-3xl sm:text-4xl md:text-6xl w-full sm:w-3/4 text-stone-800 lowercase tracking-tight leading-tight font-semibold"
          >
            <span class="font-serif text-teal-600 italic font-light mr-4">playlist </span>
            {{ playlist?.name }}
          </h1>
        </div>

        <!-- choose view option -->
        <div class="flex items-center self-start sm:self-end gap-2 px-1 py-1 text-sm font-medium mt-2">
          <span class="font-light italic">view:</span>
          <button
            class="px-2 py-2 rounded-full transition-colors"
            :class="{
              'font-bold text-teal-600': activeViewType === 'compact',
              'hover:text-stone-800 text-stone-600': activeViewType !== 'compact',
            }"
          >
            compact
          </button>
          <div class="bg-stone-600 w-px h-4 self-center" />
          <button
            class="px-2 py-2 rounded-full transition-colors"
            :class="{
              'font-bold text-teal-600': activeViewType === 'detailed',
              'hover:text-stone-800 text-stone-600': activeViewType !== 'detailed',
            }"
          >
            detailed
          </button>
        </div>

        <!-- Column headers - desktop -->
        <div class="hidden sm:flex gap-12 mt-4">
          <div class="w-[400px]"></div>
          <div class="flex-1">
            <div class="flex items-center gap-4 px-4 py-2 text-stone-400 text-sm font-medium">
              <div class="w-8 flex justify-end">
                <Icon icon="mdi:playlist-play" class="w-5 h-5" />
              </div>
              <div class="w-12"></div>
              <div class="flex-1">title</div>
              <div class="text-stone-400">
                <Icon icon="mdi:clock-outline" class="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <!-- playlist content -->
        <div class="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-2">
          <!-- left side: playlist image and description -->
          <div class="w-full sm:w-[400px] flex-shrink-0">
            <div class="aspect-square w-full max-w-[400px] mx-auto sm:mx-0 overflow-hidden rounded-xl shadow-xl">
              <img
                :src="playlist?.images[0]?.url"
                :alt="playlist?.name"
                class="w-full h-full object-cover border-none"
              />
            </div>

            <div class="mt-6 space-y-4 flex flex-col items-center font-sans">
              <!-- tracks, followers -->
              <div class="flex gap-2">
                <span class="px-3 py-1 text-stone-600 rounded-full text-sm">
                  {{ playlist?.tracks.total }} tracks
                </span>
                <div class="bg-stone-600 w-px h-4 self-center" />
                <span class="px-3 py-1 text-stone-600 rounded-full text-sm">
                  {{ playlist?.followers.total }} followers
                </span>
              </div>

              <!-- description -->
              <p class="text-stone-800 text-md leading-relaxed text-center sm:text-left">
                {{ playlist?.description }}
              </p>
            </div>
          </div>

          <!-- right side: track list -->
          <div class="flex-1">
            <!-- Column headers - mobile -->
            <div class="sm:hidden flex items-center gap-4 px-4 py-2 text-stone-400 text-sm font-medium mb-2">
              <div class="w-8 flex justify-end">
                <Icon icon="mdi:playlist-play" class="w-5 h-5" />
              </div>
              <div class="w-12"></div>
              <div class="flex-1">title</div>
              <div class="text-stone-400">
                <Icon icon="mdi:clock-outline" class="w-5 h-5" />
              </div>
            </div>

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
