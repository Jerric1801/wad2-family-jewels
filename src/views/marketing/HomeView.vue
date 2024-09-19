<template>
  <DefaultLayout>
    <div class="bg-white h-[200vh] w-[100vw] flex items-center justify-center relative overflow-hidden">
      <div ref="sceneContainer" class="relative overflow-hidden" style="z-index: 2;"> </div>
      <div class="text-center z-10 absolute">
        <h2 class="text-5xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent">
          Your Jewelry, <br />
          Perfectly Displayed Every Time
        </h2>
      </div>

      <div v-for="(image, index) in backgroundImages" :key="index"
        class="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000" :style="{
          backgroundImage: `url(${image})`,
          opacity: index === currentImageIndex ? 1 : 0
        }"></div>
    </div>

  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import background1 from '@/assets/images/home/backgrounds/background_1.jpg';
import background2 from '@/assets/images/home/backgrounds/background_2.jpg';

export default {
  name: "HomeView",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      previousScrollTop: 0,
      targetRotation: 0,
      ring: null,
      rotation: 0,
      backgroundImages: [
        background1, 
        background2,
      ],
      currentImageIndex: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // Create scene, camera, and renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 800);
    this.renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha channel for transparency
    this.renderer.setSize(window.innerWidth,
      window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    const loader = new FBXLoader();
    loader.load('/assets/models/Ring.fbx', (object) => { // Load the FBX file
      this.ring = object;

      this.scene.add(object);

      // Optional: Adjust ring position/rotation/scale if needed
      object.rotation.y = Math.PI / 2;
      object.position.z = -2;
      object.position.set(0, 0, 0); // Adjust position if necessary
      object.scale.set(0.003, 0.003, 0.003);    // Adjust scale if necessary
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
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop; // Get scroll position

      // Change background image on scroll thresholds
      const imageChangeThreshold = window.innerHeight / 2;
      const newImageIndex = Math.floor(scrollTop / imageChangeThreshold) % this.backgroundImages.length;
      if (newImageIndex !== this.currentImageIndex) { // Only update if the index has changed
        this.currentImageIndex = newImageIndex;
      }
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
    }
  },
};
</script>
