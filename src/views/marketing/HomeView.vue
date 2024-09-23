<template>
  <DefaultLayout>
    <div ref="homeContainer" class="bg-white h-[400vh] w-[100vw] flex flex-col justify-center relative">
      <!-- Intro -->
      <div class="relative text-center z-10 mt-[40vh] flex justify-center w-full h-[100vh] bg-transparent ">
        <h2 class="text-5xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
          style="z-index: 5;">
          <span class="animate-fade-in-up bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
            v-for="(line, index) in headlineLines" :key="index" :style="{ animationDelay: `${index * 1}s` }">
            {{ line }}<br v-if="index === 0" />
          </span>
        </h2>
      </div>
      <!-- Ring -->
      <div class="w-full h-full absolute bg-transparent">
        <div ref="sceneContainer" class="overflow-hidden h-[85vh]" :style="{
          zIndex: 2,
          top: 0,
          position: 'sticky'
        }"> </div>
      </div>
      <!-- Backgrounds -->
      <div ref="backgroundsContainer" class="stack" :style="{
        height: '300vh',  // Set height to 50% of homeContainer
      }">
        <div v-for="(image, index) in backgroundImages" :key="index" class="
            flex 
            justify-center 
            items-center 
            h-[95vh] 
            sticky 
            top-0 
            shadow-[0_-1px_3px_rgba(0,0,0,0.1),_0_-1px_2px_rgba(0,0,0,0.25)] 
            text-[10rem] 
            bg-cover 
            bg-center" :style="{ backgroundImage: `url(${image})` }"></div>
      </div>
    </div>
    <!-- Section 1: Image Gen -->
    <div
      class="bg-white h-[85vh] text-center w-full flex flex-col md:flex-row md:h-[85vh] md:text-left justify-center items-center gap-3 p-4">
      <div class="h-[40%] w-[80%] md:w-[45%]">
        <h2
          class="pb-2 text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent">
          Effortless Product Image Generation</h2>
        <p class="mt-4">Upload your jewelry photos, and our AI will seamlessly place them on lifelike models, creating
          captivating images in seconds. No more expensive photoshoots or complex editing!</p>
      </div>
      <div class="h-[20%] w-[90%] md:w-[45%] flex justify-center items-center relative">
        <img class="w-full max-w-[85%] absolute bg-cover rounded-md" src="../../assets/images/home/product_1.jpg">
      </div>
    </div>
    <!-- Section 2: Perfect the look -->
    <div class="h-[85vh] w-[100vw] flex flex-col justify-center items-center gap-10 bg-white md:h-[110vh]">
      <div class="w-[80vw] text-center md:w-[50vw]">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent">
          Perfect the Look</h2>
        <p class="mt-3">Fine-tune images with easy-to-use editing tools. Adjust lighting, remove backgrounds, and even
          select the
          perfect model skin tone to match your brand's style.</p>
      </div>
      <div class="h-[45vh] w-[80vw] md:h-[60vh] md:w-[60vw] relative overflow-hidden rounded-md"
        @mousemove="handleMouseMove" @touchmove="handleTouchMove">
        <div class="absolute top-0 left-0 w-full h-full"
          :style="{ 'background-image': `url(${productImages[1]})`, 'background-size': 'cover', 'background-position': 'center 10%' }">
        </div>
        <div class="absolute top-0 left-0 h-full"
          :style="{ width: sliderPosition + 'px', 'background-image': `url(${productImages[0]})`, 'background-size': 'cover' }">
        </div>
        <div class="absolute top-0 h-full w-2 bg-gray-300 cursor-ew-resize" :style="{ left: sliderPosition + 'px' }"
          @mousedown="startDragging" @touchstart="startDragging" ref="sliderHandle">
        </div>
      </div>
    </div>
    <!-- Section 3: Call-To-Action -->
    <div
      class="h-[65vh] md:h-[80vh] w-[100vw] bg-gradient-to-r from-pink via-purple to-blue flex justify-center items-center">
      <div class="w-[80vw] md:h-[80vh] md:w-[60%] flex flex-col justify-center items-center gap-10 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Start Creating Stunning Jewelry Images Today!
        </h2>
        <button class="w-[45%] rounded-[99px] md:w-[30%] p-4 bg-white">Start Here!</button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import background1 from '@/assets/images/home/backgrounds/background_1.jpg';
