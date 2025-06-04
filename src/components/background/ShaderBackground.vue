<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const mousePosition = ref({ x: 0, y: 0 });

function updateMouse(e: MouseEvent) {
  mousePosition.value.x = e.clientX;
  mousePosition.value.y = e.clientY;
}

onMounted(() => {
  window.addEventListener("mousemove", updateMouse);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", updateMouse);
});
</script>

<template>
  <div class="fixed inset-0 z-0">
    <div
      class="absolute inset-0 bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-50"
    />
    <div class="absolute inset-0 opacity-30">
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-stone-200/40 via-transparent to-amber-200/40 animate-mesh-flow-1"
      />
      <div
        class="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-200/40 via-transparent to-yellow-200/40 animate-mesh-flow-2"
      />
      <div
        class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-yellow-200/40 via-transparent to-stone-200/40 animate-mesh-flow-3"
      />
    </div>

    <div class="absolute inset-0 opacity-30">
      <div
        class="absolute inset-0 bg-gradient-radial from-stone-100/20 via-transparent to-transparent animate-pulse-slow"
      />
      <div
        class="absolute inset-0 bg-gradient-conic from-amber-100/20 via-transparent to-yellow-100/20 animate-spin-very-slow"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes mesh-flow-1 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  25% {
    transform: translate(30px, -20px) rotate(90deg) scale(1.1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-20px, 30px) rotate(180deg) scale(0.9);
    opacity: 0.5;
  }
  75% {
    transform: translate(40px, 10px) rotate(270deg) scale(1.05);
    opacity: 0.7;
  }
}

@keyframes mesh-flow-2 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  33% {
    transform: translate(-40px, 25px) rotate(-120deg) scale(0.8);
    opacity: 0.6;
  }
  66% {
    transform: translate(25px, -40px) rotate(-240deg) scale(1.2);
    opacity: 0.5;
  }
}

@keyframes mesh-flow-3 {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  20% {
    transform: translate(15px, 25px) rotate(72deg) scale(1.1);
    opacity: 0.6;
  }
  40% {
    transform: translate(-25px, -15px) rotate(144deg) scale(0.9);
    opacity: 0.5;
  }
  60% {
    transform: translate(35px, -5px) rotate(216deg) scale(1.05);
    opacity: 0.7;
  }
  80% {
    transform: translate(-10px, 20px) rotate(288deg) scale(0.95);
    opacity: 0.6;
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

@keyframes spin-very-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-mesh-flow-1 {
  animation: mesh-flow-1 20s ease-in-out infinite;
}

.animate-mesh-flow-2 {
  animation: mesh-flow-2 25s ease-in-out infinite;
}

.animate-mesh-flow-3 {
  animation: mesh-flow-3 30s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-spin-very-slow {
  animation: spin-very-slow 60s linear infinite;
}

.animate-pulse-gentle {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
