<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 pt-[150px]">
      <h1 class="text-3xl font-bold mb-8 animate-fade-in">Dashboard</h1>

      <!-- Sales KPI Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Sales Trends Chart -->
        <div class="p-6 bg-white rounded-lg shadow-md" style="height: 700px;">
          <h2 class="text-xl font-semibold mb-4">Sales Trends</h2>
          <canvas id="salesTrendsChart"></canvas>
        </div>

        <!-- Revenue Breakdown Chart -->
        <div class="p-6 bg-white rounded-lg shadow-md" style="height: 700px;">
          <h2 class="text-xl font-semibold mb-4">Revenue Breakdown</h2>
          <canvas id="revenueBreakdownChart" style="max-width: 600px; max-height: 600px;"></canvas>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, PieController, ArcElement, Filler, Tooltip, Legend } from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "DashboardView",
  components: {
    DefaultLayout,
  },
  mounted() {
    // Register necessary components for both charts
    Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, PieController, ArcElement, ChartDataLabels, Filler, Tooltip, Legend);

    this.renderSalesTrendsChart();
    this.renderRevenueBreakdownChart();
  },
  methods: {
    renderSalesTrendsChart() {
      const ctx = document.getElementById('salesTrendsChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',  // Line chart for trends
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
          datasets: [{
            label: 'Sales',
            data: [5000, 7000, 8000, 6000, 9000, 10000], // Data points for sales
            borderColor: 'rgba(75, 192, 192, 1)',  // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill below the line
            borderWidth: 2,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    renderRevenueBreakdownChart() {
      const ctx = document.getElementById('revenueBreakdownChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Necklace', 'Earrings', 'Ring', 'Bracelet'],
          datasets: [{
            label: 'Revenue',
            data: [30000, 15000, 10000, 20000],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',  // Light Pink
              'rgba(54, 162, 235, 0.2)',   // Light Blue
              'rgba(255, 206, 86, 0.2)',   // Light Yellow
              'rgba(75, 192, 192, 0.2)'   // Light Green
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',  // Light Pink
              'rgba(54, 162, 235, 1)',   // Light Blue
              'rgba(255, 206, 86, 1)',   // Light Yellow
              'rgba(75, 192, 192, 1)'   // Light Green
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,  // Ensure the legend is displayed
              position: 'right',
              labels: {
                color: 'black'  // Ensures legend text is visible
              }
            },
            tooltip: {
              enabled: true // Enable tooltips
            },
            datalabels: {
              display: true,
              color: 'black',  // Label text color
              formatter: (value, context) => {
                let sum = 0;
                const dataArr = context.chart.data.datasets[0].data;
                dataArr.forEach(data => {
                  sum += data;
                });
                const percentage = (value * 100 / sum).toFixed(2) + "%";
                return percentage;
              }
            }
          }
        }
      });
    }
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
