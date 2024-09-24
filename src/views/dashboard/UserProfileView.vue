<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-8 pt-[150px]">
      <h1
        class="text-4xl font-bold mb-8 text-center text-indigo-700 animate-fade-in"
      >
        User Profile
      </h1>
      <div
        v-if="isAuthenticated && userData"
        class="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto animate-fade-in-up"
      >
        <div class="flex flex-col items-center mb-8">
          <div
            class="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center cursor-pointer"
            @click="handleUploadPhoto"
          >
            <span class="text-4xl text-indigo-600">
              {{ userData.name ? userData.name[0].toUpperCase() : "" }}
            </span>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
            Profile Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-100 p-4 rounded-lg">
              <p class="text-gray-600 mb-1">Name</p>
              <p class="text-xl font-medium">{{ userData.fullName }}</p>
            </div>
            <div class="bg-gray-100 p-4 rounded-lg">
              <p class="text-gray-600 mb-1">Email</p>
              <p class="text-xl font-medium">{{ userData.email }}</p>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-6 mt-6">
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">User Bio</h3>
          <div class="bg-gray-100 p-4 rounded-lg">
            <p class="text-gray-600 mb-1">About Me</p>
            <p class="text-xl font-medium">
              {{ userData.bio || "No bio available" }}
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
        isLoading.value = false;
      }
    };

    const handleUploadPhoto = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadPhoto(userid.value, file);
      }
    };

    onMounted(checkAuthentication);
    watch(isAuthenticated, checkAuthentication);

    return { isAuthenticated, userData, isLoading, handleUploadPhoto };
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
