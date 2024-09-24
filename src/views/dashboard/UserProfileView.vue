<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-8 pt-[150px] h-screen">
      <h1
        class="text-4xl font-bold mb-8 text-center text-indigo-700 animate-fade-in"
      >
        User Profile
      </h1>
      <div v-if="isLoading" class="text-center text-indigo-600">Loading...</div>
      <div
        v-else-if="isAuthenticated && userData"
        class="bg-white shadow-lg rounded-lg p-8 h-full animate-fade-in-up"
      >
        <div class="flex flex-col items-center mb-8 relative">
          <div
            class="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center cursor-pointer relative group"
            @click="triggerFileInput"
          >
            <img
              v-if="userData && userData.imageUrl"
              :src="userData.imageUrl"
              class="w-full h-full rounded-full object-cover"
              @error="handleImageError"
            />
            <span v-else class="text-4xl text-indigo-600">
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
                  d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM19 21H5c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2h2.586c.526 0 1.04.21 1.414.586l1.414 1.414c.374.374.888.586 1.414.586H19c1.105 0 2 .895 2 2v12c0 1.105-.895 2-2 2z"
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
          <div
            class="absolute top-0 right-0 mt-4 mr-4 cursor-pointer"
            @click="editBio"
          >
            <svg
              class="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536M9 11l6-6 3.536 3.536-6 6H9v-3.536zM19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
            Profile Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-100 p-4 rounded-lg">
              <p class="text-gray-600 mb-1">Name</p>
              <p class="text-xl font-medium">
                {{ userData && userData.fullName }}
              </p>
            </div>
            <div class="bg-gray-100 p-4 rounded-lg">
              <p class="text-gray-600 mb-1">Email</p>
              <p class="text-xl font-medium">
                {{ userData && userData.email }}
              </p>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-6 mt-6 relative">
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">User Bio</h3>
          <div class="bg-gray-100 p-4 rounded-lg">
            <p class="text-gray-600 mb-1">About Me</p>
            <p class="text-xl font-medium">
              {{ (userData && userData.bio) || "No bio available" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { retrieveUserProfile, uploadPhoto } from "@/services/firebase/profile";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    DefaultLayout,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { isAuthenticated, user } = storeToRefs(authStore);
    let userid = ref("");
    let userData = ref(null);
    let isLoading = ref(true);
    const fileInput = ref(null);

    const checkAuthentication = async () => {
      if (!isAuthenticated.value) {
        router.push("/login");
      } else {
        userid.value = user.value.uid;
        userData.value = await retrieveUserProfile(userid.value);
        if (userData.value && userData.value.imageUrl) {
          const img = new Image();
          img.src = userData.value.imageUrl;
          img.onload = () => {
            isLoading.value = false;
          };
          img.onerror = () => {
            console.error("Error loading image");
            isLoading.value = false;
          };
        } else {
          isLoading.value = false;
        }
      }
    };

    const handleUploadPhoto = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          await uploadPhoto(userid.value, file);
          userData.value = await retrieveUserProfile(userid.value);
          console.log("Photo uploaded successfully");
        } catch (error) {
          console.error("Error uploading photo:", error);
        }
      }
    };

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleImageError = () => {
      console.error("Error loading image");
    };

    const editBio = () => {
      // Logic to edit bio
      console.log("Edit bio clicked");
    };

    onMounted(checkAuthentication);
    watch(isAuthenticated, checkAuthentication);

    return {
      isAuthenticated,
      userData,
      isLoading,
      handleUploadPhoto,
      triggerFileInput,
      fileInput,
      handleImageError,
      editBio,
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
</style>
