<template>
  <div class="border-t border-gray-200 pt-6 dark:bg-darkModeBg">
    <h3
      class="text-2xl font-semibold mb-4 text-indigo-600 dark:text-custDarkerWhite"
    >
      Personal Information
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Full Name Field-->
      <div
        class="bg-gray-100 p-4 rounded-lg flex items-center justify-between dark:bg-cardItemBg"
      >
        <div>
          <p class="text-gray-600 mb-1 dark:bg-cardItemBg dark:text-custGrey">
            Full Name
          </p>
          <p class="text-xl font-medium dark:bg-cardItemBg dark:text-custGrey">
            {{ userData.fullName }}
          </p>
        </div>
        <button
          class="dark:bg-cardItemBg dark:text-custGrey dark:hover:text-custDarkerWhite"
          @click="openEditModal('Full Name', userData.fullName)"
        >
          Edit
        </button>
      </div>
      <!-- Phone Number Field-->
      <div
        class="bg-gray-100 p-4 rounded-lg flex items-center justify-between dark:bg-cardItemBg"
      >
        <div>
          <p class="text-gray-600 mb-1 dark:bg-cardItemBg dark:text-custGrey">
            Phone Number
          </p>
          <p class="text-xl font-medium dark:bg-cardItemBg dark:text-custGrey">
            {{ userData.phoneNumber }}
          </p>
        </div>
        <button
          class="dark:bg-cardItemBg dark:text-custGrey dark:hover:text-custDarkerWhite"
          @click="openEditModal('Phone Number', userData.phoneNumber)"
        >
          Edit
        </button>
      </div>
    </div>
    <!-- User Bio -->
    <div class="border-t border-gray-200 pt-6 mt-6">
      <h3
        class="text-2xl font-semibold mb-4 text-indigo-600 dark:text-custDarkerWhite"
      >
        User Bio
      </h3>
      <div
        class="bg-gray-100 p-4 rounded-lg flex justify-between items-center dark:bg-cardItemBg"
      >
        <div>
          <p class="text-gray-600 mb-1 dark:bg-cardItemBg dark:text-custGrey">
            About Me
          </p>
          <p class="text-xl font-medium dark:bg-cardItemBg dark:text-custGrey">
            {{ userData.bio || "No bio available" }}
          </p>
        </div>
        <button
          class="dark:bg-cardItemBg dark:text-custGrey dark:hover:text-custDarkerWhite"
          @click="openEditModal('Bio', userData.bio)"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: Object,
    openEditModal: Function,
  },
};
</script>
