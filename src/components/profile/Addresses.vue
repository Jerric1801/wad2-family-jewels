<template>
  <div class="border-t border-gray-200 pt-6">
    <h3 class="text-2xl font-semibold mb-4 text-indigo-600">Your Addresses</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Add New Address Card-->
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

      <!-- Existing Addresses -->
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-file-badge"
            v-if="address.data.isDefault"
          >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M7 16.5 8 22l-3-1-3 1 1-5.5" />
          </svg>
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
            v-if="!address.data.isDefault"
            @click="setDefaultAddress(address.id)"
            class="text-blue-400 font-small"
          >
            Set as Default
          </button>
        </div>
      </div>

      <!-- Popup Modal for Adding New Address -->
      <div
        v-if="showAddModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      >
        <div
          class="bg-white rounded-lg p-6 w-full max-w-md"
          style="height: 80%; overflow-y-auto"
        >
          <h2 class="text-xl font-semibold mb-4 text-indigo-600">
            Add New Address
          </h2>
          <form @submit.prevent="saveNewAddress" class="space-y-3">
            <div>
              <label class="block text-gray-700 font-medium mb-1"
                >Full Name</label
              >
              <input
                type="text"
                v-model="newAddress.fullName"
                class="border border-gray-300 p-2 rounded-lg w-full"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-1"
                >Address</label
              >
              <input
                type="text"
                v-model="newAddress.address"
                class="border border-gray-300 p-2 rounded-lg w-full"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-gray-700 font-medium mb-1"
                  >Unit Number</label
                >
                <input
                  type="text"
                  v-model="newAddress.unitNumber"
                  class="border border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-medium mb-1"
                  >Country</label
                >
                <input
                  type="text"
                  v-model="newAddress.country"
                  class="border border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-1"
                >Phone Number</label
              >
              <input
                type="text"
                v-model="newAddress.phoneNumber"
                class="border border-gray-300 p-2 rounded-lg w-full"
              />
            </div>
            <div class="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                @click="showAddModal = false"
                class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addNewUserAddress,
  removeUserAddress,
  setDefaultAddress,
} from "../../services/firebase/profile";

export default {
  props: {
    userAddresses: Array,
    userId: String,
  },
  data() {
    return {
      showAddModal: false,
      newAddress: {
        fullName: "",
        address: "",
        unitNumber: "",
        country: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    addAddress() {
      this.showAddModal = true;
    },
    editAddress(id) {
      console.log("Edit address", id);
    },
    async removeAddress(addressId) {
      try {
        await removeUserAddress(this.userId, addressId);
        // Filter out the deleted address from local state to update the UI
        this.$emit("addressRemoved", addressId); // Notify parent to refresh data
      } catch (error) {
        console.error("Failed to remove address:", error);
      }
    },
    async setDefaultAddress(addressId) {
      if (!this.userId) throw new Error("User ID is required");
      try {
        await setDefaultAddress(this.userId, addressId);
      } catch (error) {
        console.error(error);
      }
    },
    async saveNewAddress() {
      if (!this.userId) throw new Error("User ID is required");
      try {
        const newAddressId = await addNewUserAddress(
          this.userId,
          this.newAddress
        );
        this.userAddresses.push({
          data: { ...this.newAddress },
          id: newAddressId,
        });

        // Clear the form and close the modal
        this.newAddress = {
          fullName: "",
          address: "",
          unitNumber: "",
          country: "",
          phoneNumber: "",
        };
        this.showAddModal = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
button {
  @apply px-6 py-2 text-lg font-semibold rounded-lg transition duration-300 ease-in-out;
}
button:hover {
  background: linear-gradient(to right, #5e1a91, #007bbf);
  color: white;
  box-shadow: 0px 6px 10px;
}
</style>
