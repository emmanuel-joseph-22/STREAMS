<template>
    <home-page>
        <header-bar>
            <h1>Dashboard bitch draft na magulo</h1>
        </header-bar>
        <main-content>
          <div class="dashboard_grid">
            <!-- highlighted data -->
            <div class="dash_container box1">
                highlight info like avg, warning, alerts
            </div>
            <!-- filter option -->
            <div class="filter_toggle"></div>
            <!-- main meter graph -->
            <div class="dash_container box2">
              <v-chart class="data_pattern" :option="pie_main_meter"/>
            </div>
            <!-- water consumption graph -->
            <div class="dash_container box3">
              <v-chart class="data_pattern" :option="consumption_chart"/>
            </div>
            <!-- submeter graph -->
            <div class="dash_container box4">
              <v-chart class="data_pattern" :option="submeter_graph"/>
            </div>
            <div class="dash_contaniner box5">
              <select class="field">
                    <option value="PW" class="dept_option">Prime Water</option>
                    <option value="DW1" class="dept_option">Deep well 1</option>
                    <option value="DW2" class="dept_option">Deep well 2</option>
                    <option value="DW3" class="dept_option">Deep well 3</option>
                    <option value="DW4" class="dept_option">Deep well 4</option>
              </select>
              <br/>
              <!-- record - date -->
              <input class="field" type="date"/>
              <br/>
              <!-- record details -->
              <div class="record_details">
                  <div>Date: {{ date }}</div>
                  <div>Time: {{ time }}</div>
                  <div>m3: {{ meter }}</div>
              </div>
            </div>
            <div class="dash_container box6">
              <!-- quarterly -->
              <h1>Quarterly</h1>
            </div>
          </div>
            
        </main-content>
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
    text: "Sources: Main Meters",
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
    text: 'Source: Submeters',
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
  
})
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
        'main-content': dashboard_content,
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
.dashboard_grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 30px;
  background-color: rgba(134, 92, 174, 0.103);
  width: 100%;
}

.dash_container{
  position: relative;
  display: flex;
  width: 100%;
  min-width: 300px;
  align-items: center;
  justify-content: center;
  background-color: rgba(114, 153, 153, 0.286);
}

.box1{
  grid-row: 1;
  grid-column: 1 / span 2;
  min-height: 120px;
}

.box2 {
  grid-row: 2 / span 1;
  grid-column: 1;
  background-color: rgb(245, 254, 254);
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 10px;
}

.box3 {
  grid-row: 2 / span 1;
  grid-column: 2;
}

.box4 {
  grid-row: 3 / span 1;
  grid-column: 1;
}
/* specific reading details */
.box5 {
  grid-row: 3 / span 1;
  grid-column: 2;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.box6{ 
  grid-row: 4;
  grid-column: 1 / span 2;
  width: 100%;
  height: 400px;
}

@media (max-width: 600px){
  .box2, .box3 {
    grid-column: auto;
  }
}
.field{
    width: 80%;
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

.record_details{
    text-align: left;
    width: 80%;
    height: 200px;
    border-radius: 12px;
    border: 1px solid black;
    background-color: white;
}
/* record details text */
.record_details > div{
    margin: 35px;
    font-size: 1rem;
}
.graph{
    text-align: left;
    width: 100%;
    height: auto;
    border-radius: 12px;
    border: 1px solid black;
    background-color: rgba(193, 221, 246, 0.541);
    padding: 10px 0;
}

</style>

<style scoped>
/*more specific anik anik*/
.consumption_category{
    font-weight: bold;
    font-size: 1rem;
    margin: 10px 0;
}
.data_pattern{
    height: 400px;
    width: 100%;
    background-color: rgb(255, 255, 255);
    /*z-index: 21;*/
}
</style>