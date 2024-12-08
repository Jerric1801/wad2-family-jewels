<template>
  <DefaultLayout>
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-[15vh] dark:bg-darkModeBg"
    >
      <div class="max-w-sm w-full space-y-6 animate-pulse-fast">
        <div>
          <img
            class="mx-auto h-32 w-auto animate-logo"
            src="@/assets/images/logo/logo.png"
            alt="Family Jewels Logo"
          />
          <h2
            class="mt-4 text-center text-xl font-semibold text-gray-900 animate-fields"
          >
            <span
              class="bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent dark:text-custDarkerWhite"
              style="animation: animateText 1.5s ease-in forwards"
            >
              Create your account
            </span>
          </h2>
          <p
            class="mt-1 text-center text-xs text-gray-600 animate-fields dark:text-custGrey"
          >
            Or
            <router-link
              to="/login"
              class="font-medium text-blue hover:text-indigo-500 text-xs dark:text-tailwindBlue"
            >
              sign in to your existing account
            </router-link>
          </p>
        </div>
        <form
          class="mt-6 space-y-4 animate-fields"
          @submit.prevent="handleSignUp"
        >
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="full-name" class="sr-only">Full name</label>
              <input
                id="full-name"
                v-model="name"
                name="name"
                type="text"
                required
                class="appearance-none rounded-none block w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-cardItemBg dark:text-custGrey"
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
                class="appearance-none rounded-none block w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-cardItemBg dark:text-custGrey"
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
                class="appearance-none rounded-none block w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-cardItemBg dark:text-custGrey"
                placeholder="Password (min 6 chars)"
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
                class="appearance-none rounded-none block w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-cardItemBg dark:text-custGrey"
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
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:text-indigo-400 dark:focus:ring-indigo-400 dark:bg-cardItemBg"
              />
              <label
                for="terms-and-privacy"
                class="ml-2 text-xs text-gray-900 dark:text-custGrey"
              >
                I agree to the
                <router-link
                  to="/terms"
                  class="font-medium text-blue hover:text-indigo-500 dark:text-tailwindBlue"
                  >Terms of Service</router-link
                >
                and
                <router-link
                  to="/privacy"
                  class="font-medium text-blue hover:text-indigo-500 dark:text-tailwindBlue"
                  >Privacy Policy</router-link
                >
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 btn-animate dark:bg-darkModeBtnGrey dark:text-custWhite dark:hover:bg-custDarkGrey"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-2">
                <svg
                  class="h-5 w-5 text-purple group-hover:text-blue"
                  :class="{ 'spin-once': spin }"
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
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-popup"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">Account Created Successfully!</h3>
        <p class="text-sm mb-6">
          Your account has been created. You can now log in.
        </p>
        <button
          @click="closeSuccessPopup"
          class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-300"
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
      spin: false, // Add a flag for spinning the icon once
    };
  },
  methods: {
    async handleSignUp() {
      if (this.password.length < 6) {
        console.error("Password must be at least 6 characters long");
        return;
      }

      if (this.password !== this.confirmPassword) {
        console.error("Passwords do not match");
        return;
      }

      this.spin = true; // Trigger the spinning of the icon

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

        // Stop the spin after a short delay
        setTimeout(() => {
          this.spin = false;
        }, 1000); // 1 second matches the spin duration
      } catch (error) {
        console.error("Error signing up:", error);
        this.spin = false; // Stop spin on error
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

<style scoped>
/* Animate the logo */
@keyframes fadeInBounce {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Fade and slide up the form */
@keyframes fadeInSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade in for the success popup */
@keyframes fadeInPopup {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animate text */
@keyframes animateText {
  0% {
    color: transparent;
  }
  100% {
    color: #4f46e5; /* Color for the gradient */
  }
}

/* Define the spinOnce animation */
@keyframes spinOnce {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Apply the animation to the icon */
.spin-once {
  animation: spinOnce 1s ease-in-out; /* Spin once in 1 second */
}

/* Style input fields for a nice slide-in effect */
.animate-fields {
  animation: fadeInSlideUp 1.5s ease forwards;
}

/* Style logo animation */
.animate-logo {
  animation: fadeInBounce 1s ease forwards;
}

/* Style the button hover effect */
.btn-animate:hover {
  background-color: #6b21a8 !important; /* Darker purple */
  transform: translateY(-2px);
  transition: background-color 0.3s, transform 0.2s;
}

/* Animate success popup */
.animate-popup {
  animation: fadeInPopup 0.5s ease forwards;
}
</style>
