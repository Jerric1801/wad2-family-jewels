<template>
  <footer class="footer p-4 bg-gray-200 text-center dark:bg-darkModeNavBg">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <div class="flex flex-col items-center md:items-start">
        <img
          src="../../assets/images/logo/logo.png"
          alt="Family Jewels Logo"
          class="w-16 h-16"
        />
        <h3 class="text-lg font-semibold dark:text-custDarkerWhite">
          Family Jewels
        </h3>
        <p class="text-sm italic dark:text-custDarkerWhite">
          Sparkle Without the Struggle
        </p>
      </div>

      <div
        class="flex flex-row flex-wrap md:pt-20 justify-center space-x-4 text-sm pt-4 md:pt-0 md:flex-row md:space-x-4"
      >
        <a href="/" class="text-gray-600 hover:text-gray-800 dark:text-custGrey"
          >Home</a
        >
        <a
          href="/marketplace"
          class="text-gray-600 hover:text-gray-800 dark:text-custGrey"
          >Marketplace</a
        >
        <a
          href="/pricing"
          class="text-gray-600 hover:text-gray-800 dark:text-custGrey"
          >Pricing</a
        >
        <a
          href="/terms"
          class="text-gray-600 hover:text-gray-800 dark:text-custGrey"
          >Terms</a
        >
        <a
          href="/privacy"
          class="text-gray-600 hover:text-gray-800 dark:text-custGrey"
          >Privacy</a
        >
      </div>
    </div>

    <div
      class="container mx-auto mt-4 pt-4 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center"
    >
      <p class="text-xs text-gray-500 dark:text-custGrey">
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
            alt="GitHub Logo"
            class="w-7 h-7 dark:hidden"
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
