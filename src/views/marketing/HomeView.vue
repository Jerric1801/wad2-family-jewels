<template>
  <DefaultLayout>
    <div ref="homeContainer" class="bg-white h-[380vh] w-[100vw] flex flex-col justify-center relative">
      <!-- Intro -->
      <div
        class="relative text-center z-10 mt-[40vh] flex justify-center align-center w-full h-[100vh] bg-transparent ">
        <h2 class="text-5xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
          style="z-index: 5;">
          Your Jewelry, <br />
          Perfectly Displayed Every Time
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
    <div class="bg-pink h-[100vh]"></div>
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
      backgroundParallax: 0,
      previousScrollTop: 0,
      targetRotation: 0,
      ring: null,
      rotation: 0,
      backgroundImages: [
        background1,
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
    }
  },
};
</script>
