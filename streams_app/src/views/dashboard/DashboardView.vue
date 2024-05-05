<template>
  <home-page>
      <header-bar>
        <h1 class="dashboard font-arial font-bold text-4xl ml-3">Dashboard</h1>
      </header-bar>
      <loaderSpinner v-if="isLoading" />
      <dashboard-content v-else>
<!-- search record -->
        <button @click="togglePopup" class="circle-button fixed bottom-10 right-5 m-2 w-14 h-14 rounded-full bg-[#042334] border-2 border-[#36B4E7] text-white hover:bg-[#36B4E7] hover:cursor-pointer hover:text-white transition duration-300 ease-in-out font-bold flex items-center justify-center z-10">
            <img src="search-button.png" alt="Search icon" class="w-6 h-6">
        </button>
        <div v-if="showPopup" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="togglePopup"></div>
        <div v-if="showPopup" class="popup-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-[#042334] border-4 border-[#36B4E7] text-[#36B4E7] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out md:w-1/3 w-full">
          <h2 class="text-xl font-bold mt-4">Search Record</h2>
          <div class="box">
            <div class="flex flex-col items-center mt-[20%]">
              <select v-model="search_water_source" class="field rounded-md p-2 mt-4 w-[300px] text-[#042334]">
                <option value="" disabled selected>Select a source</option>
                <option value="prime_water" class="dept_option">Prime Water</option>
                <option value="deep_well_1" class="dept_option">Deep well 1</option>
                <option value="deep_well_2" class="dept_option">Deep well 2</option>
                <option value="deep_well_3" class="dept_option">Deep well 3</option>
                <option value="deep_well_4" class="dept_option">Deep well 4</option>
              </select>
              <input class="field rounded-md p-2 mt-4 w-[300px] text-[#042334]" type="date" v-model="search_date"/>
              <button @click="toggleRecord" class="button-search absolute m-2 bottom-12 w-24 h-14 m-5 rounded-full bg-[#042334] border-2 border-[#36B4E7] text-white hover:bg-[#36B4E7] hover:text-white transition duration-300 ease-in-out font-bold flex items-center justify-center">Search</button>
            </div>
            <br/>
          </div>
          <button @click="togglePopup" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Close</button>
        </div>
<!-- display record -->
      <div v-if="showRecord" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="toggleRecord"></div>
        <div v-if="showRecord" class="popup-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-[#042334] border-4 border-[#36B4E7] text-[#36B4E7] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out md:w-1/3 w-full">
          <h2 class="text-s text-[#0E5E7B] font-bold">Water Consumption Record</h2>
          <h2 class="text-3xl font-bold mt-14">{{ search_water_source }}</h2>
          <h2 class="text-xl font-bold text-white mb-4">{{ location }}</h2>
          <div class="record_details_container flex border-2 border-[#36B4E7] rounded-lg">
            <div class="record_details text-lg mt-4" style="flex-grow: 1;">
                <div class="rec_field text-white p-2">Class: {{ classf }}</div>
                <div class="rec_field text-white p-2 mt-2">Date: {{ search_date }}</div>
                <div class="rec_field text-white p-2 mb-2">Time: {{ time }}</div>
            </div>
            <div class="rec_field text-white p-2 w-[200px] h-[150px] m-2 bg-[#36B4E7] rounded-lg flex flex-col items-center justify-center">
                <h2 class="text-3xl font-bold">{{ meter }}</h2>
                <p>Cubic Meters</p>
            </div>
        </div>
          <button @click="toggleRecord" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Return</button>
        </div>
