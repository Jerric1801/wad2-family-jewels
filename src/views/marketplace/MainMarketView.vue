<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 pt-[100px]">
      <h1 class="text-3xl font-bold mb-8">Marketplace</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <!-- Placeholder for marketplace items -->
        <div
          v-for="item in marketplaceItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ item.name }}</h2>
            <p class="text-gray-600 mb-2">{{ item.description }}</p>
            <p class="text-lg font-bold text-blue-600">
              ${{ item.price.toFixed(2) }}
            </p>
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
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default {
  name: "MainMarket",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      marketplaceItems: [
        // Placeholder data, replace with actual data from your backend
        {
          id: 1,
          name: "Diamond Ring",
          description: "Beautiful diamond ring",
          price: 999.99,
          image: "https://placeholder.com/300x200",
        },
        {
          id: 2,
          name: "Gold Necklace",
          description: "Elegant gold necklace",
          price: 599.99,
          image: "https://placeholder.com/300x200",
        },
        {
          id: 3,
          name: "Silver Bracelet",
          description: "Stylish silver bracelet",
          price: 299.99,
          image: "https://placeholder.com/300x200",
        },
        {
          id: 4,
          name: "Pearl Earrings",
          description: "Classic pearl earrings",
          price: 199.99,
          image: "https://placeholder.com/300x200",
        },
        // Add more items as needed
      ],
    };
  },
};
</script>
