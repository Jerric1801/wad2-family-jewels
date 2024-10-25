<template>
  <DefaultLayout>
    <div
      class="container mx-auto px-4 pt-[100px] md:pt-[150px] flex flex-col justify-center items-center"
    >
      <h2
        class="text-3xl font-bold mb-4 bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
      >
        Your Jewelry Library
      </h2>

      <!-- Display listed items -->
      <div v-if="listedImages.length > 0" class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Listed Items</h3>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full"
        >
          <div
            v-for="(item, index) in listedImages"
            :key="item.id"
            class="relative animate-slide-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Display image -->
            <img
              :src="item.data.image || tempImg"
              alt="Item Image"
              class="w-full h-64 object-cover rounded shadow-md mb-4"
            />
            <!-- Display item details -->
            <div class="p-4">
              <h4 class="text-lg font-bold">
                {{ item.data.title || "Item Name" }}
              </h4>
              <p class="text-gray-600">
                {{ item.data.description || "No Description" }}
              </p>
              <p class="text-lg pt-3 font-bold">
                {{
                  item.data.price ? "$" + item.data.price : "Price Unavailable"
                }}
              </p>
            </div>
            <!-- Open modal to edit item details -->
            <div class="pt-3">
              <ButtonComponent
                variant="primary"
                size="md"
                @click="openListModal(item)"
                :class="'absolute bottom-4 right-4 edit-btn'"
              >
                Edit Listing
                <FontAwesomeIcon :icon="faPencil" />
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>

      <!-- Display unlisted items -->
      <div v-if="unlistedImages.length > 0" class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Unlisted Items</h3>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full"
        >
          <div
            v-for="(item, index) in unlistedImages"
            :key="item.id"
            class="relative animate-slide-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Display image -->
            <img
              :src="item.data.image || tempImg"
              alt="Item Image"
              class="w-full h-64 object-cover rounded shadow-md mb-4"
            />
            <!-- Display item details -->
            <div class="p-4">
              <h4 class="text-lg font-bold">
                {{ item.data.title || "Item Name" }}
              </h4>
              <p class="text-gray-600">
                {{ item.data.description || "No Description" }}
              </p>
              <p class="text-lg pt-3 font-bold">
                {{
                  item.data.price ? "$" + item.data.price : "Price Unavailable"
                }}
              </p>
            </div>
            <!-- Open modal to edit item details -->
            <div class="pt-3">
              <ButtonComponent
                variant="primary"
                size="md"
                @click="openListModal(item)"
                :class="'absolute bottom-4 right-4 edit-btn'"
              >
                Edit Listing
                <FontAwesomeIcon :icon="faPencil" />
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="listedImages.length === 0 && unlistedImages.length === 0"
        class="text-gray-500 mt-4"
      >
        You have no saved library items yet.
      </div>

      <!-- Modal Background Overlay -->
      <div
        v-if="showListModal"
        class="fixed inset-0 z-40 bg-black bg-opacity-50"
      ></div>

      <!-- Modal Content with Transition -->
      <div
        v-if="showListModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full transform transition-transform duration-300 scale-100 modal-content"
        >
          <h3 class="text-2xl font-semibold text-center mb-6">
            Edit Listing Details
          </h3>
          <form @submit.prevent="saveItemDetails">
            <!-- Title Field -->
            <div class="mb-6">
              <label for="title" class="block text-gray-700 font-medium mb-2"
                >Title:</label
              >
              <input
                type="text"
                v-model="listTitle"
                class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full"
                required
              />
            </div>

            <!-- Price Field -->
            <div class="mb-6">
              <label for="price" class="block text-gray-700 font-medium mb-2"
                >Price:</label
              >
              <input
                type="number"
                v-model="listPrice"
                class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full"
                required
              />
            </div>

            <!-- Description Field -->
            <div class="mb-6">
              <label
                for="description"
                class="block text-gray-700 font-medium mb-2"
                >Description:</label
              >
              <textarea
                v-model="listDescription"
                class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full h-32 resize-none"
                required
              ></textarea>
            </div>

            <!-- Category Dropdown -->
            <div class="mb-6">
              <label for="category" class="block text-gray-700 font-medium mb-2"
                >Category:</label
              >
              <select
                v-model="selectedCategory"
                class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full"
              >
                <option disabled value="">Select a category</option>
                <option
                  v-for="eachCat in itemCategories"
                  :key="eachCat"
                  :value="eachCat"
                >
                  {{ eachCat }}
                </option>
              </select>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4 mt-6">
              <ButtonComponent
                @click="closeListModal"
                variant="primary"
                size="md"
                class="cancel-btn"
              >
                Cancel
              </ButtonComponent>
              <ButtonComponent
                @click="saveItemDetails"
                variant="primary"
                size="md"
                class="update-btn"
              >
                Update Listing
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { getLibraryItems } from "@/services/firebase/library";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import tempImg from "@/assets/images/home/product_2.jpg";
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "UserLibraryView",
  components: {
    DefaultLayout,
    ButtonComponent,
    FontAwesomeIcon,
  },
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated, user } = storeToRefs(authStore);
    const router = useRouter();

    const userId = ref("");
    const libraryItems = ref([]);
    const showListModal = ref(false);
    const listTitle = ref("");
    const listPrice = ref(0);
    const listDescription = ref("");
    const selectedCategory = ref("");
    const imageToListItemIndex = ref(null);
    const itemCategories = ref(["Necklaces", "Earrings", "Rings", "Bracelets"]);

    const modalMode = ref("list");

    const checkAuthentication = async () => {
      if (!isAuthenticated.value) {
        router.push("/login");
      } else {
        userId.value = user.value.uid;
        libraryItems.value = await getLibraryItems(userId.value);
      }
    };

    const openListModal = (item) => {
      showListModal.value = true;

      // Set the data from the clicked item
      listTitle.value = item.data.title || "";
      listPrice.value = item.data.price || 0;
      listDescription.value = item.data.description || "";
      selectedCategory.value = item.data.category || "";
    };

    const closeListModal = () => {
      showListModal.value = false;
      listPrice.value = 0;
      listDescription.value = "";
      listTitle.value = "";
    };

    const saveItemDetails = () => {
      const item = libraryItems.value[imageToListItemIndex.value];
      item.data.title = listTitle.value;
      item.data.price = listPrice.value;
      item.data.description = listDescription.value;
      item.data.category = listCategory.value;

      // Close the modal
      closeListModal();
    };

    const listedImages = computed(() =>
      libraryItems.value.filter((item) => item.data.listed)
    );
    const unlistedImages = computed(() =>
      libraryItems.value.filter((item) => !item.data.listed)
    );

    onMounted(checkAuthentication);

    watch(isAuthenticated, checkAuthentication);

    return {
      isAuthenticated,
      libraryItems,
      showListModal,
      listTitle,
      listPrice,
      listDescription,
      itemCategories,
      selectedCategory,
      openListModal,
      closeListModal,
      saveItemDetails,
      listedImages,
      unlistedImages,
      modalMode,
      faPencil,
    };
  },
};
</script>

<style scoped>
/* Modal Content Fade-In Animation */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-content {
  animation: fadeInScale 0.3s ease-out forwards;
}

.edit-btn {
  @apply bg-gradient-to-r from-blue to-purple text-white;
}

.cancel-btn {
  @apply bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg shadow-md;
}

.update-btn {
  @apply bg-green-500 text-white hover:bg-green-600 rounded-lg shadow-md;
}
</style>
