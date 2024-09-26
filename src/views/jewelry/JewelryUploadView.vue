<template>
    <DefaultLayout>
        <div class="container mx-auto px-4 pt-[150px]">

            <div class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
                <div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-6 overflow-y-auto">

                        <div class="lg:w-40 lg:w-40 sm:lg-20 rounded shadow-lg sm:w-20" v-for="image in images">
                            <img class="w-full h-40" :src="image" alt="">

                        </div>
                    </div>

                </div>
                <div class="container px-6" id="uploadDiv">
                    <div class="rounded shadow-lg bg-gray-200 lg:h-full lg:w-64 mx-auto content-center" >
                        <img class = "lg:w-64 lg:h-full" id="mainImg" :src="mainImg" v-if="mainImg != ''">
                        <div v-else class="bg-grey-200">
                            <p class="text-center border-2 p-8">No Image Selected</p>
                        </div>
                    </div>


                    <div class="m-10">
                        <button type="submit" id="uploadImg"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @click="uploadImage()">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <!-- Heroicon name: solid/lock-closed -->
                                <svg class="h-6 w-6 text-indigo-500 group-hover:text-indigo-400"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true"></svg>
                            </span>
                            Upload Image
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </DefaultLayout>
</template>
<style >
#uploadDiv{
    max-height:50%
}
</style>
<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
let images = [];
export default {
    name: "JewelryUpload",
    components: {
        DefaultLayout,
    },
    data() {
        return {
            images: images,
            mainImg: ''

        };
    },
    methods: {
        uploadImage() {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = readerEvent => {
                    const content = readerEvent.target.result;
                    this.images.push(content);
                    this.mainImg = content;
                }
            }
            input.click();
        }
    }
}
</script>