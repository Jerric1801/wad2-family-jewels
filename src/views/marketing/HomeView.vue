<template>
  <DefaultLayout>
    <div class="bg-white h-[100vh] w-[100vw] flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-5xl font-bold">
          <span
            class="animate-fade-in-up bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
            v-for="(line, index) in headlineLines"
            :key="index"
            :style="{ animationDelay: `${index * 1}s` }"
          >
            {{ line }}<br v-if="index === 0" />
          </span>
        </h2>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "HomeView",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      headlineLines: ["Your Jewelry,", "Perfectly Displayed Every Time"],
    };
  },
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 2s ease-out forwards;
  opacity: 0;
}
</style>
