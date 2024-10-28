import { defineStore } from 'pinia';

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    processedImage: null
  }),
  actions: {
    setImage(image) {
      this.processedImage = image;
    }
  }
});