<!-- highlighted data -->
        <div class="grid grid-cols-10 w-full gap-8 mt-5">
          <div class="col-span-10 flex overflow-x-auto">
            <div class="box1-inner flex gap-4">
              <div class="box1-item box border-4 shadow border-[#36B4E7] rounded-xl w-[380px] h-[150px] flex flex-col items-center justify-center bg-[#042334] text-[#36B4E7] hover:bg-[#0E5E7B] hover:text-white transition duration-300 ease-in-out">
                <span class="text-3xl font-bold">{{ $store.state.totalAccumulated }} m<sup>3</sup></span>
                <p class="text-white">Total Accumulated</p>
                <div class="flex flex-row px-8">
                  <p class="text-red-500 font-bold px-8 py-2 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="red" class="">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>20234</p>
                  <p class="text-green-500 font-bold px-8 py-2 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="green" class="">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>15907</p>
                </div>
              </div>
              <div class="box1-item box border-4 shadow border-[#36B4E7] rounded-xl w-[380px] h-[150px] flex flex-col items-center justify-center bg-[#042334] text-[#36B4E7] hover:bg-[#0E5E7B] hover:text-white transition duration-300 ease-in-out">
                <span class="text-base">
                    <p class="text-3xl font-bold">{{ avgQuarterly }} m<sup>3</sup></p>
                </span>
                <p class="text-white">AVG Quarterly</p>
                <div class="flex flex-row px-8">
                  <p class="text-red-500 font-bold px-8 py-2 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="red" class="">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>20234</p>
                  <p class="text-green-500 font-bold px-8 py-2 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="green" class="">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>15907</p>
                </div>
              </div>
              <div class="box1-item box border-4 shadow border-[#36B4E7] rounded-xl w-[380px] h-[150px] flex flex-col items-center justify-center bg-[#042334] text-[#36B4E7] hover:bg-[#0E5E7B] hover:text-white transition duration-300 ease-in-out">
                <span class="text-base">
                    <p class="text-3xl font-bold">{{ $store.state.monthly_avg_value }} m<sup>3</sup></p>
                </span>
                <p class="text-white">AVG Monthly</p>
                <div class="flex flex-row px-8">
                  <p class="text-red-500 font-bold px-8 py-2 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="red" class="">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>20234</p>
                  <p class="text-green-500 font-bold px-8 py-2 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="green" class="">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>15907</p>
                </div>
              </div>
              <div class="box1-item box border-4 shadow border-[#36B4E7] rounded-xl w-[380px] h-[150px] flex flex-col items-center justify-center bg-[#042334] text-[#36B4E7] hover:bg-[#0E5E7B] hover:text-white transition duration-300 ease-in-out">
                <span class="text-base">
                    <p class="text-3xl font-bold">{{ $store.state.daily_avg_value }} m<sup>3</sup></p>
                </span>
                <p class="text-white">AVG Daily</p>
                <div class="flex flex-row px-8">
                  <p class="text-red-500 font-bold px-8 py-2 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="red" class="">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>20234</p>
                  <p class="text-green-500 font-bold px-8 py-2 flex flex-row"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="green" class="">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>15907</p>
                </div>
              </div>
            </div>
          </div> 
          <!-- main meter graph --> 
<div class="col-span-10 md:col-span-4 box border shadow-md">
  <div class="filter-button flex justify-end md:mr-4">
    <select class="filter rounded-md p-2 w-full md:w-20 text-[#042334] hover:text-[#36B4E7] transition duration-300 ease-in-out font-bold">
      <option value="" disabled selected>Filter</option>
      <option class="dept_option text-[#042334]">Latest</option>
      <option class="dept_option text-[#042334]">Last ...</option>
      <option class="dept_option text-[#042334]">Last ...</option>
    </select>
  </div>
  <v-chart class="mainmeter" :option="pie_main_meter" v-if="selectedGraph === 'mainMeter'" style="height: 350px;"/>
  <v-chart class="submeter" :option="submeter_graph" v-else-if="selectedGraph === 'subMeter'" style="height: 350px;"/>
  <div class="navigation-buttons">
    <button class="arrow-button px-12" @click="navigate('left')">◄</button>
    <button class="arrow-button px-12" @click="navigate('right')">►</button>
  </div>
</div>

