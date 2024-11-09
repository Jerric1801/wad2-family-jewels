<template>
  <DefaultLayout>
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-darkModeBg"
    >
      <div class="max-w-sm w-full space-y-6">
        <div>
          <img
            class="mx-auto h-28 w-auto"
            src="@/assets/images/logo/logo.png"
            alt="Family Jewels Logo"
          />
          <h2
            class="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-custDarkerWhite"
          >
            Reset your password
          </h2>
          <p class="mt-1 text-center text-sm text-gray-600 dark:text-custGrey">
            Enter your email address, and we’ll send you a link to reset your
            password.
          </p>
        </div>
        <form class="mt-6 space-y-4" @submit.prevent="handlePasswordReset">
          <div class="rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-md w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-cardItemBg dark:text-custGrey"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-darkModeBtnGrey dark:text-custWhite dark:hover:bg-custDarkGrey"
            >
              Send reset link
            </button>
          </div>
        </form>
        <div class="text-center">
          <router-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-tailwindBlue text-sm"
          >
            Back to login
          </router-link>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "PasswordResetView",
  components: {
    DefaultLayout,
  },
};
</script>
