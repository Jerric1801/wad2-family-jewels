<template>
  <DefaultLayout>
    <div
      class="relative text-center pt-[120px] z-10 flex flex-col items-center justify-center w-full p-8 md:p-[20vh] bg-transparent dark:bg-darkModeBg"
    >
      <h2 class="text-4xl md:text-5xl font-bold mb-12">
        <span
          class="animate-fade-in-up bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent dark:text-custDarkerWhite"
        >
          Choose the Plan <br />
          That's Right for You
        </span>
      </h2>

      <div class="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <div
          class="plan-container glow-effect bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2 dark:bg-cardItemBg"
        >
          <h3 class="text-2xl font-semibold mb-4 dark:text-custDarkerWhite">
            Basic Plan
          </h3>
          <ul
            class="list-disc list-inside text-gray-700 mb-6 dark:text-custGrey"
          >
            <li>Access to basic design tools</li>
            <li>Limited model library</li>
            <li>Standard rendering quality</li>
            <li>Community support</li>
          </ul>
          <div
            class="price text-4xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent mb-4 pt-6 dark:text-custWhite"
          >
            $49 <span class="text-base font-normal">/ month</span>
          </div>
          <button
            class="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg dark:bg-darkModeBtnGrey dark:text-custWhite"
          >
            Get Started
          </button>
        </div>

        <div
          class="plan-container glow-effect bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2 dark:bg-cardItemBg"
        >
          <h3 class="text-2xl font-semibold mb-4 dark:text-custDarkerWhite">
            Pro Plan
          </h3>
          <ul
            class="list-disc list-inside text-gray-700 mb-6 dark:text-custGrey"
          >
            <li>All basic plan features</li>
            <li>Expanded model library</li>
            <li>Advanced design tools</li>
            <li>High-resolution rendering</li>
            <li>Priority support</li>
          </ul>
          <div
            class="price text-4xl font-bold bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent mb-4 dark:text-custWhite"
          >
            $99 <span class="text-base font-normal">/ month</span>
          </div>
          <button
            class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg dark:bg-darkModeBtnGrey dark:text-custWhite"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "Pricing",
  components: {
    DefaultLayout,
  },
};
</script>

<style scoped>
.plan-container {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.plan-container:hover {
  transform: translateY(-5px);
}

/* Light mode purple glow */
.glow-effect:hover {
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.7), 0 0 20px rgba(75, 0, 130, 0.6),
    0 0 30px rgba(238, 130, 238, 0.5), 0 0 40px rgba(138, 43, 226, 0.4),
    0 0 60px rgba(75, 0, 130, 0.3), 0 0 80px rgba(138, 43, 226, 0.2);
}

/* Dark mode white glow */
.dark .glow-effect:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7),
    0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.5),
    0 0 40px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.3),
    0 0 80px rgba(255, 255, 255, 0.2);
}
</style>
