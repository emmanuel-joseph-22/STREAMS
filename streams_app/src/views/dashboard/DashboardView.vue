<template>
  <home-page>
      <header-bar>
        <h1 class="dashboard font-arial font-bold text-4xl ml-3">Dashboard</h1>
      </header-bar>
      <dashboard-content>
        <!-- search record -->
        <button @click="togglePopup" class="circle-button fixed bottom-16 right-5 lg:bottom-10 m-2 w-14 h-14 rounded-full bg-[#042334] border-2 border-[#36B4E7] text-white hover:bg-[#36B4E7] hover:cursor-pointer hover:text-white transition duration-300 ease-in-out font-bold flex items-center justify-center z-10">
            <img src="search-button.png" alt="Search icon" class="w-6 h-6">
        </button>
        <div v-if="showPopup" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="togglePopup"></div>
        <div v-if="showPopup" class="popup-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-white text-[#042334] rounded-md shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out md:w-1/3 w-full">
          <h2 class="text-xl font-bold mt-4">Search Record</h2>
          <div class="box">
            <div class="flex flex-col items-center mt-[20%]">
              <select v-model="search_water_source" class="field rounded-md p-2 mt-4 w-[300px] text-[#042334] border border-gray-500">
                <option value="" disabled selected>Select a source</option>
                <option value="prime_water" class="dept_option">Prime Water</option>
                <option value="deep_well_1" class="dept_option">Deep well 1</option>
                <option value="deep_well_2" class="dept_option">Deep well 2</option>
                <option value="deep_well_3" class="dept_option">Deep well 3</option>
                <option value="deep_well_4" class="dept_option">Deep well 4</option>
              </select>
              <input class="field rounded-md p-2 mt-4 w-[300px] text-[#042334] border border-gray-500" type="date" v-model="search_date"/>
              <button @click="toggleRecord" class="button-search absolute bottom-4 left-8 text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out flex items-left justify-left">Search</button>
            </div>
            <br/>
          </div>
          <button @click="togglePopup" class="btn-close absolute bottom-4 right-8 text-red-500 hover:text-red-700">Close</button>
        </div>
      <!-- display record -->
      <div v-if="showRecord" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="toggleRecord"></div>
        <div v-if="showRecord" class="popup-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-white text-[#042334] rounded-md shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out md:w-1/3 w-full">
          <h2 class="text-s text-[#0E5E7B] font-bold">Water Consumption Record</h2>
          <h2 class="text-3xl font-bold mt-14">{{ formattedwaterSource }}</h2>
          <h2 class="text-xl font-bold text-white mb-4">{{ location }}</h2>
          <div class="record_details_container flex border-2 border-[#36B4E7] rounded-lg">
            <div class="record_details text-lg mt-4" style="flex-grow: 1;">
                <div class="rec_field text-white p-2">Class: {{ classf }}</div>
                <div class="rec_field text-white p-2 mt-2">Date: {{ search_date }}</div>
                <!--<div class="rec_field text-white p-2 mb-2">Time: {{ time }}</div>-->
            </div>
            <div class="rec_field text-white p-2 w-[200px] h-[150px] m-2 bg-[#36B4E7] rounded-lg flex flex-col items-center justify-center">
                <h2 class="text-3xl font-bold">{{ meter }}</h2>
            </div>
        </div>
          <button @click="toggleRecord" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Return</button>
        </div>
        <!-- highlighted data -->
        <div class="grid grid-cols-10 w-full gap-8 mt-5">
          <div class="col-span-10 flex overflow-x-auto">
            <div class="box1-inner flex gap-4">
              <div class="box1-item box border-4 shadow border-[#36B4E7] rounded-xl w-[380px] h-[160px] flex flex-col items-center justify-center bg-[#042334] text-[#36B4E7] hover:bg-[#0E5E7B] hover:text-white transition duration-300 ease-in-out ml-2">
                <span class="text-3xl font-bold">{{ $store.state.totalAccumulated }} m<sup>3</sup></span>
                <p class="text-white mb-4">Total Accumulated</p>
                <div class="flex flex-row px-8">
                  <div class="subtitles">
                  <p :title="peakTotalDate" class="text-red-500 font-bold px-8 py-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="red" class="mr-2">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>{{ $store.state.maxTotal }}m<sup>3</sup></p>
                  </div>
                  <div class="subtitles">
                  <p :title="flopTotalDate" class="text-green-500 font-bold px-8 py-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="green" class="mr-2">
                    <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                    </svg>{{ $store.state.minTotal }}m<sup>3</sup></p>
                    <div></div>
                  </div>
                </div>
              </div>
              <div class="box1-item box border-4 shadow border-[#36B4E7] rounded-xl w-[380px] h-[160px] flex flex-col items-center justify-center bg-[#042334] text-[#36B4E7] hover:bg-[#0E5E7B] hover:text-white transition duration-300 ease-in-out">
                <span class="text-base">
                    <p class="text-3xl font-bold">{{ $store.state.q_avg }}m<sup>3</sup></p>
                </span>
                <p class="text-white mb-4">AVG Quarterly</p>
                <div class="flex flex-row px-8">
                  <div class="subtitles">
                    <p class="text-red-500 font-bold px-8 py-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="red" class="mr-2">
                      <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                      </svg>{{ $store.state.peakQrt }}m<sup>3</sup>
                    </p>
                  </div>
                  <div class="subtitles">
                    <p class="text-green-500 font-bold px-8 py-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="green" class="mr-2">
                      <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                      </svg>{{ $store.state.flopQrt }}m<sup>3</sup>
                    </p>
                  </div>
                </div>
              </div>
              <div class="box1-item box border-4 shadow border-[#36B4E7] rounded-xl w-[380px] h-[160px] flex flex-col items-center justify-center bg-[#042334] text-[#36B4E7] hover:bg-[#0E5E7B] hover:text-white transition duration-300 ease-in-out">
                <span class="text-base">
                    <p class="text-3xl font-bold">{{ $store.state.monthly_avg_value }}m<sup>3</sup></p>
                </span>
                <p class="text-white mb-4">AVG Monthly</p>
                <div class="flex flex-row px-8">
                  <div class="subtitles">
                    <p :title="peakMonthDate" class="text-red-500 font-bold px-8 py-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="red" class="mr-2">
                      <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                      </svg>{{$store.state.maxOfCurrentMonth}}m<sup>3</sup>
                    </p>
                  </div>
                  <div class="subtitles">
                    <p :title="flopMonthDate" class="text-green-500 font-bold px-8 py-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="green" class="mr-2">
                      <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                      </svg>{{$store.state.minOfCurrentMonth}}m<sup>3</sup>
                    </p>
                  </div>
                </div>
              </div>
              <div class="box1-item box border-4 shadow border-[#36B4E7] rounded-xl w-[380px] h-[160px] flex flex-col items-center justify-center bg-[#042334] text-[#36B4E7] hover:bg-[#0E5E7B] hover:text-white transition duration-300 ease-in-out mr-2">
                <span class="text-base">
                    <p class="text-3xl font-bold">{{ $store.state.daily_avg_value }}m<sup>3</sup></p>
                </span>
                <p class="text-white mb-4">AVG Daily</p>
                <div class="flex flex-row px-8">
                  <div class="subtitles">
                    <p :title="peakSource" class="text-red-500 font-bold px-8 py-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="red" class="mr-2">
                      <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                      </svg>{{ $store.state.maxDaily }}m<sup>3</sup>
                    </p>
                  </div>
                  <div class="subtitles">
                    <p :title="flopSource" class="text-green-500 font-bold px-8 py-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="green" class="mr-2">
                      <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/>
                      </svg>{{ $store.state.minDaily }}m<sup>3</sup>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <!-- main meter graph --> 
