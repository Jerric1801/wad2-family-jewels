<template>
    <DefaultLayout>
        <div class="bg-white h-[120vh] w-[100vw] flex flex-row justify-center relative p-[20px]">
            <div class="w-[27.5%] mt-[20vh] flex justify-center h-[90vh]">
                <div class="w-[95%] flex flex-col items-center bg-grey rounded-md">

                </div>
            </div>
            <div class="w-[72.5%] mt-[20vh] flex flex-col h-[90vh] justify-between">
                <div class="w-full h-[62.5%] overflow-hidden">
                    <Editor :img-src=mainImg :productSrc=productImg />
                </div>
                <div class="w-full h-[35%]">
                    <div class="w-[100%] h-full flex flex-col items-center bg-grey rounded-md">

                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Editor from "@/components/jewelry/Editor.vue"
import product1 from '@/assets/images/home/product_2.jpg';
import product2 from '@/assets/images/home/product_3.png';

export default {
    name: "ModelSelectionView",
    components: {
        DefaultLayout,
        Editor
    },
    data() {
        return {
            mainImg: product1,
            productImg: product2
        }
    }

}
</script>