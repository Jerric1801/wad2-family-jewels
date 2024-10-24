<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 pt-[150px]">
      <h2
        class="text-3xl text-center font-bold mb-4 bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent"
      >
        Dashboard
      </h2>

      <!-- KPI Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- KPI Card: Total Sales -->
        <div class="p-4 bg-white rounded-lg shadow-md">
          <h2 class="text-sm font-semibold text-gray-500 mb-1">Total Sales</h2>
          <p class="text-2xl font-bold text-gray-900">$50,000</p>
        </div>
        <!-- KPI Card: Total Revenue -->
        <div class="p-4 bg-white rounded-lg shadow-md">
          <h2 class="text-sm font-semibold text-gray-500 mb-1">
            Total Revenue
          </h2>
          <p class="text-2xl font-bold text-gray-900">$120,000</p>
        </div>
        <!-- KPI Card: Profit Margin -->
        <div class="p-4 bg-white rounded-lg shadow-md">
          <h2 class="text-sm font-semibold text-gray-500 mb-1">
            Profit Margin
          </h2>
          <p class="text-2xl font-bold text-gray-900">35%</p>
        </div>
        <!-- KPI Card: Units Sold -->
        <div class="p-4 bg-white rounded-lg shadow-md">
          <h2 class="text-sm font-semibold text-gray-500 mb-1">Units Sold</h2>
          <p class="text-2xl font-bold text-gray-900">625</p>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Sales Trends Chart -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Sales Trends</h2>
          <canvas id="salesTrendsChart"></canvas>
        </div>

        <!-- Revenue Breakdown Chart -->
        <div class="p-6 bg-white rounded-lg shadow-md" style="height: 450px">
          <h2 class="text-xl font-semibold mb-4">Revenue Breakdown</h2>
          <canvas id="revenueBreakdownChart" style="margin: auto"></canvas>
        </div>

        <!-- Profit Margin Chart -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Profit Margin</h2>
          <canvas id="profitMarginChart"></canvas>
        </div>

        <!-- Customer Demographics Breakdown -->
        <div class="p-6 bg-white rounded-lg shadow-md" style="height: 450px">
          <h2 class="text-xl font-semibold mb-4">Customer Demographics</h2>
          <canvas id="customerDemographicsChart" style="margin: auto"></canvas>
        </div>

        <!-- Top Selling Products -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Top Selling Products</h2>
          <canvas id="topSellingProductsChart"></canvas>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  PieController,
  ArcElement,
  BarController,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "JewelryDashboardView",
  components: {
    DefaultLayout,
  },
  mounted() {
    // Register chart components
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Title,
      PieController,
      ArcElement,
      BarController,
      BarElement,
      ChartDataLabels,
      Filler,
      Tooltip,
      Legend
    );

    this.renderSalesTrendsChart();
    this.renderRevenueBreakdownChart();
    this.renderProfitMarginChart();
    this.renderCustomerDemographicsChart();
    this.renderTopSellingProductsChart();
  },
  methods: {
    renderSalesTrendsChart() {
      const ctx = document.getElementById("salesTrendsChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Sales",
              data: [5000, 7000, 8000, 6000, 9000, 10000],
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            tooltip: { enabled: true },
          },
          scales: { y: { beginAtZero: true } },
        },
      });
    },
    renderRevenueBreakdownChart() {
      const ctx = document
        .getElementById("revenueBreakdownChart")
        .getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Necklace", "Earrings", "Ring", "Bracelet"],
          datasets: [
            {
              label: "Revenue",
              data: [30000, 15000, 10000, 20000],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
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
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "right",
            },
            datalabels: {
              display: true,
              formatter: (value, context) =>
                `${(
                  (value /
                    context.chart.data.datasets[0].data.reduce(
                      (a, b) => a + b
                    )) *
                  100
                ).toFixed(2)}%`,
            },
          },
        },
      });
    },
    renderProfitMarginChart() {
      const ctx = document.getElementById("profitMarginChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Necklace", "Earrings", "Ring", "Bracelet"],
          datasets: [
            {
              label: "Profit Margin (%)",
              data: [40, 20, 13.33, 26.67],
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "bottom" },
            tooltip: { enabled: true },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    },
    renderCustomerDemographicsChart() {
      const ctx = document
        .getElementById("customerDemographicsChart")
        .getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["18-25", "26-35", "36-45", "46+"],
          datasets: [
            {
              label: "Customer Demographics",
              data: [5000, 10000, 15000, 7000],
              backgroundColor: [
                "rgba(255, 159, 64, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 205, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
              ],
              borderColor: [
                "rgba(255, 159, 64, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 205, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "right" },
            datalabels: {
              display: true,
              formatter: (value, context) =>
                `${(
                  (value /
                    context.chart.data.datasets[0].data.reduce(
                      (a, b) => a + b
                    )) *
                  100
                ).toFixed(2)}%`,
            },
          },
        },
      });
    },
    renderTopSellingProductsChart() {
      const ctx = document
        .getElementById("topSellingProductsChart")
        .getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Necklace", "Earrings", "Ring", "Bracelet"],
          datasets: [
            {
              label: "Top Selling Products",
              data: [300, 150, 70, 180],
              backgroundColor: "rgba(255, 99, 132, 0.7)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "bottom" },
            tooltip: { enabled: true },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    },
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
</style>
