<template>
    <main-content>
       <header_bar>
            <h1 class="text-4xl text-left text-bsu-light-blue font-semibold ml-3 mt-1">Reading</h1>
        </header_bar>
        <confirm_pop_up @confirmEvent="confirm_window" v-if="stage_reading">
            This will record water reading in the database!
        </confirm_pop_up>  

        <div class="reading bg-bsu-blue flex justify-center items-center h-screen">
                <div class="content flex-1 p-2 mb-auto mt-12 mx-7 overflow-y-auto w-full">
                    <!--INI COMMENT KO MUNA TO HA PARA MAKITA KO-->
                    <!--<div class="main">
                        <label for="date" >Date</label>
                        <input id="date"  type="date" class="date_field" v-model="temp_date"/>
                    </div>-->
                    <div class="main" v-if="mainmeter">
                        <label for="main" class="main-label font-bold block mt-12 my-2.5 text-justify whitespace-nowrap"><b class="text-bsu-borders font-bold text-lg">Water Source</b></label>
                        <select id="main" class="main-dropdown p-2.5 h-14 text-base rounded-xl border-solid border-4 border-bsu-borders text-bsu-borders box-border rounded w-full" v-model="WaterSource">
                            <option value="deep-well-1">Deep Well 1</option>
                            <option value="deep-well-2">Deep Well 2</option>
                            <option value="deep-well-3">Deep Well 3</option>
                            <option value="deep-well-4">Deep Well 4</option>
                            <option value="prime-water">Prime Water</option>
                            <option value="fic-1">FIC 1</option>
                            <option value="fic-2"> FIC 2</option>
                            <option value="canteen-drinking-fountain">CANTEEN DRINKING FOUNTAIN</option>
                            <option value="exec-lounge">EXECUTIVE LOUNGE</option>
                            <option value="ceafa-faculty">CEAFA FACULTY ROOM</option>
                            <option value="rgr">RGR</option>
                            <option value="cics-drinking-fountain">CICS DRINKING FOUNTAIN</option>
                            <option value="ssc">SSC</option>
                        </select>
                    </div>
                    <!--
                    <div class="main">
                        <label for="date" >Date</label>
                        <input id="date"  type="date" class="date_field" v-model="temp_date"/>
                    </div>-->
                    <div class="m3-cont flex flex-col flex-start w-auto h-14 mb-4 mt-4 t-7 mr-3">
                        <label for="input_cubic" class="m3-label mr-2.5 font-bold"></label>
                        <input autofocus id="input_cubic" type="tel" required placeholder="m3: " class="flex-1 p-2.5 border-solid border-4 border-bsu-borders rounded-xl rounded text-base text-blue-900 box-border outline-none w-full" v-model="Consumption"/>
                    </div>

                    <div class="m3-cont-x  m3-cont flex flex-col flex-start w-auto h-14 mb-4 mt-4 t-7 mr-3">
                        <label for="input_x" class="x-label mr-2.5 font-bold"></label>
                        <input autofocus id="input_x" type="tel" name="x" required placeholder="x0.001 " class="flex-1 p-2.5 border-solid border-4 border-bsu-borders rounded-xl rounded text-base text-blue-900 box-border outline-none w-full" v-model="input_x"/>
                    </div>

                    <div class="m3-cont-x0  m3-cont flex flex-col flex-start w-auto h-14 mb-4 mt-4 t-7 mr-3">
                        <label for="input_x0" class="x0-label mr-2.5 font-bold"></label>
                        <input autofocus id="input_x0" type="tel" name="x0" required placeholder="x0.0001 " class="flex-1 p-2.5 border-solid border-4 border-bsu-borders rounded-xl rounded text-base text-blue-900 box-border outline-none w-full" v-model="input_x0"/>
                    </div>
                    <!--<div class="submit">
                        <button @click="stage_reading=true">SUBMIT</button>
                    </div>-->
                    <div class="body mt-4" @click="stage_reading=true">
                        <a href="#">
                            <span >SUBMIT</span>
                            <div class="wave"></div>
                        </a>
                    </div>
                </div>
        </div>
    </main-content>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { firestore as db } from './../../main.js';
import header_component from "../../components/header_component.vue";
import HomePageView from "./../dashboard/HomePageView.vue";
import confirmation_view from "./../../components/confirmation_view.vue";

export default {
    components: {
        'header_bar': header_component,
        'main-content': HomePageView,
        'confirm_pop_up': confirmation_view
    },  
    data() {
        return {
            WaterSource: '',
            BuildingDepartment: '',
            Consumption: '',
            input_x: '',
            input_x0: '',
            mainmeter: true,
            stage_reading: false,
        };
    },    
    methods: {
        confirm_window(value){
            console.log("Confirmed value:", value);
            // Call submit function or perform other actions based on the confirmed value
            if (value) {
                this.submitForm();
            } else {
                console.log("Submit cancelled")
            }
            this.WaterSource = '';
            this.BuildingDepartment = '';
            this.Consumption = '';
            this.input_x = '';
            this.input_x0 = '';
            this.stage_reading = false;
        },
        async submitForm() {
            const waterSource = this.WaterSource;
            const buildingDepartment = this.BuildingDepartment;
            const consumption = this.Consumption;
            const currentDate = new Date().toISOString();
            let path;
            
            // Construct the data object
            const data = {
                date: currentDate,
                consumption: consumption,
                buildingDepartment: buildingDepartment,
                input_x: this.input_x,
                input_x0: this.input_x0
            };
            
            try {
                
                if(waterSource === 'prime-water' || 
                waterSource === 'deep-well-1' || 
                waterSource === 'deep-well-2' || 
                waterSource === 'deep-well-3' || 
                waterSource === 'deep-well-4')
                {
                    path = `meter_records/main_meter/${waterSource}`
                } else {
                    path = `meter_records/submeter/${waterSource}`
                }
                await addDoc(collection(db, path), data);
                console.log('submitted successfully')
            } catch(error) {
                console.error("Error storing meter record: ", error);
            }
        }
    }
}
</script>

<style scoped>
      .body{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5rem;
    }
    .body a{
        position: relative;
        display: block;
        padding: 10px 30px;
        border: 4px solid #00aeff;
        border-radius: 50px;
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: 3px;
        background-color: #FFFFFF;
        color: #00aeff;
        text-decoration: none;
        overflow: hidden
    }
    .body a:hover{
        color: white;
    }
    .body a span{
        font-weight: 600;
        position: relative;
        z-index: 1;
        transition: 1s;
    }
</style>