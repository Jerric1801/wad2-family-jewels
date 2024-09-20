<template>
  <nav
    :class="[
      'navbar',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full',
    ]"
    class="fixed top-0 left-0 w-full p-4 bg-transparent transition-all duration-1000 ease-in-out z-50 shadow-md"
  >
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center logo-container">
        <img
          src="@/assets/images/logo/logo.png"
          alt="Family Jewels Logo"
          class="h-20 w-auto mr-2 animate-logo"
          onclick="window.location.href = '/'"
        />
        <span
          class="text-xl font-bold animate-text"
          onclick="window.location.href = '/'"
          >Family Jewels</span
        >
      </div>
      <ul class="flex space-x-6 text-black">
        <li
          v-for="(item, index) in currentNavItems"
          :key="item.to"
          class="nav-item"
        >
          <router-link
            v-if="item.text !== 'Logout'"
            :to="item.to"
            class="text-lg font-medium"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            {{ item.text }}
          </router-link>
          <a
            v-else
            href="#"
            @click.prevent="logout"
            class="text-lg font-medium"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { handleLogout } from "@/services/firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "NavBar",
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);
    const router = useRouter();

    const isVisible = ref(true);
    const lastScrollY = ref(0);
    const guestNavItems = [
      { to: "/", text: "Home" },
      { to: "/marketplace", text: "Marketplace" },
      { to: "/login", text: "Login" },
    ];
    const loggedInNavItems = [
      { to: "/", text: "Home" },
      { to: "/marketplace", text: "Marketplace" },
      { to: "/upload", text: "Upload Jewelry" },
      { to: "/profile", text: "Profile" },
      { to: "/logout", text: "Logout" },
    ];

    const currentNavItems = computed(() => {
      return isAuthenticated.value ? loggedInNavItems : guestNavItems;
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isVisible.value =
        lastScrollY.value > currentScrollY || currentScrollY < 10;
      lastScrollY.value = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const logout = async () => {
      try {
        await handleLogout();
        router.push("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    return {
      isAuthenticated,
      isVisible,
      currentNavItems,
      logout,
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

@keyframes fadeInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
