<template>
    <div class="w-[100%] h-[100%] flex bg-white rounded-md">
        <div class="w-[15%] h-full flex flex-col items-center space-y-4 justify-end">
            <div class="w-[90%]">
                <input type="range" min="1" :max="maxZoom" v-model="zoomLevel" orientation="vertical" />
            </div>
        </div>
        <div class="w-[55%] h-full flex justify-center items-center">
            <div class="w-[90%] h-[90%] relative overflow-hidden bg-grey flex items-center rounder-md">
                <img :src="imgSrc" alt="Product Image" class="absolute" :style="zoomStyle">
            </div>
        </div>
        <div class="w-[30%] h-full flex flex-col items-center">
            <div class="h-[25%] w-[90%] bg-grey flex flex-col justify-start items-center rounded-md mt-[10%]">
                <p class="mt-2"><b>Toolbar</b></p>
                <p class="mt-2">Opacity</p>
                <div class="w-full flex flex-col justify-center items-center">
                    <input type="range" min="0" max="1" step="0.1" v-model="opacity" />
                </div>
            </div>
            <div class="h-[60%] w-[90%] bg-grey flex flex-col justify-start items-center rounded-md mt-[5%]">
                <p class="mt-2"><b>Selected Product</b></p>
                <p class="mt-2">Product Name</p>
                <div class="w-[50%] h-[50%] relative overflow-hidden bg-grey flex items-center">
                    <img :src=productSrc alt="Product Image" class="absolute object-cover">
                </div>
                <p>Select Another Product</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Editor',
    props: {
        imgSrc: String,
        productSrc: String
    },
    data() {
        return {
            zoomLevel: 2,
            maxZoom: 10,
            opacity: 1
        };
    },
    computed: {
        zoomStyle() {
            return {
                transform: `scale(${this.zoomLevel})`,
                transformOrigin: 'center',
                maxWidth: '100%',
                maxHeight: '100%',
                opacity: this.opacity
            };
        }
    }
}
</script>