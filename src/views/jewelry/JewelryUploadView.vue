<template>
    <DefaultLayout>
        <div class="container mx-auto px-4 pt-[150px] flex flex-col lg:flex-row">
            <div class="lg:w-1/2 lg:pr-10 mb-6 lg:mb-0">
                <h2
                    class="text-xxxl font-bold mb-4 bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent">
                    Upload Your Jewelry Image</h2>
                <p class="text-gray-600">
                    To get started, please upload a high-quality image of your jewelry.
                    Our advanced background removal tool will automatically remove the background
                    so you can showcase your piece beautifully.
                </p>
            </div>
            <div class="lg:w-1/2" :class="{ 'ml-auto': imageSelected }">
                <div v-if="!imageSelected" class="upload-container">
                    <div class="rounded shadow-lg bg-gray-200 lg:h-64 lg:w-64 mx-auto flex items-center justify-center">
                        <div class="bg-gray-200 p-8">
                            <p class="text-center">No Image Selected</p>
                        </div>
                    </div>

                    <div class="m-10">
                        <button @click="uploadImage()"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-purple hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Upload Image
                        </button>
                    </div>
                </div>

                <div v-else class="processing-container">
                    <div
                        class="rounded shadow-lg bg-gray-200 lg:h-64 lg:w-64 mx-auto flex items-center justify-center overflow-hidden relative">
                        <img v-if="!removingBackground" :src="mainImg" alt="Uploaded Image"
                            class="w-full h-full object-cover">
                        <div v-if="removingBackground" class="absolute inset-0 flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-purple" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                    </div>

                    <div class="m-10">
                        <button v-if="!imageConfirmed && !removingBackground" @click="confirmImage()"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            Remove Background
                        </button>
                        <button @click="reselectImage()" :disabled="removingBackground"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-purple hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-2">
                            Reselect Image
                        </button>
                    </div>

                    <div class="m-10" v-if="imageConfirmed">
                        <button @click="goToModelsPage"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Continue to Models
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { removeBackground } from '@imgly/background-removal';
import { useImageStore } from '@/store/imageStore';

export default {
    name: "JewelryUpload",
    components: {
        DefaultLayout,
    },
    data() {
        return {
            images: [],
            mainImg: "",
            imageSelected: false,
            imageConfirmed: false,
            removingBackground: false,
        };
    },
    methods: {
        uploadImage() {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (readerEvent) => {
                    const content = readerEvent.target.result;
                    this.images = [content];
                    this.mainImg = content;
                    this.imageSelected = true;
                    this.imageConfirmed = false; // Reset imageConfirmed when a new image is selected
                };
            };
            input.click();
        },
        reselectImage() {
            this.uploadImage();
            this.imageConfirmed = false; // Reset imageConfirmed when reselecting
        },
        async confirmImage() {
            this.removingBackground = true; // Show loader
            try {
                const file = this.dataURLtoFile(this.mainImg, "image.png");
                const result = await removeBackground(file);
                this.mainImg = URL.createObjectURL(result);
                this.imageConfirmed = true;
            } catch (error) {
                console.error("Error removing background:", error);
            } finally {
                this.removingBackground = false; // Hide loader
            }
        },
        dataURLtoFile(dataurl, filename) {
            let arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        },
        imageToBase64(imageUrl) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous"; // For CORS if needed
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.height = img.naturalHeight;
                    canvas.width = img.naturalWidth;
                    ctx.drawImage(img, 0, 0);
                    const base64 = canvas.toDataURL('image/png');
                    resolve(base64);
                };
                img.onerror = reject;
                img.src = imageUrl;
            });
        },
        async goToModelsPage() {
            const imageStore = useImageStore();
            const base64Image = await this.imageToBase64(this.mainImg);
            console.log(base64Image)
            imageStore.setImage(base64Image);
            this.$router.push({
                name: 'model-selection',
            });
        },
        
    }
};
</script>