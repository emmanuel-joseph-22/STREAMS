<template>
  <home-page>
    <div class="dashboard-box">
      <header-bar>
        <h1 class="dashboard font-arial font-bold text-4xl ml-3">Dashboard</h1>
      </header-bar>
      <dashboard-content>
        <!-- highlighted data -->
        <div class="dashboard_grid">
          <div class="box1" @mouseover="stopFlashing" @mouseleave="resumeFlashing">
            <div class="box1-inner">
              <!-- idk pwede idagdag pero nagleave ako isa pang box para pantay -->
              <div class="box1-item">
                <img src="th.jfif" class="w-full h-auto">
                <!-- insert laman -->
              </div>
              <div class="box1-item">
                <p>Average Water Consumption:</p>
                <span class="text-lg font-bold">{{ averageWaterConsumption }} m3</span>
              </div>
              <div class="box1-item">
                <p>Previous Water Consumption:</p>
                <span class="text-base">
                  <template v-if="showDeepWell">
                    <p>Deep Well:</p>
                    <p class="text-lg font-bold">{{ previousWaterConsumptionDeepWell }} m3</p>
                  </template>
                  <template v-else>
                    <p>Prime Water:</p>
                    <p class="text-lg font-bold">{{ previousWaterConsumptionPrimeWater }} m3</p>
                  </template>
                </span>
              </div>
              <div class="box1-item">
                <p>Current Water Consumption:</p>
                <span class="text-base">
                  <template v-if="showDeepWell">
                    <p>Deep Well:</p>
                    <p class="text-lg font-bold">{{ currentWaterConsumptionDeepWell }} m3</p>
                  </template>
                  <template v-else>
                    <p>Prime Water:</p>
                    <p class="text-lg font-bold">{{ currentWaterConsumptionPrimeWater }} m3</p>
                  </template>
                </span>
              </div>
            </div>
          </div>
          <!-- filter option -->
          <div class="filter_toggle">[filter]</div>
          <!-- main meter graph -->
          <v-chart class="box2 data_pattern" :option="consumption_chart"/>
          <div v-if="selectedGraph === 'mainMeter'" class="box3">
            <v-chart class="mainmeter data_pattern" :option="pie_main_meter" />
            <!-- navigation buttons -->
            <div class="navigation-buttons">
              <button class="arrow-button" @click="navigate('left')">◄</button>
              <button class="arrow-button" @click="navigate('right')">►</button>
            </div>
          </div>
          <div v-else-if="selectedGraph === 'subMeter'" class="box3">
            <v-chart class="submeter data_pattern" :option="submeter_graph" />
            <!-- navigation buttons -->
            <div class="navigation-buttons">
              <button class="arrow-button" @click="navigate('left')">◄</button>
              <button class="arrow-button" @click="navigate('right')">►</button>
            </div>
          </div>
          <!-- specific reading details -->
          <div class="box5">
            <h3 class="font-bold text-3xl">Records</h3>
            <div class="field-container">
              <select class="field">
                <option value="PW" class="dept_option">Prime Water</option>
                <option value="DW1" class="dept_option">Deep well 1</option>
                <option value="DW2" class="dept_option">Deep well 2</option>
                <option value="DW3" class="dept_option">Deep well 3</option>
                <option value="DW4" class="dept_option">Deep well 4</option>
              </select>
              <!-- record - date -->
              <input class="field" type="date"/>
            </div>
            <br/>
            <!-- record details -->
            <div class="record_details">
              <div>Date: {{ date }}</div>
              <div>Time: {{ time }}</div>
              <div>m3: {{ meter }}</div>
            </div>
          </div>
          <!-- quarterly box -->
          <div class="box6">
            <div class="quarterly-box">
              <h3 class="font-bold text-3xl">Quarterly</h3>
            </div>
          </div>
        </div>
      </dashboard-content>
    </div>
  </home-page>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent 
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  BarChart,
  GridComponent
]);

