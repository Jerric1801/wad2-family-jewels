<template>
    <div class="w-[95%] h-[100%] flex flex-col md:flex-row dark:bg-darkModeBg bg-white rounded-md relative items-center justify-between">
      <div class="md:w-[15%] w-[90%] md:h-full h-[40%] flex flex-col items-center space-y-4 justify-end absolute left-0 top-0 z-10">
        <div class="w-[90%]">
          <input type="range" min="1" :max="maxZoom" v-model="zoomLevel" orientation="vertical" />
        </div>
      </div>
      <div class="md:w-[55%] w-full md:ml-[10%] md:h-[85%] h-[40%] flex justify-center items-center relative dark:bg-cardItemBg bg-gray-200 rounded-md p-3">
        <canvas ref="canvas" class="w-full h-full max-w-full max-h-full rounded-md " @mousedown="startDrag" @mousemove="drag"
          @mouseup="endDrag" @mouseleave="endDrag">
        </canvas>
      </div>
      <div class="md:w-[30%] w-full md:h-full h-[60%] flex flex-col items-center gap-5 pt-[5%]">
        <div class="h-[20%] md:w-[90%] w-full dark:bg-cardItemBg bg-gray-200 flex flex-col justify-start items-center rounded-md">
          <p class="mt-2 dark:text-white"><b>Toolbar</b></p>
          <p class="mt-2 dark:text-white">Opacity</p>
          <div class="w-full flex flex-col justify-center items-center">
            <input type="range" min="0" max="1" step="0.1" v-model="opacity" />
          </div>
        </div>
        <div class="h-[55%] md:w-[90%] w-full dark:bg-cardItemBg bg-gray-200 flex flex-col justify-start items-center rounded-md">
          <p class="mt-2 dark:text-white"><b>Selected Product</b></p>
          <p class="mt-2 dark:text-white">Product Name</p>
          <div class="w-[50%] h-[50%] relative overflow-hidden dark:bg-cardItemBg bg-gray-200 flex items-center">
            <img :src="productSrc" alt="Product Image" class="absolute object-cover">
          </div>
          <a href='/upload'>
            <p class="dark:text-white">Select Another Product</p>
          </a>
        </div>
        <div class="h-[10%] md:w-[90%] w-full dark:bg-cardItemBg bg-gray-200 rounded-md flex flex-col justify-center items-center cursor-pointer 
              transition-all duration-300 ease-in-out hover:bg-gray-300 hover:scale-105 dark:hover:bg-darkModeBtnGrey" @click="generateImage">
          <p v-if="!generating" class="font-medium text-gray-700 hover:text-gray-800 dark:text-white dark:hover:text-gray-300">Generate</p>
          <div v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700 dark:text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
              </circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            <span class="font-medium text-gray-700 dark:text-white">Generating...</span>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
    name: 'Editor',
    props: {
        imgSrc: {
            type: String,
            default: null,
        },
        productSrc: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            zoomLevel: 1,
            maxZoom: 10,
            opacity: 1,
            isDragging: false,
            offsetX: 0,
            offsetY: 0,
            startX: 0,
            startY: 0,
            productImage: null,
            initialProductWidth: null,
            initialProductHeight: null,
            baseImage: new Image(),
            generating: false,
        };
    },
    mounted() {
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas);
        this.loadBackgroundImage();
        // this.loadProductImage();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.resizeCanvas);
    },
    watch: {
        zoomLevel() {
            this.drawCanvas();
        },
        opacity() {
            this.drawCanvas();
        },
        imgSrc() {
            this.loadBackgroundImage(); // Reload when imgSrc changes
        },
        productSrc() {
            this.loadProductImage();
        }
    },
    methods: {
        resizeCanvas() {
            const canvas = this.$refs.canvas;
            const containerWidth = canvas.parentElement.offsetWidth;
            const containerHeight = canvas.parentElement.offsetHeight;

            const aspectRatio = 550 / 500;
            let newWidth = containerWidth;
            let newHeight = containerWidth / aspectRatio;

            if (newHeight > containerHeight) {
                newHeight = containerHeight;
                newWidth = containerHeight * aspectRatio;
            }
            canvas.width = newWidth;
            canvas.height = newHeight;

            this.drawCanvas();
        },

        loadProductImage() {
            this.productImage = new Image();
            this.productImage.src = this.productSrc;
            this.productImage.onload = () => {
                this.initialProductWidth = this.productImage.width;
                this.initialProductHeight = this.productImage.height;
                this.drawCanvas();

                // Emit initial transform coordinates after image loads
                this.$emit('updateTransformCoordinates', {
                    x: this.offsetX,
                    y: this.offsetY,
                    xScale: this.initialProductWidth ? this.initialProductWidth / 2.5 / this.initialProductWidth : 1,
                    yScale: this.initialProductHeight ? this.initialProductHeight / 2.5 / this.initialProductHeight : 1,
                });
            };
        },

        loadBackgroundImage() {
            this.baseImage.src = this.imgSrc; // Load the image into the baseImage variable
            this.baseImage.onload = () => {
                this.loadProductImage()
                this.drawCanvas();
            };
        },
        drawCanvas() {
            if (!this.productImage || !this.productImage.complete || this.productImage.naturalWidth === 0) {
                console.warn('Product image not loaded or broken.');
                return;
            }

            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const offscreenCanvas = document.createElement('canvas');
            const offscreenCtx = offscreenCanvas.getContext('2d');
            offscreenCanvas.width
                = canvas.width;
            offscreenCanvas.height = canvas.height;

            // Use the pre-loaded baseImage instead of creating a new Image each time
            const scaleFactor = Math.max(canvas.width / this.baseImage.width, canvas.height / this.baseImage.height) * this.zoomLevel;

            const scaledWidth = this.baseImage.width * scaleFactor;
            const scaledHeight = this.baseImage.height * scaleFactor;

            const xOffset = (canvas.width - scaledWidth) / 2;
            const yOffset = (canvas.height - scaledHeight) / 2;

            offscreenCtx.globalAlpha = this.opacity;
            offscreenCtx.drawImage(this.baseImage, xOffset, yOffset, scaledWidth, scaledHeight);

            offscreenCtx.globalAlpha = 1;
            const productWidth = this.initialProductWidth / 2.5;
            const productHeight = this.initialProductHeight / 2.5;
            offscreenCtx.drawImage(this.productImage, this.offsetX, this.offsetY, productWidth, productHeight);

            ctx.drawImage(offscreenCanvas, 0, 0);
        },

        startDrag(event) {
            this.isDragging = true;
            this.startX = event.offsetX - this.offsetX;
            this.startY = event.offsetY - this.offsetY;
        },

        drag(event) {
            if (!this.isDragging || !this.productImage) return;

            this.offsetX = event.offsetX - this.startX;
            this.offsetY = event.offsetY - this.startY;

            this.drawCanvas();

            this.$emit('updateTransformCoordinates', {
                x: this.offsetX,
                y: this.offsetY,
                xScale: this.initialProductWidth ? this.initialProductWidth / 2.5 / this.initialProductWidth : 1,
                yScale: this.initialProductHeight ? this.initialProductHeight / 2.5 / this.initialProductHeight : 1,
            });
        },

        endDrag() {
            this.isDragging = false;
        },
        generateImage() {
            if (!this.productSrc || !this.imgSrc) {
                alert("Please select an image."); 
                return; 
            }
            this.generating = true;
            this.$emit('generate')
        },
        generationComplete() {
            this.generating = false; // Re-enable the button and hide the loader
        },
    }
};
</script>