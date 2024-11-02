<template>
  <div class="border-t border-gray-200 pt-6">
    <h3 class="text-2xl font-semibold mb-4 text-indigo-600">Order History</h3>
    <div class="flex justify-between items-center mb-6">
      <p class="text-gray-700">5 orders placed in</p>
      <select class="border rounded px-3 py-2">
        <option>Past three months</option>
        <option>Past six months</option>
        <option>Past year</option>
      </select>
      <input
        type="text"
        placeholder="Search all orders"
        class="border rounded px-3 py-2 w-1/3"
      />
      <button class="bg-gray-600 text-white px-4 py-2 rounded">
        Search Orders
      </button>
    </div>

    <div class="space-y-6">
      <div
        v-for="(order, index) in pastOrders"
        :key="index"
        class="border rounded-lg shadow-sm p-6 bg-white mb-6"
      >
        <div class="flex justify-between mb-6">
          <div>
            <p class="text-gray-600">
              <strong>Order Placed on:</strong> {{ order.data.date }}
            </p>
            <p class="text-gray-600">
              <strong>Total Price:</strong> ${{ order.data.total }}
            </p>
            <p class="text-gray-600">
              <strong>Deliver to:</strong> {{ order.data.receipientName }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-gray-600">
              <strong>ORDER #</strong> {{ order.data.orderNumber }}
            </p>
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
};
</script>
