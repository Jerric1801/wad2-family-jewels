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
            Create your account
          </h2>
          <p class="mt-2 text-center text-base text-gray-600">
            Or
            <router-link
              to="/login"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </router-link>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="full-name" class="sr-only">Full name</label>
              <input
                id="full-name"
                v-model="name"
                name="name"
                type="text"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
                placeholder="Full name"
              />
            </div>
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                minlength="6"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
                placeholder="Password (minimum 6 characters)"
              />
            </div>
            <div>
              <label for="confirm-password" class="sr-only"
                >Confirm Password</label
              >
              <input
                id="confirm-password"
                name="confirm-password"
                v-model="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                minlength="6"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="terms-and-privacy"
                name="terms-and-privacy"
                type="checkbox"
                required
                class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                for="terms-and-privacy"
                class="ml-2 block text-sm text-gray-900"
              >
                I agree to the
                <router-link
                  to="/terms"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  >Terms of Service</router-link
                >
                and
                <router-link
                  to="/privacy"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  >Privacy Policy</router-link
                >
              </label>
            </div>
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
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Popup -->
    <div
      v-if="showSuccessPopup"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div class="bg-white p-12 rounded-lg shadow-lg max-w-md w-full">
        <h3 class="text-2xl font-bold mb-6">Account Created Successfully!</h3>
        <p class="text-lg mb-8">
          Your account has been created. You can now log in.
        </p>
        <button
          @click="closeSuccessPopup"
          class="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default {
  name: "SignUpView",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showSuccessPopup: false,
    };
  },
  methods: {
    async handleSignUp() {
      if (this.password.length < 6) {
        console.error("Password must be at least 6 characters long");
        // Display an error message to the user
        return;
      }

      if (this.password !== this.confirmPassword) {
        console.error("Passwords do not match");
        // Display an error message to the user
        return;
      }

      const auth = getAuth();
      const db = getFirestore();

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        await this.createUserProfile(user.uid, db);

        console.log("Signed up as:", user.uid);
        this.showSuccessPopup = true;
      } catch (error) {
        console.error("Error signing up:", error);
        // Display an error message to the user
        // You might want to add error handling logic here
      }
    },

    async createUserProfile(userId, db) {
      await setDoc(doc(db, "user-profile", userId), {
        bio: "",
        fullName: this.name,
        photoURL: "",
        email: this.email,
      });
    },

    closeSuccessPopup() {
      this.showSuccessPopup = false;
      this.$router.push("/login");
    },
  },
};
</script>
