<template>
  <home-page>
    <header-bar>
      <h1 class="text-4xl font-semibold ml-3">Report</h1>
    </header-bar>
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
                  <th>Date</th>
                  <th>Deep Well 1</th>
                  <th>Deep Well 2</th>
                  <th>Deep Well 3</th>
                  <th>Prime Water</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableData" :key="index">
                  <td>{{ item.date }}</td>
                  <td>{{ item.deepWell1 }}</td>
                  <td>{{ item.deepWell2 }}</td>
                  <td>{{ item.deepWell3 }}</td>
                  <td>{{ item.primeWater }}</td>
                </tr>
              </tbody>
            </table>
            <!-- End of table markup -->
          </div>
          <div class="chart-container" v-if="activeButtonIndex === 2" id="pwChartContainer"></div>
          <div class="chart-container" v-else-if="activeButtonIndex === 3" id="dw1ChartContainer"></div>
          <div class="chart-container" v-else-if="activeButtonIndex === 4" id="dw2ChartContainer"></div>
          <!-- Text input field -->
          <textarea v-model="userReport" v-if="activeButtonIndex !== null" placeholder="Type your report here..." rows="4"></textarea>
        </div>
        <router-link to="/events" class="elative px-4 py-2 bg-blue-900 text-white">Events</router-link>
      </div>
    </div>
  </home-page>
</template>

<script>
import HomePageView from './HomePageView.vue';
import header from './../../components/header_component.vue';
import { ref, onMounted, nextTick } from "vue";
import * as echarts from 'echarts';
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from "echarts/components";
import { doc,  collection, getDocs } from "firebase/firestore";
import { firestore as db } from './../../main.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


echarts.use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent]);

