<template>
  <DefaultLayout>
    <div class="dark:bg-darkModeBg bg-white md:h-[130vh] h-[300vh] w-[100vw] flex md:flex-row flex-col justify-center relative p-[20px]">
      <div class="md:w-[27.5%] w-full mt-[20vh] flex flex-col justify-center md:h-[100vh] h-[40%] gap-3">
        <div class="h-[30%] w-full flex flex-col justify-center items-start">
          <div class="md:w-[90%] w-[95%]">
            <div class="mb-4">
              <div class="mb-4">
                <h3 class="dark:text-white">Image Description</h3>
                <textarea id="image-description" v-model="imageDescription" rows="4"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-darkModeBtnGrey dark:text-white"
                  placeholder="Describe your image"></textarea>
              </div>
              <h3 class="dark:text-white">Jewellery Type</h3>
              <select v-model="selectedJewelleryType" @change="updatePresetImages"
                class="w-full mt-1 px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-darkModeBtnGrey dark:text-white">
                <option value="necklace">Necklace</option>
                <option value="earrings">Earrings</option>
                <option value="rings">Rings</option>
                <option value="bracelets">Bracelets</option>
              </select>
            </div>
          </div>
        </div>
        <div class="md:h-[70%] h-[60%] w-[95%] flex flex-col items-center rounded-md overflow-y-auto p-5 dark:bg-cardItemBg dark:text-white">
          <div class="grid grid-cols-2 grid-rows-6 gap-2 mt-4">
            <div v-for="(image, index) in presetImages" :key="index" class="border rounded-md dark:border-white">
              <img :src="`/assets/images/models/${selectedJewelleryType}/${image}`" alt=""
                class="w-full h-full object-cover" @click="selectPresetImage(image)">
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-[72.5%] w-full md:mt-[20vh] mt-[5vh] flex flex-col md:h-[100vh] h-[65%] justify-between">
        <div class="w-full md:h-[68%] h-[75%] overflow-hidden">
          <Editor :img-src="selectedPresetImagePath" ref="editor" :productSrc="productImg"
            @generate="generateModelImages" @updateTransformCoordinates="updateTransformCoordinates" />
        </div>
        <div class="w-[95%] h-[35%] relative overflow-x-scroll overflow-y-hidden">
          <div class="absolute w-[150%] h-full flex items-start bg-gray-200 rounded-md p-4 dark:bg-cardItemBg">
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
      <div class="bg-white p-6 rounded-lg z-10 relative max-w-full w-full h-[90vh] md:w-[70vw] md:h-[70vh] flex flex-col md:flex-row align-center justify-center dark:bg-darkModeBg"> 
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="w-full md:w-1/2 mb-6 md:mb-0 md:mr-6 flex items-center justify-center h-[35%] md:h-full"> 
          <img :src="selectedImage" alt="Larger Image" class="w-full rounded-md max-h-96 object-contain"
            :style="{ filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px)` }">
        </div>
        <div class="w-full md:w-1/2 flex flex-col gap-4 justify-center h-[60%] md:h-full">
          <button @click="resetFilters"
            class="bg-blue hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-lightModeBtnBlue">Reset to Default</button>
          <div>
            <label for="contrast" class="block text-sm font-medium text-gray-700 dark:text-white">Contrast</label>
            <input type="range" id="contrast" min="0" max="200" v-model="contrast" class="w-full">
          </div>
          <div>
            <label for="brightness" class="block text-sm font-medium text-gray-700 dark:text-white">Brightness</label>
            <input type="range" id="brightness" min="0" max="200" v-model="brightness" class="w-full">
          </div>
          <div>
            <label for="saturation" class="block text-sm font-medium text-gray-700 dark:text-white">Saturation</label>
            <input type="range" id="saturation" min="0" max="200" v-model="saturation" class="w-full">
          </div>
          <div>
            <label for="blur" class="block text-sm font-medium text-gray-700 dark:text-white">Blur</label>
            <input type="range" id="blur" min="0" max="10" step="0.1" v-model="blur" class="w-full">
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <button @click="downloadImage(selectedImage)"
              class="bg-blue text-white font-bold py-2 px-4 rounded dark:bg-lightModeBtnBlue">
              Download Image
            </button>
            <button @click="addToLibrary(selectedImage)"
              class="bg-purple text-white font-bold py-2 px-4 rounded dark:bg-lightModeBtnPurple">
              Add to Library
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
import { uploadPhoto, retrieveImagesFromDatabase, getBlobFromUrl } from "@/services/firebase/generated";
import { addLibraryItem } from "@/services/firebase/library";

