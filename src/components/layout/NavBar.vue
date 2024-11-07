<template>
  <nav
    :class="[
      'navbar',
      'fixed top-0 left-0 w-full p-4 bg-transparent transition-all duration-1000 ease-in-out z-50 shadow-md',
      {
        'opacity-100 translate-y-0': isVisible,
        'opacity-0 -translate-y-full': !isVisible,
      },
    ]"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo Section -->
      <div class="flex items-center logo-container">
        <img
          v-if="!isMobileMenuOpen"
          src="@/assets/images/logo/logo.png"
          alt="Family Jewels Logo"
          class="h-20 w-auto mr-2 animate-logo cursor-pointer"
          @click="$router.push('/')"
        />
        <span
          class="text-xl font-bold animate-text cursor-pointer hidden lg:block text-black dark:text-custGrey"
          @click="$router.push('/')"
        >
          Family Jewels
        </span>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="lg:hidden text-black"
      >
        <template v-if="!isDarkMode"
          ><svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" /></svg
        ></template>
        <template v-else
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" /></svg
        ></template>
      </button>

      <!-- Desktop Navigation Links -->
      <ul class="hidden lg:flex lg:flex-row items-center text-black">
        <li
          v-for="(item, index) in currentNavItems"
          :key="item.to"
          class="nav-item w-auto"
        >
          <component
            :is="item.isLink ? 'router-link' : 'button'"
            :to="item.to"
            @click="handleClick(item.text)"
            class="text-lg font-medium flex items-center justify-center relative py-2 px-4 rounded-lg transition-all duration-300 text-black dark:text-custGrey"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Desktop Icons -->
            <template v-if="item.text === 'Dashboard'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-gauge mr-2"
              >
                <path d="m12 14 4-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
              <span>{{ item.text }}</span>
            </template>

            <template v-else-if="item.text === 'Library'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-library-big mr-2"
              >
                <rect width="8" height="18" x="3" y="3" rx="1" />
                <path d="M7 3v18" />
                <path
                  d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"
                />
              </svg>
              <span>{{ item.text }}</span>
            </template>

            <template v-else-if="item.text === 'Marketplace'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-store mr-2"
              >
                <path
                  d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"
                />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
                <path
                  d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"
                />
              </svg>
              <span>{{ item.text }}</span>
            </template>

            <template v-else-if="item.text === 'Upload'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-image-up mr-2"
              >
                <path
                  d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"
                />
                <path d="m14 19.5 3-3 3 3" />
                <path d="M17 22v-5.5" />
                <circle cx="9" cy="9" r="2" />
              </svg>
              <span>{{ item.text }}</span>
            </template>

            <template v-else-if="item.text === 'Profile'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-user pr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
              <span>{{ item.text }}</span>
            </template>

            <template v-else-if="item.text === 'Logout'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-log-out pr-2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span>{{ item.text }}</span>
            </template>

            <template v-else>
              {{ item.text }}
            </template>
          </component>
        </li>
        <li @click="toggleDarkMode" class="cursor-pointer">
          <template v-if="isDarkMode">
            <!-- Sun-Moon Icon for Dark Mode -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-sun-moon pl-2"
            >
              <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.9 4.9 1.4 1.4" />
              <path d="m17.7 17.7 1.4 1.4" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.3 17.7-1.4 1.4" />
              <path d="m19.1 4.9-1.4 1.4" />
            </svg>
          </template>
          <template v-else>
            <!-- Moon Icon for Light Mode -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-moon pl-2"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </template>
        </li>
      </ul>

      <!-- Mobile Navigation Links -->
      <ul
        v-if="isMobileMenuOpen"
        class="lg:hidden flex flex-col items-center text-black bg-white shadow-lg rounded-lg p-4 space-y-4 mt-4"
      >
        <!-- Row for Dark Mode Toggle and Close Button -->
        <div class="w-full flex justify-between items-center">
          <!-- Dark Mode Button -->
          <div @click="toggleDarkMode" class="cursor-pointer">
            <template v-if="isDarkMode">
              <!-- Sun-Moon Icon for Dark Mode -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-sun-moon"
              >
                <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.9 4.9 1.4 1.4" />
                <path d="m17.7 17.7 1.4 1.4" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.3 17.7-1.4 1.4" />
                <path d="m19.1 4.9-1.4 1.4" />
              </svg>
            </template>
            <template v-else>
              <!-- Moon Icon for Light Mode -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-moon"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </template>
          </div>

          <!-- Close Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="text-black cursor-pointer"
          >
            <template v-if="!isDarkMode">
              <!-- Close Icon for Light Mode -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </template>
            <template v-else>
              <!-- Hamburger Icon for Dark Mode -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </template>
          </button>
        </div>

        <!-- Other items in the mobile menu -->
        <li class="profile-list-item">
          <div class="profile-content">
            <div class="profile-photo">
              <img :src="userProfile?.imageUrl" alt="Profile photo" />
            </div>
            <span class="profile-name">{{ userProfile?.fullName }}</span>
          </div>
        </li>

        <!-- Horizontal Line Divider -->
        <hr class="w-full border-t border-gray-300 my-4" />

        <li
          v-for="(item, index) in currentNavItems"
          :key="item.to"
          class="w-full"
        >
          <component
            :is="item.isLink ? 'router-link' : 'button'"
            :to="item.to"
            @click="handleClick(item.text)"
            class="text-lg font-medium flex items-center justify-start w-full py-2 px-4 rounded-lg transition-all duration-300"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <span
              v-if="
                ![
                  'Dashboard',
                  'Library',
                  'Marketplace',
                  'Upload',
                  'Profile',
                  'Logout',
                ].includes(item.text)
              "
              >{{ item.text }}</span
            >
            <!-- Custom SVG for Dashboard -->
            <template v-if="item.text === 'Dashboard'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-gauge mr-2"
              >
                <path d="m12 14 4-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
              <span>{{ item.text }}</span>
            </template>
            <!-- Custom SVG for Library -->
            <template v-if="item.text === 'Library'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-library-big mr-2"
              >
                <rect width="8" height="18" x="3" y="3" rx="1" />
                <path d="M7 3v18" />
                <path
                  d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"
                />
              </svg>
              <span>{{ item.text }}</span>
            </template>
            <!-- Custom SVG for Marketplace -->
            <template v-if="item.text === 'Marketplace'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-store mr-2"
              >
                <path
                  d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"
                />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
                <path
                  d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"
                />
              </svg>
              <span>{{ item.text }}</span>
            </template>
            <!-- Custom SVG for Upload -->
            <template v-if="item.text === 'Upload'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-image-up mr-2"
              >
                <path
                  d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"
                />
                <path d="m14 19.5 3-3 3 3" />
                <path d="M17 22v-5.5" />
                <circle cx="9" cy="9" r="2" />
              </svg>
              <span>{{ item.text }}</span>
            </template>
            <!-- Custom SVG for Profile -->
            <template v-if="item.text === 'Profile'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-user mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
              <span>{{ item.text }}</span>
            </template>
            <!-- Custom SVG for Logout -->
            <template v-if="item.text === 'Logout'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-log-out mr-2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span>{{ item.text }}</span>
            </template>
          </component>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { logOut } from "@/services/firebase/auth";
