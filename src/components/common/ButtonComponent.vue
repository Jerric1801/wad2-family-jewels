<template>
  <button
    :class="[
      'px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105',
      variantClass,
      sizeClass,
    ]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "md",
    },
  },
  computed: {
    // variantClass() {
    //   switch (this.variant) {
    //     case "primary":
    //       return "bg-lightModeBtnPurple text-white";
    //     case "secondary":
    //       return "bg-lightModeBtnPink text-white";
    //     case "danger":
    //       return "bg-red-500 text-white";
    //     default:
    //       return "bg-gray-300 text-black";
    //   }
    // },
    sizeClass() {
      switch (this.size) {
        case "sm":
          return "text-xs px-2 py-1"; // Smaller font and padding for "sm"
        case "md":
          return "text-sm px-4 py-2"; // Adjusted to be slightly smaller for "md"
        case "lg":
          return "text-lg px-6 py-3"; // Slightly smaller for "lg"
        default:
          return "text-sm px-4 py-2"; // Default to "md" size if undefined
      }
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
/* You can add any additional styles or variants here */
</style>
