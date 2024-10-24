<template>
  <footer class="footer p-4 bg-gray-200 text-center">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <div class="flex flex-col items-center md:items-start">
        <img
          src="../../assets/images/logo/logo.png"
          alt="Family Jewels Logo"
          class="w-16 h-16 mb-2"
        />
        <h3 class="text-lg font-semibold">Family Jewels</h3>
        <p class="text-sm italic">Sparkle Without the Struggle</p>
      </div>

      <div
        class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
      >
        <a href="/" class="text-gray-600 hover:text-gray-800">Home</a>
        <a href="/marketplace" class="text-gray-600 hover:text-gray-800"
          >Marketplace</a
        >
        <a href="/pricing" class="text-gray-600 hover:text-gray-800">Pricing</a>
        <a href="/terms" class="text-gray-600 hover:text-gray-800">Terms</a>
        <a href="/privacy" class="text-gray-600 hover:text-gray-800">Privacy</a>
      </div>
    </div>

    <div
      class="container mx-auto mt-4 pt-4 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center"
    >
      <p class="text-sm text-gray-500">
        &copy; 2024 Family Jewels. All rights reserved.
      </p>
      <div class="flex space-x-4 mt-2 md:mt-0">
        <a
          href="https://github.com/Jerric1801/wad2-family-jewels"
          target="_blank"
          class="text-gray-600 hover:text-gray-800"
        >
          <img
            src="../../assets/images/logo/github.png"
            alt="Family Jewels Logo"
            class="w-7 h-7 mb-2 mr-2"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  margin-top: 50px;
}
</style>
