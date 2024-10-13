<template>
    <DefaultLayout>
      <div class="container mx-auto px-4 pt-[150px]">
        <h1 class="text-3xl font-bold mb-8 animate-fade-in">Dashboard</h1>
        
        <!-- Sales KPI Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Sales Trends Chart -->
          <div class="p-6 bg-white rounded-lg shadow-md" style="height: 300px;">
            <h2 class="text-xl font-semibold mb-4">Sales Trends</h2>
            <LineChart :chart-data="salesTrendsData" :chart-options="chartOptions" />
          </div>
          
          <!-- Revenue Breakdown Chart -->
          <div class="p-6 bg-white rounded-lg shadow-md" style="height: 300px;">
            <h2 class="text-xl font-semibold mb-4">Revenue Breakdown</h2>
            <DoughnutChart :chart-data="revenueBreakdownData" :chart-options="chartOptions" />
          </div>
        </div>
      </div>
    </DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
  import { Line, Doughnut } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from "chart.js";
  
  // Register Chart.js components
  ChartJS.register(Title, Tooltip, Legend, LineElement, ArcElement, CategoryScale, LinearScale, PointElement);
  
  export default {
    name: "DashboardView",
    components: {
      DefaultLayout,
      // Create LineChart component
      LineChart: {
        extends: Line,
        props: ["chartData", "chartOptions"],
        mounted() {
          this.renderChart(this.chartData, this.chartOptions);
        },
      },
      // Create DoughnutChart component
      DoughnutChart: {
        extends: Doughnut,
        props: ["chartData", "chartOptions"],
        mounted() {
          this.renderChart(this.chartData, this.chartOptions);
        },
      },
    },
    data() {
      return {
        // Sales Trends Data (example data)
        salesTrendsData: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Sales in $",
              data: [5000, 7000, 8000, 7500, 9000, 10000],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        // Revenue Breakdown Data (example data)
        revenueBreakdownData: {
          labels: ["Necklaces", "Rings", "Earrings", "Bracelets"],
          datasets: [
            {
              label: "Revenue",
              data: [12000, 8000, 4000, 3000],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        // Chart Options
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      };
    },
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
  
  .grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
  
  @media (min-width: 768px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  </style>
  