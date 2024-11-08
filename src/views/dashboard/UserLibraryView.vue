<template>
  <DefaultLayout>
    <div
      class="container mx-auto px-3 flex flex-col items-center pt-[120px] dark:bg-darkModeBg"
    >
      <!-- Page Title -->
      <h2
        class="text-2xl text-center font-bold mb-3 bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent dark:text-custDarkerWhite"
      >
        Your Jewelry Library
      </h2>

      <!-- Display Listed Items -->
      <div v-if="listedImages.length > 0" class="w-full mb-10">
        <h3 class="text-lg font-semibold mb-5 dark:text-custDarkerWhite">
          Listed Items
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(item, index) in listedImages"
            :key="item.id"
            class="relative p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-cardItemBg flex flex-col min-h-[400px]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Image -->
            <img
              :src="item.data.image || tempImg"
              alt="Item Image"
              class="w-full h-40 object-cover rounded mb-3"
            />

            <!-- Item Details -->
            <div class="flex-1 mb-4">
              <h4 class="text-md dark:text-custWhite mb-1">
                {{ item.data.title || "Item Name" }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-custGrey mb-2">
                {{ item.data.description || "No Description" }}
              </p>
              <p class="text-md dark:text-custWhite mb-4">
                {{
                  item.data.price ? "$" + item.data.price : "Price Unavailable"
                }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center space-x-3 mt-auto">
              <ButtonComponent
                @click="updateDbListing(item)"
                :class="
                  item.data.listed
                    ? 'bg-lightModeBtnRed dark:bg-darkModeBtnGrey dark:text-custWhite'
                    : 'bg-lightModeBtnGreen dark:bg-darkModeBtnGrey dark:text-custWhite'
                "
                :disabled="loading"
                class="flex items-center space-x-1 text-white px-2 py-1 rounded-lg transition-colors"
              >
                {{ item.data.listed ? "Delist" : "List" }}
                <FontAwesomeIcon
                  :icon="item.data.listed ? faTimesCircle : faCheckCircle"
                  class="ml-1"
                />
              </ButtonComponent>

              <ButtonComponent
                @click="openListModal(item)"
                variant="primary"
                size="sm"
                class="bg-lightModeBtnPurple dark:bg-darkModeBtnGrey dark:text-custWhite text-white px-3 py-1 rounded-lg transition-colors"
              >
                Edit
                <FontAwesomeIcon
                  :icon="faPencil"
                  class="ml-1 dark:bg-darkModeBtnGrey dark:text-custWhite"
                />
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>

      <!-- Display Unlisted Items -->
      <div v-if="unlistedImages.length > 0" class="w-full mb-10">
        <h3 class="text-lg font-semibold mb-5 dark:text-custDarkerWhite">
          Unlisted Items
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(item, index) in unlistedImages"
            :key="item.id"
            class="relative p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-cardItemBg flex flex-col min-h-[400px]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Image -->
            <img
              :src="item.data.image || tempImg"
              alt="Item Image"
              class="w-full h-40 object-cover rounded mb-3"
            />

            <!-- Item Details -->
            <div class="flex-1 mb-3">
              <h4 class="text-md dark:text-custWhite mb-1">
                {{ item.data.title || "Item Name" }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-custGrey mb-1">
                {{ item.data.description || "No Description" }}
              </p>
              <p class="text-md dark:text-custWhite">
                {{
                  item.data.price ? "$" + item.data.price : "Price Unavailable"
                }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center space-x-3 mt-auto">
              <ButtonComponent
                @click="updateDbListing(item)"
                :class="
                  item.data.listed
                    ? 'bg-lightModeBtnRed dark:bg-darkModeBtnGrey dark:text-custWhite'
                    : 'bg-lightModeBtnGreen dark:bg-darkModeBtnGrey dark:text-custWhite'
                "
                :disabled="loading"
                class="flex items-center space-x-1 text-white px-2 py-1 rounded-lg transition-colors"
              >
                {{ item.data.listed ? "Delist" : "List" }}
                <FontAwesomeIcon
                  :icon="item.data.listed ? faTimesCircle : faCheckCircle"
                  class="ml-1"
                />
              </ButtonComponent>

              <ButtonComponent
                @click="openListModal(item)"
                size="md"
                class="bg-lightModeBtnPurple dark:bg-darkModeBtnGrey dark:text-custWhite text-white px-3 py-1 rounded-lg transition-colors"
              >
                Edit
                <FontAwesomeIcon
                  :icon="faPencil"
                  class="ml-1 text-white dark:text-custWhite"
                />
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>

      <!-- No Items Message -->
      <div
        v-if="listedImages.length === 0 && unlistedImages.length === 0"
        class="text-gray-500 mt-8 text-center dark:text-custWhite"
      >
        You have no saved library items yet.
      </div>

      <!-- Modal Content -->
      <transition name="modal-fade">
        <div
          v-if="showListModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            class="bg-custWhite p-8 rounded-xl shadow-xl max-w-2xl w-full transition-transform transform scale-100 dark:bg-darkModeBg"
          >
            <h3
              class="text-2xl font-semibold text-center mb-6 dark:text-custWhite"
            >
              Edit Listing Details
            </h3>
            <form @submit.prevent="saveItemDetails">
              <!-- Title Field -->
              <div class="mb-6">
                <label
                  for="title"
                  class="block text-gray-700 font-medium mb-2 dark:text-custGrey"
                  >Title:</label
                >
                <input
                  type="text"
                  v-model="listTitle"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full dark:bg-cardItemBg dark:text-custGrey"
                  required
                />
              </div>
              <!-- Price Field -->
              <div class="mb-6">
                <label
                  for="price"
                  class="block text-gray-700 font-medium mb-2 dark:text-custGrey"
                  >Price:</label
                >
                <input
                  type="number"
                  v-model="listPrice"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full dark:bg-cardItemBg dark:text-custGrey"
                  required
                />
              </div>
              <!-- Description Field -->
              <div class="mb-6">
                <label
                  for="description"
                  class="block text-gray-700 font-medium mb-2 dark:text-custGrey"
                  >Description:</label
                >
                <textarea
                  v-model="listDescription"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full h-32 resize-none dark:bg-cardItemBg dark:text-custGrey"
                  required
                ></textarea>
              </div>
              <!-- Category Field -->
              <div class="mb-6">
                <label
                  for="category"
                  class="block text-gray-700 font-medium mb-2 dark:text-custGrey"
                  >Category:</label
                >
                <select
                  v-model="selectedCategory"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-3 rounded-lg w-full dark:bg-cardItemBg dark:text-custGrey"
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
                  class="cancel-btn dark:bg-darkModeBtnGrey hover:text-custWhite"
                  ><div class="dark:text-custWhite">
                    Cancel
                  </div></ButtonComponent
                >
                <ButtonComponent
                  @click="saveItemDetails"
                  variant="primary"
                  size="md"
                  class="update-btn dark:bg-darkModeBtnGrey"
                  ><div class="dark:text-custWhite">
                    Update Listing
                  </div></ButtonComponent
                >
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </DefaultLayout>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import {
  getLibraryItems,
  updateListing,
  updateListDetails,
} from "@/services/firebase/library";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import tempImg from "@/assets/images/home/product_2.jpg";
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import {
  faCheckCircle,
  faPencil,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
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
    const loading = ref(false);
    const userId = ref("");
    const libraryItems = ref([]);
    const showListModal = ref(false);
    const listTitle = ref("");
    const listPrice = ref(0);
    const updateToggle = ref(false);
    const listDescription = ref("");
    const selectedCategory = ref("");
    const imageToListItemIndex = ref(null);
    const currentItemSelectedId = ref(null);
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

      // Set the data from the clicked item to form variables
      listTitle.value = item.data.title || "Item Name";
      listPrice.value = item.data.price || 0;
      listDescription.value = item.data.description || "No Description";
      selectedCategory.value = item.data.category || "";
      currentItemSelectedId.value = item.id || ""; // Store item ID to know which item to update
    };

    const closeListModal = () => {
      showListModal.value = false;
      listPrice.value = 0;
      listDescription.value = "";
      listTitle.value = "";
    };

    const saveItemDetails = () => {
      const newDetails = {
        title: listTitle.value,
        price: listPrice.value,
        description: listDescription.value,
        category: selectedCategory.value,
      };

      updateItemListingDetails(newDetails);

      // Close the modal
      closeListModal();
    };

    const updateItemListingDetails = async (newDetails) => {
      if (loading.value) return;
      loading.value = true;

      try {
        const result = await updateListDetails(
          userId.value,
          currentItemSelectedId.value,
          newDetails
        );
        if (result) window.location.reload(); // Reload page upon success to show changes
      } catch (error) {
        console.error("Error during update list details:", error);
      } finally {
        loading.value = false; // Re-enable button after completion
      }
    };

    const updateDbListing = async (item) => {
      if (loading.value) return; // Prevents multiple clicks while loading
      loading.value = true;

      try {
        const newListedStatus = !item.data.listed;
        const success = await updateListing(
          userId.value,
          item.id,
          newListedStatus
        );

        if (success) {
          const itemToUpdate = libraryItems.value.find((i) => i.id === item.id);
          if (itemToUpdate) {
            itemToUpdate.data.listed = newListedStatus;
          }
        } else {
          console.error("Failed to update listing status");
        }
      } catch (error) {
        console.error("Error during listing update:", error);
      } finally {
        loading.value = false; // Re-enable button after completion
      }
    };

    const listedImages = computed(() => {
      updateToggle.value;
      return libraryItems.value.filter((item) => item.data?.listed) || [];
    });
    const unlistedImages = computed(() => {
      updateToggle.value;
      return libraryItems.value.filter((item) => !item.data?.listed) || [];
    });

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
      currentItemSelectedId,
      unlistedImages,
      modalMode,
      faPencil,
      updateDbListing,
      updateListDetails,
      updateToggle,
      faTimesCircle,
      faCheckCircle,
      loading,
    };
  },
};
</script>

<style scoped>
.text-gradient {
  background-image: linear-gradient(to right, #ff7e5f, #feb47b, #ff7e5f);
  -webkit-background-clip: text;
  color: transparent;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.edit-btn {
  background: linear-gradient(
    to right,
    #3b82f6,
    #8b5cf6
  ); /* Blue-500 to Purple-500 hex values */
  color: white;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  padding: 0.5rem 1rem; /* Smaller padding */
  font-size: 0.875rem; /* Smaller font size */
}
.edit-btn:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.cancel-btn {
  @apply bg-gray-300 text-gray-700 hover:bg-red-800 rounded-lg shadow-md transition;
  padding: 0.5rem 1rem; /* Smaller padding */
  font-size: 0.875rem; /* Smaller font size */
}

.update-btn {
  @apply bg-green-500 text-white hover:bg-green-800 rounded-lg shadow-md transition;
  padding: 0.5rem 1rem; /* Smaller padding */
  font-size: 0.875rem; /* Smaller font size */
}
</style>
