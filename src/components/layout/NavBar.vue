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
      <div class="flex items-center logo-container">
        <img
          src="@/assets/images/logo/logo.png"
          alt="Family Jewels Logo"
          class="h-20 w-auto mr-2 animate-logo cursor-pointer"
          @click="$router.push('/')"
        />
        <span
          class="text-xl font-bold animate-text cursor-pointer"
          @click="$router.push('/')"
          v-if="windowWidth > 800"
          >Family Jewels</span
        >
      </div>
      <ul class="flex items-center space-x-6 text-black">
        <li
          v-for="(item, index) in currentNavItems"
          :key="item.to"
          class="nav-item"
        >
          <component
            :is="item.isLink ? 'router-link' : 'button'"
            :to="item.to"
            @click="handleClick(item.text)"
            class="text-lg font-medium relative"
            :class="{
              'logout-btn': item.text === 'Logout',
              'profile-btn': item.text === 'Profile',
              'upload-btn': item.text === 'Upload',
              'login-btn': item.text === 'Login',
              'signup-btn': item.text === 'Signup',
            }"
            :style="{ animationDelay: `${index * 0.2}s` }"
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

    const windowWidth = ref(window.innerWidth);

    watchEffect(() => {
      window.addEventListener("resize", () => {
        windowWidth.value = window.innerWidth;
      });
    });

    onMounted(() => window.addEventListener("scroll", handleScroll));
    onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));

    return {
      isVisible,
      currentNavItems,
      handleLogout,
      handleClick,
      windowWidth,
    };
  },
};
</script>

<style scoped>
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