import { useRouter } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { retrieveUserProfile } from "../../services/firebase/profile";
library.add(faUser, faRightFromBracket);

export default {
  name: "NavBar",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated, user } = storeToRefs(authStore);
    const router = useRouter();

    // Dark mode state
    const isDarkMode = ref(false);

    const userId = ref(null);
    const userProfile = ref(null); // User Profile
    const isVisible = ref(true);
    const lastScrollY = ref(0);
    const isMobileMenuOpen = ref(false); // To control mobile menu visibility

    const navItems = {
      guest: [
        { to: "/marketplace", text: "Shop", isLink: true },
        { to: "/login", text: "Login", isLink: true },
        { to: "/signup", text: "Signup", isLink: true },
      ],
      loggedIn: [
        { to: "/dashboard", text: "Dashboard", isLink: true },
        { to: "/library", text: "Library", isLink: true },
        { to: "/marketplace", text: "Marketplace", isLink: true },
        { to: "/upload", text: "Upload", isLink: true },
        {
          to: "/profile",
          text: "Profile",
          isIcon: true,
          icon: faUser,
          isLink: true,
        },
        {
          to: "#",
          text: "Logout",
          isIcon: true,
          icon: faRightFromBracket,
          isLink: false,
        },
      ],
    };

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.documentElement.classList.toggle("dark", isDarkMode.value);
      localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
    };

    const loadTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      console.log("Loaded theme:", savedTheme); // Check if correct theme is loaded
      if (savedTheme === "dark") {
        isDarkMode.value = true;
        document.documentElement.classList.add("dark");
      }
    };

    const currentNavItems = computed(() =>
      isAuthenticated.value ? navItems.loggedIn : navItems.guest
    );

    const retrieveUserDetails = async () => {
      try {
        userId.value = user.value.uid;
        userProfile.value = await retrieveUserProfile(userId.value);
      } catch (error) {
        console.error("Failed to retrieve user profile:", error);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isVisible.value =
        lastScrollY.value > currentScrollY || currentScrollY < 10;
      lastScrollY.value = currentScrollY;
    };

    const handleClick = (text) => {
      if (text === "Logout") {
        handleLogout();
      }
    };

    const handleLogout = async () => {
      try {
        await logOut();
        authStore.clearUser();
        window.location.assign("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    onMounted(async () => {
      loadTheme();
      await retrieveUserDetails(); // Call user profile retrieval on mount
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));

    return {
      isVisible,
      currentNavItems,
      handleLogout,
      handleClick,
      isMobileMenuOpen,
      userProfile,
      retrieveUserProfile,
      userId,
      retrieveUserDetails,
      isDarkMode,
      toggleDarkMode,
    };
  },
};
</script>

