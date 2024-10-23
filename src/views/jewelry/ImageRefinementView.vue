<template>
    <DefaultLayout>
        <div
            class="container mx-auto p-6 bg-white rounded-md shadow-md h-[150vh] flex flex-col justify-center items-center">
            <div class="w-[90vw] flex flex-col justify-center items-center">
                <div class="image-box relative w-full h-96 bg-gray-200 mb-6">
                    <img :src="selectedImage" :style="imageStyle" alt="Filtered Image"
                        class="w-full h-full object-cover">
                </div>

                <div class="skin-tone-toggle flex justify-between mb-6 w-full">
                    <div v-for="tone in skinTones" :key="tone.color" :style="{ backgroundColor: tone.color }"
                        class="skin-tone-option w-1/5 h-12 rounded-full cursor-pointer border-2 border-transparent hover:border-gray-500"
                        :class="{ 'border-black': selectedTone === tone.color }" @click="selectTone(tone)">
                    </div>
                </div>

                <div class="slider-group flex flex-col mb-4 w-full">
                    <label for="brightness" class="mb-2 text-sm font-medium">Brightness</label>
                    <input type="range" id="brightness" v-model="brightness" min="0.5" max="2" step="0.01"
                        class="w-full">
                </div>
                <div class="slider-group flex flex-col mb-4 w-full">
                    <label for="contrast" class="mb-2 text-sm font-medium">Contrast</label>
                    <input type="range" id="contrast" v-model="contrast" min="0.5" max="2" step="0.01" class="w-full">
                </div>
                <div class="slider-group flex flex-col w-full">
                    <label for="saturation" class="mb-2 text-sm font-medium">Saturation</label>
                    <input type="range" id="saturation" v-model="saturation" min="0.5" max="2" step="0.01"
                        class="w-full">
                </div>
                <div>
                    <label for="image-name" class="sr-only">Product Name</label>
                    <input id="image-name" name="image-name" type="text" v-model="imageName" autocomplete="image-name"
                        required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 mt-6 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
                        placeholder="Product Name" />
                    <div v-if='errorMessage != ""'>
                        <p class="text-red-500 text-xs italic">{{ errorMessage }}</p>
                    </div>

                </div>

                <div v-if="isLoading">
                    <button type="button"
                        class="group relative w-[250px] flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5"
                        disabled>
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Processing...
                    </button>
                </div>
                <div v-else>
                    <button @click="goToLibraryPage"
                        class="group relative w-[250px] flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5">
                        Save Photo to Library
                    </button>

                </div>
            </div>
        </div>

    </DefaultLayout>
</template>

<script>
import product1 from '@/assets/images/home/product_2.jpg';
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useAuthStore } from "@/store/auth";
import { retrieveUserProfile, uploadPhoto } from "@/services/firebase/uploadJewel";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { select } from 'three/webgpu';
export default {
    name: "ImageRefinementView",
    components: {
        DefaultLayout,
    },
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        const { isAuthenticated, user } = storeToRefs(authStore);
        let userid = ref("");
        let userData = ref(null);
        let isLoading = ref(false);
        let selectedImage = ref(product1);
        let imageName = ref("");
        let errorMessage = ref("");
        const checkAuthentication = async () => {
            if (!isAuthenticated.value) {
                router.push("/login");
            } else {
                userid.value = user.value.uid;
                userData.value = await retrieveUserProfile(userid.value);

            }
        };
        const goToLibraryPage = async () => {
            //TODO add to store and library (push to cloud?)
           
            if (imageName.value != "") {
                try {
                    isLoading.value = true;
                    await uploadPhoto(userid.value, selectedImage, imageName.value);
                    userData.value = await retrieveUserProfile(userid.value);
                    router.push('/library')
                    console.log("Photo uploaded successfully");
                    isLoading.value = false;
                } catch (error) {
                    console.error("Error uploading photo:", error);
                }
            } else {
                errorMessage.value = "Please enter a name for the product";
            }
        };
        onMounted(checkAuthentication);
        watch(isAuthenticated, checkAuthentication);
        return {
            isAuthenticated,
            userData,
            isLoading,
            selectedImage,
            goToLibraryPage,
            imageName,
            errorMessage,

        };
    },
    data() {
        return {
            images: images,
            mainImg: ''

        };
    },
    data() {
        return {
            brightness: 1,
            contrast: 1,
            saturation: 1,
            selectedTone: null,
            skinTones: [
                { color: '#f4c2c2' },
                { color: '#e0ac69' },
                { color: '#c68642' },
                { color: '#8d5524' },
                { color: '#4b2e1f' },
            ],
            // selectedImage: product1,
        };
    },
    computed: {
        imageStyle() {
            return {
                filter: `brightness(${this.brightness}) contrast(${this.contrast}) saturate(${this.saturation})`
            };
        }
    },
    methods: {
        selectTone(tone) {
            this.selectedTone = tone.color;
        },
        // goToLibraryPage() {
        //     //TODO add to store and library (push to cloud?)
        //     this.$router.push('/library')
        // }
    }
};
</script>