<div id="pie_div" tabindex="0" class="col-span-10 md:col-span-4 box border shadow-md">
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
  <v-chart class="box border shadow-md" style="height: 400px;" :option="consumption_chart" @click="passDayToPie"/>
</div>
<!-- monthly box -->
<div class="col-span-10 md:col-span-6 box border shadow-md" style="height: 400px;">
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
  <v-chart id="monthly_chart" style="height: 370px;" :option="twelve_month_chart" @click="passMonthToPie"/>

  <div v-if="monthlyPopup" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="togglePopup2"></div>
  <div v-if="monthlyPopup" class="popup-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-[#042334] border-4 border-[#36B4E7] text-[#36B4E7] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out">
    <h2 class="text-xl font-bold mt-4">Monthly Record</h2>
    <button @click="togglePopup2" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Close</button>
  </div>
</div>
<!-- quarterly box -->
<div class="col-span-10 md:col-span-4 box border shadow-md" style="height: 400px; margin: 0 0 60px 0;">
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

            <v-chart id="quarter_chart" style="height: 370px;" :option="quarter_chart" @click="passQuarterToPie"/>
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

<script>
import HomePageView from './HomePageView.vue';
import header from '../../components/header_component.vue';
import dashboard_content from '../../components/dashboard_content.vue';

