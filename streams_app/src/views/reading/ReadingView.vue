<template>
    <main-content>
        <header_bar>
            <h1 class="text-4xl font-semibold ml-3 mt-1">Reading</h1>
        </header_bar>
        <confirm_pop_up @confirmEvent="confirm_window" v-if="stage_reading">
            This will record water reading in the database!
        </confirm_pop_up>
        <div class="all">
            <div class="nav">
                <div class="nav-links">
                    <!-- pinaltan ko ng div ung unordered list
                    kase hirap i-symmetrically center ung list -->
                    <div class="reading_label" @click="mainmeter=true">
                        <a href="#">MAIN</a>  
                    </div>
                    <div class="reading_label" @click="mainmeter=false">
                        <a href="#">SUBMETER</a>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="content">
                    
                    <div class="main">
                        <label for="date" >Date</label>
                        <input id="date"  type="date" class="date_field" v-model="temp_date"/>
                    </div>
                    <!-- source for main meters -->
                    <div class="main" v-if="mainmeter">
                        <label for="main" class="main-label">Water Source</label>
                        <select id="main"  class="main-dropdown" disabled v-model="WaterSource">
                            <option value="deep-well-1">Deep Well 1</option>
                            <option value="deep-well-2">Deep Well 2</option>
                            <option value="deep-well-3">Deep Well 3</option>
                            <option value="deep-well-4">Deep Well 4</option>
                            <option value="prime-water">Prime Water</option>
                        </select>
                    </div>
                    <!-- source for submeters -->
                    <div class="main" v-if="!mainmeter">
                        <label for="main" class="main-label">Water Source</label>
                        <select id="main" class="main-dropdown" v-model="WaterSource">
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
                    <div class="m3-cont">
                        <label for="input_cubic" class="m3-label"></label>
                        <input autofocus id="input_cubic" type="text" required placeholder="m3: " class="m3-input" v-model="Consumption"/>
                    </div>

                    <div class="m3-cont-x">
                        <label for="input_x" class="x-label"></label>
                        <input autofocus id="input_x" type="text" name="x" required placeholder="x0.001 " class="x-input" v-model="input_x"/>
                    </div>

                    <div class="m3-cont-x0">
                        <label for="input_x0" class="x0-label"></label>
                        <input autofocus id="input_x0" type="text" name="x0" required placeholder="x0.0001 " class="x-input" v-model="input_x0"/>
                    </div>
                    <div class="submit">
                        <button @click="stage_reading=true">SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    </main-content>
</template>

<script>
import { collection, doc, setDoc } from "firebase/firestore";
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
            temp_date: '',
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
                this.temp_date = ''
                this.WaterSource = ''
                this.BuildingDepartment = ''
                this.Consumption = ''
                this.input_x = ''
                this.input_x0 = ''
            }
            this.stage_reading = false;
        },
        async submitForm() {
            const set_date = this.temp_date
            const waterSource = 'CICS-DF';
            const buildingDepartment = this.BuildingDepartment;
            const consumption = this.Consumption;
            //const currentDate = new Date(set_date).toISOString();

            // Construct the data object
            const data = {
                consumption: consumption,
                buildingDepartment: buildingDepartment,
                input_x: this.input_x,
                input_x0: this.input_x0
            };
            // temp wait
            const path = `meter_records/submeter/${waterSource}`
            
            // curr date as doc id
            try {
                await setDoc(doc(collection(db, path), set_date), data);
                console.log("Meter record stored successfully!");
            /*try {
                const mainMeterSnapshot = await getDoc(mainMeterRef);
                console.log('bitch eto 1')
                if (mainMeterSnapshot.exists()) {
                    console.log("Main meter document exists:", mainMeterSnapshot.exists());
                    // The main_meter document exists
                    // Access the subcollection
                    const collectionRef = collection(mainMeterRef, waterSource);
                    console.log('bitch eto 3')
                    await setDoc(doc(collectionRef, currentDate), data);
                    console.log("Meter record stored successfully!");
                    // Now you can perform operations on the collectionRef
                }
                */
                //reset the values after
                this.temp_date = ''
                this.WaterSource = ''
                this.BuildingDepartment = ''
                this.Consumption = ''
                this.input_x = ''
                this.input_x0 = ''
            } catch(error) {
                console.error("Error storing meter record: ", error);
            }
                
        }
    }
};
</script>

<style scoped>
    .all{
        font-family: 'Times New Roman', Times, serif;
        background-color: #F2F5F9;
        height: 100vh;
        width: auto;
        margin: 0;
        padding: 0;
    }

    .nav{
        display: flex;
        justify-content: center;
        background-color: #3B5271;
        border-radius: 40px;
        color: #FFFFFF;
        height: 40px;
        margin: 40px auto 20px auto;
        padding: 0;
        min-width: 200px;
        max-width: 420px;
    }

    .nav-links{
        display: flex;
        list-style-type: none; 
        width: 100%;
    }
    
    .reading_label{
        font-weight: bold;
        width: 50%;
        padding: 0;
    }

    .reading_label > a{
        text-decoration: none;
        color: #FFFFFF;
        font-size: 16px;
        transition: all ease 0.5s;
        margin-top: 8px;
        padding: 0 10px;
        display: inline-block;
    }

    .reading_label > a:hover{
        background-color: #C9D8EC;
        color: #3B5271;
        border-radius: 10px;
    }

    .container{
        display: flex;
        background-color: #FFFFFF;
        border: 2px solid #3B5271;
        border-radius: 20px;
        margin: 10px auto;
        height: auto;
        padding: 0 1rem;
        max-width: 420px;
        min-width: 250px;
    }

    .content{
        flex: 1;
        padding: 8px;
        margin: 40px auto 20px auto;
        overflow-y: auto;
        width: 100%;
    }


    .main label{
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
        margin-top: 10px;
        text-align: justify;
    }

    .main-dropdown, .date_field{
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 2px solid #5F88BF;
        color: #3B5271;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .m3-cont,
    .m3-cont-x,
    .m3-cont-x0 {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 90%;
        margin: 30px 12px 0px auto;
    }

    .m3-label,
    .x-label,
    .x0-label {
        margin-right: 10px;
        font-weight: bold;
    }

    .m3-input,
    .x-input,
    .x0-input {
        width: 100%;
        flex: 1;
        padding: 10px;
        border: 2px solid #5F88BF;
        border-radius: 4px;
        font-size: 16px;
        color: #3B5271;
        box-sizing: border-box;
        outline: none;
    }

    .submit button{
        background-color: #5F88BF;
        color: #F2F5F9;
        width: 40%;
        padding: 15px 25px;
        margin-top: 70px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .submit button:hover{
        background-color: #3B5271;
    }

</style>