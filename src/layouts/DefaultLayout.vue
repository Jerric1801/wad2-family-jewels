<template>
  <div class="font-poppins layout">
    <!-- Reference the NavBar component -->
    <NavBar />

    <!-- Main Content Section (Slot for page-specific content) -->
    <main class="content">
      <slot></slot>
    </main>

    <!-- Reference the Footer component -->
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/layout/NavBar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style scoped>
/* Basic layout styling */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
}

.content {
  flex: 1;
}
</style>
