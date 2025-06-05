<script setup lang="ts">
  import ShaderBackground from "@/components/background/ShaderBackground.vue";
  import NavigationBar from "@/components/NavigationBar.vue";
  import { onMounted, ref } from "vue";
  import type { UserProfile } from "@/types/spotifyTypes.ts";
  import { getStoredAccessToken, logout } from "@/utils/spotifyAuth.ts";
  import { fetchProfile } from "@/utils/spotifyApi.ts";

  let token;

  const userProfile = ref<UserProfile | null>(null);

  onMounted(async () => {
    token = getStoredAccessToken();

    if (!token) {
      logout();
      return;
    }

    userProfile.value = await fetchProfile(token);
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
          coming <span class="text-teal-600 font-light font-serif italic">soon</span>.. maybe
        </h1>
      </div>
    </main>
  </div>
</template>
