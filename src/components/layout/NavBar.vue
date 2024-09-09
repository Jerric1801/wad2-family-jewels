<template>
  <nav
    :class="['navbar', isVisible ? 'opacity-100' : 'opacity-0']"
    class="fixed top-0 left-0 w-full p-4 bg-transparent transition-opacity duration-500 ease-in-out z-50"
  >
    <div class="container mx-auto flex justify-between items-center">
      <img src="@/assets/images/logo/primary.svg" alt="Family Jewels Logo" class="h-12 w-auto mr-4" />
      <ul class="flex space-x-4 text-black">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/upload">Upload Jewelry</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
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
</style>
