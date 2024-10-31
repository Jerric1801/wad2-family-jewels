<template>
  <DefaultLayout>
    <div class="bg-white h-[120vh] w-[100vw] flex flex-row justify-center relative p-[20px]">
      <div class="w-[27.5%] mt-[20vh] flex flex-col justify-center h-[90vh]">
        <div class="h-[10%] w-full flex justify-center items-center">
          <button @click="generateModelImages">Generate</button>
        </div>
        <div class="h-[90%] w-[95%] flex flex-col items-center rounded-md overflow-y-auto p-5">
          <div v-for="(image, index) in modelImages" :key="index" class="mb-3 p-2">
            <img :src="image" alt="Model" class="w-full rounded-md"
              :class="{ 'border-2 border-blue': selectedImage === image }" @click="selectImage(image)" />
          </div>
        </div>
      </div>
      <div class="w-[72.5%] mt-[20vh] flex flex-col h-[90vh] justify-between">
        <div class="w-full h-[62.5%] overflow-hidden">
          <Editor :img-src="selectedImage" :productSrc="productImg" />
        </div>
        <div class="w-[100%] h-[35%]">
          <div class="w-[100%] h-full flex flex-col items-center bg-grey rounded-md">
            <button @click="goToPlacementPage"
              class="group relative w-[200px] flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Continue to Placement Page
            </button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Editor from "@/components/jewelry/Editor.vue";
import { useImageStore } from '@/store/imageStore';
import { fetchModelImages } from '@/services/pebblely/productImage';

export default {
  name: "ModelSelectionView",
  components: {
    DefaultLayout,
    Editor,
  },
  setup() {
    const imageStore = useImageStore();
    return {
      productImg: imageStore.processedImage 
    };
  },
  data() {
    return {
      modelImages: [],
      selectedImage: null,
    };
  },
  methods: {
    async generateModelImages() {
      try {
        const base64Image = await this.imageToBase64(this.productImg);
        this.modelImages = await fetchModelImages(base64Image);
        this.selectedImage = this.modelImages[0];
      } catch (error) {
        console.error('Error generating model images:', error);
      }
    },
    imageToBase64(imageUrl) {
      return new Promise((resolve, reject) => {
        const img = new Image();
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
    selectImage(image) {
      this.selectedImage = image;
    },
    goToPlacementPage() {
      this.$router.push({ name: 'jewelry-placement' });
    },
  },
};
</script>