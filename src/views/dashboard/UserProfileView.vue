<template>
  <DefaultLayout>
    <div
      class="container mx-auto px-3 py-6 pt-[120px] flex flex-col items-center dark:bg-darkModeBg"
    >
      <!-- Title -->
      <h1
        class="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent animate-fade-in dark:text-custDarkerWhite"
      >
        User Profile
      </h1>

      <!-- Loading Spinner -->
      <div
        v-if="isLoading"
        class="text-center bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
      >
        Loading...
      </div>

      <!-- User Profile Details -->
      <div
        v-else-if="isAuthenticated && userData"
        class="bg-white shadow-lg rounded-lg p-8 w-full max-w-full animate-fade-in-up dark:bg-darkModeBg"
      >
        <!-- Profile Image -->
        <div class="flex flex-col items-center mb-8 relative">
          <div
            class="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center cursor-pointer relative group overflow-hidden"
            @click="triggerFileInput"
          >
            <img
              v-if="userData && userData.imageUrl"
              :src="userData.imageUrl"
              class="w-full h-full rounded-full object-cover"
              @error="handleImageError"
            />
            <span
              v-else
              class="text-4xl bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
            >
              {{
                userData && userData.name ? userData.name[0].toUpperCase() : ""
              }}
            </span>
            <div
              class="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c1.657 0 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM19 21H5c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2h2.586c.526 0 1.04.21 1.414.586l1.414 1.414c.374.374.888.586 1.414.586H19c1.105 0 2 .895 2 2v12c0 1.105-.895 2-2 2z"
                ></path>
              </svg>
            </div>
          </div>
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleUploadPhoto"
          />
        </div>

        <!-- Tab Titles -->
        <div
          class="flex justify-center mb-4 border-gray-200 dark:border-gray-700 overflow-hidden w-full"
        >
          <ul
            class="flex flex-wrap justify-center text-xs font-medium text-center text-gray-500 dark:text-gray-400 w-full"
          >
            <li class="me-2">
              <a
                :class="[
                  'flex flex-col items-center text-sm justify-center px-2 py-1 border-b-2 rounded-t-md group whitespace-nowrap',
                  activeTab === 'personalInfo'
                    ? 'text-black border-black dark:text-custGrey dark:border-custWhite'
                    : 'text-gray-700 hover:text-black hover:border-gray-400 dark:text-custGrey dark:border-darkModeBg',
                ]"
                @click="activeTab = 'personalInfo'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 pr-1"
                >
                  <path
                    d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"
                  />
                  <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z" />
                  <path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z" />
                </svg>
                <span>Personal Info</span>
              </a>
            </li>

            <!-- Tab for SignInInfo-->
            <li class="me-2">
              <a
                :class="[
                  'flex flex-col items-center text-sm justify-center px-2 py-1 border-b-2 rounded-t-md group whitespace-nowrap',
                  activeTab === 'signInInformation'
                    ? 'text-black border-black dark:text-custGrey dark:border-custWhite'
                    : 'text-gray-700 hover:text-black hover:border-gray-400 dark:text-custGrey dark:border-darkModeBg',
                ]"
                @click="activeTab = 'signInInformation'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 pr-1"
                >
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M15 18a3 3 0 1 0-6 0" />
                  <path
                    d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"
                  />
                  <circle cx="12" cy="13" r="2" />
                </svg>
                <span>Sign-in Info</span>
              </a>
            </li>

            <!-- Preferences Tab -->
            <li class="me-2">
              <a
                :class="[
                  'flex flex-col items-center text-sm justify-center px-2 py-1 border-b-2 rounded-t-md group whitespace-nowrap',
                  activeTab === 'preferences'
                    ? 'text-black border-black dark:text-custGrey dark:border-custWhite'
                    : 'text-gray-700 hover:text-black hover:border-gray-400 dark:text-custGrey dark:border-darkModeBg',
                ]"
                @click="activeTab = 'preferences'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 pr-1"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
                <span>Preferences</span>
              </a>
            </li>

            <!-- Order History Tab -->
            <li class="me-2">
              <a
                :class="[
                  'flex flex-col items-center text-sm justify-center px-2 py-1 border-b-2 rounded-t-md group whitespace-nowrap',
                  activeTab === 'orderHistory'
                    ? 'text-black border-black dark:text-custGrey dark:border-custWhite'
                    : 'text-gray-700 hover:text-black hover:border-gray-400 dark:text-custGrey dark:border-darkModeBg',
                ]"
                @click="activeTab = 'orderHistory'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 pr-1"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M12 7v5l4 2" />
                </svg>
                <span>Order History</span>
              </a>
            </li>

            <!-- Addresses Tab -->
            <li class="me-2">
              <a
                :class="[
                  'flex flex-col items-center text-sm justify-center px-2 py-1 border-b-2 rounded-t-md group whitespace-nowrap',
                  activeTab === 'addresses'
                    ? 'text-black border-black dark:text-custGrey dark:border-custWhite'
                    : 'text-gray-700 hover:text-black hover:border-gray-400 dark:text-custGrey dark:border-darkModeBg',
                ]"
                @click="activeTab = 'addresses'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 pr-1"
                >
                  <path
                    d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"
                  />
                  <path
                    d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"
                  />
                  <path d="M18 22v-3" />
                  <circle cx="10" cy="10" r="3" />
                </svg>
                <span>Addresses</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Tab Content - Personal Information -->
        <PersonalInformation
          v-if="activeTab === 'personalInfo'"
          :userData="userData"
          :openEditModal="openEditModal"
        />

        <!-- Tab Content - Sign-in Information -->
        <SignInInformation
          v-if="activeTab === 'signInInformation'"
          :userData="userData"
        />

        <!-- Tab Content - Preferences -->
        <Preferences v-if="activeTab === 'preferences'" />
        <OrderHistory
          v-if="activeTab === 'orderHistory'"
          :pastOrders="pastOrders"
        />

        <!-- Tab Content - Addresses -->
        <!-- <Addresses
          v-if="activeTab === 'addresses'"
          :userAddresses="userAddresses"
          :userId="userid"
        /> -->

        <Addresses
          v-if="activeTab === 'addresses' && userid"
          :userAddresses="userAddresses"
          :userId="userid"
          @addressRemoved="onAddressRemoved"
        />
      </div>
    </div>

    <!-- Modal Stuff -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div
        class="bg-white rounded-lg p-8 w-full max-w-md animate-fade-in-up dark:bg-cardItemBg dark:text-custGrey"
      >
        <h2
          class="text-2xl font-semibold mb-4 text-indigo-600 dark:text-custDarkerWhite"
        >
          Edit {{ currentField }}
        </h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label
              :for="currentField"
              class="block text-gray-700 font-medium mb-2 dark:text-custGrey"
              >{{ currentField }}</label
            >
            <input
              v-if="currentField !== 'Bio'"
              type="text"
              :id="currentField"
              v-model="currentValue"
              class="border border-gray-400 p-2 rounded-lg w-full dark:bg-cardItemBg dark:text-custGrey"
            />
            <textarea
              v-else
              :id="currentField"
              v-model="currentValue"
              class="border border-gray-400 p-2 rounded-lg w-full dark:bg-cardItemBg dark:text-custGrey"
              style="height: 150px; width: 100%"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 mr-2 rounded-lg bg-gray-400 hover:bg-gray-700 hover:text-white dark:bg-darkModeBtnGrey dark:text-custWhite dark:hover:bg-red-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-darkModeBtnGrey dark:text-custWhite dark:hover:bg-green-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import {
  retrieveUserProfile,
  uploadPhoto,
  updateUserProfile,
  retrieveUserAddresses,
  retrieveUserPastOrders,
} from "@/services/firebase/profile";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";
import { useRouter } from "vue-router";
import Addresses from "../../components/profile/Addresses.vue";
import OrderHistory from "../../components/profile/OrderHistory.vue";
import PersonalInformation from "../../components/profile/PersonalInformation.vue";
import Preferences from "../../components/profile/Preferences.vue";
import SignInInformation from "../../components/profile/SignInInformation.vue";

