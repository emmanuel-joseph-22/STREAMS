<template>
  <home-page>
      <header-bar>
        <h1 class="dashboard font-arial font-bold text-4xl ml-3">Dashboard</h1>
      </header-bar>
      <dashboard-content>
        <!-- highlighted data -->
        <div class="grid grid-cols-10 w-full gap-8 mt-5">
          <div class="col-span-10" @mouseover="stopFlashing" @mouseleave="resumeFlashing">
            <div class="box1-inner my-5">
              <div class="box1-item box border shadow">
                <span class="text-lg font-bold">{{ averageWaterConsumption }} m3</span>
                <p class="text-gray-400">Avg</p>
              </div>
              <div class="box1-item box border shadow">
                <span class="text-base">
                    <p class="text-lg font-bold">{{ previousWaterConsumptionPrimeWater }} m3</p>
                </span>
                <p class="text-gray-400">Prev</p>
              </div>
              <div class="box1-item box border shadow">
                <span class="text-base">
                    <p class="text-lg font-bold">{{ currentWaterConsumptionPrimeWater }} m3</p>
                </span>
                <p class="text-gray-400">Current</p>
              </div>
              <div class="box1-item box border shadow">

              </div>
            </div>
          </div>
          <!-- daily consumption chart -->
          <v-chart class="col-span-5 box border shadow-md" style="height: 400px; width: 100%;" :option="consumption_chart"/>
          <!-- filter option  
          <div class="filter_toggle">[filter]</div>-->
           <!-- main meter graph --> 
          
          <div class="col-span-3 box border shadow-md">
            <v-chart class="mainmeter" :option="pie_main_meter" v-if="selectedGraph === 'mainMeter'" style="height: 350px; width: 100%;"/>
            <v-chart class="submeter" :option="submeter_graph" v-else-if="selectedGraph === 'subMeter'" style="height: 350px; width: 100%;"/>
            <div class="navigation-buttons">
              <button class="arrow-button" @click="navigate('left')">◄</button>
              <button class="arrow-button" @click="navigate('right')">►</button>
            </div>
          </div>
          <!-- specific reading details -->
          <div class="box col-span-2 border shadow-md" style="height: 400px;">
            <h3 class="font-bold text-xl">Search Records</h3>
            <div class="flex flex-col">
              <select class="field">
                <option value="" disabled selected>Select a source</option>
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
            <div class="record_details text-lg px-3">
              <div>Date: {{ date }}</div>
              <div>Time: {{ time }}</div>
              <div>m3: {{ meter }}</div>
            </div>
          </div>
          <!-- quarterly box -->
          <div class="box col-span-4 border shadow-md" style="height: 400px;">
            <v-chart :option="quarter_chart" />
          </div>
          <div class="box col-span-6 border shadow-md mb-10" style="height: 400px;">
            <v-chart :option="twelve_month_chart" />
          </div>
        </div>
      </dashboard-content>
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
import { ref, provide, onMounted } from "vue";

import { doc, getDocs, query, collection /*getDocFromCache*/ } from "firebase/firestore";
import { firestore as db } from './../../main.js';

// water consumption 
const yAxisConsumption = ref([])
const xAxisDate = ref([])
const main_meter = ['deep-well-1', 'deep-well-2', 'deep-well-3', 'deep-well-4', 'prime-water']
const sub_meters = ['CICS-DF', 'FIC-1', 'FIC-2', 'RGR', 'SSC', 'canteen-DF', 'ceafa-faculty', 'executive-lounge']
/*
pedeng ang temp obj ay
main / sub
-> { pw: { date: 2023blabla, consumption: 232 },
     dw1: { date: 2023blabla, consumption: 232 },
     dw2: { date: 2023blabla, consumption: 232 }
    }
*/

/* Event listener for window resize
const handleResize = () => {
  twelve_month_chart.value.responsive = true;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});*/

onMounted(async () => {
    
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter');
    const collectionRef = collection(mainMeterRef, main_meter[4]);
    console.log(sub_meters)
    const consumption_query = query(collectionRef)

    try{
      const querySnapshot = await getDocs(consumption_query);
      const value_temp = []
      const date_temp = []
      querySnapshot.forEach((doc) => {
        // ni format date into text format (e.g., "April 20, 2022")
        const date = new Date(doc.id)
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' /* pede iadd ung year: 'numeric' */}).format(date);
        date_temp.push(formattedDate);
        value_temp.push(doc.data().consumption);
      });
      xAxisDate.value = date_temp;
      yAxisConsumption.value = value_temp;
      /* eto kapag whole object structure
      const newDataObject = {}
      querySnapshot.forEach((doc) => {
        // Convert the Firestore document data into an object
        newDataObject[doc.id] = doc.data();
      }); 
      dataObject.value = newDataObject;*/
    } catch (error) {
      console.error('Error getting document:', error);
    }
});

/*
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
*/
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
    data: xAxisDate
  }],
  yAxis: {
    type: 'value'
  },
  series: [{
    name: 'Data',
    type: 'bar',
    data: yAxisConsumption
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
  
});
//quarter chart
const quarter_chart = ref({
  title: {
    text: 'Q1 2024',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'March']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [36700, 52523, 33542],
      type: 'bar',
      itemStyle: {
          // Customize the color of the bars
          color: 'rgb(153, 0, 0)'
        }
    }
  ]
  
});

//quarter chart
const twelve_month_chart = ref({
  title: {
    text: 'Monthly Water Consumption',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [36700, 52523, 33542, 44444, 55984, 12345, 54652, 77897, 23455, 23323, 20989, 63464],
      type: 'line',
      itemStyle: {
            // Customize the color of the bars
        color: 'green'
      }
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
//const previousWaterConsumptionDeepWell = ref(2003);
const previousWaterConsumptionPrimeWater = ref(2010);

//const currentWaterConsumptionDeepWell = ref(3509);
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
    }
}
</script>

<style scoped>

.box1-inner {
  display: flex;
  flex-direction: row;
  width: 75%;
  margin: 20px auto;
  background-color: rgb(241, 241, 241);
}

.box1-item {
  flex: 0 0 auto;
  width: 150px;
  height: 80px;
  transition: transform 0.3s ease;
  background-color: white;
  margin: 10px auto;
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
.box{
  background-color: rgb(255, 255, 255);
  padding-top: 10px;
}

@media screen and (max-width: 1000px){
  .box1-inner {
    flex-wrap: wrap;
    overflow-x: auto;
  }
  .box1-item {
    width: calc(50% - 10px);
    padding: 5px;
  }
  .record_details {
    width: 100%;
  }
}
.record_details {
  text-align: left;
  width: 80%;
  margin: 20px auto;
  border-radius: 12px;
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
.field {
  width: 90%;
  height: 40px;
  border-radius: 12px;
  border: 1px solid black;
  background-color: rgba(193, 221, 246, 0.521);
  font-size: 1.1rem;
  margin: 10px;
  padding: 0 10px;
}
.dept_option {
  width: 100px;
}
</style>
