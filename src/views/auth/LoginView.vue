<template>
  <DefaultLayout>
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <img
            class="mx-auto h-40 w-auto"
            src="@/assets/images/logo/logo.png"
            alt="Family Jewels Logo"
          />
          <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p class="mt-2 text-center text-base text-gray-600">
            Or
            <router-link
              to="/signup"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </router-link>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                v-model="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                for="remember-me"
                class="ml-2 block text-base text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div class="text-base">
              <a
                href="/password-reset"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div v-if="errorMessage" class="text-red-500 text-center">
            {{ errorMessage }}
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg
                  class="h-6 w-6 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                ></svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { handleLogin } from "@/services/firebase/auth";

export default {
  name: "LoginView",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = ""; 
      try {
        await handleLogin(this.email, this.password);
        this.$router.push("/profile"); 
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          this.errorMessage = "Invalid password";
        } else if (error.code === "auth/user-not-found") {
          this.errorMessage = "No user with that email found";
        } else {
          this.errorMessage = "An error occurred during login. Please try again.";
        }
      }
    },
  },
};
</script>
