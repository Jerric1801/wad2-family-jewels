<template>
  <DefaultLayout>
    <div
      class="relative text-center z-10 flex items-center justify-center w-full p-8 md:p-[25vh] bg-transparent mt-[10vh]"
    >
      <div class="flex flex-col w-full md:w-[55vw] gap-3">
        <h2 class="text-3xl md:text-5xl font-bold">
          <span
            class="animate-fade-in-up bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent dark:text-custDarkerWhite"
            v-for="(line, index) in headlineLines"
            :key="index"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            {{ line }}<br v-if="index === 0" />
          </span>
        </h2>

        <div
          class="terms-content text-left text-gray-700 text-sm md:text-base dark:text-custGrey"
        >
          <p v-for="(paragraph, index) in termsParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "TermsOfService",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      headlineLines: ["Terms of Service"],
      termsParagraphs: [
        "Welcome to our Jewelry Design Platform! These Terms of Service govern your use of our website and services. Please read them carefully.",
        "By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the platform.",
        "1. Use of the Platform",
        "You may use our platform to design and visualize jewelry using our provided models and tools. You may not use the platform for any illegal or unauthorized purposes.",
        "2. Intellectual Property",
        "The platform and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
        "3. User Content",
        "You retain ownership of any content you upload to the platform. By uploading content, you grant us a non-exclusive, royalty-free, worldwide license to use, display, reproduce, and distribute your content for the purpose of providing and improving our services.",
        "4. Disclaimer",
        "Our platform is provided 'as is' without any warranties of any kind, express or implied. We do not guarantee that the platform will be error-free or uninterrupted.",
        "5. Limitation of Liability",
        "To the maximum extent permitted by applicable law, we will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.",
        "6. Changes to Terms",
        "We may update these terms from time to time. We will post any changes on this page. Your continued use of the platform following the posting of revised terms means that you accept and agree to the changes.",
        "7. Contact Us",
        "If you have any questions about these Terms, please contact us.",
      ],
    };
  },
};
</script>

<style scoped>
/* Use the same animation styles as in your Error404View */
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
  /* Add some basic styling for the terms content */
  line-height: 1.6;
  margin-top: 20px;
}
</style>
