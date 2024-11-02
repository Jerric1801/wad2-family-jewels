<template>
  <div class="border-t border-gray-200 pt-6">
    <h3 class="text-2xl font-semibold mb-4 text-indigo-600">Your Addresses</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50"
        @click="addAddress"
      >
        <div class="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 mx-auto mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span class="font-medium">Add Address</span>
        </div>
      </div>
      <div
        v-for="(address, index) in userAddresses"
        :key="index"
        class="border rounded-lg p-4 shadow-md bg-gray-100"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-semibold text-lg">{{ address.data.fullName }}</p>
            <p class="text-gray-600">{{ address.data.address }}</p>
            <p class="text-gray-600">{{ address.data.unitNumber }}</p>
            <p class="text-gray-600">{{ address.data.country }}</p>
            <p class="text-gray-600">
              Phone number: {{ address.data.phoneNumber }}
            </p>
          </div>
          <span
            v-if="address.default"
            class="text-xs text-orange-600 font-medium mt-1"
            >Default</span
          >
        </div>
        <div class="flex mt-4 space-x-2">
          <button
            @click="editAddress(address.id)"
            class="text-blue-600 font-medium"
          >
            Edit
          </button>
          <button
            @click="removeAddress(address.id)"
            class="text-blue-600 font-medium"
          >
            Remove
          </button>
          <button
            v-if="!address.default"
            @click="setDefaultAddress(address.id)"
            class="text-blue-400 font-small"
          >
            Set as Default
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userAddresses: Array,
  },
  methods: {
    addAddress() {
      console.log("Add address");
    },
    editAddress(id) {
      console.log("Edit address", id);
    },
    removeAddress(id) {
      console.log("Remove address", id);
    },
    setDefaultAddress(id) {
      console.log("Set as default address", id);
    },
  },
};
</script>
