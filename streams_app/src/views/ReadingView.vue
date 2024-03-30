<template>
    <div class="all">
        <div class="nav">
            <div class="nav-links">
                <ul>
                    <li><a href="#">MAIN</a></li>
                    <router-link to="/submeter"><li><a href="#">SUBMETER</a></li></router-link>
                </ul>
            </div>
        </div>

        <div class="container">
            <div class="content">
                <div class="main">
                    <label for="main" class="main-label">Water Source</label>
                    <select id="main"  class="main-dropdown">
                        <option value="deep-well-1">Deep Well 1</option>
                        <option value="deep-well-2">Deep Well 2</option>
                        <option value="deep-well-3">Deep Well 3</option>
                        <option value="deep-well-4">Deep Well 4</option>
                        <option value="prime-water">Prime Water</option>
                    </select>
                </div>
                <div class="m3-cont">
                    <label for="input_cubic" class="m3-label"></label>
                    <input autofocus id="input_cubic" type="text" required placeholder="m3: " class="m3-input"/>
                </div>

                <div class="m3-cont-x">
                    <label for="input_x" class="x-label"></label>
                    <input autofocus id="input_x" type="text" name="x" required placeholder="x0.001 " class="x-input"/>
                </div>

                <div class="m3-cont-x0">
                    <label for="input_x0" class="x0-label"></label>
                    <input autofocus id="input_x0" type="text" name="x0" required placeholder="x0.0001 " class="x-input"/>
                </div>

                <router-link to="/confirmation">
                <div class="submit">
                    <button @click="submitForm">SUBMIT</button>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore as db } from './../main.js';

export default {
    data() {
        return {
            WaterSource: '',
            BuildingDepartment: '',
            Consumption: ''
        };
    },
    methods: {
        async submitForm() {
            const waterSource = this.WaterSource;
            const buildingDepartment = this.BuildingDepartment;
            const consumption = this.Consumption;
            //const timestamp = new Date().getTime(); wait
            // Get current date in the format YYYY-MM-DD
            const currentDate = new Date().toISOString().split('T')[0];
            
            // Construct the path
            const path = 'meter_records/main_meter/' + `${waterSource}`;
            // Construct the data object
            const data = {
                consumption: consumption,
                buildingDepartment: buildingDepartment
            };
            // set doc function to customize ID as current Date
            try {
                await setDoc(doc(collection(db, path), currentDate), data);
                console.log("Meter record stored successfully!");
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
        justify-content: space-between;
        background-color: #3B5271;
        border-radius: 40px;
        color: #FFFFFF;
        height: 40px;
        margin-top: 30%;
        padding: 0 4rem;
    }

    .nav ul{
        display: flex;
        list-style-type: none; 
    }

    .nav ul li{
        font-weight: bold;
        margin: 0 10px;
        padding: 0;
    }

    .nav ul li a{
        text-decoration: none;
        color: #FFFFFF;
        font-size: 16px;
        transition: all ease 0.5s;
        margin-top: 8px;
        padding: 1px 40px;
        display: inline-block;
    }

    .nav ul li a:hover{
        background-color: #C9D8EC;
        color: #3B5271;
        border-radius: 30px;
    }

    .container{
        display: flex;
        background-color: #FFFFFF;
        border: 2px solid #3B5271;
        border-radius: 20px;
        margin-top: 10px;
        height: 70vh;
        padding: 0 1rem;
    }

    .content{
        flex: 1;
        padding: 8px;
        margin-top: 80px;
        margin-left: 10px;
        overflow-y: auto;
    }

    .main label{
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
        margin-top: 10px;
        text-align: justify;
    }

    .main-dropdown{
        width: 80vw;
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
        margin-top: 30px;
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
        width: 80vw;
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