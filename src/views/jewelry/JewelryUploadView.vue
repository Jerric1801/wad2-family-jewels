<template>
    <DefaultLayout>
        <div class="container mx-auto px-4 pt-[150px]">

            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                <div>
                    <div class="h-3/4 col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1  grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 overflow-y-auto">
                        <div class="w-42  rounded " v-for="image in images">
                            <img class="w-full h-40" :src="image" alt="">
                        </div>
                    </div>

                </div>
                <div class="container col-span-2" id="uploadDiv">
                    <div class="rounded shadow-lg bg-gray-200 lg:h-96 lg:w-3/4 mx-auto content-center" >
                        <img class = "lg:w-full lg:h-full" id="mainImg" :src="mainImg" v-if="mainImg != ''">
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
                        <div v-if="error" style="text-align: center;" >
                            <p style="color:red" >{{ errorMsg }}</p>
                        </div> 

                    </div>
                </div>
            </div>

        </div>
    </DefaultLayout>
</template>
<style >

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
            mainImg: '',
            error: false,
            errorMsg: '',

        };
    },
    methods: {
        uploadImage() {
            if(this.images.length == 2){
                this.error = true;
                this.errorMsg = 'You can only upload 6 images';
            }else{
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
}
</script>