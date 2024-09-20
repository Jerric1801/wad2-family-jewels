<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 py-8 pt-[150px]">
      <h1 class="text-3xl font-bold mb-6">User Profile</h1>
      <div v-if="isAuthenticated" class="bg-white shadow-md rounded-lg p-6">
        <div class="flex items-center mb-6">
          <!-- <img :src="" alt="Profile Photo" class="w-24 h-24 rounded-full mr-6" /> -->
          <div>
            <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>
        </div>
        <div class="border-t pt-4">
          <h3 class="text-lg font-semibold mb-2">Profile Information</h3>
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    DefaultLayout,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { isAuthenticated, user } = storeToRefs(authStore);

    const checkAuthentication = () => {
      if (!isAuthenticated.value) {
        router.push("/login");
      }
    };

    onMounted(checkAuthentication);
    watch(isAuthenticated, checkAuthentication);

    return { isAuthenticated, user };
  },
};
</script>