<!-- daily consumption chart -->
<div class="col-span-10 md:col-span-6 box border shadow-md">
  <div class="filter-button flex justify-end md:mr-4">
    <select v-model="daily_filter_output" @change="daily_filter" class="filter rounded-md p-2 w-full md:w-20 text-[#042334] hover:text-[#36B4E7] transition duration-300 ease-in-out font-bold">
      <option value="total_consumption" selected class="dept_option text-[#042334]">Total Consumption</option>
      <option value="prime_water" class="dept_option text-[#042334]">Prime Water</option>
      <option value="deep_well_1" class="dept_option text-[#042334]">Deep Well 1</option>
      <option value="deep_well_2" class="dept_option text-[#042334]">Deep Well 2</option>
      <option value="deep_well_3" class="dept_option text-[#042334]">Deep Well 3</option>
      <option value="deep_well_4" class="dept_option text-[#042334]">Deep Well 4</option>
    </select>
  </div>
  <v-chart class="box border shadow-md" style="height: 400px;" :option="consumption_chart"/>
</div>

<!-- monthly box -->
<div class="col-span-10 md:col-span-6 box border shadow-md mb-10" style="height: 400px;">
  <div class="filter-button flex justify-end md:mr-4">
    <select v-model="monthly_filter_output" @change="monthly_filter" class="filter rounded-md p-2 w-full md:w-20 text-[#042334] hover:text-[#36B4E7] transition duration-300 ease-in-out font-bold">
      <option value="total_consumption" selected class="dept_option text-[#042334]">Total Consumption</option>
      <option value="prime_water" class="dept_option text-[#042334]">Prime Water</option>
      <option value="deep_well_1" class="dept_option text-[#042334]">Deep Well 1</option>
      <option value="deep_well_2" class="dept_option text-[#042334]">Deep Well 2</option>
      <option value="deep_well_3" class="dept_option text-[#042334]">Deep Well 3</option>
      <option value="deep_well_4" class="dept_option text-[#042334]">Deep Well 4</option>
    </select>
  </div>
  <v-chart style="height: 370px;" :option="twelve_month_chart" @click="togglePopup2"/>

  <div v-if="monthlyPopup" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="togglePopup2"></div>
  <div v-if="monthlyPopup" class="popup-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-[#042334] border-4 border-[#36B4E7] text-[#36B4E7] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out">
    <h2 class="text-xl font-bold mt-4">Monthly Record</h2>
    <button @click="togglePopup2" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Close</button>
  </div>
</div>

<!-- quarterly box -->
<div class="col-span-10 md:col-span-4 box border shadow-md" style="height: 400px;">
  <div class="filter-button flex justify-end md:mr-4">
    <select v-model="quarterly_filter_output" @change="quarterly_filter" class="filter rounded-md p-2 w-full md:w-20 text-[#042334] hover:text-[#36B4E7] transition duration-300 ease-in-out font-bold">
      <option value="total_consumption" selected class="dept_option text-[#042334]">Total Consumption</option>
      <option value="prime_water" class="dept_option text-[#042334]">Prime Water</option>
      <option value="deep_well_1" class="dept_option text-[#042334]">Deep Well 1</option>
      <option value="deep_well_2" class="dept_option text-[#042334]">Deep Well 2</option>
      <option value="deep_well_3" class="dept_option text-[#042334]">Deep Well 3</option>
      <option value="deep_well_4" class="dept_option text-[#042334]">Deep Well 4</option>
    </select>
  </div>
  <!-- Add your quarterly chart here -->

            <v-chart style="height: 370px;" :option="quarter_chart" @click="togglePopup1"/>
            <!-- pop up-->
            <div v-if="quarPopup" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="togglePopup1"></div>
            <div v-if="quarPopup" class="popup-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-[#042334] border-4 border-[#36B4E7] text-[#36B4E7] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out">
              <h2 class="text-xl font-bold mt-4">Quarterly Record</h2>
              <button @click="togglePopup1" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Close</button>
            </div>
          </div>

        </div>
      </dashboard-content>
  </home-page>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import store from "@/store";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent 
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onMounted } from "vue";
import { quarterly_consumption, search_record,/* getTotalAccumulated, avg_monthly, avg_daily */ } from "@/dashboard_query"; 
use([
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
]);

// daily water consumption
const Daily_yAxisConsumption = ref([])
const Daily_xAxisConsumption = ref([])
const daily_filter_output = ref("")

const monthly_filter_output = ref("")
const monthly_yAxis = ref([])

