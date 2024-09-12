<template>
  <nav
    :class="['navbar', isVisible ? 'opacity-100' : 'opacity-0']"
    class="fixed top-0 left-0 w-full p-4 bg-transparent transition-opacity duration-500 ease-in-out z-50"
  >
    <div class="container mx-auto flex justify-between items-center">
      <img
        src="@/assets/images/logo/primary.svg"
        alt="Family Jewels Logo"
        class="h-12 w-auto mr-4"
      />
      <ul class="flex space-x-6 text-black">
        <li>
          <router-link to="/" class="text-lg font-medium">Home</router-link>
        </li>
        <li>
          <router-link to="/marketplace" class="text-lg font-medium"
            >Marketplace</router-link
          >
        </li>
        <li>
          <router-link to="/login" class="text-lg font-medium"
            >Login</router-link
          >
        </li>
        <li>
          <router-link to="/upload" class="text-lg font-medium"
            >Upload Jewelry</router-link
          >
        </li>
        <li>
          <router-link to="/profile" class="text-lg font-medium"
            >Profile</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isVisible: true,
      lastScrollY: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollY = window.scrollY;
      this.isVisible = this.lastScrollY > currentScrollY || currentScrollY < 10;
      this.lastScrollY = currentScrollY;
    },
  },
};
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
}
</style>