export default {
  components: {
    'home-page': HomePageView,
    'header-bar': header
  },
  setup() {
    const activeButtonIndex = ref(null);
    const tableData = ref([]);
    const userReport = ref('');
    const rows = [
      { id: 1, title: 'Daily Water Inventory' },
      { id: 2, title: 'General Daily Water Consumption' },
      { id: 3, title: 'PW Daily Water Consumption' },
      { id: 4, title: 'DW1 Daily Water Consumption' },
      { id: 5, title: 'DW2 Daily Water Consumption' },
      { id: 6, title: 'Event Report' },
    ];

    onMounted(async () => {
      // Removed provide(THEME_KEY, "white");
    });

    const fetchWaterSourceData = async (waterSource) => {
      const waterSourceRef = collection(doc(collection(db, 'meter_records'), 'main_meter'), waterSource);
      const querySnapshot = await getDocs(waterSourceRef);
      
      const date_temp = [];
      const value_temp = [];

      querySnapshot.forEach((doc) => {
        const date = new Date(doc.id);
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
        date_temp.push(formattedDate);
        value_temp.push(doc.data().consumption);
      });

      return { dates: date_temp, values: value_temp };
    };

    const handleButtonClick = async (index) => {
      activeButtonIndex.value = index;
      if (index === 0) {
        try {
          const deepWell1Data = await fetchWaterSourceData('deep-well-1');
          const deepWell2Data = await fetchWaterSourceData('deep-well-2');
          const deepWell3Data = await fetchWaterSourceData('deep-well-3');
          const primeWaterData = await fetchWaterSourceData('prime-water');
          
          // Combine data from all sources
          const combinedData = [];
          const dates = new Set([...deepWell1Data.dates, ...deepWell2Data.dates, ...deepWell3Data.dates, ...primeWaterData.dates]);

          for (const date of dates) {
            const deepWell1Datum = deepWell1Data.dates.indexOf(date) !== -1 ? deepWell1Data.values[deepWell1Data.dates.indexOf(date)] : 0;
            const deepWell2Datum = deepWell2Data.dates.indexOf(date) !== -1 ? deepWell2Data.values[deepWell2Data.dates.indexOf(date)] : 0;
            const deepWell3Datum = deepWell3Data.dates.indexOf(date) !== -1 ? deepWell3Data.values[deepWell3Data.dates.indexOf(date)] : 0;
            const primeWaterDatum = primeWaterData.dates.indexOf(date) !== -1 ? primeWaterData.values[primeWaterData.dates.indexOf(date)] : 0;

            combinedData.push({
              date,
              deepWell1: deepWell1Datum,
              deepWell2: deepWell2Datum,
              deepWell3: deepWell3Datum,
              primeWater: primeWaterDatum
            });
          }

          tableData.value = combinedData;
        } catch (error) {
          console.error("Error fetching water source data:", error);
        }
      } else if (index === 2) {
        await nextTick(); 
        PW_BarChart();
      } else if (index === 3) {
        await nextTick(); 
        DW1_BarChart();
      } else if (index === 4) {
        await nextTick(); 
        DW2_BarChart();
      }

      // Clear userReport value when a different button index is clicked
      if (index !== null) {
        userReport.value = '';
      }
    };

    const handlePrint = async () => {
  let chartImage = '';

  // Determine content element based on active button index
  if ([2, 3, 4].includes(activeButtonIndex.value)) {
    const chartContainerId = activeButtonIndex.value === 2 ? 'pwChartContainer' :
                             activeButtonIndex.value === 3 ? 'dw1ChartContainer' :
                             activeButtonIndex.value === 4 ? 'dw2ChartContainer' : null;
    if (chartContainerId) {
      const chartContainer = document.getElementById(chartContainerId);
      // Convert the chart to an image
      chartImage = await getChartImage(chartContainer);
    }
  }

  const textareaContent = userReport.value;

  // Generate the PDF from the combined content
  generatePDF(chartImage, textareaContent);
};

const generatePDF = (chartImage, textContent) => {
  const docDefinition = {
    content: [
      // Add chart image as an image element
      { image: chartImage, width: 500 }, // Adjust width as needed
      // Add text content as a paragraph
      { text: textContent, margin: [0, 20, 0, 0] } // Add margin to separate from the chart
    ]
  };

  // Use a PDF generation library like pdfMake
  pdfMake.createPdf(docDefinition).download('report.pdf');
};







// Function to convert ECharts chart to image
const getChartImage = async (chartContainer) => {
  const chart = echarts.getInstanceByDom(chartContainer);
  const base64Image = await chart.getDataURL({
    pixelRatio: window.devicePixelRatio || 1,
    backgroundColor: '#fff'
  });
  return base64Image;
};





const PW_BarChart = async () => {
  try {
    const primeWaterData = await fetchWaterSourceData('prime-water');
    
    const dates = primeWaterData.dates;
    const consumptions = primeWaterData.values;

    let chartContainer = document.getElementById("pwChartContainer");
    if (chartContainer) {
      let chart = echarts.init(chartContainer);
      let option = {
        color: ['#3398DB'], 
        title: {
          text: 'PW Daily Water Consumption', // Name of the graph
          top: 5, // Adjust the gap from the top
          textStyle: {
            fontWeight: 'bold' // Make the name bold
          }
        },
        xAxis: {
          type: 'category',
          name: 'Date',
          nameLocation: 'center', // Center the label
          nameTextStyle: {
            fontWeight: 'bold' // Make the label bold
          },
          nameGap: 35, // Move the label outward
          data: dates
        },
        yAxis: {
          type: 'value',
          name: 'Consumption per day (cubic meter)',
          nameLocation: 'center', // Center the label
          nameTextStyle: {
            fontWeight: 'bold' // Make the label bold
          },
          nameGap: 35, // Move the label outward
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [{
          name: 'Prime Water Consumption',
          data: consumptions,
          type: 'bar'
        }]
      };
      chart.setOption(option);
    } else {
      console.error("Chart container element not found.");
    }
  } catch (error) {
    console.error("Error fetching water source data:", error);
  }
};

const DW1_BarChart = async () => {
  try {
    const dw1Data = await fetchWaterSourceData('deep-well-1');
    
    const dates = dw1Data.dates;
    const consumptions = dw1Data.values;

    let chartContainer = document.getElementById("dw1ChartContainer");
    if (chartContainer) {
      let chart = echarts.init(chartContainer);
      let option = {
        color: ['#FF5722'], 
        title: {
          text: 'DW1 Daily Water Consumption', // Name of the graph
          top: 5, // Adjust the gap from the top
          textStyle: {
            fontWeight: 'bold' // Make the name bold
          }
        },
        xAxis: {
          type: 'category',
          name: 'Date',
          nameLocation: 'center', // Center the label
          nameTextStyle: {
            fontWeight: 'bold' // Make the label bold
          },
          nameGap: 35, // Move the label outward
          data: dates
        },
        yAxis: {
          type: 'value',
          name: 'Consumption per day (cubic meter)',
          nameLocation: 'center', // Center the label
          nameTextStyle: {
            fontWeight: 'bold' // Make the label bold
          },
          nameGap: 35, // Move the label outward
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [{
          name: 'DW1 Consumption',
          data: consumptions,
          type: 'bar'
        }]
      };
      chart.setOption(option);
    } else {
      console.error("Chart container element not found.");
    }
  } catch (error) {
    console.error("Error fetching water source data:", error);
  }
};

const DW2_BarChart = async () => {
  try {
    const dw2Data = await fetchWaterSourceData('deep-well-2');
    
    const dates = dw2Data.dates;
    const consumptions = dw2Data.values;

    let chartContainer = document.getElementById("dw2ChartContainer");
    if (chartContainer) {
      let chart = echarts.init(chartContainer);
      let option = {
        color: ['#8BC34A'], 
        title: {
          text: 'DW2 Daily Water Consumption', // Name of the graph
          top: 5, // Adjust the gap from the top
          textStyle: {
            fontWeight: 'bold' // Make the name bold
          }
        },
        xAxis: {
          type: 'category',
          name: 'Date',
          nameLocation: 'center', // Center the label
          nameTextStyle: {
            fontWeight: 'bold' // Make the label bold
          },
          nameGap: 35, // Move the label outward
          data: dates
        },
        yAxis: {
          type: 'value',
          name: 'Consumption per day (cubic meter)',
          nameLocation: 'center', // Center the label
          nameTextStyle: {
            fontWeight: 'bold' // Make the label bold
          },
          nameGap: 35, // Move the label outward
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [{
          name: 'DW2 Consumption',
          data: consumptions,
          type: 'bar'
        }]
      };
      chart.setOption(option);
    } else {
      console.error("Chart container element not found.");
    }
  } catch (error) {
    console.error("Error fetching water source data:", error);
  }
};


    return {
      activeButtonIndex,
      tableData,
      userReport,
      rows, 
      handleButtonClick,
      handlePrint
    };
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
  margin: 12px auto;
  box-shadow: 0 2px 2px rgba(1, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: #f5f5f5; /* Add background color */
  border: 1px solid transparent; /* Add transparent border */
}

.row-container:hover {
  transform: translateY(-3px);
  cursor: pointer;
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
  padding-left: 320px; /* Adjust padding to prevent overlap with fixed left content */
}

.left-content {
  position: fixed;
  top: 150px;
  left: 120px;
  bottom: 0;
  width: 300px; /* Adjust width as needed */
  background-color: #fff; /* White background color for left content */

  z-index: 1; /* Ensure left content is above other content */
}

.right-content {
  margin-left: 320px; /* Adjust margin to accommodate fixed left content */
  flex: 1;
  display: flex;
  flex-direction: column;
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

/* Textarea styles */
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>
