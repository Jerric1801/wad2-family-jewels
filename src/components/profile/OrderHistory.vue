<template>
  <div class="border-t border-gray-200 pt-4 px-3">
    <h3
      class="text-lg sm:text-xl font-semibold mb-2 text-indigo-600 text-center dark:text-custDarkerWhite"
    >
      Order History
    </h3>

    <!-- Filter and Search Section -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0"
    >
      <div class="flex flex-col sm:flex-row items-center">
        <p class="text-gray-700 text-xs sm:text-sm dark:text-custGrey mr-2">
          {{ filteredOrders.length }} orders placed in
        </p>
        <select
          v-model="dateRange"
          class="border rounded-lg px-2 py-1 text-xs sm:text-sm dark:bg-cardItemBg dark:text-custGrey mt-2 sm:mt-0"
        >
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
        class="border rounded-lg px-2 py-1 w-full sm:w-1/3 text-xs sm:text-sm dark:bg-cardItemBg dark:text-custGrey"
      />
    </div>

    <!-- Order Cards -->
    <div class="space-y-4">
      <div
        v-for="(order, index) in filteredOrders"
        :key="index"
        class="border rounded-lg shadow-sm p-3 sm:p-4 bg-white hover:shadow-md transition-shadow dark:bg-cardItemBg"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start">
          <!-- Order Image -->
          <div
            class="w-20 h-20 rounded overflow-hidden shadow-md mr-4 flex-shrink-0"
          >
            <img
              :src="order.data.imageUrl"
              alt="Product Image"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Order Details -->
          <div class="flex-1 text-xs sm:text-sm mt-2 sm:mt-0">
            <p class="text-gray-600 mb-1 dark:text-custWhite">
              <strong>Item Name:</strong> {{ order.data.productName }}
            </p>
            <p class="text-gray-600 mb-1 dark:text-custWhite">
              <strong>Order Placed:</strong> {{ order.data.date }}
            </p>
            <p class="text-gray-600 mb-1 dark:text-custWhite">
              <strong>Total Price:</strong> ${{ order.data.total }}
            </p>
          </div>

          <!-- Order ID and Actions -->
          <div
            class="text-right text-xs sm:text-sm mt-3 sm:mt-0 flex flex-col items-end"
          >
            <p class="text-gray-600 font-semibold dark:text-custDarkerWhite">
              # {{ order.data.orderNumber }}
            </p>
            <button
              class="text-indigo-600 hover:underline dark:text-tailwindBlue mt-1"
            >
              View Order Details
            </button>
            <button
              class="text-indigo-600 hover:underline dark:text-tailwindBlue mt-1"
            >
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
      dateRange: "999", // default to show all orders
    };
  },
  computed: {
    filteredOrders() {
      // If "All" is selected, skip the date filtering
      if (this.dateRange === "999") {
        return this.pastOrders.filter((order) => {
          // Filter by search query only
          const query = this.searchQuery.toLowerCase();
          return (
            order.data.productName.toLowerCase().includes(query) ||
            order.data.receipientName.toLowerCase().includes(query) ||
            order.data.orderNumber.toLowerCase().includes(query)
          );
        });
      }

      // If a specific range is selected, calculate the date range based on the current date
      const today = new Date();
      const monthsBack = parseInt(this.dateRange, 10);
      const rangeStartDate = new Date(
        today.getFullYear(),
        today.getMonth() - monthsBack,
        today.getDate()
      );

      return this.pastOrders.filter((order) => {
        const orderDate = this.parseDate(order.data.date);

        // If parsing fails, ignore this order
        if (isNaN(orderDate.getTime())) {
          console.warn(`Invalid date format for order: ${order.data.date}`);
          return false;
        }

        // Filter by date range and search query
        const query = this.searchQuery.toLowerCase();
        return (
          orderDate >= rangeStartDate &&
          (order.data.productName.toLowerCase().includes(query) ||
            order.data.receipientName.toLowerCase().includes(query) ||
            order.data.orderNumber.toLowerCase().includes(query))
        );
      });
    },
  },
  methods: {
    parseDate(dateString) {
      // Ensure dateString is a string before proceeding
      if (typeof dateString !== "string") {
        console.warn(`Expected string for date but got: ${typeof dateString}`);
        return new Date(NaN); // return invalid date if not a string
      }

      // Split the date string into parts and create a Date object
      const [day, month, year] = dateString.split(" ");
      const monthIndex = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(month);

      if (monthIndex === -1) {
        console.warn(`Invalid month format in date: ${dateString}`);
        return new Date(NaN); // return invalid date if month is invalid
      }

      return new Date(year, monthIndex, parseInt(day, 10));
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
