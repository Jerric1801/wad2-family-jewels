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
          >Family Jewels</span
        >
      </div>
      <ul class="flex space-x-6 text-black">
        <li
          v-for="(item, index) in currentNavItems"
          :key="item.to"
          class="nav-item"
        >
          <component
            :is="item.text === 'Logout' ? 'a' : 'router-link'"
            :to="item.to"
            :href="item.text === 'Logout' ? '#' : undefined"
            @click="handleClick(item.text)"
            class="text-lg font-medium"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            {{ item.text }}
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

export default {
  name: "NavBar",
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);
    const router = useRouter();

    const isVisible = ref(true);
    const lastScrollY = ref(0);
    const navItems = {
      guest: [
        { to: "/", text: "Home" },
        { to: "/marketplace", text: "Marketplace" },
        { to: "/login", text: "Login" },
      ],
      loggedIn: [
        { to: "/", text: "Home" },
        { to: "/marketplace", text: "Marketplace" },
        { to: "/upload", text: "Upload Jewelry" },
        { to: "/profile", text: "Profile" },
        { to: "#", text: "Logout" },
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

    return { isVisible, currentNavItems, handleLogout, handleClick };
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
</style>
