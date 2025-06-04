<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAccessToken } from '@/utils/spotifyAuth';

const router = useRouter();
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const params = new URLSearchParams(window.location.search);
const code = params.get('code');

onMounted(async () => {
  if (!code) {
    router.push('/login');
    return;
  }

  try {
    const accessToken = await getAccessToken(clientId, code);
    // Store the access token
    // TODO add access token expiry
    localStorage.setItem('spotify_access_token', accessToken);
    // Redirect to home page
    router.push('/');
  } catch (error) {
    console.error('Error getting access token:', error);
    router.push('/login');
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-xl font-semibold text-gray-900">Connecting to Spotify...</h2>
      <p class="mt-2 text-gray-600">Please wait while we complete the authentication process.</p>
    </div>
  </div>
</template>
