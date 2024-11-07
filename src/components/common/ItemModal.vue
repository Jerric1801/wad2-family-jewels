<template>
  <div v-show="modalVisible">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
        <!-- Close button (top-right) -->
        <button
          @click="closeModal"
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
          <!-- Stripe Payment Gateway Integration -->
          <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)"
          />

          <button class="btn-purchase" @click="handlePurchase">Purchase</button>
          <button
            class="bg-gray-300 text-gray-700 px-6 py-2 cancel-btn"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Stripe Payment Gateway Integration
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey =
      "pk_test_51QE82aBeTAkFeX2nkPsDrWL0A2JzTWdN5S2dFUUCtQZllqShAPORmMLL1AFtlQUx26tBNT7iD5rTBzweEfkYJhXL002g3UDqs4";
    const priceId =
      this.item.data.title === "Diamond Ring (Certified)"
        ? "price_1QE8N4BeTAkFeX2nVXiAdWD0"
        : this.item.data.title === "Pearl Earrings"
        ? "price_1QE8UiBeTAkFeX2nSsWRTC8x"
        : null;
    return {
      modalVisible: true,
      loading: false,
      lineItems: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      successURL: `http://localhost:5173/success?item=${encodeURIComponent(
        JSON.stringify(this.item)
      )}&userId=${this.userId}`,
      cancelURL: "http://localhost:5173/error",
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handlePurchase() {
      if (this.$refs.checkoutRef) {
        await this.$refs.checkoutRef.redirectToCheckout();
      } else {
        console.error("Stripe Checkout Error: checkoutRef is not defined.");
      }
    },
    closeModal() {
      this.modalVisible = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.btn-cancel {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: white;
  color: gray;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel:hover {
  background-color: #f0f0f0;
}

.btn-purchase {
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-purchase:hover {
  background-color: #357ab9;
}
</style>
