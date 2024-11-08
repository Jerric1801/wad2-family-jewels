<template>
  <DefaultLayout>
    <div class="container mx-auto px-4 pt-[150px]">
      <h2
        class="text-3xl text-center font-bold mb-4 bg-gradient-to-r from-pink via-purple to-blue bg-clip-text text-transparent dark:text-custDarkerWhite"
      >
        Dashboard
      </h2>

      <!-- KPI Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- KPI Card: Total Sales -->
        <div class="p-4 bg-white rounded-lg shadow-md dark:bg-cardItemBg">
          <h2
            class="text-md font-semibold text-gray-500 mb-1 dark:text-custGrey"
          >
            Total Sales
          </h2>
          <p class="text-2xl font-bold text-gray-900 dark:text-custDarkerWhite">
            $50,000
          </p>
        </div>
        <!-- KPI Card: Total Revenue -->
        <div class="p-4 bg-white rounded-lg shadow-md dark:bg-cardItemBg">
          <h2
            class="text-md font-semibold text-gray-500 mb-1 dark:text-custGrey"
          >
            Total Revenue
          </h2>
          <p class="text-2xl font-bold text-gray-900 dark:text-custDarkerWhite">
            $120,000
          </p>
        </div>
        <!-- KPI Card: Profit Margin -->
        <div class="p-4 bg-white rounded-lg shadow-md dark:bg-cardItemBg">
          <h2
            class="text-sm font-semibold text-gray-500 mb-1 dark:text-custGrey"
          >
            Profit Margin
          </h2>
          <p class="text-2xl font-bold text-gray-900 dark:text-custDarkerWhite">
            35%
          </p>
        </div>
        <!-- KPI Card: Units Sold -->
        <div class="p-4 bg-white rounded-lg shadow-md dark:bg-cardItemBg">
          <h2
            class="text-sm font-semibold text-gray-500 mb-1 dark:text-custGrey"
          >
            Units Sold
          </h2>
          <p class="text-2xl font-bold text-gray-900 dark:text-custDarkerWhite">
            625
          </p>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Sales Trends Chart -->
        <div class="p-6 bg-white rounded-lg shadow-md dark:bg-cardItemBg">
          <h2
            class="text-xl font-semibold mb-4 text-gray-800 dark:text-custDarkerWhite"
          >
            Sales Trends
          </h2>
          <canvas id="salesTrendsChart"></canvas>
        </div>

        <!-- Revenue Breakdown Chart -->
        <div
          class="p-6 bg-white rounded-lg shadow-md dark:bg-cardItemBg"
          style="height: 450px"
        >
          <h2 class="text-xl font-semibold mb-4 dark:text-custDarkerWhite">
            Revenue Breakdown
          </h2>
          <canvas id="revenueBreakdownChart" style="margin: auto"></canvas>
        </div>

        <!-- Profit Margin Chart -->
        <div class="p-6 bg-white rounded-lg shadow-md dark:bg-cardItemBg">
          <h2 class="text-xl font-semibold mb-4 dark:text-custDarkerWhite">
            Profit Margin
          </h2>
          <canvas id="profitMarginChart"></canvas>
        </div>

        <!-- Customer Demographics Breakdown -->
        <div
          class="p-6 bg-white rounded-lg shadow-md dark:bg-cardItemBg"
          style="height: 450px"
        >
          <h2 class="text-xl font-semibold mb-4 dark:text-custDarkerWhite">
            Customer Demographics
          </h2>
          <canvas id="customerDemographicsChart" style="margin: auto"></canvas>
        </div>

        <!-- Top Selling Products -->
        <div class="p-6 bg-white rounded-lg shadow-md dark:bg-cardItemBg">
          <h2 class="text-xl font-semibold mb-4 dark:text-custDarkerWhite">
            Top Selling Products
          </h2>
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

    // Initialize and render charts initially
    this.updateCharts();

    // Listen for changes in dark mode preference
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        this.isDarkMode = e.matches;
      });

    // Listen for system theme preference change
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        this.isDarkMode = e.matches;
      });

    // Listen for changes in localStorage, if theme is set there
    window.addEventListener("storage", () => {
      this.isDarkMode = localStorage.getItem("theme") !== "light";
    });
  },
  data() {
    return {
      // Initialize `isDarkMode` based on localStorage or system preference
      isDarkMode:
        localStorage.getItem("theme") !== "light"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
          : false,
    };
  },
  watch: {
    isDarkMode() {
      this.updateCharts();
      console.log(this.isDarkMode);
    },
  },
  methods: {
    getChartColors() {
      return {
        textColor: this.isDarkMode ? "#d9d5d5" : "#333333", // White in dark mode, dark in light mode
        gridColor: this.isDarkMode ? "#94a3b8" : "#e0e0e0", // Grey in dark mode, lighter grey in light mode
      };
    },
    updateCharts() {
      // Destroy existing charts if they exist
      if (this.salesTrendsChart) this.salesTrendsChart.destroy();
      if (this.revenueBreakdownChart) this.revenueBreakdownChart.destroy();
      if (this.profitMarginChart) this.profitMarginChart.destroy();
      if (this.customerDemographicsChart)
        this.customerDemographicsChart.destroy();
      if (this.topSellingProductsChart) this.topSellingProductsChart.destroy();

      // Re-render each chart with updated colors
      this.renderSalesTrendsChart();
      this.renderRevenueBreakdownChart();
      this.renderProfitMarginChart();
      this.renderCustomerDemographicsChart();
      this.renderTopSellingProductsChart();
    },
    renderSalesTrendsChart() {
      const { textColor, gridColor } = this.getChartColors();

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
              labels: { color: textColor }, // Set legend text color
            },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              ticks: { color: textColor }, // Set X-axis labels color
              grid: { color: gridColor }, // Set X-axis grid color
            },
            y: {
              ticks: { color: textColor }, // Set Y-axis labels color
              grid: { color: gridColor }, // Set Y-axis grid color
            },
          },
        },
      });
    },
    renderRevenueBreakdownChart() {
      const textColor = "#d9d5d5"; // Set all text to white
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
              labels: { color: textColor }, // Set legend text color
            },
            datalabels: {
              color: textColor, // Set data labels color
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
      const textColor = "#d9d5d5"; // Set all text to white
      const gridColor = "#94a3b8"; // Set grid color to grey
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
            legend: {
              display: true,
              position: "bottom",
              labels: { color: textColor },
            },
            tooltip: { enabled: true },
          },
          scales: {
            x: { ticks: { color: textColor }, grid: { color: gridColor } },
            y: { ticks: { color: textColor }, grid: { color: gridColor } },
          },
        },
      });
    },
    renderCustomerDemographicsChart() {
      const textColor = "#d9d5d5"; // Set all text to white
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
            legend: {
              display: true,
              position: "right",
              labels: { color: textColor },
            },
            datalabels: {
              color: textColor,
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
      const textColor = "#d9d5d5"; // Set all text to white
      const gridColor = "#94a3b8"; // Set grid color to grey
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
            legend: {
              display: true,
              position: "bottom",
              labels: { color: textColor },
            },
            tooltip: { enabled: true },
          },
          scales: {
            x: { ticks: { color: textColor }, grid: { color: gridColor } },
            y: { ticks: { color: textColor }, grid: { color: gridColor } },
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
