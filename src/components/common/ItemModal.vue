<template>
  <div v-show="modalVisible">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative dark:bg-cardItemBg">
        <button @click="closeModal"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-custWhite dark:hover:text-custGrey">
          ✕
        </button>

        <div class="flex flex-col md:flex-row">
          <img :src="item.data.image" :alt="item.data.title"
            class="w-full md:w-1/2 h-72 object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />

          <div class="w-full md:w-1/2">
            <h2 class="text-lg mb-1 dark:text-custWhite">
              {{ item.data.title }}
            </h2>
            <p class="text-gray-600 text-sm mb-2 dark:text-custGrey">
              {{ item.data.description }}
            </p>
            <p class="text-md text-blue-600 mb-3 dark:text-custWhite">
              ${{ item.data.price }}
            </p>
            <p class="text-sm text-gray-500 mb-3 dark:text-custGrey">
              Category: {{ item.data.category }}
            </p>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-6">
          <div class="btn-purchase dark:bg-darkModeBtnGrey" id="paypal-button-container"></div>
          <button
            class="bg-gray-300 px-3 py-3 dark:bg-darkModeBtnGrey dark:text-custWhite dark:hover:bg-red-800 rounded-lg"
            @click="closeModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { stripeConfig } from "@/config/stripe";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // publishableKey: stripeConfig.stripeKey,
      modalVisible: true,
    };
  },
  methods: {
    closeModal() {
      this.$emit("modal-closed");
      this.modalVisible = false;
    },
    initializePayPal() {
      if (window.paypal) {
        paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: this.item.data.price.toString(), // Dynamic price from item data
                    },
                    description: this.item.data.title,
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                const orderData = {
                  date: new Date().toISOString().slice(0, 10),
                  imageUrl: this.item.data.image, 
                  orderNumber: details.id,
                  recipientName: details.payer.name.given_name,
                  total: this.item.data.price.toString(),
                  productName: this.item.data.title,
                };
                this.$router.push({
                  name: "success",
                  query: orderData
                });
              });
            },
            onError: (err) => {
              this.$router.push({
                name: "error"
              });
              alert("An error occurred during the transaction.");
            },
          })
          .render("#paypal-button-container");
      } else {
        console.error("PayPal SDK not loaded");
      }
    },
  },
  mounted() {
    this.initializePayPal();
  },
};
</script>
