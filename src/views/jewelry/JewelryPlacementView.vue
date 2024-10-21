<template>
    <DefaultLayout>
      <div class="container mx-auto px-4 pt-[150px] flex flex-col items-center h-[110vh]">
        <h2 class="text-2xl font-bold mb-4">Place Your Jewelry</h2>
        <p class="text-gray-600 mb-6">
          Position the jewelry on the model by dragging it around.
        </p>
  
        <div class="relative w-96 h-96 border border-gray-300"> 
          <img :src="modelImage" alt="Model" class="w-full h-full object-cover" />
          <img 
            :src="jewelryImage" 
            alt="Jewelry" 
            class="absolute"
            :style="{ 
              top: `${jewelryPosition.y}px`, 
              left: `${jewelryPosition.x}px` 
            }"
            @mousedown="startDrag" 
            @touchstart="startDrag" 
          />
        </div>
  
        <button @click="goToNextPage" class="mt-6 px-4 py-2 bg-purple text-white rounded hover:bg-blue-600">
          Continue
        </button>
      </div>
    </DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
  import { useImageStore } from '@/store/imageStore';
  
  export default {
    components: {
      DefaultLayout,
    },
    data() {
      return {
        modelImage: 'path/to/your/model/image.jpg', // Replace with your model image
        jewelryImage: null, 
        jewelryPosition: { x: 0, y: 0 },
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
      };
    },
    setup() {
      const imageStore = useImageStore();
      return { imageStore };
    },
    mounted() {
      this.jewelryImage = this.imageStore.processedImage;
    },
    methods: {
      startDrag(e) {
        this.isDragging = true;
        this.offsetX = e.clientX - this.jewelryPosition.x;
        this.offsetY = e.clientY - this.jewelryPosition.y;
  
        // For touch events
        if (e.type === 'touchstart') {
          this.offsetX = e.touches[0].clientX - this.jewelryPosition.x;
          this.offsetY = e.touches[0].clientY - this.jewelryPosition.y;
        }
  
        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.stopDrag);
        document.addEventListener('touchmove', this.onDrag);
        document.addEventListener('touchend', this.stopDrag);
      },
      onDrag(e) {
        if (!this.isDragging) return;
  
        let newX = e.clientX - this.offsetX;
        let newY = e.clientY - this.offsetY;
  
        // For touch events
        if (e.type === 'touchmove') {
          newX = e.touches[0].clientX - this.offsetX;
          newY = e.touches[0].clientY - this.offsetY;
        }
  
        this.jewelryPosition = { x: newX, y: newY };
      },
      stopDrag() {
        this.isDragging = false;
  
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);
        document.removeEventListener('touchmove', this.onDrag);
        document.removeEventListener('touchend', this.stopDrag);
      },
      goToNextPage() {
        // Combine images here (using html2canvas or similar)

        // this.imageStore.setCombinedImage(combinedImageDataUrl);
  
        this.$router.push('/refinement'); // Replace '/next-page' with the actual route
      }
    }
  };
  </script>