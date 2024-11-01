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
        <div class="h-[90%] w-[95%] flex flex-col items-center rounded-md overflow-y-auto p-5">
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
          <Editor :img-src="selectedPresetImagePath" :productSrc="productImg" />
        </div>
        <div class="w-[100%] h-[35%]">
          <div class="w-[100%] h-full flex flex-col items-center bg-grey rounded-md">
            <div v-for="(image, index) in modelImages" :key="index" class="mb-3 p-2">
              <img :src="image" alt="Model" class="w-full rounded-md"
                :class="{ 'border-2 border-blue': selectedImage === image }" @click="selectImage(image)" />
              <div v-if="selectedImage === image" class="fixed inset-0 flex items-center justify-center z-50">
                <div class="absolute inset-0 bg-black opacity-50"></div>
                <div class="bg-white p-4 rounded-md z-10">
                  <img :src="image" alt="Larger Image" class="w-full rounded-md mb-4">
                  <button @click="refineImage(image)">Refine Image</button>
                  <button @click="downloadImage(image)">Download Image</button>
                  <button @click="addToLibrary(image)">Add to Library</button>
                  <button @click="closeModal">Close</button>
                </div>
              </div>
            </div>
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
      selectedJewelleryType: 'necklace', // Default jewellery type
      presetImages: [
        '1.jpeg',
        'necklace_4.png'
        // ...other image filenames for necklace
      ],
      selectedPresetImagePath: null, // Store the path of the selected preset image
    };
  },
  mounted() {
    // Fetch initial preset images on component mount
    this.updatePresetImages();
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
    // Fetch preset images based on selected jewellery type
    updatePresetImages() {
      // This function is now simpler since we are providing the filenames directly
      // Update this.presetImages with the appropriate filenames for the selectedJewelleryType
      if (this.selectedJewelleryType === 'necklace') {
        this.presetImages = [
          'necklace_4.png'
          // ...other image filenames for necklace
        ];
      } else if (this.selectedJewelleryType === 'earrings') {
        this.presetImages = [
          '1.jpeg',
          // ... image filenames for earrings
        ];
      } // ... and so on for other jewellery types
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