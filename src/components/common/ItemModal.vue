<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
      <!-- Close button (top-right) -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
      >
        ✕
      </button>

      <div class="flex flex-col md:flex-row">
        <!-- Image Section -->
        <img
          :src="item.data.image"
          :alt="item.data.title"
          class="w-full md:w-1/2 h-72 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
        />

        <!-- Details Section -->
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl font-bold mb-2">{{ item.data.title }}</h2>
          <p class="text-gray-600 mb-4">{{ item.data.description }}</p>
          <p class="text-2xl font-bold text-blue-600 mb-4">
            ${{ item.data.price }}
          </p>
          <p class="text-sm text-gray-500 mb-4">
            Category: {{ item.data.category }}
          </p>
        </div>
      </div>

      <!-- Button group at the bottom -->
      <div class="flex justify-end space-x-4 mt-6">
        <button
          class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors purchase-btn"
          @click="handlePurchase"
        >
          Purchase
        </button>
        <button
          class="bg-gray-300 text-gray-700 px-6 py-2 cancel-btn"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handlePurchase() {
      // Emit a custom event or handle purchase logic here
      alert(`Purchased ${this.item.data.title} for $${this.item.data.price}`);
    },
  },
};
</script>

<style scoped>
.purchase-btn {
  @apply bg-green-500 text-white hover:bg-green-600 rounded-lg shadow-md transition;
}

.cancel-btn {
  @apply bg-gray-400 text-white hover:bg-gray-500 rounded-lg shadow-md transition;
}
</style>
