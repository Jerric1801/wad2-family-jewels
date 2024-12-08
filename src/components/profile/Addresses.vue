<template>
  <div class="border-t border-gray-200 pt-6">
    <h3
      class="text-2xl font-semibold mb-4 text-indigo-600 dark:text-custDarkerWhite"
    >
      Your Addresses
    </h3>

    <!-- Adresses -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <!-- Add New Address Card-->
      <div
        class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-custDarkGrey"
        @click="addAddress"
      >
        <div class="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 mx-auto mb-1 text-gray-400"
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
          <span class="text-sm font-medium dark:text-custWhite"
            >Add Address</span
          >
        </div>
      </div>

      <!-- Existing Addresses -->
      <div
        v-for="(address, index) in userAddresses"
        :key="index"
        class="border rounded-lg p-4 shadow-md bg-gray-100 dark:bg-cardItemBg dark:text-custGrey"
      >
        <div class="flex justify-between items-start">
          <div>
            <p
              class="font-semibold text-lg dark:text-custDarkerWhite mb-4 mt-2"
            >
              {{ address.data.fullName }}
            </p>
            <p class="text-gray-600 dark:text-custGrey text-sm">
              {{ address.data.address }}
            </p>
            <p class="text-gray-600 dark:text-custGrey text-sm">
              {{ address.data.unitNumber }}
            </p>
            <p class="text-gray-600 dark:text-custGrey text-sm">
              {{ address.data.country }}
            </p>
            <p class="text-gray-600 dark:text-custGrey text-sm">
              {{ address.data.phoneNumber }}
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

        <!-- Address Card Buttons -->
        <div class="flex justify-around items-center mt-4">
          <button
            @click="openEditModal(address.id)"
            class="flex flex-col items-center text-blue-600 font-medium w-1/4 dark:hover:text-custDarkerWhite"
          >
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
              class="lucide lucide-user-pen mb-1"
            >
              <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
              <path
                d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
              />
              <circle cx="10" cy="7" r="4" />
            </svg>
            <span class="text-xs font-normal">Edit</span>
          </button>

          <button
            @click="removeAddress(address.id)"
            class="flex flex-col items-center text-blue-600 font-medium w-1/4 dark:hover:text-custDarkerWhite"
          >
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
              class="lucide lucide-file-x-2 mb-1"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="m8 12.5-5 5" />
              <path d="m3 12.5 5 5" />
            </svg>
            <span class="text-xs font-normal">Remove</span>
          </button>

          <button
            v-if="!address.data.isDefault"
            @click="setDefaultAddress(address.id)"
            class="flex flex-col items-center text-blue-400 font-medium w-1/4 dark:hover:text-custDarkerWhite"
          >
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
              class="lucide lucide-settings-2 mb-1"
            >
              <path d="M20 7h-9" />
              <path d="M14 17H5" />
              <circle cx="17" cy="17" r="3" />
              <circle cx="7" cy="7" r="3" />
            </svg>
            <span class="text-xs font-normal -mt-1">Set Default</span>
          </button>
        </div>
      </div>

      <!-- Popup Modal for Adding New Address -->
      <transition name="modal-fade">
        <div
          v-if="showAddModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            class="bg-custWhite p-4 rounded-lg shadow-lg max-w-md w-full transition-transform transform scale-100 dark:bg-darkModeBg"
          >
            <h3
              class="text-xl font-semibold text-center mb-4 dark:text-custWhite"
            >
              Add New Address
            </h3>
            <form @submit.prevent="saveItemDetails">
              <!-- Full Name Field -->
              <div class="mb-4">
                <label
                  for="fullName"
                  class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
                  >Full Name:</label
                >
                <input
                  type="text"
                  v-model="this.newAddress.fullName"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
                  required
                />
              </div>
              <!-- Address Field -->
              <div class="mb-4">
                <label
                  for="address"
                  class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
                  >Address:</label
                >
                <textarea
                  v-model="this.newAddress.address"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full h-24 resize-none dark:bg-cardItemBg dark:text-custGrey"
                  required
                ></textarea>
              </div>
              <!-- Unit Number Field -->
              <div class="mb-4">
                <label
                  for="unitNumber"
                  class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
                  >Unit Number:</label
                >
                <input
                  type="text"
                  v-model="this.newAddress.unitNumber"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
                />
              </div>
              <!-- Country Field -->
              <div class="mb-4">
                <label
                  for="country"
                  class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
                  >Country:</label
                >
                <input
                  type="text"
                  v-model="this.newAddress.country"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
                  required
                />
              </div>
              <!-- Phone Number Field -->
              <div class="mb-4">
                <label
                  for="phoneNumber"
                  class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
                  >Phone:</label
                >
                <input
                  type="text"
                  v-model="this.newAddress.phoneNumber"
                  class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
                  required
                />
              </div>
              <!-- Action Buttons -->
              <div class="flex justify-end space-x-2 mt-4">
                <button
                  @click="showAddModal = !showAddModal"
                  class="px-3 py-1 text-xs font-medium rounded-md bg-gray-300 text-gray-700 hover:bg-red-800 dark:bg-darkModeBtnGrey dark:text-custWhite transition"
                >
                  Cancel
                </button>
                <button
                  @click="saveNewAddress"
                  class="px-3 py-1 text-xs font-medium rounded-md bg-green-500 text-white hover:bg-green-800 dark:bg-darkModeBtnGrey dark:text-custWhite transition"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- Modal Content for Edit -->
  <transition name="modal-fade">
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="bg-custWhite p-4 rounded-lg shadow-lg max-w-md w-full transition-transform transform scale-100 dark:bg-darkModeBg"
      >
        <h3 class="text-xl font-semibold text-center mb-4 dark:text-custWhite">
          Edit Address Details
        </h3>
        <form @submit.prevent="saveItemDetails">
          <!-- Full Name Field -->
          <div class="mb-4">
            <label
              for="fullName"
              class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
              >Full Name:</label
            >
            <input
              type="text"
              v-model="this.editAddress.fullName"
              class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
              required
            />
          </div>
          <!-- Address Field -->
          <div class="mb-4">
            <label
              for="address"
              class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
              >Address:</label
            >
            <input
              type="text"
              v-model="this.editAddress.address"
              class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
              required
            />
          </div>
          <!-- Unit Number Field -->
          <div class="mb-4">
            <label
              for="unitNumber"
              class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
              >Unit Number:</label
            >
            <input
              type="text"
              v-model="this.editAddress.unitNumber"
              class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
            />
          </div>
          <!-- Country Field -->
          <div class="mb-4">
            <label
              for="country"
              class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
              >Country:</label
            >
            <input
              type="text"
              v-model="this.editAddress.country"
              class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
              required
            />
          </div>
          <!-- Phone Number Field -->
          <div class="mb-4">
            <label
              for="phoneNumber"
              class="block text-gray-700 text-sm font-medium mb-1 dark:text-custGrey"
              >Phone:</label
            >
            <input
              type="text"
              v-model="this.editAddress.phoneNumber"
              class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 p-2 text-sm rounded-md w-full dark:bg-cardItemBg dark:text-custGrey"
              required
            />
          </div>
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-2 mt-4">
            <button
              @click="showEditModal = !showEditModal"
              class="px-3 py-1 text-xs font-medium rounded-md bg-gray-300 text-gray-700 hover:bg-red-800 dark:bg-darkModeBtnGrey dark:text-custWhite transition"
            >
              Cancel
            </button>
            <button
              @click="submitUpdatedAddress"
              class="px-3 py-1 text-xs font-medium rounded-md bg-green-500 text-white hover:bg-green-800 dark:bg-darkModeBtnGrey dark:text-custWhite transition"
            >
              Update Address
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  addNewUserAddress,
  removeUserAddress,
  updateUserAddress,
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
      showEditModal: false,
      newAddress: {
        fullName: "",
        address: "",
        unitNumber: "",
        country: "",
        phoneNumber: "",
      },
      addressIdToUpdate: null,
      editAddress: {
        fullName: "",
        address: "",
        unitNumber: "",
        country: "",
        phoneNumber: "",
        isDefault: null,
      },
    };
  },
  methods: {
    openModal() {},
    openEditModal(idToEdit) {
      this.showEditModal = true;
      this.addressIdToUpdate = idToEdit;

      let addressToEdit = this.userAddresses.filter(
        (each) => each.id === idToEdit
      );
      this.editAddress = addressToEdit[0].data;
    },
    async submitUpdatedAddress() {
      try {
        const result = await updateUserAddress(
          this.userId,
          this.addressIdToUpdate,
          this.editAddress
        );

        console.log("Successful update: " + result);

        if (result) {
          // Clear the form and close the modal
          this.editAddress = {
            fullName: "",
            address: "",
            unitNumber: "",
            country: "",
            phoneNumber: "",
            isDefault: null,
          };
          this.addressIdToUpdate = null;
          this.showEditModal = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    addAddress() {
      this.showAddModal = true;
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
  @apply px-1 py-1 text-sm font-medium rounded-md transition duration-300 ease-in-out;
}

button:hover {
  color: grey;
}

.cancel-btn {
  @apply bg-gray-300 text-gray-700 hover:bg-red-800 rounded-md shadow-md transition;
  padding: 0.25rem 0.5rem;
}

.update-btn {
  @apply bg-green-500 text-white hover:bg-green-800 rounded-md shadow-md transition;
  padding: 0.25rem 0.5rem;
}
</style>
