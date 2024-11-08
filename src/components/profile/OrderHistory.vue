<template>
  <div class="border-t border-gray-200 pt-6">
    <h3
      class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-indigo-600 text-center sm:text-left dark:text-custDarkerWhite pt-3"
    >
      Order History
    </h3>

    <!-- Filter and Search Section -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0"
    >
      <div class="flex flex-col sm:flex-row items-center">
        <p class="text-gray-700 text-center sm:text-left dark:text-custGrey mr-3">
          {{ filteredOrders.length }} orders placed in
        </p>
        <select
          v-model="dateRange"
          class="border rounded px-3 py-2 mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto dark:bg-cardItemBg dark:text-custGrey"
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
        class="border rounded px-3 py-2 w-full sm:w-1/3 dark:bg-cardItemBg dark:text-custGrey"
      />
    </div>

    <!-- Order Cards -->
    <div class="space-y-6">
      <div
        v-for="(order, index) in filteredOrders"
        :key="index"
        class="border rounded-lg shadow-md p-4 sm:p-6 bg-white hover:shadow-lg transition-shadow duration-300 dark:bg-cardItemBg"
      >
        <div class="flex flex-col sm:flex-row justify-between mb-4 items-start">
          <!-- Order Image -->
          <div
            class="w-full sm:w-24 h-24 rounded overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 shadow-md mt-3"
          >
            <img
              :src="order.data.imageUrl"
              alt="Product Image"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Order Details -->
          <div class="flex-1 mt-3">
            <p class="text-gray-600 flex text-sm sm:text-base mb-1">
              <strong class="dark:text-custWhite dark:font-normal text-md"
                >Item Name:</strong
              >
              <div class="ml-7 dark:text-custGrey">{{ order.data.productName }}</div>
              
            </p>
            <p class="text-gray-600 flex text-sm sm:text-base mb-1">
              <strong class="dark:text-custWhite dark:font-normal text-md"
                >Order Placed:</strong
              >
              <div class="ml-3 dark:text-custGrey">{{ order.data.date }}</div>
            </p>
            <p class="text-gray-600 flex text-sm sm:text-base mb-1">
              <strong class="dark:text-custWhite dark:font-normal text-md"
                >Total Price:</strong
              >
              <div class="ml-8 dark:text-custGrey">${{ order.data.total }}</div>
            </p>
          </div>

          <!-- Order ID and Actions -->
          <div
            class="text-right flex flex-col items-start sm:items-end space-y-2 mt-4 sm:mt-1"
          >
            <p class="text-gray-600 font-semibold text-sm sm:text-base dark:text-custDarkerWhite">
              # {{ order.data.orderNumber }}
            </p>
            <button
              class="text-indigo-600 text-sm sm:text-base hover:underline dark:text-custDarkerWhite"
            >
              View Order Details
            </button>
            <button
              class="text-indigo-600 text-sm sm:text-base hover:underline dark:text-custDarkerWhite"
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
