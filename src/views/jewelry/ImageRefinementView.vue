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
                <button @click="goToLibraryPage"
                    class="group relative w-[250px] flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5">
                    Save Photo to Library
                </button>
            </div>
        </div>

    </DefaultLayout>
</template>

<script>
import product1 from '@/assets/images/home/product_2.jpg';
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
    name: "ImageRefinementView",
    components: {
        DefaultLayout,
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
            selectedImage: product1,
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
        goToLibraryPage() {
            //TODO add to store and library (push to cloud?)
            this.$router.push('/library')
        }
    }
};
</script>
