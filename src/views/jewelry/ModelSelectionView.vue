<template>
    <DefaultLayout>
        <Editor :img-src=mainImg :productSrc=productImg /> 
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