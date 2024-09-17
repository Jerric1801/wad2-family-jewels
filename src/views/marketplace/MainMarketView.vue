<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 pt-[150px]">
      <h1 class="text-3xl font-bold mb-8">Marketplace</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <!-- Placeholder for marketplace items -->
        <div
          v-for="item in marketplaceItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
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
              class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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

export default {
  name: "MainMarket",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      marketplaceItems: [],
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
    try {
      this.marketplaceItems = await getMarketplaceItems();
    } catch (error) {
      console.error("Error fetching marketplace items:", error);
    }
  },
};
</script>