const quarterly_filter_output = ref("")
const quarter_yAxis = ref([])
const daily_water_consumption_container = ref({})
const monthly_water_consumption_container = ref({})
const quarter_container = ref({
  'deep_well_1': [], 
  'deep_well_2': [],
  'deep_well_3': [],
  'deep_well_4': [],
  'prime_water': [],
  'total_consumption': []
})

provide(THEME_KEY, "white");
//main meter graph
const pie_main_meter = ref( {
        title: {
          text: "Main Meters",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          // format including percentage
          formatter: "{a} <br/>{b} : {c} m3 ({d}%)"
        },
        legend: {
          top: '7%',
          left: "center",
          //data: main_meter
        },

        series: [
          {
            name: "Source",
            type: "pie",
            top: '12%',
            radius: ["30%", "70%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: [
              { value: 735, name: "Prime Water" },
              { value: 510, name: "Deep Well 1" },
              { value: 334, name: "Deep Well 2" },
              { value: 135, name: "Deep Well 3" },
              { value: 20, name: "Deep Well 4" }
            ],
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            label: {
              show: false,
              position: 'center'
            },
          }
        ]
});
//submeter graph
const submeter_graph = ref({
        title: {
          text: "Submeters",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          // format including percentage
          formatter: "{a} <br/>{b} : {c} m3 ({d}%)"
        },
        legend: {
          top: '7%',
          left: "center",
          //data: main_meter
        },

        series: [
          {
            name: "Source",
            type: "pie",
            top: '12%',
            radius: ["30%", "70%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: [
              { value: 73, name: "FIC-FOOD INNOVATION 1" },
              { value: 57, name: "FIC-FOOD INNOVATION 2" },
              { value: 34, name: "RGR" },
              { value: 32, name: "CANTEEN DRINKING FOUNTAIN" },
              { value: 20, name: "CANTEEN DRINKING FOUNTAIN" },
              { value: 45, name: "EXECUTIVE LOUNGE" },
              { value: 31, name: "CEAFA FACULTY ROOM" },
              { value: 55, name: "CICS DRINKING FOUNTAIN" },
              { value: 19, name: "SSC" }
            ],
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            label: {
              show: false,
              position: 'center'
            },
          }
        ]
});
// daily water consumption
const consumption_chart = ref( {
        title: {
          text: 'Daily Water Consumption',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            return params[0].name + '<br/>' + params[0].seriesName + ': ' + params[0].value + ' m3';
          }
        },
        xAxis: [{
          type: 'category',
          data: Daily_xAxisConsumption,
          name: 'Date',
          nameLocation: 'center', 
          nameTextStyle: {
            fontWeight: 'bold' 
          },
            nameGap: 35,
        }],
        yAxis: {
          type: 'value',
          name: 'Cubic Meter (m3)',
          nameLocation: 'center', 
          nameTextStyle: {
            fontWeight: 'bold',
          },
            nameGap: 35, 
        },
        series: [{
          name: 'Data',
          type: 'bar',
          data: Daily_yAxisConsumption
          }]
});
//monthly chart
const twelve_month_chart = ref({
        title: {
          text: 'Monthly Water Consumption',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            return params[0].name + '<br/>' + params[0].seriesName + ': ' + params[0].value + ' m3';
          }
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          name: 'Months',
          nameLocation: 'center', 
          nameTextStyle: {
            fontWeight: 'bold' 
          },
            nameGap: 35,
        },
        yAxis: {
          type: 'value',
          name: 'Cubic Meter (m3)',
          nameLocation: 'center', 
          nameTextStyle: {
            fontWeight: 'bold' 
          },
            nameGap: 35,
        },
        series: [
          {
            name: 'Data',
            data: monthly_yAxis,
            type: 'bar',
          }
        ]
});
//quarter chart
const quarter_chart = ref({
        title: {
          text: 'Quarterly Water Consumption',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            return params[0].name + '<br/>' + params[0].seriesName + ': ' + params[0].value + ' m3';
          }
        },
        xAxis: {
          type: 'category',
          data: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
          name: 'Quarters',
          nameLocation: 'center', 
          nameTextStyle: {
            fontWeight: 'bold' 
          },
            nameGap: 35,
        },
        yAxis: {
          type: 'value',
          name: 'Cubic Meter (m3)',
          nameLocation: 'center', 
          nameTextStyle: {
            fontWeight: 'bold' 
          },
            nameGap: 35,
        },
        series: [
          {
            name: 'Data',
            data: quarter_yAxis,
            type: 'bar',
          }
        ]
});
onMounted(async () => {
    try{
      console.log('asa dashboard')

      daily_water_consumption_container.value = store.state.daily_values
      monthly_water_consumption_container.value = store.state.monthly_values
      //eslint-disable-next-line  
      monthly_yAxis.value = monthly_water_consumption_container.value.total_consumption;
        // eslint-disable-next-line
      Daily_yAxisConsumption.value = daily_water_consumption_container.value.total_consumption;
        // eslint-disable-next-line
        Daily_xAxisConsumption.value = daily_water_consumption_container.value.date
      await quarterly_consumption(monthly_water_consumption_container, quarter_container)  
      quarter_yAxis.value = quarter_container.value.total_consumption;
        console.log(daily_water_consumption_container)
        console.log(monthly_water_consumption_container);
    } catch (error) {
      console.error('Error getting document:', error);
    }
});


