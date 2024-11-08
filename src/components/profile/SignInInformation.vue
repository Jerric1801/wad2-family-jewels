<template>
  <div class="border-t border-gray-200 pt-6">
    <h3
      class="text-2xl font-semibold mb-4 text-indigo-600 dark:text-custDarkerWhite"
    >
      Sign-in Information
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="bg-gray-100 p-4 rounded-lg dark:bg-cardItemBg dark:text-custGrey"
      >
        <p class="text-gray-600 mb-1 dark:text-custGrey">Email</p>
        <p class="text-xl font-medium dark:bg-cardItemBg dark:text-custGrey">
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