export default {
  components: {
    DefaultLayout,
    PersonalInformation,
    SignInInformation,
    Preferences,
    OrderHistory,
    Addresses,
  },
  methods: {
    onAddressRemoved(addressId) {
      // Filter out the removed address to update the local state
      this.userAddresses = this.userAddresses.filter(
        (address) => address.id !== addressId
      );
    },
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { isAuthenticated, user } = storeToRefs(authStore);

    const userid = ref(null);
    const userData = ref(null);
    const userAddresses = ref(null);
    const pastOrders = ref(null);
    const isLoading = ref(true);
    const fileInput = ref(null);
    const activeTab = ref("personalInfo");
    const isPhotoLoading = ref(false);

    const showEditModal = ref(false);
    const currentField = ref("");
    const currentValue = ref("");

    const checkAuthentication = async () => {
      if (!isAuthenticated.value) {
        router.push("/login");
      } else {
        userid.value = user.value.uid;
        userData.value = await retrieveUserProfile(userid.value);
        userAddresses.value = await retrieveUserAddresses(userid.value);
        pastOrders.value = await retrieveUserPastOrders(userid.value);
        isLoading.value = false;
      }
    };

    const openEditModal = (field, value) => {
      currentField.value = field;
      currentValue.value = value;
      showEditModal.value = true;
    };

    const saveChanges = async () => {
      try {
        if (currentField.value === "Full Name") {
          userData.value.fullName = currentValue.value;
        } else if (currentField.value === "Phone Number") {
          userData.value.phoneNumber = currentValue.value;
        } else if (currentField.value === "Bio") {
          userData.value.bio = currentValue.value;
        }

        // Log the updated userData before sending it to Firestore
        console.log("Updated userData:", {
          fullName: userData.value.fullName,
          phoneNumber: userData.value.phoneNumber,
          bio: userData.value.bio,
        });

        await updateUserProfile(
          userid.value,
          userData.value.fullName,
          userData.value.phoneNumber,
          userData.value.bio
        );

        showEditModal.value = false;
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

    const handleUploadPhoto = async (event) => {
      const file = event.target.files[0];
      if (file) {
        isPhotoLoading.value = true;
        try {
          await uploadPhoto(userid.value, file);
          const updatedProfile = await retrieveUserProfile(userid.value);
          userData.value.imageUrl = updatedProfile.imageUrl;
          console.log("Photo uploaded successfully");
        } catch (error) {
          console.error("Error uploading photo:", error);
        } finally {
          isPhotoLoading.value = false;
        }
      }
    };

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleImageError = () => {
      console.error("Error loading image");
    };

    onMounted(checkAuthentication);
    watch(isAuthenticated, checkAuthentication);

    return {
      isAuthenticated,
      userid,
      userData,
      pastOrders,
      userAddresses,
      isLoading,
      handleUploadPhoto,
      triggerFileInput,
      fileInput,
      handleImageError,
      isPhotoLoading,
      openEditModal,
      saveChanges,
      showEditModal,
      currentField,
      currentValue,
      activeTab,
    };
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
}

button {
  @apply px-6 py-2 text-lg font-semibold rounded-lg transition duration-300 ease-in-out;
}

.btn-subscribe {
  box-shadow: 0px 4px 6px rgba(0, 170, 255, 0.3);
}

.btn-subscribe:hover {
  background: linear-gradient(
    to right,
    #5e1a91,
    #007bbf
  ); /* Darker Purple to Blue */
  box-shadow: 0px 6px 10px;
  transform: scale(1.05);
  color: white;
}

/* Secondary Button - Unsubscribe (Gradient Only, No Background Color) */
.btn-unsubscribe {
  box-shadow: 0px 4px 6px rgba(0, 170, 255, 0.3);
}

.btn-unsubscribe:hover {
  background: linear-gradient(to right, #79016d, #300054);
  box-shadow: 0px 6px 10px;
  transform: scale(1.05);
  color: white;
}
.btn-subscribe:hover .svg-container svg {
  stroke: white; /* Changes SVG color to white on hover */
}
.btn-unsubscribe:hover .svg-container svg {
  stroke: white; /* Changes SVG color to white on hover */
}
</style>
