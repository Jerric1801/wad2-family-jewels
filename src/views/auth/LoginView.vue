<template>
  <DefaultLayout>
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-[20vh]"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <img
            class="mx-auto h-40 w-auto animate-logo"
            src="@/assets/images/logo/logo.png"
            alt="Family Jewels Logo"
          />
          <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
            <span
              class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
            >
              Sign in to your account
            </span>
          </h2>
          <p class="mt-2 text-center text-base text-gray-600">
            Or
            <router-link
              to="/signup"
              class="font-medium text-blue hover:text-indigo-500"
            >
              create a new account
            </router-link>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
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
            <div class="text-base">
              <a
                href="/password-reset"
                class="font-medium text-blue hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div
            v-if="errorMessage"
            class="text-red-500 text-center animate-bounce"
          >
            {{ errorMessage }}
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 btn-animate"
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
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1.5s ease-in forwards;
}
</style>
