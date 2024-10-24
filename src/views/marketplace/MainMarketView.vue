<template>
  <DefaultLayout>
    <div
      class="container mx-auto px-3 pt-[100px] md:pt-[150px] pb-[20vh] flex flex-col md:flex-row"
    >
      <!-- Filter Section -->
      <div class="w-full md:w-1/4 md:pr-8 md:pl-4">
        <div class="sticky top-0">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-4">Filter</h3>
            <div class="mb-4">
              <input
                type="text"
                class="form-input w-full border-gray-300 border rounded-lg p-2 focus:ring focus:border-blue-400"
                placeholder="Search..."
                v-model="searchTerm"
              />
            </div>
            <div class="mb-4">
              <select
                class="form-select w-full border-gray-300 border rounded-lg p-2 focus:ring focus:border-blue-400"
                v-model="selectedCategory"
              >
                <option value="">Select Category</option>
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Marketplace Section -->
      <div class="w-full md:w-3/4">
        <h1 class="font-bold text-xxxl mb-8 text-center w-auto">
          <span
            class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
          >
            Marketplace
          </span>
        </h1>

        <!-- Product Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          :class="{ 'grid-cols-2': windowWidth < 1000 }"
        >
          <div
            v-for="(item, index) in filteredMarketplaceItems"
            :key="item.id"
            class="rounded-lg overflow-hidden animate-fade-in-up shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
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
                class="mt-4 bg-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
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
      searchTerm: "",
      selectedCategory: "",
      categories: ["Necklace", "Earrings", "Rings", "Bracelet"],
      userLoggedIn: false,
      user: null,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    filteredMarketplaceItems() {
      return this.marketplaceItems.filter(
        (item) =>
          item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
          (this.selectedCategory === "" ||
            item.category === this.selectedCategory)
      );
    },
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

      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
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
