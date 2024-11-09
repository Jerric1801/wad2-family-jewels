<template>
  <DefaultLayout>
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-[15vh] dark:bg-darkModeBg"
    >
      <div class="max-w-sm w-full space-y-6">
        <div>
          <img
            class="mx-auto h-28 w-auto animate-logo"
            src="@/assets/images/logo/logo.png"
            alt="Family Jewels Logo"
          />
          <h2 class="mt-4 text-center text-xl font-semibold text-gray-900">
            <span
              class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent dark:text-custDarkerWhite"
            >
              Sign in to your account
            </span>
          </h2>
          <p class="mt-1 text-center text-xs text-gray-600 dark:text-custGrey">
            Or
            <router-link
              to="/signup"
              class="font-medium text-blue text-xs hover:text-indigo-500 dark:text-tailwindBlue"
            >
              create a new account
            </router-link>
          </p>
        </div>
        <form class="mt-6 space-y-4" @submit.prevent="handleLogin">
          <div class="rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                v-model="email"
                autocomplete="email"
                required
                class="appearance-none rounded-t-md w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-cardItemBg dark:text-custGrey"
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
                class="appearance-none rounded-b-md w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-cardItemBg dark:text-custGrey"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                href="/password-reset"
                class="text-xs text-blue hover:text-indigo-500 dark:text-tailwindBlue"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div
            v-if="errorMessage"
            class="text-red-500 text-center text-xs animate-bounce"
          >
            {{ errorMessage }}
          </div>

          <div>
            <button
              type="submit"
              class="group w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 btn-animate dark:bg-darkModeBtnGrey dark:text-custWhite dark:hover:bg-custDarkGrey"
            >
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
import { signIn } from "@/services/firebase/auth";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "LoginView",
  components: {
    DefaultLayout,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const handleLogin = async () => {
      errorMessage.value = "";
      try {
        await signIn(email.value, password.value);

        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            await nextTick(); // Ensures the DOM is updated after login
            window.location.assign("/profile");
          }
        });
      } catch (error) {
        errorMessage.value = "Invalid credentials. Please try again.";
      }
    };

    return {
      email,
      password,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<style scoped>
@keyframes spinOnce {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin-once {
  animation: spinOnce 1s ease-in-out;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-in forwards;
}
</style>
