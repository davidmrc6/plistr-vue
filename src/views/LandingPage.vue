<script setup lang="ts">
  import ShaderBackground from "@/components/background/ShaderBackground.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  import HeaderComponent from "@/components/HeaderComponent.vue";
  import MainContent from "@/components/MainContent.vue";
</script>

<template>
  <ShaderBackground />

  <div class="relative min-h-screen flex flex-col text-sans">
    <HeaderComponent />
    <MainContent />
    <FooterComponent />
  </div>
</template>
