<template>
  <DefaultLayout>
    <div class="bg-white h-[130vh] w-[100vw] flex flex-row justify-center relative p-[20px]">
      <div class="w-[27.5%] mt-[20vh] flex flex-col justify-center h-[100vh]">
        <div class="h-[10%] w-full flex justify-center items-center">
          <div>
            <select v-model="selectedJewelleryType" @change="updatePresetImages">
              <option value="necklace">Necklace</option>
              <option value="earrings">Earrings</option>
              <option value="rings">Rings</option>
              <option value="bracelets">Bracelets</option>
            </select>
          </div>
        </div>
        <div class="h-[90%] w-[95%] flex flex-col items-center rounded-md overflow-y-auto p-5 bg-gray-200">
          <div class="grid grid-cols-2 grid-rows-6 gap-2 mt-4">
            <div v-for="(image, index) in presetImages" :key="index" class="border rounded-md">
              <img :src="`/src/assets/images/models/${selectedJewelleryType}/${image}`" alt=""
                class="w-full h-full object-cover" @click="selectPresetImage(image)">
            </div>
          </div>
        </div>
      </div>
      <div class="w-[72.5%] mt-[20vh] flex flex-col h-[100vh] justify-between">
        <div class="w-full h-[68%] overflow-hidden">
          <Editor :img-src="selectedPresetImagePath" :productSrc="productImg" @generate="generateModelImages"
            @updateTransformCoordinates="updateTransformCoordinates" />
        </div>
        <div class="w-[100%] h-[35%]">
          <div class="w-[100%] h-full flex items-start bg-gray-200 rounded-md p-4">
            <div v-for="(image, index) in modelImages" :key="index" class="mb-3 p-2 relative h-[100%]">
              <img :src="image" alt="Model" class="w-full rounded-md cursor-pointer h-[100%]"
                :class="{ 'border-2 border-blue-500 ': selectedImage === image }" @click="selectImage(image)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedImage" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="bg-white p-6 rounded-lg z-10 max-w-lg w-full relative">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             

            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>  

        </button>
        <img :src="selectedImage" alt="Larger Image" class="w-full rounded-md mb-4 max-h-96 object-contain">
        <div class="flex flex-col gap-2">
          <button @click="refineImage(selectedImage)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Refine Image
          </button>
          <button @click="downloadImage(selectedImage)"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Download Image
          </button>
          <button @click="addToLibrary(selectedImage)"
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Add to Library
          </button>
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
      selectedJewelleryType: 'necklace', // Default jewellery type
      presetImages: [
      ],
      selectedPresetImagePath: null,
      xVal: 0, // Default x-coordinate
      yVal: 0, // Default y-coordinate
      xScale: 0.5, // Default x-scale
      yScale: 0.5, // Default y-scale
    };
  },
  mounted() {
    // Fetch initial preset images on component mount
    this.updatePresetImages();
  },
  methods: {
    updateTransformCoordinates(coordinates) {
      this.xVal = coordinates.x;
      this.yVal = coordinates.y;
      this.xScale = coordinates.xScale;
      this.yScale = coordinates.yScale;
    },
    async generateModelImages() {
      try {
        const base64ProductImage = await this.productImg
        const base64SelectedImage = await this.imageToBase64(this.selectedPresetImagePath);
        console.log(
          this.productImg, {
          base64ProductImage,
          base64SelectedImage,
          xVal: this.xVal,
          yVal: this.yVal,
          xScale: this.xScale,
          yScale: this.yScale
        });
        this.modelImages = await fetchModelImages(
          base64ProductImage,
          base64SelectedImage,
          this.xVal,
          this.yVal,
          this.xScale,
          this.yScale,
          this.selectedJewelleryType
        );
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
    // Fetch preset images based on selected jewellery type
    updatePresetImages() {
      // This function is now simpler since we are providing the filenames directly
      // Update this.presetImages with the appropriate filenames for the selectedJewelleryType
      if (this.selectedJewelleryType === 'necklace') {
        this.presetImages = [
          'necklace_1.jpg',
          'necklace_2.jpg',
          'necklace_3.jpg',
          'necklace_4.jpg',
          'necklace_5.jpg',
          'necklace_6.jpg',
        ];
      } else if (this.selectedJewelleryType === 'earrings') {
        this.presetImages = [
          'earrings_1.jpg',
          'earrings_2.jpg',
          'earrings_3.jpg',
          'earrings_4.jpg',
          'earrings_5.jpg',
          'earrings_6.jpg',
        ];
      } else if (this.selectedJewelleryType === 'bracelets') {
        this.presetImages = [
          'bracelets_1.jpg',
          'bracelets_2.jpg',
          'bracelets_3.jpg',
          'bracelets_4.jpg',
          'bracelets_5.jpg',
          'bracelets_6.jpg',
        ];
      } else if (this.selectedJewelleryType === 'rings') {
        this.presetImages = [
          'rings_1.jpg',
          'rings_2.jpg',
          'rings_3.jpg',
          'rings_4.jpg',
          'rings_5.jpg',
          'rings_6.jpg',
        ];
      }
    },
    selectPresetImage(image) {
      // Construct the full path to the selected preset image
      this.selectedPresetImagePath = `/src/assets/images/models/${this.selectedJewelleryType}/${image}`;
    },
    refineImage(image) {
      // Logic to open image editor or refinement tool
      console.log('Refine image:', image);
    },
    downloadImage(image) {
      // Logic to download the image
      console.log('Download image:', image);
    },
    addToLibrary(image) {
      // Logic to add the image to the user's library
      console.log('Add to library:', image);
    },
    closeModal() {
      this.selectedImage = null; // This will hide the modal
    }
  },
};
</script>