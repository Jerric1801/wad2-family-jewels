<template>
    <DefaultLayout>
        <div class="relative text-center z-10 flex items-center justify-center w-full h-[90vh] bg-transparent ">
            <div class="flex flex-col w-[55vw] gap-3">
                 <h2 class="text-5xl font-bold" style="z-index: 5;">
                    <span
                        class="animate-fade-in-up bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
                        v-for="(line, index) in headlineLines" :key="index"
                        :style="{ animationDelay: `${index * 1}s` }">
                        {{ line }}<br v-if="index === 0" />
                    </span>
                    </h2>
                    <p>But don't worry, there are plenty more gems to discover. Browse our collections or use the search
                        bar to find your perfect piece.</p>
            </div>
           </div>
    </DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
export default {
    name: "Error404View",
    components: {
        DefaultLayout,
    },
    data() {
        return {
            headlineLines: ["Oops! We lost that sparkle"],
        };
    },
}
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
  animation: fadeInUp 2s ease-out forwards;
  opacity: 0;
}
</style>