const user = JSON.parse(localStorage.getItem('user'))

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
      selectedJewelleryType: 'necklace',
      presetImages: [
      ],
      selectedPresetImagePath: null,
      imageDescription: '',
      xVal: 0,
      yVal: 0,
      xScale: 0.5,
      yScale: 0.5,
      contrast: 100,
      brightness: 100,
      saturation: 100,
      blur: 0,
    };
  },
  async mounted() {
    // Fetch initial preset images on component mount
    this.updatePresetImages();

    if (user) {
      try {
        const images = await retrieveImagesFromDatabase(user.uid);
        this.modelImages = images
      } catch (error) {
        console.error("Error fetching images from Firebase:", error);
      }
    }
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
        const newModelImage = await fetchModelImages(
          base64ProductImage,
          base64SelectedImage,
          this.xVal,
          this.yVal,
          this.xScale,
          this.yScale,
          this.selectedJewelleryType,
          this.imageDescription
        );

        if (user) {
          try {
            const imageBlob = await this.base64ToBlob(
              typeof newModelImage === 'string' ? newModelImage : String(newModelImage)
            );
            const imageName = `${user.uid}_${Date.now()}.png`;
            console.log(imageName);
            await uploadPhoto(user.uid, imageBlob, imageName);
            console.log(`Image ${imageName} uploaded successfully`);
          } catch (error) {
            console.error(`Error uploading image:`, error);
          }
        } else {
          console.error("User ID not found in localStorage.");
        }

        const images = await retrieveImagesFromDatabase(user.uid);
        this.modelImages = images;

        this.$refs.editor.generationComplete();

      } catch (error) {
        console.error('Error generating model images:', error);
      }
    },
    base64ToBlob(base64String) {
      return new Promise((resolve) => {
        const byteCharacters = atob(base64String.split(',')[1]);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray
            = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {
          type:
            'image/png'
        });
        resolve(blob);
      });
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
    async selectImage(image) {
      console.log(image)
      const blob = await getBlobFromUrl(image)
      console.log(blob)
      this.selectedImage = URL.createObjectURL(blob);
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
          'necklace_4.png',
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
      this.selectedPresetImagePath = `/assets/images/models/${this.selectedJewelleryType}/${image}`;
    },
    downloadImage() {
      const img = new Image();
      img.src = this.selectedImage;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.filter = `contrast(${this.contrast}%) brightness(${this.brightness}%) saturate(${this.saturation}%) blur(${this.blur}px)`;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download
            = 'edited_image.jpg';
          link.click();
        }, 'image/jpeg');
      };
    },
    async urlToBlob(imageUrl) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return blob;
      } catch (error) {
        console.error("Errorconverting URL to blob: ", error);
        return null;
      }
    },
    async addToLibrary(image) {
      const userId = user.uid;
      try {
        const dataUrl = await this.urlToBlob(image); 

        const itemData = {
          imageUrl: dataUrl,
          imageName: `${Date.now()}`,
          imageName: `${userId}_${Date.now()}.jpg`
        };
        console.log(itemData)
        const itemId = await addLibraryItem(userId, itemData);
        console.log("Item added to library with ID:", itemId);
        this.$router.push({
                name: "library",
            });
      } catch (error) {
        console.error("Error adding item:", error);
      }
    },
    resetFilters() {
      this.contrast = 100;
      this.brightness = 100;
      this.saturation = 100;
      this.blur = 0;
    },
    closeModal() {
      this.selectedImage = null;
    }
  },
};
</script>