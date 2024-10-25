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
    variantClass() {
      switch (this.variant) {
        case "primary":
          return "bg-gradient-to-r from-purple-500 to-blue-500 text-white";
        case "secondary":
          return "bg-gray-500 text-white";
        case "danger":
          return "bg-red-500 text-white";
        default:
          return "bg-gray-300 text-black";
      }
    },
    sizeClass() {
      switch (this.size) {
        case "sm":
          return "text-sm px-3 py-1";
        case "lg":
          return "text-lg px-8 py-4";
        default:
          return "text-md";
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
