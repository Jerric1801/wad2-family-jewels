<template>
    <DefaultLayout>
        <div class="container mx-auto px-4 pt-[100px] md:pt-[150px] flex flex-col justify-center items-center">
            <div class="w-full">
                <button class="mb-4 bg-gradient-to-r from-purple to-blue font-bold py-2 px-4 rounded-md hover:opacity-75 text-white" @click="$router.push('/marketplace')">
                    Back to Shop
                  </button>
            </div>
            <h2
                class="text-3xl font-bold mb-4 bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent">
                Your Jewelry Library
            </h2>


            <div v-if="combinedImages.length > 0" class="mb-8">
                <h3 class="text-xl font-semibold mb-4">Listed Items</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
                    <div v-for="(image, index) in listedImages" :key="index" class="relative">
                        <img :src="image.url" alt="Listed Image"
                            class="w-full h-64 object-cover rounded shadow-md mb-4" />
                        <span
                            class="absolute top-2 right-2 bg-purple text-white px-2 py-1 rounded-md text-sm">Listed</span>
                            <button @click="openListModal(index, true)" 
                            class="bg-blue text-white font-medium py-2 px-4 rounded-md w-full">
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="unlistedImages.length > 0" class="mb-8">
                <h3 class="text-xl font-semibold mb-4">Unlisted Items</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
                    <div v-for="(image, index) in unlistedImages" :key="index" class="relative">
                        <img :src="image.url" alt="Unlisted Image"
                            class="w-full h-64 object-cover rounded shadow-md mb-4" />
                        <button @click="openListModal(index)"
                            class="bg-blue text-white font-medium py-2 px-4 rounded-md w-full">
                            List Item
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="combinedImages.length === 0" class="text-gray-500 mt-4">
                You have no saved jewelry images yet.
            </div>

            <div v-if="showListModal" class="modal fixed inset-0 flex items-center justify-center z-50">
                <div class="modal-content bg-white rounded-lg shadow-lg p-6 w-96">
                    <h3 class="text-xl font-semibold mb-4">{{ modalMode === 'list' ? 'List Jewelry' : 'Listing Details' }}</h3>
                    <form @submit.prevent="listImage">
                        <div class="mb-4">
                            <label for="price" class="block text-gray-700 font-medium mb-2">Price:</label>
                            <input type="number" id="price" v-model="listPrice"
                                class="border border-gray-400 p-2 rounded w-full" :disabled="modalMode === 'view'" />
                        </div>
                        <div class="mb-4">
                            <label for="description" class="block text-gray-700 font-medium mb-2">Description:</label>
                            <textarea id="description" v-model="listDescription"
                                class="border border-gray-400 p-2 rounded w-full" :disabled="modalMode === 'view'"></textarea>
                        </div>
                        <div class="flex justify-end">
                            <button type="button" @click="closeListModal"
                                class="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                            <button v-if="modalMode === 'list'" type="submit"
                                class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">List Item</button>
                            <button v-if="modalMode === 'view'" type="button" @click="delistItem"
                                class="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white">Delist Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import tempImg from '@/assets/images/home/product_2.jpg'; // Make sure this path is correct
import { ref, computed } from 'vue';

export default {
    name: "UserLibraryView",
    components: {
        DefaultLayout,
    },
    setup() {
        const showListModal = ref(false);
        const listPrice = ref(0);
        const listDescription = ref('');
        const imageToListItemIndex = ref(null);

        const combinedImages = ref([
            { url: tempImg, listed: false },
            { url: tempImg, listed: true },
            { url: tempImg, listed: false },
            { url: tempImg, listed: false },
            { url: tempImg, listed: true },
            { url: tempImg, listed: false },
        ]);

        const modalMode = ref('list'); // Can be 'list' or 'view'

        const openListModal = (index, isView = false) => {
            showListModal.value = true;
            imageToListItemIndex.value = index;

            if (isView) {
                modalMode.value = 'view';
                const imageData = combinedImages.value[index];
                listPrice.value = imageData.price; // Assuming your image data has a price property
                listDescription.value = imageData.description; // Assuming your image data has a description property
            } else {
                modalMode.value = 'list';
                listPrice.value = 0;
                listDescription.value = '';
            }
        };

        const delistItem = () => {
            combinedImages.value[imageToListItemIndex.value].listed = false;
            closeListModal();
        };


        const closeListModal = () => {
            showListModal.value = false;
            listPrice.value = 0;
            listDescription.value = '';
        };

        const listImage = () => {
            console.log('Listing image with price:', listPrice.value, 'and description:', listDescription.value);

            // Update the listed status directly in the combinedImages array
            combinedImages.value[imageToListItemIndex.value].listed = true;
            closeListModal();
        };

        const listedImages = computed(() => {
            return combinedImages.value.filter(image => image.listed);
        });

        const unlistedImages = computed(() => {
            return combinedImages.value.filter(image => !image.listed);
        });

        return {
            showListModal,
            listPrice,
            listDescription,
            openListModal,
            closeListModal,
            listImage,
            listedImages,
            unlistedImages,
            combinedImages,
            modalMode
        };
    },
};
</script>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>