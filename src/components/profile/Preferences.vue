<template>
  <div class="border-t border-gray-200 pt-6 px-4">
    <h3
      class="pt-6 text-xl md:text-2xl font-semibold mb-4 text-indigo-600 text-center dark:text-custDarkerWhite"
    >
      Preferences - Join our Email Subscription!
    </h3>
    <p
      class="mb-4 text-gray-600 text-base md:text-lg mt-4 text-center dark:text-custGrey"
    >
      By joining our email list, you will be the first to know about exciting
      new designs, special events, store openings, and much more.
    </p>
    <div
      class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center pt-4"
    >
      <button
        class="btn-subscribe flex items-center justify-center space-x-2 p-2 md:px-6 md:py-2 text-sm md:text-lg font-semibold rounded-lg transition duration-300 ease-in-out dark:bg-darkModeBtnGrey"
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
        <span class="dark:text-custWhite">Subscribe</span>
      </button>
      <button
        class="btn-unsubscribe flex items-center justify-center space-x-2 p-2 md:px-6 md:py-2 text-sm md:text-lg font-semibold rounded-lg transition duration-300 ease-in-out dark:bg-darkModeBtnGrey"
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
        <span class="dark:text-custWhite">Unsubscribe</span>
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
button {
  @apply px-6 py-2 text-lg font-semibold rounded-lg transition duration-300 ease-in-out;
}

.btn-subscribe {
  box-shadow: 0px 4px 6px rgba(0, 170, 255, 0.3);
}

.btn-subscribe:hover {
  background: linear-gradient(
    to right,
    #5e1a91,
    #007bbf
  ); /* Darker Purple to Blue */
  transform: scale(1.05);
  color: white;
}

/* Secondary Button - Unsubscribe (Gradient Only, No Background Color) */
.btn-unsubscribe {
  box-shadow: 0px 4px 6px rgba(0, 170, 255, 0.3);
}

.btn-unsubscribe:hover {
  background: linear-gradient(to right, #79016d, #300054);
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
