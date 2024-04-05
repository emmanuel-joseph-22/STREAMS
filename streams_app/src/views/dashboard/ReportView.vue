<template>
  <home-page>
    <header-bar>
      <h1>Report</h1>
    </header-bar>
    <main-content>
      <div class="content-container">
        <!-- Left content -->
        <div class="left-content">
          <!-- Creative rows -->
          <div class="row-container" v-for="(row, index) in rows" :key="row.id" @click="handleButtonClick(index)">
            <div class="row-content">
              <span class="row-text">{{ row.title }}</span>
            </div>
            <div class="button-container">
              <button :class="{ 'button': true, 'active-button': activeButtonIndex === index }">Click Me</button>
            </div>
          </div>
          <!-- Print button -->
          <div id="print_row">
            <button id="print_button" class="button" @click="handlePrint">Print</button>
          </div>
        </div>
        <!-- Right content -->
        <div class="right-content">
          <div class="box1">
            <div class="box-header">Report</div>
            <div class="box-body" v-if="activeButtonIndex === 0">
              <!-- Table markup -->
              <table class="elegant-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tableData" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- End of table markup -->
            </div>
            <div class="box-body" v-else>
              <div class="chart-container" ref="chartContainer"></div>
            </div>
          </div>
        </div>
      </div>
    </main-content>
  </home-page>
</template>

<script>
import HomePageView from './HomePageView.vue';
import header from './../../components/header_component.vue';
import * as echarts from 'echarts/core'; // Import ECharts core
import { BarChart } from 'echarts/charts'; // Import Bar chart
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'; // Import components
import { CanvasRenderer } from 'echarts/renderers'; // Import renderer
import html2pdf from './../../html2pdf.js';


// Register components and renderer
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);

export default {
  components: {
    'home-page': HomePageView,
    'header-bar': header
  },
  data() {
    return {
      rows: [
        { id: 1, title: 'Daily Water Inventory' },
        { id: 2, title: 'General Daily Water Consumption' },
        { id: 3, title: 'PW Daily Water Consumption' },
        { id: 4, title: 'DW1 Daily Water Consumption' },
        { id: 5, title: 'DW2 Daily Water Consumption' }
      ],
      activeButtonIndex: null,
      tableData: [
        { id: 1, title: 'Sample Title 1' },
        { id: 2, title: 'Sample Title 2' },
        { id: 3, title: 'Sample Title 3' }
      ]
    };
  },
  watch: {
    activeButtonIndex(newValue) {
      if (newValue === 2) {
        this.$nextTick(() => {
          this.PW_BarChart();
        });
      } else if (newValue === 3) {
        this.$nextTick(() => {
          this.DW1_BarChart();
        });
      } else if (newValue === 4) {
        this.$nextTick(() => {
          this.DW2_BarChart();
        });
      }
    }
  },
  methods: {
    handleButtonClick(index) {
      this.activeButtonIndex = index;
      console.log('Button clicked for row', index);
      if (index === 0) {
        // Render table
        this.activeContent = "Table content";
      }
    },
    handlePrint() {
    // Select the content inside the box body
    const boxBodyContent = document.querySelector('.box-body');
    // Convert HTML content to PDF
    html2pdf().from(boxBodyContent).save();
  },
    PW_BarChart() {
      let chartContainer = this.$refs.chartContainer;
      if (chartContainer) {
        let chart = echarts.init(chartContainer);
        let option = {
          color: ['#3398DB'], // Change bar color
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['Category A', 'Category B', 'Category C', 'Category D']
          },
          series: [{
            data: [20, 35, 30, 40],
            type: 'bar'
          }]
        };
        chart.setOption(option);
      } else {
        console.error("Chart container element not found.");
      }
    },
    DW1_BarChart() {
      let chartContainer = this.$refs.chartContainer;
      if (chartContainer) {
        let chart = echarts.init(chartContainer);
        let option = {
          color: ['#FF5722'], // Change bar color
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['Category X', 'Category Y', 'Category 0']
          },
          series: [{
            data: [30, 40, 20],
            type: 'bar'
          }]
        };
        chart.setOption(option);
      } else {
        console.error("Chart container element not found.");
      }
    },
    DW2_BarChart() {
      let chartContainer = this.$refs.chartContainer;
      if (chartContainer) {
        let chart = echarts.init(chartContainer);
        let option = {
          color: ['#8BC34A'], // Change bar color
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['Category X', 'Category Y', 'Category Z']
          },
          series: [{
            data: [30, 40, 20],
            type: 'bar'
          }]
        };
        chart.setOption(option);
      } else {
        console.error("Chart container element not found.");
      }
    }

  }
};
</script>

<style scoped>
/* Creative row styles */

.row-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px; /* Adjust the width of the row container */
  height: 50px; /* Adjust the height of the row container */
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 2px rgba(1, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: #f5f5f5; /* Add background color */
  border: 1px solid transparent; /* Add transparent border */
}

.row-container:hover {
  transform: translateY(-3px);
}

.row-container.stroke {
  border: 1px solid #ccc; /* Add stroke border */
}

.row-content {
  flex: 1;
  padding: 0 10px; /* Add padding to the row content */
}

.row-text {
  font-size: 18px;
  color: #333; /* Change text color */
}

.button-container {
  margin-left: 10px; /* Adjust the spacing between text and button */
}

.button {
  width: 100px; /* Adjust button width as needed */
  height: 50px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  background-color: #00152c; /* Add button background color */
  color: #fff; /* Change button text color */
  border-radius: 4px; /* Add border radius */
}

.active-button {
  background-color: #007bff; /* Change background color of active button */
}

.button:hover {
  transform: scale(1.1);
}

.content-container {
  display: flex;
  justify-content: space-between;
}

.left-content,
.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.left-content {
  align-items: flex-start;
  margin-top: 5%;
}

.right-content {
  align-items: flex-end;
}

.box1 {
  margin-top: 5%;
  margin-right: 5%;
  min-width: 700px; /* Minimum width for box1 */
  min-height: 500px; /* Minimum height for box1 */
  width: 100%; /* Adjust width as needed */
  background-color: #fff; /* White background color for box body */
  border: 1px solid #ccc; /* Border for box frame */
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
}

.box-header {
  background-color: #00152c; /* Header background color */
  color: #fff; /* Header text color */
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.box-body {
  padding: 20px;
}

/* Elegant table styles */
.elegant-table {
  width: 100%;
  border-collapse: collapse;
}

.elegant-table th,
.elegant-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.elegant-table th {
  background-color: #f2f2f2;
  color: #333;
}

.elegant-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.elegant-table tbody tr:hover {
  background-color: #f2f2f2;
}

.chart-container {
  height: 400px; /* Set height for the chart container */
}
</style>
