<template>
  <DefaultLayout>
    <div
      class="relative z-10 flex items-center justify-center w-full p-8 md:p-[20vh] bg-transparent"
    >
      <div
        class="flex flex-col w-full md:w-[55vw] gap-6 p-8 bg-white rounded-lg shadow-lg dark:bg-darkModeBg"
      >
        <!-- Title Section -->
        <div class="text-center">
          <h2
            class="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent dark:text-custDarkerWhite"
          >
            Privacy Policy
          </h2>
          <p class="text-sm text-gray-500 mb-8 dark:text-custGrey">
            Last updated on November 2, 2021
          </p>
        </div>

        <!-- Content Section -->
        <div class="terms-content text-left text-gray-800 dark:text-custGrey">
          <div
            v-for="(paragraph, index) in privacyParagraphs"
            :key="index"
            class="mb-6"
          >
            <p
              class="text-base leading-7 tracking-wide text-gray-700 dark:text-custGrey"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "PrivacyPolicy",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      privacyParagraphs: [
        "Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Jewelry Design Platform.",
        "Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the platform.",
        "1. Information We Collect",
        "We may collect personal information that you provide to us, such as your name, email address, and any other information you choose to provide when you create an account or use our services.",
        "We may also automatically collect certain information about your device and usage of the platform, such as your IP address, browser type, operating system, and referring URLs.",
        "2. How We Use Your Information",
        "We may use your information to:",
        "• Provide and improve our services",
        "• Communicate with you",
        "• Personalize your experience",
        "• Protect against fraud and abuse",
        "• Comply with legal obligations",
        "3. Disclosure of Your Information",
        "We may disclose your information to third parties who assist us in providing our services, such as payment processors and hosting providers.",
        "We may also disclose your information if required by law or to protect our rights or the rights of others.",
        "4. Data Security",
        "We take reasonable measures to protect your information from unauthorized access, use, or disclosure.",
        "However, no method of transmission over the internet or method of electronic storage is completely secure.",
        "5. Your Privacy Rights",
        "You may have certain rights regarding your personal information, such as the right to access, correct, or delete your information.",
        "To exercise your privacy rights, please contact us.",
        "6. Children's Privacy",
        "Our platform is not intended for children under the age of 13.",
        "We do not knowingly collect personal information from children under 13.",
        "7. Changes to This Privacy Policy",
        "We may update this Privacy Policy from time to time.",
        "We will post any changes on this page.",
        "8. Contact Us",
        "If you have any questions about this Privacy Policy, please contact us.",
      ],
    };
  },
};
</script>

<style scoped>
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

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
}

.terms-content {
  line-height: 1.8;
}

.terms-content p.font-semibold.text-lg {
  color: #1f2937; /* darker gray for headings */
  margin-top: 24px;
}

.shadow-lg {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.bg-darkModeBg {
  background-color: #2d2f36;
}
</style>
