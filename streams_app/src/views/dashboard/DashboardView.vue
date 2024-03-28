<template>
    <home-page>
        <header-bar>
            <h1>Dashboard bitch draft na magulo</h1>
        </header-bar>
        <main-content>
            <!-- bldg department filter -->
            <div class="dash_container">
                <select class="field">
                    <option value="CM1" class="dept_option">Water Meter (CM1)</option>
                    <option value="DW1" class="dept_option">Deep well 1</option>
                    <option value="DW2" class="dept_option">Deep well 2</option>
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
            <div class="dash_container">
                <!-- graph -->
                <div class="graph">
                    <div>Water Consumption (m^3)</div>
                    <div class="consumption_category" ref="lineChart">
                        <div>Daily Water Consumption</div>
                        <v-chart class="data_pattern" :options="option"/>
                    </div>
                    <div class="consumption_category">
                        <div>Yearly</div>
                        <v-chart class="data_pattern" :options="option"/>
                    </div>
                </div>
            </div>

        </main-content>
    </home-page>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts"; // Import LineChart instead of PieChart
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  LineChart, // Use LineChart instead of PieChart
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

provide(THEME_KEY, "dark");

const option = ref({
  title: {
    text: "Sample Line Chart",
    left: "center"
  },
  tooltip: {
    trigger: "axis", // Change trigger to "axis" for line chart
    formatter: "{a} <br/>{b} : {c}" // Adjust formatter if needed
  },
  legend: {
    data: ["Sample Data"] // Modify legend data if needed
  },
  xAxis: {
    type: "category", // Define x-axis type
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] // Example x-axis data
  },
  yAxis: {
    type: "value" // Define y-axis type
  },
  series: [
    {
      name: "Sample Data",
      type: "line", // Change chart type to "line"
      data: [150, 230, 224, 218, 135, 147, 260], // Example data for the line chart
      smooth: true, // Make the line smooth if needed
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
        'v-chart': VChart
    },
    data(){
        return {
            date: 'April 1, 2024',
            time: '11:30 p.m.',
            meter: '10m^3',
        };
    },
    mounted(){
    
    }
}
</script>

<style scoped>
.dash_container{
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    align-items: center;
    margin: 40px 0 0 0;
}

.field{
    width: 80%;
    height: 50px;
    border-radius: 12px;
    border: 1px solid black;
    background-color: rgb(193, 221, 246);
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.dept_option {
    height: 50px;
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
    width: 100%;
    height: 400px;
    background-color: rgb(211, 221, 245);
    z-index: 21;
}
</style>