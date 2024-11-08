<template>
  <div class="border-t border-gray-200 pt-4">
    <h3
      class="text-lg font-semibold mb-3 text-indigo-600 dark:text-custDarkerWhite"
    >
      Sign-in Information
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        class="bg-gray-100 p-3 rounded-lg dark:bg-cardItemBg dark:text-custGrey"
      >
        <p class="text-gray-500 text-sm mb-1 dark:text-custGrey">Email</p>
        <p class="text-md font-medium dark:bg-cardItemBg dark:text-custGrey">
          {{ userData.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: Object,
  },
};
</script>
