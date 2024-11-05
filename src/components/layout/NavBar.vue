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
      <div v-if="!isMobileMenuOpen" class="flex items-center logo-container">
        <img
          src="@/assets/images/logo/logo.png"
          alt="Family Jewels Logo"
          class="h-20 w-auto mr-2 animate-logo cursor-pointer"
          @click="$router.push('/')"
        />
        <span
          class="text-xl font-bold animate-text cursor-pointer hidden lg:block"
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
        <!-- Hamburger button -->
        <svg
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
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      <!-- Navigation Links -->
      <ul
        :class="[
          'flex flex-col lg:flex-row items-center lg:space-x-6 text-black bg-white lg:bg-transparent',
          { 'hidden lg:flex': !isMobileMenuOpen },
        ]"
        class="space-y-4 lg:space-y-0 mt-4 lg:mt-0 shadow-lg lg:shadow-none rounded-lg p-4 lg:p-0"
      >
        <li v-if="isMobileMenuOpen" class="text-right mt-2">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen">
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
          </button>
        </li>
        <li
          v-for="(item, index) in currentNavItems"
          :key="item.to"
          class="nav-item w-full lg:w-auto"
        >
          <component
            :is="item.isLink ? 'router-link' : 'button'"
            :to="item.to"
            @click="handleClick(item.text)"
            class="text-lg font-medium flex items-center justify-center relative w-full lg:w-auto py-2 px-4 rounded-lg transition-all duration-300"
            :class="{
              'bg-indigo-600 text-white hover:bg-indigo-500':
                item.text === 'Logout',
              'bg-gray-200 hover:bg-gray-300 text-gray-700':
                item.text === 'Profile',
              'bg-blue-500 text-white hover:bg-blue-400':
                item.text === 'Upload',
              'bg-green-500 text-white hover:bg-green-400':
                item.text === 'Login',
              'bg-purple-500 text-white hover:bg-purple-400':
                item.text === 'Signup',
            }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <span v-if="!item.isIcon">{{ item.text }}</span>
            <font-awesome-icon
              v-if="item.isIcon"
              :icon="item.icon"
              class="text-xl"
            />
          </component>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { onMounted, onBeforeUnmount, ref, computed, watchEffect } from "vue";
import { logOut } from "@/services/firebase/auth";
import { useRouter } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUser, faRightFromBracket);

export default {
  name: "NavBar",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);
    const router = useRouter();

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

    const currentNavItems = computed(() =>
      isAuthenticated.value ? navItems.loggedIn : navItems.guest
    );

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

    onMounted(() => window.addEventListener("scroll", handleScroll));
    onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));

    return {
      isVisible,
      currentNavItems,
      handleLogout,
      handleClick,
      isMobileMenuOpen,
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
.upload-btn,
.login-btn,
.signup-btn {
  @apply px-4 py-2 rounded;
}

.profile-btn,
.logout-btn {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800;
}

.upload-btn {
  @apply bg-gradient-to-r from-blue to-purple text-white;
}

.login-btn {
  @apply bg-purple text-white;
  margin-left: 1vw;
}

.signup-btn {
  @apply bg-blue text-white;
}
</style>
