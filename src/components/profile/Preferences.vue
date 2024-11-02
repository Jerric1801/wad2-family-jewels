<template>
  <div class="border-t border-gray-200 pt-6">
    <h3 class="text-2xl font-semibold mb-4 text-indigo-600">
      Preferences - Join our Email Subscription!
    </h3>
    <p class="mb-4 text-gray-600 mt-4 text-lg">
      By joining our email list, you will be the first to know about exciting
      new designs, special events, store openings, and much more.
    </p>
    <div class="flex space-x-4">
      <button
        class="btn-subscribe flex items-center space-x-2"
        @click="subscribeToEmails"
      >
        <span class="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="#7d77d2"
            class="lucide lucide-user-round-check w-6 h-6"
          >
            <path d="M2 21a8 8 0 0 1 13.292-6" />
            <circle cx="10" cy="8" r="5" />
            <path d="m16 19 2 2 4-4" />
          </svg>
        </span>
        <span>Subscribe</span>
      </button>
      <button
        class="btn-unsubscribe flex items-center space-x-2"
        @click="unsubscribeFromEmails"
      >
        <span class="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="#7d77d2"
            class="lucide lucide-user-round-x w-6 h-6"
          >
            <path d="M2 21a8 8 0 0 1 11.873-7" />
            <circle cx="10" cy="8" r="5" />
            <path d="m17 17 5 5" />
            <path d="m22 17-5 5" />
          </svg>
        </span>
        <span>Unsubscribe</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    subscribeToEmails() {
      // Logic for subscribing to emails
      console.log("Subscribed to emails");
    },
    unsubscribeFromEmails() {
      // Logic for unsubscribing from emails
      console.log("Unsubscribed from emails");
    },
  },
};
</script>

<style scoped>
.btn-subscribe,
.btn-unsubscribe {
  box-shadow: 0px 4px 6px rgba(0, 170, 255, 0.3);
}
.btn-subscribe:hover,
.btn-unsubscribe:hover {
  background: linear-gradient(to right, #5e1a91, #007bbf);
  color: white;
  transform: scale(1.05);
}
</style>