<style scoped>
/* Navbar styling for responsiveness */
.router-link-active {
  font-weight: bold;
}

.nav-item {
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInDown 0.5s ease forwards;
}

.nav-item:hover {
  cursor: pointer;
}

.logo-container {
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
}

.animate-logo {
  animation: rotateIn 1s ease-out forwards;
}

.animate-text {
  opacity: 0;
  animation: slideIn 1s ease-out forwards 0.5s;
}

@keyframes fadeInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes rotateIn {
  from {
    transform: rotate(-360deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Button styles */
.logout-btn,
.profile-btn,
.login-btn,
.signup-btn {
  @apply px-4 py-2 rounded;
}

.profile-btn,
.logout-btn {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800;
}

.login-btn {
  @apply bg-purple text-white;
  margin-left: 1vw;
}

.signup-btn {
  @apply bg-blue text-white;
}

.profile-list-item {
  padding: 1rem;
  border-radius: 10px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-photo {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 2px solid black;
  overflow: hidden;
  margin-bottom: 0.5rem; /* Space between photo and name */
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-name {
  font-size: 1.2rem;
  color: black;
  text-align: center;
}

/* Style for active desktop link */
.router-link-active {
  color: #3700b3; /* Adjust to a darker color for contrast */
  font-weight: bold;
  border-radius: 8px;
  padding: 0.5rem 1rem; /* Increase padding for emphasis */
}

.dark .router-link-active {
  color: #d9d5d5; /* Dark mode color */
}

.navbar {
  background-color: var(--background-color);
  color: var(--text-color);
}

.dark .navbar {
  background-color: #1e293b;
}

.button {
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
}
</style>
