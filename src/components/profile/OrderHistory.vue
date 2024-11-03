<template>
  <div class="border-t border-gray-200 pt-6">
    <h3 class="text-2xl font-semibold mb-4 text-indigo-600">Order History</h3>

    <!-- Filter and Search Section -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center">
        <p class="text-gray-700">
          {{ filteredOrders.length }} orders placed in
        </p>
        <select v-model="dateRange" class="border rounded px-3 py-2 ml-2">
          <option value="999">All</option>
          <option value="3">Past three months</option>
          <option value="6">Past six months</option>
          <option value="12">Past year</option>
        </select>
      </div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search all orders"
        class="border rounded px-3 py-2 w-1/3"
      />
    </div>

    <!-- Order Cards -->
    <div class="space-y-6">
      <div
        v-for="(order, index) in filteredOrders"
        :key="index"
        class="border rounded-lg shadow-md p-6 bg-white mb-6 hover:shadow-lg transition-shadow duration-300"
      >
        <div class="flex justify-between mb-4 items-start">
          <!-- Order Image -->
          <div
            class="w-24 h-24 rounded overflow-hidden mr-6 flex-shrink-0 shadow-md"
          >
            <img
              :src="order.data.imageUrl"
              alt="Product Image"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Order Details -->
          <div class="flex-1">
            <p class="text-gray-600 mb-1">
              <strong>Item Name:</strong> {{ order.data.productName }}
            </p>
            <p class="text-gray-600 mb-1">
              <strong>Order Placed on:</strong> {{ order.data.date }}
            </p>
            <p class="text-gray-600 mb-1">
              <strong>Total Price:</strong> ${{ order.data.total }}
            </p>
            <p class="text-gray-600 mb-1">
              <strong>Deliver to:</strong> {{ order.data.receipientName }}
            </p>
          </div>

          <!-- Order ID and Actions -->
          <div class="text-right flex flex-col items-end space-y-2">
            <p class="text-gray-600 font-semibold">
              <strong>ORDER #</strong> {{ order.data.orderNumber }}
            </p>
            <button class="text-indigo-600 hover:underline">
              View Order Details
            </button>
            <button class="text-indigo-600 hover:underline">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pastOrders: Array,
  },
  data() {
    return {
      searchQuery: "",
      dateRange: "999", // default to 3 months
    };
  },
  computed: {
    filteredOrders() {
      // Calculate the date range based on the current date
      const today = new Date();
      const monthsBack = parseInt(this.dateRange, 10);
      const rangeStartDate = new Date(
        today.getFullYear(),
        today.getMonth() - monthsBack,
        today.getDate()
      );

      return this.pastOrders.filter((order) => {
        const orderDate = this.parseDate(order.data.date);

        // Filter by date range
        if (orderDate < rangeStartDate) return false;

        // Filter by search query
        const query = this.searchQuery.toLowerCase();
        return (
          order.data.productName.toLowerCase().includes(query) ||
          order.data.receipientName.toLowerCase().includes(query) ||
          order.data.orderNumber.toLowerCase().includes(query)
        );
      });
    },
  },
  methods: {
    parseDate(dateString) {
      // Convert "31 October 2024" to a Date object
      return new Date(dateString);
    },
  },
};
</script>

<style scoped>
/* Transition hover effect for order cards */
.order-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>
