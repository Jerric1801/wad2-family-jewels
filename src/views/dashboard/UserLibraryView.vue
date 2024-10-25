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
            class="relative"
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
                @click="openListModal(index, true)"
                :class="'absolute bottom-4 right-4 edit-btn'"
              >
                Edit Listing
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
            class="relative"
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
                @click="openListModal(index, true)"
                :class="'absolute bottom-4 right-4 edit-btn'"
              >
                Edit Listing
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>

      <!-- Show a message if there are no items -->
      <div
        v-if="listedImages.length === 0 && unlistedImages.length === 0"
        class="text-gray-500 mt-4"
      >
        You have no saved library items yet.
      </div>

      <!-- Modal for editing item details -->
      <div
        v-if="showListModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h3 class="text-xl font-semibold mb-4">Edit Listing Details</h3>
          <form @submit.prevent="saveItemDetails">
            <div class="mb-4">
              <label for="price" class="block text-gray-700 font-medium mb-2"
                >Title:</label
              >
              <input
                type="text"
                v-model="listTitle"
                class="border border-gray-400 p-2 rounded w-full"
                required
              />
            </div>
            <div class="mb-4">
              <label for="price" class="block text-gray-700 font-medium mb-2"
                >Price:</label
              >
              <input
                type="number"
                v-model="listPrice"
                class="border border-gray-400 p-2 rounded w-full"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-medium mb-2"
                >Description:</label
              >
              <textarea
                v-model="listDescription"
                class="border border-gray-400 p-2 rounded w-full"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label for="category" class="block text-gray-700 font-medium mb-2"
                >Category:</label
              >
              <select></select>
            </div>
            <div class="flex justify-end">
              <Button
                type="button"
                @click="closeListModal"
                class="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                Cancel
              </Button>
              <ButtonComponent
                variant="primary"
                size="md"
                @click="openListModal(index, true)"
                :class="'absolute bottom-4 right-4'"
              >
                Edit Item
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
import ButtonComponent from "@/components/common/ButtonComponent.vue"; // Ensure the path is correct

export default {
  name: "UserLibraryView",
  components: {
    DefaultLayout,
    ButtonComponent,
  },
  data() {
    return {
      categories: ["Necklace", "Earrings", "Rings", "Bracelet"],
    };
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
    const listCategory = ref("");
    const imageToListItemIndex = ref(null);

    const modalMode = ref("list");

    const checkAuthentication = async () => {
      if (!isAuthenticated.value) {
        router.push("/login");
      } else {
        userId.value = user.value.uid;
        libraryItems.value = await getLibraryItems(userId.value);
      }
    };

    const openListModal = (index, isView = false) => {
      showListModal.value = true;
      imageToListItemIndex.value = index;

      if (isView) {
        const imageData = libraryItems.value[index];
        listTitle.value = imageData.data.title || "";
        listPrice.value = imageData.data.price || 0;
        listDescription.value = imageData.data.description || "";
        listCategory.value = imageData.data.category || "";
      }
    };

    const closeListModal = () => {
      showListModal.value = false;
      listPrice.value = 0;
      listDescription.value = "";
    };

    const saveItemDetails = () => {
      const item = libraryItems.value[imageToListItemIndex.value];
      item.data.price = listPrice.value;
      item.data.description = listDescription.value;

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
      listPrice,
      listDescription,
      openListModal,
      closeListModal,
      saveItemDetails,
      listedImages,
      unlistedImages,
      modalMode,
    };
  },
};
</script>
<style scoped>
.edit-btn {
  @apply bg-gradient-to-r from-blue to-purple text-white;
}
</style>
