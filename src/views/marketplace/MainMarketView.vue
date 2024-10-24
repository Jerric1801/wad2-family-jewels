<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 pt-[100px] md:pt-[150px] pb-[20vh]">
      <h1 class="font-bold text-xxxl mb-8 text-center w-auto">
        <span
          class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
        >
          Marketplace</span
        >
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in marketplaceItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <img
            :src="getImageUrl(item.image)"
            :alt="item.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
            <p class="text-gray-600 mb-2">{{ item.description }}</p>
            <p class="text-lg font-bold text-blue-600">${{ item.price }}</p>
            <button
              class="mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { getMarketplaceItems } from "@/services/firebase/marketplace";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "MainMarketView",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      marketplaceItems: [],
      userLoggedIn: false,
      user: null,
    };
  },
  methods: {
    getImageUrl(imageName) {
      try {
        return new URL(
          `/src/assets/images/marketplace_images/${imageName}`,
          import.meta.url
        ).href;
      } catch (error) {
        console.error("Error loading image:", error);
        return "";
      }
    },
  },
  async created() {
    // Removed the duplicate created() hook
    try {
      this.marketplaceItems = await getMarketplaceItems();

      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          this.userLoggedIn = true;
          this.user = user;
        } else {
          this.userLoggedIn = false;
          this.user = null;
        }
      });
    } catch (error) {
      console.error("Error fetching marketplace items:", error);
    }
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
}
</style>
