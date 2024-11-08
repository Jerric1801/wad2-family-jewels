<template>
  <footer class="footer p-4 bg-gray-200 text-center dark:bg-darkModeBg">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <div class="flex flex-col items-center md:items-start">
        <img
          src="../../assets/images/logo/logo.png"
          alt="Family Jewels Logo"
          class="w-16 h-16 mb-2"
        />
        <h3 class="text-lg font-semibold dark:text-custDarkerWhite">
          Family Jewels
        </h3>
        <p class="text-sm italic dark:text-custDarkerWhite">
          Sparkle Without the Struggle
        </p>
      </div>

      <div
        class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
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
      <p class="text-sm text-gray-500 dark:text-custGrey">
        &copy; 2024 Family Jewels. All rights reserved.
      </p>
      <div class="flex space-x-4 mt-2 md:mt-0">
        <a
          v-if="isDarkMode"
          href="https://github.com/Jerric1801/wad2-family-jewels"
          target="_blank"
        >
          <!-- Light mode: Show the image, hide in dark mode -->
          <svg
            v-if="isDarkMode"
            height="32"
            aria-hidden="true"
            viewBox="0 0 24 24"
            version="1.1"
            width="32"
            data-view-component="true"
            class="octicon octicon-mark-github v-align-middle color-fg-default"
          >
            <path
              d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"
            ></path>
          </svg>
        </a>
        <a
          v-else
          href="https://github.com/Jerric1801/wad2-family-jewels"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            class="octicon octicon-mark-github dark:inline-block"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="#d9d5d5"
            style="
              display: inline-block;
              user-select: none;
              vertical-align: text-bottom;
              overflow: visible;
            "
          >
            <path
              d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Footer",
  setup() {
    const isDarkMode = ref(false);

    const loadTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        isDarkMode.value = true;
      }
    };
    return loadTheme;
  },
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
