<template>
    <home-page>
      <header-bar>
        <h1 class="text-4xl font-semibold ml-3">Report</h1>
      </header-bar>
      <div class="content-container">
        <!-- Left content -->
        <div class="left-content fixed md:top-28 top-14 md:left-52 left-0 bottom-0 w-full md:w-96 p-4 overflow-y-auto;">
          <!-- Creative rows -->
          <div class="flex items-center mb-4" v-for="(row, index) in rows" :key="row.id" @click="handleButtonClick(index)">
              <div class="w-full">
                  <span class="block text-lg text-left font-semibold mb-1">{{ row.title }}</span>
              </div>
              <div class="ml-auto">
                  <button :class="{ 'button': true, 'active-button': activeButtonIndex === index }" @click="togglePopup">📄</button>
              </div>
          </div>
          <!-- Print button -->
          <div id="print_row">
              <button id="print_button" class="button w-full" @click="handlePrint">Print</button>
          </div>
        </div>
        <!-- Right content -->
        <div class="right-content overflow-x-hidden">
          <div class="box1 overflow-y-hidden">
            <div class="box-header">Report</div>
            <div class="box-body h-[400px] overflow-y-auto" v-if="activeButtonIndex === 0">
              <h2 class="text-2xl font-semibold mb-4">Daily Water Inventory</h2>
              <!-- Table markup for Daily Water Inventory -->
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
            </div>
  
            <!-- Chart container for different reports -->
            <div class="chart-container" v-if="activeButtonIndex === 1" id="generalConsumptionChartContainer"></div>
            <div class="chart-container" v-if="activeButtonIndex === 2" id="pwChartContainer"></div>
            <div class="chart-container" v-if="activeButtonIndex === 3" id="dw1ChartContainer"></div>
            <div class="chart-container" v-if="activeButtonIndex === 4" id="dw2ChartContainer"></div>
  
            <!-- Event tables for Event Report -->
            <div class="box-body h-[400px] overflow-y-auto" v-if="activeButtonIndex === 5">
              <!-- CEAFA Building Events Table -->
              <div class="my-8">
                <h2 class="text-2xl font-semibold mb-4">CEAFA Building Events</h2>
                <table class="w-full bg-white border rounded shadow-md">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="px-4 py-2 border">Event Number</th>
                      <th class="px-4 py-2 border">Date of Event</th>
                      <th class="px-4 py-2 border">Time of Event</th>
                      <th class="px-4 py-2 border">Facility</th>
                      <th class="px-4 py-2 border">Number of Hours</th>
                      <th class="px-4 py-2 border">Department</th>
                      <th class="px-4 py-2 border">Purpose/Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(event, index) in ceafaEvents" :key="index">
                      <td class="px-4 py-2 border">{{ index + 1 }}</td>
                      <td class="px-4 py-2 border">{{ event.dateOfEvent }}</td>
                      <td class="px-4 py-2 border">{{ event.timeOfEvent }}</td>
                      <td class="px-4 py-2 border">{{ event.facility }}</td>
                      <td class="px-4 py-2 border">{{ event.numberOfHours }}</td>
                      <td class="px-4 py-2 border">{{ event.department }}</td>
                      <td class="px-4 py-2 border">{{ event.purposeEvent }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <!-- Fitness Development Center Events Table -->
              <div class="my-8">
                <h2 class="text-2xl font-semibold mb-4">Fitness Development Center Events</h2>
                <table class="w-full bg-white border rounded shadow-md">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="px-4 py-2 border">Event Number</th>
                      <th class="px-4 py-2 border">Date of Event</th>
                      <th class="px-4 py-2 border">Time of Event</th>
                      <th class="px-4 py-2 border">Facility</th>
                      <th class="px-4 py-2 border">Number of Hours</th>
                      <th class="px-4 py-2 border">Department</th>
                      <th class="px-4 py-2 border">Purpose/Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(event, index) in fdcEvents" :key="index">
                      <td class="px-4 py-2 border">{{ index + 1 }}</td>
                      <td class="px-4 py-2 border">{{ event.dateOfEvent }}</td>
                      <td class="px-4 py-2 border">{{ event.timeOfEvent }}</td>
                      <td class="px-4 py-2 border">{{ event.facility }}</td>
                      <td class="px-4 py-2 border">{{ event.numberOfHours }}</td>
                      <td class="px-4 py-2 border">{{ event.department }}</td>
                      <td class="px-4 py-2 border">{{ event.purposeEvent }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            <!-- Text input field for user reports -->
            <textarea v-model="userReport" v-if="activeButtonIndex !== null" placeholder="Type your report here..." rows="4"></textarea>
          </div>
     <!--     <router-link to="/events" class="elative px-4 py-2 bg-blue-900 text-white">Events</router-link>   -->
        </div>
  
  <!--Mobile PopUp-->
        
        <div v-if="showPopup && isMobile" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="togglePopup"></div>
        <div class="popup-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[630px] border border-black bg-white text-[#042334] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out md:w-1/3 w-11/12" v-if="showPopup && isMobile">
            <div class="popup-content h-[570px] flex flex-col">
                <div class="box-header">{{ rows[activeButtonIndex]?.title }}</div>
                <div class="box-body overflow-y-auto">
                  <table v-if="activeButtonIndex === 0" class="elegant-table">
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
                </div>
                <div v-if="activeButtonIndex === 2" class="chart-container" id="pwChartContainer"></div>
                <div v-else-if="activeButtonIndex === 3" class="chart-container" id="dw1ChartContainer"></div>
                <div v-else-if="activeButtonIndex === 4" class="chart-container" id="dw2ChartContainer"></div>
                <textarea v-model="userReport" v-if="activeButtonIndex !== null" placeholder="Type your report here..." rows="4"></textarea>
            </div>
            <button class="close-button absolute bottom-2 right-4 text-red-500 hover:text-red-700 cursor-pointer" @click="togglePopup">Close</button>
          </div>
      </div>
    </home-page>
  </template>
  
  <script>
  import HomePageView from './HomePageView.vue';
  import header from './../../components/header_component.vue';
  import { ref, onMounted, nextTick, computed, onUnmounted } from "vue";
  import * as echarts from 'echarts';
  import { CanvasRenderer } from "echarts/renderers";
  import { BarChart } from "echarts/charts";
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent
  } from "echarts/components";
  import { fetchWaterSourceData } from './../../dashboard_query';
  import pdfMake from 'pdfmake/build/pdfmake';
  import pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { firestore as db } from "../../main.js";
  
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
  
      // Variables for storing events data
      const ceafaEvents = ref([]);
      const fdcEvents = ref([]);
  
      const rows = [
        { id: 1, title: 'Daily Water Inventory' },
        { id: 2, title: 'General Daily Water Consumption' },
        { id: 3, title: 'PW Daily Water Consumption' },
        { id: 4, title: 'DW1 Daily Water Consumption' },
        { id: 5, title: 'DW2 Daily Water Consumption' },
        { id: 5, title: 'Event Report' },
      ];
  
      onMounted(async () => {
          // You can initialize anything you need here
          window.addEventListener("resize", updateScreenWidth);
      });
  
      onUnmounted(() => {
        window.removeEventListener("resize", updateScreenWidth); 
      });
      // Function to format CEAFA events for PDF
  const formatCEAFATable = () => {
      // Define table headers
      const headers = ['Event Number', 'Date of Event', 'Time of Event', 'Facility', 'Number of Hours', 'Department', 'Purpose/Event'];
      
      // Map events data to rows
      const rows = ceafaEvents.value.map((event, index) => [
          index + 1, // Event number
          event.dateOfEvent, // Date of event
          event.timeOfEvent, // Time of event
          event.facility, // Facility
          event.numberOfHours, // Number of hours
          event.department, // Department
          event.purposeEvent // Purpose/Event
      ]);
      
      // Return an array containing headers and rows
      return [headers, ...rows];
  };
  // Function to format FDC events for PDF
  const formatFDCTable = () => {
      // Define table headers
      const headers = ['Event Number', 'Date of Event', 'Time of Event', 'Facility', 'Number of Hours', 'Department', 'Purpose/Event'];
      
      // Map events data to rows
      const rows = fdcEvents.value.map((event, index) => [
          index + 1, // Event number
          event.dateOfEvent, // Date of event
          event.timeOfEvent, // Time of event
          event.facility, // Facility
          event.numberOfHours, // Number of hours
          event.department, // Department
          event.purposeEvent // Purpose/Event
      ]);
      
      // Return an array containing headers and rows
      return [headers, ...rows];
  };
      // Handle button click
      const handleButtonClick = async (index) => {
          activeButtonIndex.value = index;
  
          if (index === 0) {
              // Handle Daily Water Inventory
              try {
                  const deepWell1Data = await fetchWaterSourceData('deep_well_1');
                  const deepWell2Data = await fetchWaterSourceData('deep_well_2');
                  const deepWell3Data = await fetchWaterSourceData('deep_well_3');
                  const primeWaterData = await fetchWaterSourceData('prime_water');
  
                  // Combine data from all sources
                  const combinedData = [];
                  const dates = new Set([...deepWell1Data.dates, ...deepWell2Data.dates, ...deepWell3Data.dates, ...primeWaterData.dates]);
  
                  for (const date of dates) {
                      const deepWell1Datum = deepWell1Data.dates.includes(date) ? deepWell1Data.values[deepWell1Data.dates.indexOf(date)] : 0;
                      const deepWell2Datum = deepWell2Data.dates.includes(date) ? deepWell2Data.values[deepWell2Data.dates.indexOf(date)] : 0;
                      const deepWell3Datum = deepWell3Data.dates.includes(date) ? deepWell3Data.values[deepWell3Data.dates.indexOf(date)] : 0;
                      const primeWaterDatum = primeWaterData.dates.includes(date) ? primeWaterData.values[primeWaterData.dates.indexOf(date)] : 0;
  
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
                  console.error('Error fetching water source data:', error);
              }
          } else if (index === 1) {
              await nextTick(); // Ensure the DOM is updated
              GeneralDailyConsumptionChart(); // Display the General Daily Water Consumption chart
          } else if (index === 2) {
              await nextTick();
              PW_BarChart(); // Display the Prime Water daily water consumption chart
          } else if (index === 3) {
              await nextTick();
              DW1_BarChart(); // Display the Deep Well 1 daily water consumption chart
          } else if (index === 4) {
              await nextTick();
              DW2_BarChart(); // Display the Deep Well 2 daily water consumption chart
          } else if (index === 5) {
              // Fetch and display events data for the "Event Report" option
              try {
                  await fetchEvents();
              } catch (error) {
                  console.error('Error fetching events data:', error);
              }
          }
  
          // Reset user report value
          userReport.value = '';
      };
      // Fetch events data from Firestore
      const fetchEvents = async () => {
      try {
          // Calculate the start and end dates for the previous month
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth();
  
          // Determine the start and end dates for the previous month
          const startOfPreviousMonth = new Date(currentYear, currentMonth - 1, 1);
          const endOfPreviousMonth = new Date(currentYear, currentMonth, 0);
  
          // Format the dates to ISO string for Firestore queries
          const startOfPreviousMonthISO = startOfPreviousMonth.toISOString();
          const endOfPreviousMonthISO = endOfPreviousMonth.toISOString();
  
          // Queries to fetch events for the previous month
          const ceafaQuery = query(
              collection(db, 'events', 'BSU_Alangilan', 'CEAFA Building'),
              where('dateOfEvent', '>=', startOfPreviousMonthISO),
              where('dateOfEvent', '<=', endOfPreviousMonthISO)
          );
  
          const fdcQuery = query(
              collection(db, 'events', 'BSU_Alangilan', 'Fitness Development Center'),
              where('dateOfEvent', '>=', startOfPreviousMonthISO),
              where('dateOfEvent', '<=', endOfPreviousMonthISO)
          );
  
          // Fetch the events from Firestore
          const [ceafaSnapshot, fdcSnapshot] = await Promise.all([
              getDocs(ceafaQuery),
              getDocs(fdcQuery)
          ]);
  
          // Process the fetched data and store it in reactive variables
          ceafaEvents.value = ceafaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          fdcEvents.value = fdcSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
          console.log('Fetched CEAFA Events:', ceafaEvents.value);
          console.log('Fetched FDC Events:', fdcEvents.value);
      } catch (error) {
          console.error('Error fetching events data:', error);
      }
  };
      // Handle PDF printing
      const handlePrint = async () => {
          let chartImage = '';
  
          // Determine content element based on active button index
          if ([1, 2, 3, 4].includes(activeButtonIndex.value)) {
              const chartContainerId = activeButtonIndex.value === 1 ? 'generalConsumptionChartContainer' :
                                       activeButtonIndex.value === 2 ? 'pwChartContainer' :
                                       activeButtonIndex.value === 3 ? 'dw1ChartContainer' :
                                       activeButtonIndex.value === 4 ? 'dw2ChartContainer' : null;
  
              if (chartContainerId) {
                  const chartContainer = document.getElementById(chartContainerId);
                  // Convert the chart to an image
                  chartImage = await getChartImage(chartContainer);
              }
          }
  
          // Format the table data
          let tableContent = [];
          if (activeButtonIndex.value === 0 && tableData.value.length > 0) {
              // Add the table headers
              const headers = ['Date', 'Deep Well 1', 'Deep Well 2', 'Deep Well 3', 'Prime Water'];
              tableContent.push(headers);
  
              // Add the table rows
              tableData.value.forEach(item => {
                  tableContent.push([
                      item.date,
                      item.deepWell1,
                      item.deepWell2,
                      item.deepWell3,
                      item.primeWater
                  ]);
              });
          }
  
          const textareaContent = userReport.value;
  
          // Generate the PDF from the combined content
          generatePDF(chartImage, textareaContent, tableContent);
      };
      // Generate PDF file
      const generatePDF = async (chartImage, textContent, tableContent) => {
      try {
          // Specify the path to the header image file
          const headerImageUrl = 'header.png'; // Update this path as needed
          
          // Load the image as a data URL
          const loadHeaderImage = async (imagePath) => {
              return new Promise((resolve, reject) => {
                  const img = new Image();
                  img.onload = () => {
                      const canvas = document.createElement('canvas');
                      canvas.width = img.width;
                      canvas.height = img.height;
                      const ctx = canvas.getContext('2d');
                      ctx.drawImage(img, 0, 0);
                      const dataURL = canvas.toDataURL('image/png');
                      resolve(dataURL);
                  };
                  img.onerror = reject;
                  img.src = imagePath;
              });
          };
  
          // Convert the header image to a data URL
          const headerImageDataUrl = await loadHeaderImage(headerImageUrl);
  
          // Initialize the PDF content array
          let content = [
              // Add the header image using data URL
              {
                  image: headerImageDataUrl,
                  width: 500,
                  alignment: 'center',
                  margin: [0, 0, 0, 20] // Adjust margins for spacing around the header image
              },
              // Add the text content
              {
                  text: textContent,
                  margin: [0, 20, 0, 0] // Add margin to separate text content
              }
          ];
  
          // Add the chart image if available
          if (chartImage) {
              content.push({
                  image: chartImage,
                  width: 500,
                  margin: [0, 0, 0, 20] // Add margin for spacing between chart and text
              });
          }
  
          // Add the Daily Water Inventory table if present
          if (tableContent.length > 0) {
              content.push({
                  text: 'Daily Water Inventory',
                  style: 'headerTitle',
                  margin: [0, 20, 0, 10] // Margin between the title and the table
              });
              content.push({
                  style: 'tableStyle',
                  table: {
                      headerRows: 1,
                      widths: ['*', '*', '*', '*', '*'], // Define column widths
                      body: tableContent
                  },
                  margin: [0, 0, 0, 20] // Add margin around the table
              });
          }
  
          // Add event tables if activeButtonIndex is 5
          if (activeButtonIndex.value === 5) {
              // Add CEAFA events table
              const ceafaTable = formatCEAFATable();
              content.push({
                  text: 'CEAFA Building Events',
                  style: 'headerTitle',
                  margin: [0, 20, 0, 10]
              });
              content.push({
                  style: 'tableStyle',
                  table: {
                      headerRows: 1,
                      widths: ['*', '*', '*', '*', '*', '*', '*'],
                      body: ceafaTable
                  },
                  margin: [0, 0, 0, 20]
              });
  
              // Add FDC events table
              const fdcTable = formatFDCTable();
              content.push({
                  text: 'Fitness Development Center Events',
                  style: 'headerTitle',
                  margin: [0, 20, 0, 10]
              });
              content.push({
                  style: 'tableStyle',
                  table: {
                      headerRows: 1,
                      widths: ['*', '*', '*', '*', '*', '*', '*'],
                      body: fdcTable
                  },
                  margin: [0, 0, 0, 20]
              });
          }
  
          // Create the document definition
          const docDefinition = {
              content: content,
              styles: {
                  headerTitle: {
                      fontSize: 16,
                      bold: true,
                      alignment: 'center',
                      color: 'black'
                  },
                  tableStyle: {
                      margin: [0, 0, 0, 20] // Add margin around the table
                  }
              }
          };
  
          // Use pdfMake to create the PDF and download it
          pdfMake.createPdf(docDefinition).download('report.pdf');
      } catch (error) {
          console.error('Error generating PDF:', error);
      }
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
      const GeneralDailyConsumptionChart = async () => {
          try {
              // Fetch data from all water sources
              const deepWell1Data = await fetchWaterSourceData('deep_well_1');
              const deepWell2Data = await fetchWaterSourceData('deep_well_2');
              const deepWell3Data = await fetchWaterSourceData('deep_well_3');
              const primeWaterData = await fetchWaterSourceData('prime_water');
  
              // Create a map to store total consumption for each date
              const dateConsumptionMap = new Map();
  
              // Function to add data to the dateConsumptionMap
              const addDataToMap = (data) => {
                  data.dates.forEach((date, index) => {
                      const consumption = data.values[index];
                      if (dateConsumptionMap.has(date)) {
                          dateConsumptionMap.set(date, dateConsumptionMap.get(date) + consumption);
                      } else {
                          dateConsumptionMap.set(date, consumption);
                      }
                  });
              };
  
              // Add data from each source to the dateConsumptionMap
              addDataToMap(deepWell1Data);
              addDataToMap(deepWell2Data);
              addDataToMap(deepWell3Data);
              addDataToMap(primeWaterData);
  
              // Convert the dateConsumptionMap to arrays for ECharts
              const dates = Array.from(dateConsumptionMap.keys());
              const totalConsumptions = Array.from(dateConsumptionMap.values());
  
              // Initialize the chart container element
              let chartContainer = document.getElementById("generalConsumptionChartContainer");
              if (chartContainer) {
                  let chart = echarts.init(chartContainer);
                  let option = {
                      color: ['#9c27b0'], // Set color for the bar chart
                      title: {
                          text: 'General Daily Water Consumption',
                          top: 5,
                          textStyle: {
                              fontWeight: 'bold'
                          }
                      },
                      xAxis: {
                          type: 'category',
                          name: 'Date',
                          nameLocation: 'center',
                          nameTextStyle: {
                              fontWeight: 'bold'
                          },
                          nameGap: 35,
                          data: dates
                      },
                      yAxis: {
                          type: 'value',
                          name: 'Total Consumption per day (cubic meter)',
                          nameLocation: 'center',
                          nameTextStyle: {
                              fontWeight: 'bold'
                          },
                          nameGap: 35
                      },
                      tooltip: {
                          trigger: 'axis',
                          axisPointer: {
                              type: 'shadow'
                          },
                          formatter: function(params) {
                              return `${params[0].name}<br/>Total Consumption: ${params[0].value} m3`;
                          }
                      },
                      series: [{
                          name: 'Total Consumption',
                          data: totalConsumptions,
                          type: 'bar'
                      }]
                  };
  
                  // Set the option for the chart
                  chart.setOption(option);
              } else {
                  console.error("Chart container element not found.");
              }
          } catch (error) {
              console.error("Error fetching water source data:", error);
          }
      };
      const PW_BarChart = async () => {
          try {
              const primeWaterData = await fetchWaterSourceData('prime_water');
              
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
                          formatter: '{value} m3',
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
                          },
                          formatter: function(params) {
                              return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value} m3`;
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
              const dw1Data = await fetchWaterSourceData('deep_well_1');
              
              const dates = dw1Data.dates;
              const consumptions = dw1Data.values;
  
              let chartContainer = document.getElementById("dw1ChartContainer");
              if (chartContainer) {
                  let chart = echarts.init(chartContainer);
                  let option = {
                      color: ['#FF5722'], 
                      title: {
                          text: 'DW1 Daily Water Consumption',
                          top: 5,
                          textStyle: {
                              fontWeight: 'bold'
                          }
                      },
                      xAxis: {
                          type: 'category',
                          name: 'Date',
                          nameLocation: 'center',
                          nameTextStyle: {
                              fontWeight: 'bold'
                          },
                          nameGap: 35,
                          data: dates
                      },
                      yAxis: {
                          type: 'value',
                          name: 'Consumption per day (cubic meter)',
                          nameLocation: 'center',
                          nameTextStyle: {
                              fontWeight: 'bold'
                          },
                          nameGap: 35
                      },
                      tooltip: {
                          trigger: 'axis',
                          axisPointer: {
                              type: 'shadow'
                          },
                          formatter: function(params) {
                              return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value} m3`;
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
              const dw2Data = await fetchWaterSourceData('deep_well_2');
              
              const dates = dw2Data.dates;
              const consumptions = dw2Data.values;
  
              let chartContainer = document.getElementById("dw2ChartContainer");
              if (chartContainer) {
                  let chart = echarts.init(chartContainer);
                  let option = {
                      color: ['#8BC34A'], 
                      title: {
                          text: 'DW2 Daily Water Consumption',
                          top: 5,
                          textStyle: {
                              fontWeight: 'bold'
                          }
                      },
                      xAxis: {
                          type: 'category',
                          name: 'Date',
                          nameLocation: 'center',
                          nameTextStyle: {
                              fontWeight: 'bold'
                          },
                          nameGap: 35,
                          data: dates
                      },
                      yAxis: {
                          type: 'value',
                          name: 'Consumption per day (cubic meter)',
                          nameLocation: 'center',
                          nameTextStyle: {
                              fontWeight: 'bold'
                          },
                          nameGap: 35
                      },
                      tooltip: {
                          trigger: 'axis',
                          axisPointer: {
                              type: 'shadow'
                          },
                          formatter: function(params) {
                              return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value} m3`;
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
  
  //popup//
      const showPopup = ref(false);
  
      const togglePopup = (index) => {
      if (index !== undefined){
          activeButtonIndex.value = index;
      }
      showPopup.value = !showPopup.value;
      };
  
  //Mobile
      const screenWidth = ref(window.innerWidth);
      const isMobile = computed(() => screenWidth.value < 768);
  
  //Update when window resized
      const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
      }
  
      return {
          activeButtonIndex,
          tableData,
          userReport,
          ceafaEvents,
          fdcEvents,
          rows,
          handleButtonClick,
          handlePrint,
          showPopup,
          togglePopup,
          isMobile
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
  font-size: 1.2rem;
    width: 60px; /* Adjust button width as needed */
    height: 50px;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
    background-color: #00152c; /* Add button background color */
    color: #fff; /* Change button text color */
    border-radius: 5px; /* Add border radius */
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
    @apply fixed md:top-28 top-14 md:left-52 left-0 bottom-0 w-full md:w-96 p-4 overflow-y-auto;
  }
  
  .right-content {
    margin-left: 300px; /* Adjust margin to accommodate fixed left content */
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .box1 {
    margin-top: 5%;
    margin-right: 5%;
    min-width: 500px; /* Minimum width for box1 */
    min-height: 500px; /* Minimum height for box1 */
    width: 95%; /* Adjust width as needed */
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
    margin-top: 4px;
    padding: 0 0 70px 0;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
  </style>
  