import background2 from '@/assets/images/home/backgrounds/background_2.jpg';
import background3 from '@/assets/images/home/backgrounds/background_3.jpg';
import product1 from '@/assets/images/home/product_2.jpg';
import product2 from '@/assets/images/home/product_3.png';


export default {
  name: "HomeView",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      headlineLines: ["Your Jewelry,", "Perfectly Displayed Every Time"],
      sliderPosition: 275,
      isDragging: false,
      backgroundParallax: 0,
      previousScrollTop: 0,
      targetRotation: 0,
      ring: null,
      rotation: 0,
      productImages: [
        product1,
        product2
      ],
      backgroundImages: [
        background3,
        background2,
        background1,
      ],
      currentImageIndex: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 800);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth,
      window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    const loader = new FBXLoader();
    loader.load('/assets/models/Ring.fbx', (object) => {
      this.ring = object;
      this.scene.add(object);
      object.rotation.y = Math.PI / 2;
      object.rotation.z = 0;
      object.rotation.x = 0.55;
      object.position.z = -2;
      object.position.set(0, 0, 0);
      object.scale.set(0.001, 0.001, 0.001);
      object.traverse((child) => {
        if (child.isMesh) {
          const color1 = '#FFB8DA'
          const color2 = '#8063BC'
          const material = new THREE.ShaderMaterial({
            uniforms: {
              color1: { type: "c", value: new THREE.Color(color1) },
              color2: {
                type: "c", value: new THREE.Color(color2)
              },
            },

            vertexShader: `
              varying vec3 vPosition;
              void main() {
                  vPosition = position; 
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader:
              `
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec3 vPosition;
                varying vec3 vViewDirection;
                
                void main() {
                    float t = 0.25 * (vPosition.y + 0.8); 
                    vec3 color = mix(color1, color2, t);
                    gl_FragColor = vec4(color, 1.0);
                }
              `
          });
          material.metalness = 0.9;
          material.roughness = 0.1;
          child.material = material;
        }
      });
    },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
      });

    // Position the camera
    this.camera.position.z = 10;

    // Append renderer to sceneContainer (make sure it's AFTER scene setup)
    this.$refs.sceneContainer.appendChild(this.renderer.domElement);

    // Render the scene
    this.animate();

    // Listen for window resize events to update renderer size
    window.addEventListener('resize', this.onWindowResize, false);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    handleScroll() {
      const scrollTop = window.scrollY;
      // Scroll direction detection
      const currentScrollTop = scrollTop;
      const scrollDirection = currentScrollTop > this.previousScrollTop ? 'down' : 'up';
      this.previousScrollTop = currentScrollTop;

      if (this.ring) {
        if (scrollDirection === 'down') {
          this.ring.rotation.y += 0.05;
        } else {
          this.ring.rotation.y -= 0.05;
        }
      }

      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth,
        window.innerHeight);
    },
    handleMouseMove(event) {
      if (this.isDragging) {
        this.updateSliderPosition(event.clientX);
      }
    },
    handleTouchMove(event) {
      if (this.isDragging) {
        this.updateSliderPosition(event.touches[0].clientX);
      }
    },
    startDragging() {
      this.isDragging = true;
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.stopDragging);
      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.stopDragging);
    },
    stopDragging() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.stopDragging);

      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.stopDragging);
    },
    updateSliderPosition(clientX) {
      const container = this.$el;
      const containerRect = container.getBoundingClientRect();
      let newPosition = clientX - containerRect.left;

      // Constrain the slider position within the container's width
      const maxWidth = containerRect.width - this.$refs.sliderHandle.offsetWidth; // Adjust for handle width
      newPosition = Math.max(50, Math.min(maxWidth - 450, newPosition));

      this.sliderPosition = newPosition;
    }
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 2s ease-out forwards;
  opacity: 0;
}
</style>
