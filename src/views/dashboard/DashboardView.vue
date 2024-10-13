<template>
    <DefaultLayout>
      <div class="container mx-auto px-4 pt-[150px]">
        <h1 class="text-3xl font-bold mb-8 animate-fade-in">Dashboard</h1>
        
        <!-- Sales KPI Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Sales Trends Chart -->
          <div class="p-6 bg-white rounded-lg shadow-md" style="height: 300px;">
            <h2 class="text-xl font-semibold mb-4">Sales Trends</h2>
            
          </div>
          
          <!-- Revenue Breakdown Chart -->
          <div class="p-6 bg-white rounded-lg shadow-md" style="height: 300px;">
            <h2 class="text-xl font-semibold mb-4">Revenue Breakdown</h2>
           
          </div>
        </div>
      </div>
    </DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
  
  export default {
    name: "DashboardView",
    components: {
      DefaultLayout,
    },
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  };
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
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
  
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
    opacity: 0;
  }
  </style>
  