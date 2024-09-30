<template>
    <div class="w-[700px] h-[350px] flex">
        <div class="w-[10%] h-full">
            
        </div>
        <div class="w-[60%] h-full">
            <img :src=imgSrc alt="Product Image">
        </div>
        <div class="w-[30%] h-full flex flex-col">
            <div class="w-[100%] bg-grey flex justify-center items-center">
                <p>Toolbar</p>
            </div>
            <div class="">
                <p>Selected Product</p>
                <p>Product Name</p>
                <img :src=productSrc alt="Product Image">
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
    }
}


</script>