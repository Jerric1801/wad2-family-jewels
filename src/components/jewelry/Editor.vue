<template>
    <div class="w-[100%] h-[100%] flex bg-white rounded-md relative">
        <div class="w-[15%] h-full flex flex-col items-center space-y-4 justify-end absolute left-0 top-0 z-10">
            <div class="w-[90%]">
                <input type="range" min="1" :max="maxZoom" v-model="zoomLevel" orientation="vertical" />
            </div>
        </div>
        <div class="w-[55%] ml-[10%] h-full flex justify-center items-center relative">
            <canvas ref="canvas" class="max-w-full max-h-full rounded-md" @mousedown="startDrag" @mousemove="drag"
                @mouseup="endDrag" @mouseleave="endDrag">
            </canvas>
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
                    <img :src="productSrc" alt="Product Image" class="absolute object-cover">
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
        };
    },
    mounted() {
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas);
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
            this.drawCanvas();
        },
        productSrc() {
            this.drawCanvas();
        }
    },
    methods: {
        resizeCanvas() {
            const canvas = this.$refs.canvas;
            const containerWidth = canvas.parentElement.offsetWidth;
            const containerHeight = canvas.parentElement.offsetHeight;

            // Calculate canvas dimensions based on container and aspect ratio
            const aspectRatio = 550 / 500; // Based on your initial dimensions
            let newWidth = containerWidth;
            let newHeight = containerWidth / aspectRatio;

            if (newHeight > containerHeight) {
                newHeight = containerHeight;
                newWidth = containerHeight * aspectRatio;
            }
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Redraw canvas content if necessary
            this.drawCanvas();
        },

        drawCanvas() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');
            const baseImage = new Image();
            const productImage = new Image();

            baseImage.src = this.imgSrc;
            productImage.src = this.productSrc;

            baseImage.onload = () => {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;

                // Calculate the scaling factor
                const scaleFactor = Math.max(canvas.width / baseImage.width, canvas.height / baseImage.height) * this.zoomLevel;

                // Calculate the scaled dimensions of the background image
                const scaledWidth = baseImage.width * scaleFactor;
                const scaledHeight = baseImage.height * scaleFactor;

                // Calculate the x and y offsets to center the image
                const xOffset = (canvas.width - scaledWidth) / 2;
                const yOffset = (canvas.height - scaledHeight) / 2;

                // Draw the background image with scaling and centering
                ctx.drawImage(baseImage, xOffset, yOffset, scaledWidth, scaledHeight);

                // Draw the product image without scaling
                ctx.globalAlpha = this.opacity;
                ctx.drawImage(productImage, this.offsetX, this.offsetY, productImage.width / 2, productImage.height / 2);
            };
        },
        startDrag(event) {
            this.isDragging = true;
            this.startX = event.offsetX - this.offsetX;
            this.startY = event.offsetY - this.offsetY;
        },
        drag(event) {
            if (!this.isDragging) return;

            this.offsetX = event.offsetX - this.startX;
            this.offsetY = event.offsetY - this.startY;

            this.drawCanvas();

            // Calculate and emit transform coordinates from the center
            const centerX = this.$refs.canvas.width / 2;
            const centerY = this.$refs.canvas.height / 2;
            const transformX = this.offsetX + this.$refs.canvas.width / 2 - centerX;
            const transformY = this.offsetY + this.$refs.canvas.height / 2 - centerY;
            this.$emit('transform-coordinates', { x: transformX, y: transformY });
        },
        endDrag() {
            this.isDragging = false;
        },
    },
};
</script>