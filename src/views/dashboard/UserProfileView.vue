<template>
  <DefaultLayout>
    <div
      class="container mx-auto px-4 py-8 pt-[150px] h-full flex flex-col items-center w-full"
    >
      <!-- Title -->
      <h1
        class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent animate-fade-in"
      >
        User Profile
      </h1>

      <!-- Loading Spinner -->
      <div
        v-if="isLoading"
        class="text-center bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
      >
        Loading...
      </div>

      <!-- User Profile Details -->
      <div
        v-else-if="isAuthenticated && userData"
        class="bg-white shadow-lg rounded-lg p-8 w-full max-w-full animate-fade-in-up"
      >
        <!-- Profile Image -->
        <div class="flex flex-col items-center mb-8 relative">
          <div
            class="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center cursor-pointer relative group overflow-hidden"
            @click="triggerFileInput"
          >
            <img
              v-if="userData && userData.imageUrl"
              :src="userData.imageUrl"
              class="w-full h-full rounded-full object-cover"
              @error="handleImageError"
            />
            <span
              v-else
              class="text-4xl bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
            >
              {{
                userData && userData.name ? userData.name[0].toUpperCase() : ""
              }}
            </span>
            <div
              class="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c1.657 0 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM19 21H5c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2h2.586c.526 0 1.04.21 1.414.586l1.414 1.414c.374.374.888.586 1.414.586H19c1.105 0 2 .895 2 2v12c0 1.105-.895 2-2 2z"
                ></path>
              </svg>
            </div>
          </div>
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleUploadPhoto"
          />
        </div>

        <!-- Tabs -->
        <div
          class="flex justify-center mb-4 border-b border-gray-200 dark:border-gray-700"
        >
          <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
          >
            <li class="me-2">
              <a
                :class="[
                  'inline-flex text-xl items-center justify-center p-4 border-b-2 rounded-t-lg group',
                  activeTab === 'personalInfo'
                    ? 'text-black border-black'
                    : 'text-gray-700 hover:text-black hover:border-gray-400',
                ]"
                @click="activeTab = 'personalInfo'"
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
                  class="lucide lucide-venetian-mask w-8 h-8 pr-2"
                >
                  <path
                    d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"
                  />
                  <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z" />
                  <path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z" /></svg
                >Personal Information
              </a>
            </li>
            <li class="me-2">
              <a
                :class="[
                  'inline-flex text-xl items-center justify-center p-4 border-b-2 rounded-t-lg group',
                  activeTab === 'signInInformation'
                    ? 'text-black border-black'
                    : 'text-gray-700 hover:text-black hover:border-gray-400',
                ]"
                @click="activeTab = 'signInInformation'"
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
                  class="lucide lucide-file-user w-8 h-8 pr-2"
                >
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M15 18a3 3 0 1 0-6 0" />
                  <path
                    d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"
                  />
                  <circle cx="12" cy="13" r="2" /></svg
                >Sign-in Information
              </a>
            </li>
            <li class="me-2">
              <a
                :class="[
                  'inline-flex text-xl items-center justify-center p-4 border-b-2 rounded-t-lg group',
                  activeTab === 'preferences'
                    ? 'text-black border-black'
                    : 'text-gray-700 hover:text-black hover:border-gray-400',
                ]"
                @click="activeTab = 'preferences'"
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
                  class="lucide lucide-settings-2 w-8 h-8 pr-2"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" /></svg
                >Preferences
              </a>
            </li>
            <li class="me-2">
              <a
                :class="[
                  'inline-flex text-xl items-center justify-center p-4 border-b-2 rounded-t-lg group',
                  activeTab === 'orderHistory'
                    ? 'text-black border-black'
                    : 'text-gray-700 hover:text-black hover:border-gray-400',
                ]"
                @click="activeTab = 'orderHistory'"
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
                  class="lucide lucide-history w-8 h-8 pr-2"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M12 7v5l4 2" />
                </svg>
                Order History
              </a>
            </li>
            <li class="me-2">
              <a
                :class="[
                  'inline-flex text-xl items-center justify-center p-4 border-b-2 rounded-t-lg group',
                  activeTab === 'addresses'
                    ? 'text-black border-black'
                    : 'text-gray-700 hover:text-black hover:border-gray-400',
                ]"
                @click="activeTab = 'addresses'"
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
                  class="lucide lucide-map-pin-house w-8 h-8 pr-2"
                >
                  <path
                    d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"
                  />
                  <path
                    d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"
                  />
                  <path d="M18 22v-3" />
                  <circle cx="10" cy="10" r="3" /></svg
                >Addresses
              </a>
            </li>
          </ul>
        </div>

        <!-- Tabs Information - Profile -->
        <div
          v-if="activeTab === 'personalInfo'"
          class="border-t border-gray-200 pt-6"
        >
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
            <span
              class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
            >
              Personal Information
            </span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Full Name Field-->
            <div
              class="bg-gray-100 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p class="text-gray-600 mb-1">Full Name</p>
                <p class="text-xl font-medium">{{ userData.fullName }}</p>
              </div>
              <button
                @click="openEditModal('Full Name', userData.fullName)"
                class="border border-gray-400 text-gray-700 px-4 py-1 rounded-full hover:bg-gray-100 transition duration-200"
              >
                Edit
              </button>
            </div>
            <!-- Phone Number Field-->
            <div
              class="bg-gray-100 p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <p class="text-gray-600 mb-1">Phone Number</p>
                <p class="text-xl font-medium">{{ userData.phoneNumber }}</p>
              </div>
              <button
                @click="openEditModal('Phone Number', userData.phoneNumber)"
                class="border border-gray-400 text-gray-700 px-4 py-1 rounded-full hover:bg-gray-100 transition duration-200"
              >
                Edit
              </button>
            </div>
          </div>
          <!-- User Bio -->
          <div class="border-t border-gray-200 pt-6 mt-6">
            <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
              <span
                class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
                >User Bio</span
              >
            </h3>
            <div
              class="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p class="text-gray-600 mb-1">About Me</p>
                <p class="text-xl font-medium">
                  {{ (userData && userData.bio) || "No bio available" }}
                </p>
              </div>
              <button
                @click="openEditModal('Bio', userData.bio)"
                class="border border-gray-400 text-gray-700 px-4 py-1 rounded-full hover:bg-gray-100 transition duration-200"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs Information - Profile -->
        <div
          v-if="activeTab === 'signInInformation'"
          class="border-t border-gray-200 pt-6"
        >
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
            <span
              class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
            >
              Sign-in Information
            </span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-100 p-4 rounded-lg">
              <p class="text-gray-600 mb-1">Email</p>
              <p class="text-xl font-medium">{{ userData.email }}</p>
            </div>
            <div class="bg-gray-100 p-4 rounded-lg">
              <p class="text-gray-600 mb-1">Phone Number</p>
              <p class="text-xl font-medium">{{ userData.phoneNumber }}</p>
            </div>
          </div>
        </div>

        <!-- Tabs Information - Order History -->
        <div
          v-if="activeTab === 'orderHistory'"
          class="border-t border-gray-200 pt-6"
        >
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
            <span
              class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
            >
              Order History
            </span>
          </h3>

          <!-- Order Filter and Search Section -->
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

          <!-- Order List Section -->
          <div class="space-y-6">
            <div
              v-for="(order, index) in pastOrders"
              :key="index"
              class="border rounded-lg shadow-sm p-6 bg-white mb-6"
            >
              <!-- Order Summary -->
              <div class="flex justify-between mb-6">
                <div>
                  <p class="text-gray-600">
                    <strong>Order Placed on:</strong> {{ order.data.date }}
                  </p>
                  <p class="text-gray-600">
                    <strong>Total Price:</strong>
                    ${{ order.data.total | currency }}
                  </p>
                  <p class="text-gray-600">
                    <strong>Deliver to:</strong>
                    <span class="text-blue-600">{{
                      order.data.receipientName
                    }}</span>
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-gray-600">
                    <strong>ORDER #</strong> {{ order.data.orderNumber }}
                  </p>
                  <div class="flex space-x-2">
                    <a href="#" class="text-blue-600 hover:underline"
                      >View order details</a
                    >
                    <a href="#" class="text-blue-600 hover:underline"
                      >Receipt</a
                    >
                  </div>
                </div>
              </div>

              <!-- Order Item Details & Actions -->
              <div class="flex justify-between items-start">
                <!-- Product Details -->
                <div class="flex">
                  <img
                    :src="order.data.imageUrl"
                    alt="Product image"
                    class="w-24 h-24 rounded shadow mr-6"
                  />
                  <div>
                    <p class="font-semibold text-lg">
                      {{ order.data.productName }}
                    </p>
                    <p class="text-gray-500">
                      Return eligible through {{ order.data.returnDate }}
                    </p>
                    <div class="flex mt-4 space-x-4">
                      <button
                        class="flex items-center bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded shadow transition ease-in-out duration-200"
                      >
                        Buy it again
                      </button>
                      <button
                        class="flex items-center border border-gray-400 text-gray-700 font-medium px-4 py-2 rounded hover:bg-gray-100 transition ease-in-out duration-200"
                      >
                        View your item
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Order Action Buttons -->
                <div class="grid gap-2 w-48 text-right">
                  <button
                    class="border border-gray-400 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-100 transition ease-in-out duration-200"
                  >
                    Track package
                  </button>
                  <button
                    class="border border-gray-400 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-100 transition ease-in-out duration-200"
                  >
                    Return items
                  </button>
                  <button
                    class="border border-gray-400 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-100 transition ease-in-out duration-200"
                  >
                    Share gift receipt
                  </button>
                  <button
                    class="border border-gray-400 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-100 transition ease-in-out duration-200"
                  >
                    Get help
                  </button>
                  <button
                    class="border border-gray-400 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-100 transition ease-in-out duration-200"
                  >
                    Leave seller feedback
                  </button>
                  <button
                    class="border border-gray-400 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-100 transition ease-in-out duration-200"
                  >
                    Leave delivery feedback
                  </button>
                  <button
                    class="border border-gray-400 text-gray-700 px-4 py-2 rounded w-full hover:bg-gray-100 transition ease-in-out duration-200"
                  >
                    Write a product review
                  </button>
                </div>
              </div>

              <!-- Archive Order Link -->
              <a href="#" class="text-blue-600 hover:underline mt-4 block"
                >Archive order</a
              >
            </div>
          </div>
        </div>

        <!-- Tabs Information - Address -->
        <div
          v-if="activeTab === 'addresses'"
          class="border-t border-gray-200 pt-6"
        >
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
            <span
              class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
            >
              Your Addresses
            </span>
          </h3>

          <!-- Address Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Add Address Card -->
            <div
              class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-600 cursor-pointer hover:bg-gray-50"
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

            <!-- Address Cards -->
            <div v-if="userAddresses.length > 0">
              <div
                v-for="(address, index) in userAddresses"
                :key="index"
                class="border rounded-lg p-4 shadow-md bg-gray-100 mt-3"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-semibold text-lg">
                      {{ address.data.fullName }}
                    </p>
                    <p class="text-gray-600">{{ address.data.address }}</p>
                    <p class="text-gray-600">{{ address.data.unitNumber }}</p>
                    <p class="text-gray-600">{{ address.data.country }}</p>
                    <p class="text-gray-600">{{ address.country }}</p>
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
                  <span class="text-gray-400 mt-3">|</span>
                  <button
                    @click="removeAddress(address.id)"
                    class="text-blue-600 font-medium"
                  >
                    Remove
                  </button>
                  <span v-if="!address.default" class="text-gray-400 mt-3"
                    >|</span
                  >
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
        </div>

        <!-- Tabs Information - Email Subscription -->
        <div
          v-if="activeTab === 'preferences'"
          class="border-t border-gray-200 pt-6"
        >
          <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
            <span
              class="animate-fade-in-up bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent"
            >
              Preferences - Join our Email Subscription!
            </span>
            <p class="mb-4 text-gray-600 mt-4 text-lg">
              By joining our email list, you will be the first to know about
              exciting new designs, special events, store openings, and much
              more.
            </p>
            <div class="flex space-x-4">
              <button
                class="btn-subscribe flex items-center space-x-2 space-y-2"
                @click="subscribeToEmails"
              >
                <!-- SVG Icon -->
                <span class="svg-container"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7d77d2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-user-round-check w-6 h-6"
                  >
                    <path d="M2 21a8 8 0 0 1 13.292-6" />
                    <circle cx="10" cy="8" r="5" />
                    <path d="m16 19 2 2 4-4" /></svg
                ></span>
                <!-- Text -->
                <span>Subscribe</span>
              </button>
              <button
                class="btn-unsubscribe flex items-center space-x-2 space-y-2"
                @click="unsubscribeFromEmails"
              >
                <span class="svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7d77d2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-user-round-x w-6 h-6"
                  >
                    <path d="M2 21a8 8 0 0 1 11.873-7" />
                    <circle cx="10" cy="8" r="5" />
                    <path d="m17 17 5 5" />
                    <path d="m22 17-5 5" />
                  </svg> </span
                ><span>Unsubscribe</span>
              </button>
            </div>
          </h3>
        </div>
      </div>
    </div>

    <!-- Modal Stuff -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-8 w-full max-w-md animate-fade-in-up">
        <h2 class="text-2xl font-semibold mb-4 text-indigo-600">
          Edit {{ currentField }}
        </h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label
              :for="currentField"
              class="block text-gray-700 font-medium mb-2"
              >{{ currentField }}</label
            >
            <input
              v-if="currentField !== 'Bio'"
              type="text"
              :id="currentField"
              v-model="currentValue"
              class="border border-gray-400 p-2 rounded-lg w-full"
            />
            <textarea
              v-else
              :id="currentField"
              v-model="currentValue"
              class="border border-gray-400 p-2 rounded-lg w-full"
              style="height: 150px; width: 100%"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 mr-2 rounded-lg bg-gray-300 hover:bg-gray-400"
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
  </DefaultLayout>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import {
  retrieveUserProfile,
  uploadPhoto,
  updateUserProfile,
  retrieveUserAddresses,
  retrieveUserPastOrders,
} from "@/services/firebase/profile";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    DefaultLayout,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { isAuthenticated, user } = storeToRefs(authStore);

    const userid = ref("");
    const userData = ref(null);
    const userAddresses = ref(null);
    const pastOrders = ref(null);
    const isLoading = ref(true);
    const fileInput = ref(null);
    const activeTab = ref("personalInfo");
    const isPhotoLoading = ref(false);

    const showEditModal = ref(false);
    const currentField = ref("");
    const currentValue = ref("");

    const checkAuthentication = async () => {
      if (!isAuthenticated.value) {
        router.push("/login");
      } else {
        userid.value = user.value.uid;
        userData.value = await retrieveUserProfile(userid.value);
        userAddresses.value = await retrieveUserAddresses(userid.value);
        pastOrders.value = await retrieveUserPastOrders(userid.value);
        isLoading.value = false;
      }
    };

    const openEditModal = (field, value) => {
      currentField.value = field;
      currentValue.value = value;
      showEditModal.value = true;
    };

    const saveChanges = async () => {
      try {
        if (currentField.value === "Full Name") {
          userData.value.fullName = currentValue.value;
        } else if (currentField.value === "Phone Number") {
          userData.value.phoneNumber = currentValue.value;
        } else if (currentField.value === "Bio") {
          userData.value.bio = currentValue.value;
        }

        // Log the updated userData before sending it to Firestore
        console.log("Updated userData:", {
          fullName: userData.value.fullName,
          phoneNumber: userData.value.phoneNumber,
          bio: userData.value.bio,
        });

        await updateUserProfile(
          userid.value,
          userData.value.fullName,
          userData.value.phoneNumber,
          userData.value.bio
        );

        showEditModal.value = false;
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

    const handleUploadPhoto = async (event) => {
      const file = event.target.files[0];
      if (file) {
        isPhotoLoading.value = true;
        try {
          await uploadPhoto(userid.value, file);
          const updatedProfile = await retrieveUserProfile(userid.value);
          userData.value.imageUrl = updatedProfile.imageUrl;
          console.log("Photo uploaded successfully");
        } catch (error) {
          console.error("Error uploading photo:", error);
        } finally {
          isPhotoLoading.value = false;
        }
      }
    };

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleImageError = () => {
      console.error("Error loading image");
    };

    onMounted(checkAuthentication);
    watch(isAuthenticated, checkAuthentication);

    return {
      isAuthenticated,
      userData,
      pastOrders,
      userAddresses,
      isLoading,
      handleUploadPhoto,
      triggerFileInput,
      fileInput,
      handleImageError,
      isPhotoLoading,
      openEditModal,
      saveChanges,
      showEditModal,
      currentField,
      currentValue,
      activeTab,
    };
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

button {
  @apply px-6 py-2 text-lg font-semibold rounded-lg transition duration-300 ease-in-out;
}
button:hover {
  background: linear-gradient(to right, #5e1a91, #007bbf);
  color: white;
  box-shadow: 0px 6px 10px;
}

/* Primary Button - Subscribe (Gradient Only, No Background Color) */
.btn-subscribe {
  box-shadow: 0px 4px 6px rgba(0, 170, 255, 0.3);
}

.btn-subscribe:hover {
  background: linear-gradient(
    to right,
    #5e1a91,
    #007bbf
  ); /* Darker Purple to Blue */
  box-shadow: 0px 6px 10px;
  transform: scale(1.05);
  color: white;
}

/* Secondary Button - Unsubscribe (Gradient Only, No Background Color) */
.btn-unsubscribe {
  box-shadow: 0px 4px 6px rgba(0, 170, 255, 0.3);
}

.btn-unsubscribe:hover {
  background: linear-gradient(to right, #79016d, #300054);
  box-shadow: 0px 6px 10px;
  transform: scale(1.05);
  color: white;
}
.btn-subscribe:hover .svg-container svg {
  stroke: white; /* Changes SVG color to white on hover */
}
.btn-unsubscribe:hover .svg-container svg {
  stroke: white; /* Changes SVG color to white on hover */
}
</style>
