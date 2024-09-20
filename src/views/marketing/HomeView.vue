<template>
  <DefaultLayout>
    <div ref="homeContainer" class="bg-white h-[100vh] w-[100vw] flex justify-center relative overflow-scroll">
      <!-- Intro -->
      <div class="relative text-center z-10 mt-[40vh] flex justify-center align-center w-full h-[100vh] bg-transparent ">
        <h2 class="text-5xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
          style="z-index: 5;">
          Your Jewelry, <br />
          Perfectly Displayed Every Time
        </h2>
      </div>
      <!-- Ring -->
      <div ref="sceneContainer" class="absolute overflow-hidden" style="z-index: 2;"> </div>
      <!-- Backgrounds -->
      <div class="relative h-[200vh]">
        <div v-for="(image, index) in backgroundImages" :key="index"
          class="absolute bottom-0 left-0 w-full bg-cover bg-center transition-opacity duration-1000" :style="{
            backgroundImage: `url(${image})`,
            opacity: index === currentImageIndex ? 1 : 0
          }"></div>
      </div>

    </div>

  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
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
    this.$refs.homeContainer.addEventListener('scroll', this.handleScroll);
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
                void main() {
                    float t = 0.25 * (vPosition.y + 1.0); // Interpolate based on Y-position
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
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.onWindowResize);
    this.$refs.homeContainer.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    handleScroll() {
      const scrollTop = this.$refs.homeContainer.scrollTop;

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
