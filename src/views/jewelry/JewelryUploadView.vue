<template>
    <DefaultLayout>
        <div class="container mx-auto px-4 pt-[150px]">

            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                <div>
                    <div
                        class="h-3/4 col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1  grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 overflow-y-auto">
                        <div class="w-42  rounded " v-for="image in images">
                            <img class="w-full h-40" :src="image" alt="">
                        </div>
                    </div>

                </div>
                <div class="container col-span-2" id="uploadDiv">
                    <div class="rounded shadow-lg bg-gray-200 lg:h-96 lg:w-3/4 h-96 mx-auto content-center">
                        <img class="lg:w-full lg:h-full" id="mainImg" :src="mainImg" v-if="mainImg != ''">
                        <div v-else class="bg-grey-200">
                            <p class="text-center border-2 p-8">No Image Selected</p>
                        </div>
                    </div>
                    <div>
                        <input @change="chooseImg" type="file" id="chooseImg" name="chooseImg"
                            class="focus mx-auto pt-5 pb-2" style="display: block;width: 110px;" />

                    </div>


                    <div>
                        <button type="submit" id="uploadImg"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @click="handleUploadPhoto">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <!-- Heroicon name: solid/lock-closed -->
                                <svg class="h-6 w-6 text-indigo-500 group-hover:text-indigo-400"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true"></svg>
                            </span>
                            Upload Images
                        </button>
                        <div v-if="error" style="text-align: center;">
                            <p style="color:red">{{ errorMsg }}</p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </DefaultLayout>
</template>
<style></style>
<script>
import { useAuthStore } from "@/store/auth";
import { retrieveUserProfile, uploadPhoto } from "@/services/firebase/uploadJewel";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref, reactive } from "vue";
import { useRouter } from "vue-router";
export default {
    name: "JewelryUpload",
    components: {
        DefaultLayout,
    }, setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        const { isAuthenticated, user } = storeToRefs(authStore);
        let userid = ref("");
        let userData = ref(null);
        let isLoading = ref(true);
        const fileInput = ref(null);
        let images = reactive([]);
        let mainImg = ref('');
        const checkAuthentication = async () => {
            if (!isAuthenticated.value) {
                router.push("/login");
            } else {
                userid.value = user.value.uid;
                userData.value = await retrieveUserProfile(userid.value);
                // if (userData.value && userData.value.imageUrl) {
                //     const img = new Image();
                //     img.src = userData.value.imageUrl;
                //     img.onload = () => {
                //         isLoading.value = false;
                //     };
                //     img.onerror = () => {
                //         console.error("Error loading image");
                //         isLoading.value = false;
                //     };
                // } else {
                //     isLoading.value = false;
                // }
            }
        };

        const handleUploadPhoto = async (event) => {
            
            if (images) {
                try {
                    await uploadPhoto(userid.value, images);
                    userData.value = await retrieveUserProfile(userid.value);
                    console.log("Photo uploaded successfully");
                } catch (error) {
                    console.error("Error uploading photo:", error);
                }
            }
        };
        const chooseImg = () => {
            const file = document.getElementById('chooseImg').files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const content = e.target.result
                
                mainImg.value = content;
                images.push(content);
            }.bind(this);
            reader.readAsDataURL(file);
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
            userData,
            isLoading,
            handleUploadPhoto,
            triggerFileInput,
            images,
            mainImg,
            chooseImg,
            handleImageError,

        };
    },
    // data() {
    //     return {
    //         images: images,
    //         mainImg: '',
    //         error: false,
    //         errorMsg: '',

    //     };
    // },
    // methods: {
    //     uploadImages() {
    //         if (this.images.length == 2) {
    //             this.error = true;
    //             this.errorMsg = 'You can only upload 6 images';
    //         } else {

    //         }

    //     },
    //     chooseImg() {
    //         const file = document.getElementById('chooseImg').files[0];
    //         const reader = new FileReader();
    //         reader.onload = function (e) {
    //             const content = e.target.result
    //             this.mainImg = content;
    //             this.images.push(content);
    //         }.bind(this);
    //         reader.readAsDataURL(file);
    //         // const input = document.createElement('input');
    //         // input.type = 'file';
    //         // input.onchange = e => {
    //         //     const file = e.target.files[0];
    //         //     const reader = new FileReader();
    //         //     reader.readAsDataURL(file);
    //         //     reader.onload = readerEvent => {
    //         //         const content = readerEvent.target.result;
    //         //         
    //         //         this.mainImg = content;
    //         //     }
    //         // }
    //         // input.click();
    //     },
    // }
}
</script>