/*
consumption_chart.value.on('click', 'series', function (params) {
  // Access the data related to the clicked bar
  const dataIndex = params.dataIndex;
  const seriesIndex = params.seriesIndex;
  const value = params.value;
  const name = params.name;
  console.log('Bar clicked:', name, 'with value:', value)
})*/

//consumption_chart.on('click', 'series', handleBarClick);


//submeter_graph
/*const submeter_graph = ref({
  title: {
    text: 'Submeters',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: sub_meters
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [18.5606, 12.4779, 259.8951, 1.1255, 1.149901, 29.6338, 6.242, 122.9587],
      type: 'bar'
    }
  ]
  
});*/



// nav : main and sub meters
const selectedGraph = ref('mainMeter');

const navigate = (direction) => {
  if (direction === 'left') {
    selectedGraph.value = 'mainMeter';
  } else if (direction === 'right') {
    selectedGraph.value = 'subMeter';
  }
};

 // initialize with a default value (Highlights)
//const totalAccumulated = ref();

const avgQuarterly = ref(0);
avgQuarterly.value = 23;
// data for search record
const search_date = ref("")
const time = ref("")
const meter = ref("")
const search_water_source = ref("")
const location = ref("")
const classf = ref("Main")

//popup
const showPopup = ref(false);

const togglePopup = () => {
    showPopup.value = !showPopup.value;
};

const showRecord = ref(false);
const toggleRecord = async () => {
  const record = await search_record(search_date.value, search_water_source.value)
  if(record == 0){
    meter.value = "no reading"
  } else {
    meter.value = record;
  }
  //format date into formal structure
  const dateString = new Date(search_date.value)
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(dateString);
  search_date.value = formattedDate
  showRecord.value = !showRecord.value;
};

const quarPopup = ref(false);

const togglePopup1 = () => {
  quarPopup.value = !quarPopup.value;
}

const monthlyPopup = ref(false);

const togglePopup2 = () => {
  monthlyPopup.value = !monthlyPopup.value;
}

const daily_filter = () => {
  Daily_yAxisConsumption.value = daily_water_consumption_container.value[daily_filter_output.value];
}
const monthly_filter = () => {
  monthly_yAxis.value = monthly_water_consumption_container.value[monthly_filter_output.value];
}
const quarterly_filter = () => {
  quarter_yAxis.value = quarter_container.value[quarterly_filter_output.value];
}
</script>
<script>
/* eslint-disable */
import HomePageView from './HomePageView.vue';
import header from '../../components/header_component.vue';
import dashboard_content from '../../components/dashboard_content.vue';
import loaderSpinner from './../../components/loaderSpinner.vue';

export default {
    components: {
        'home-page': HomePageView,
        'header-bar': header,
        'dashboard-content': dashboard_content,
        'v-chart': VChart
    },
    data(){
      return {
        isLoading: false
      }
    },
}
</script>

<style scoped>

</style>
