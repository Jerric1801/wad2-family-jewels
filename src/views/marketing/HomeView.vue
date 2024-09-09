<template>
  <DefaultLayout>
    <div class="bg-white h-[100vh] w-[100vw] flex items-center justify-center">
      <div class="text-center">
        <h2
          class="text-5xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
        >
          Your Jewelry, <br/> Perfectly Displayed Every Time
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
};
</script>