provide(THEME_KEY, "white");
//main meter graph
const pie_main_meter = ref({
  title: {
    text: "Main Meters",
    left: "center"
  },
  tooltip: {
    trigger: "item",
    // idk pa ano toh
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Prime Water", "Deep Well 1", "Deep Well 2", "Deep Well 3", "Deep Well 4"]
  },
  series: [
    {
      name: "Sources: Main Meters",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 735, name: "Prime Water" },
        { value: 510, name: "Deep Well 1" },
        { value: 334, name: "Deep Well 2" },
        { value: 135, name: "Deep Well 3" },
        { value: 20, name: "Deep Well 4" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
});
//line chart ni consumption
const consumption_chart = ref({
  title: {
    text: 'Daily Water Consumption',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: [{
    type: 'category',
    data: ['4', '5', '6', '7', '8', '9', '10', '11', '12', '15', '16', '17']
  }],
  yAxis: {
    type: 'value'
  },
  series: [{
    name: 'Data',
    type: 'line',
    data: [ 0, 119, 24, 24, 33, 50, 23, 12, 125, 90, 40, 55, 11,]
    }]
});
//submeter_graph
const submeter_graph = ref({
  title: {
    text: 'Submeters',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: ['FIC1', 'FIC2', 'RGR', 'CICS-DF', 'CEAFA Faculty', 'Executive Lounge', 'Canteen-DF', 'SSC']
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
  
});
// nav : main and sub meters
const selectedGraph = ref('mainMeter');

const navigate = (direction) => {
  if (direction === 'left') {
    selectedGraph.value = 'mainMeter';
  } else if (direction === 'right') {
    selectedGraph.value = 'subMeter';
  }
};
 // initialize with a default value (AVG)
const averageWaterConsumption = ref(0);
averageWaterConsumption.value = 2024;
// initialize with a default value (PREV)
const previousWaterConsumption = ref(0);
previousWaterConsumption.value = 2003;
// initialize with a default value (CURR)
const currentWaterConsumption = ref(0);
currentWaterConsumption.value = 2003;

// reactive var for water consumption values sa prime at dw (PREV&CURR)
const previousWaterConsumptionDeepWell = ref(2003);
const previousWaterConsumptionPrimeWater = ref(2010);

const currentWaterConsumptionDeepWell = ref(3509);
const currentWaterConsumptionPrimeWater = ref(3097);

const showDeepWell = ref(true);
const flashing = ref(true);

const stopFlashing = () => {
  flashing.value = false;
};

const resumeFlashing = () => {
  flashing.value = true;
};
// alternate between pw and dw
setInterval(() => {
  if (flashing.value) {
    showDeepWell.value = !showDeepWell.value;
  }
}, 5000); // interval : 5s
</script>
<script>
/* eslint-disable */
import HomePageView from './HomePageView.vue';
import header from '../../components/header_component.vue';
import dashboard_content from '../../components/dashboard_content.vue';


export default {
    components: {
        'home-page': HomePageView,
        'header-bar': header,
        'dashboard-content': dashboard_content,
        'v-chart': VChart,
        'line-chart': LineChart
    },
    data(){
        return {
            date: 'April 1, 2024',
            time: '11:30 p.m.',
            meter: '10m^3'
            
        };
    },
    mounted(){
      
    }
}
</script>

<style scoped>
.dashboard-box {
  border: 1px solid black;
  box-shadow: 0 15px 15px rgba(1, 1, 1, 1);
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
  margin-left: 170px;
}

.box1-inner {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.box1-item {
  flex: 0 0 auto;
  width: calc(25% - 10px);
  height: 120px;
  margin-top: 15px;
  margin-right: 10px;
  margin-bottom: 20px;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(1, 1, 1, 1);
  transition: transform 0.3s ease;
  padding: 5px;
  background-color: rgb(193, 221, 246);
}
.box1-item:hover {
  transform: translateY(-3px);
  background-color: rgb(121, 173, 218);
  color: white;
}
.filter_toggle{
  border: 2px solid black;
  background-color: rgb(254, 255, 255);
  color: black;
  left: 0;
  width: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.box2 {
  width: 100%;
  padding: 10px;
}

.box3 {
  width: 70%;
  margin: 0 auto;
  padding: 10px;
}

.field-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 130%;
  padding: 5px;
}

.field {
  margin: 10px;
  padding: 10px;
}

.box5 {
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-left: 0;
  width: 100%;
  border: 1px solid black;
  padding: 20px;
}

.box6 { 
  width: 100%;
  height: 400px;
}

.quarterly-box{
  margin-top: 15px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
}

@media screen and (max-width: 1000px){
  .dashboard-box{
    margin-left: 0;
  }
  .box1-inner {
    flex-wrap: wrap;
    overflow-x: auto;
  }
  .box1-item {
    width: calc(50% - 10px);
    padding: 5px;
  }
  .box2 {
    width: 100%;
  }
  .box3 {
    width: 100%;
  }
  .field-container {
    width: 100%;
  }
  .field {
    width: calc(50% - 20px);
  }
  .record_details {
    width: 100%;
  }
}

.field {
  width: 30%;
  height: 50px;
  border-radius: 12px;
  border: 1px solid black;
  background-color: rgb(193, 221, 246);
  font-size: 1.1rem;
  margin-top: 20px;
}

.dept_option {
  width: 80px;
}

.record_details {
  text-align: left;
  width: 80%;
  height: 200px;
  border-radius: 12px;
  border: 1px solid black;
  background-color: white;
}

.record_details > div {
  margin: 35px;
  font-size: 1rem;
}

.arrow-button {
  color: #333;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 3px 9px;
  margin: 0 5px;
}

.arrow-button:hover {
  background-color: #e0e0e0;
  border-radius: 15px;
}

.consumption_category {
  font-weight: bold;
  font-size: 1rem;
}

.data_pattern {
  height: 400px;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  border-radius: 10px;
}
</style>
