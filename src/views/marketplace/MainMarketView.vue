<template>
  <DefaultLayout>
    <div
      class="container mx-auto px-2 pt-[80px] md:pt-[120px] pb-[15vh] flex flex-col md:flex-row dark:bg-darkModeBg"
    >
      <!-- Filter Section -->
      <div class="w-full md:w-1/4 md:pr-6 mb-3 md:mb-0 pt-[15px]">
        <div class="sticky top-0">
          <div class="p-3">
            <h3 class="text-sm font-semibold mb-3 dark:text-custDarkerWhite">
              Filter
            </h3>
            <div class="mb-3">
              <!-- Search Input -->
              <input
                type="text"
                class="form-input w-full border-gray-300 border rounded-md p-1.5 text-sm focus:ring focus:border-blue-400 dark:bg-cardItemBg dark:text-custGrey"
                placeholder="Search..."
                v-model="searchTerm"
              />
            </div>
            <div class="mb-3">
              <!-- Category Select Dropdown -->
              <select
                class="form-select w-full border-gray-300 border rounded-md p-1.5 text-sm focus:ring focus:border-blue-400 dark:bg-cardItemBg dark:text-custGrey"
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
        <h1 class="font-bold text-2xl mb-6 text-center w-auto">
          <span
            class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent dark:text-custDarkerWhite"
          >
            Marketplace
          </span>
        </h1>

        <!-- Product Grid with Responsive Classes -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        >
          <div
            v-for="(item, index) in filteredMarketplaceItems"
            :key="item.id"
            class="rounded-lg overflow-hidden animate-fade-in-up shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 dark:bg-cardItemBg flex flex-col h-full"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <img
              :src="item.data.image"
              :alt="item.data.title"
              class="w-full h-36 md:h-32 lg:h-36 object-cover"
            />
            <div class="p-3 flex-grow">
              <h2 class="text-lg md:text-base mb-1 dark:text-custWhite">
                {{ item.data.title }}
              </h2>
              <p class="text-gray-600 text-xs mb-1 dark:text-custGrey pt-2">
                {{ item.data.description }}
              </p>
              <p class="text-sm text-blue-600 dark:text-custWhite pt-2">
                ${{ item.data.price }}
              </p>
            </div>
            <button
              @click="showItemModal(item)"
              class="mt-auto bg-blue text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition-colors w-full dark:bg-darkModeBtnGrey dark:text-custWhite dark:hover:bg-custDarkGrey border-t"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Item Modal -->
    <ItemModal v-if="showModal" :item="selectedItem" @modal-closed="closeItemModal"/>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { getAllListedItems } from "@/services/firebase/marketplace";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ItemModal from "@/components/common/ItemModal.vue";

export default {
  name: "MainMarketView",
  components: {
    DefaultLayout,
    ItemModal,
  },
  data() {
    return {
      marketplaceItems: [],
      searchTerm: "",
      selectedCategory: "",
      categories: ["Necklaces", "Earrings", "Rings", "Bracelets"],
      userLoggedIn: false,
      user: null,
      windowWidth: window.innerWidth,
      showModal: false,
      selectedItem: null,
    };
  },
  computed: {
    filteredMarketplaceItems() {
      return this.marketplaceItems.filter(
        (item) =>
          item.data.title
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) &&
          (this.selectedCategory === "" ||
            item.data.category === this.selectedCategory)
      );
    },
  },
  methods: {
    showItemModal(item) {
      this.selectedItem = item;
      console.log(item)
      this.showModal = true;
    },
    closeItemModal() {
      this.showModal = false;
      this.selectedItem = null; // Reset selected item if needed
    },
  },
  async created() {
    try {
      this.marketplaceItems = await getAllListedItems();

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