import { CanvasRenderer } from "echarts/renderers";
import store from "@/store";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent 
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
import { /*quarterly_consumption,*/ search_record/* getTotalAccumulated, avg_monthly, avg_daily */ } from "@/dashboard_query"; 
import formatString from "@/format";
import * as echarts from 'echarts';

echarts.use([
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
]);
provide(THEME_KEY, "white");
export default{
  components: {
    'home-page': HomePageView,
    'header-bar': header,
    'dashboard-content': dashboard_content,
    'v-chart': VChart
  },
  data(){
    return {
      isLoading: false,
    }
  },
  computed: {
    peakTotalDate(){
      return this.$store.state.maxTotalDate
    },
    flopTotalDate(){
      return this.$store.state.minTotalDate
    },
    peakMonthDate(){
      return this.$store.state.maxMonthDate
    },
    flopMonthDate(){
      return this.$store.state.minMonthDate
    }, 
    peakSource(){
      return this.$store.state.maxSource
    }, 
    flopSource(){
      return this.$store.state.minSource
    }

  },
  setup(){

    const daily_water_consumption_container = store.state.daily_values
    const monthly_water_consumption_container = store.state.monthly_values
    const quarter_container = store.state.quarterly_values
    console.log(monthly_water_consumption_container, quarter_container)
    const Daily_yAxisConsumption = ref(daily_water_consumption_container.total_consumption)
    const Daily_xAxisConsumption = daily_water_consumption_container.date    
    const monthly_yAxis = ref(monthly_water_consumption_container.total_consumption)
    const quarter_yAxis = ref(quarter_container.total_consumption)

    const daily_filter_output = ref('total_consumption')
    const monthly_filter_output = ref("total_consumption")
    const quarterly_filter_output = ref("total_consumption")

    const mainWaterSourceBreakdown = ref([                  
      { value: 0, name: "Prime Water" },
      { value: 0, name: "Deep Well 1" },
      { value: 0, name: "Deep Well 2" },
      { value: 0, name: "Deep Well 3" },
      { value: 0, name: "Deep Well 4" }])
    const pieDate = ref('bitch')


    //main meter graph
    const pie_main_meter = ref({
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
                data: mainWaterSourceBreakdown,
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
                }
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

    const pieMeterDiv = document.getElementById('pie_div')
    const focusToPie = () => {
      pieMeterDiv.focus()
    }
    // for pie graph interactivity
    // pang main meters palang
    const passDayToPie = (params) => {
      const dateString = params.name;
      //console.log(dateString)

      const index = daily_water_consumption_container.date.indexOf(dateString)
      const dataSet = [{ value: daily_water_consumption_container.prime_water[index], name: "Prime Water" },
                  { value: daily_water_consumption_container.deep_well_1[index], name: "Deep Well 1" },
                  { value: daily_water_consumption_container.deep_well_2[index], name: "Deep Well 2" },
                  { value: daily_water_consumption_container.deep_well_3[index], name: "Deep Well 3" },
                  { value: daily_water_consumption_container.deep_well_4[index], name: "Deep Well 4" }]
      //console.log(dataSet)
      mainWaterSourceBreakdown.value = dataSet
      pieDate.value = dateString.toString()
      
    }
    const passMonthToPie = (params) => {
      const month = params.name;
      //console.log(month)
      const month_index = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Nov', 'Dec']
      const index = month_index.indexOf(month)
      //console.log(index)
      const dataSet = [{ value: monthly_water_consumption_container.prime_water[index], name: "Prime Water" },
                  { value: monthly_water_consumption_container.deep_well_1[index], name: "Deep Well 1" },
                  { value: monthly_water_consumption_container.deep_well_2[index], name: "Deep Well 2" },
                  { value: monthly_water_consumption_container.deep_well_3[index], name: "Deep Well 3" },
                  { value: monthly_water_consumption_container.deep_well_4[index], name: "Deep Well 4" }]
      //console.log(dataSet)
      mainWaterSourceBreakdown.value = dataSet
      pieDate.value = month.toString()
    }
    const passQuarterToPie = (params) => {
      const dateString = params.name;
      //console.log(dateString)
      const quarter_index = ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']
      const index = quarter_index.indexOf(dateString)
      const dataSet = [{ value: quarter_container.prime_water[index], name: "Prime Water" },
                  { value: quarter_container.deep_well_1[index], name: "Deep Well 1" },
                  { value: quarter_container.deep_well_2[index], name: "Deep Well 2" },
                  { value: quarter_container.deep_well_3[index], name: "Deep Well 3" },
                  { value: quarter_container.deep_well_4[index], name: "Deep Well 4" }]
      //console.log(dataSet)
      mainWaterSourceBreakdown.value = dataSet
      pieDate.value = dateString.toString()
    }

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
    // data for search record
    // initialized as today kase tinatamad ako mag error handling lmao
    const search_date = ref(`${ new Date().toISOString().slice(0, 10) }`)
    // const time = ref("")
    const meter = ref("")
    const search_water_source = ref("")
    const formattedwaterSource = ref("")
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
      formattedwaterSource.value = formatString(search_water_source.value)
      if(record == 0){
        meter.value = 'no reading'
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
      Daily_yAxisConsumption.value = daily_water_consumption_container[daily_filter_output.value];
    }
    const monthly_filter = () => {
      monthly_yAxis.value = monthly_water_consumption_container[monthly_filter_output.value];
    }
    const quarterly_filter = () => {
      quarter_yAxis.value = quarter_container[quarterly_filter_output.value];
    }

    return {
      pie_main_meter,
      submeter_graph,
      consumption_chart,
      twelve_month_chart,
      quarter_chart,
      location,
      classf,
      navigate,
      togglePopup,
      toggleRecord,
      togglePopup1,
      togglePopup2,
      daily_filter,
      monthly_filter,
      quarterly_filter,
      daily_filter_output,
      monthly_filter_output,
      quarterly_filter_output,
      passDayToPie,
      selectedGraph,
      pieDate,
      passMonthToPie,
      passQuarterToPie,
      focusToPie,

      search_date,
      meter,
      search_water_source,
      formattedwaterSource,
      showPopup,
      showRecord,
      quarPopup,
      monthlyPopup
    }
  }
}
  
</script>


<style scoped>
input:focus, textarea:focus, select:focus {
  border-color: transparent;
  outline: none;
}
.subtitles{
  line-height: 0.4;
  cursor: pointer;
}
</style>
