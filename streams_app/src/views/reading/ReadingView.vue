<template>
  <main-content>
    <header_bar>
      <h1 class="text-4xl text-left text-bsu-light-blue font-semibold ml-3 mt-1">Reading</h1>
    </header_bar>
    <confirm_pop_up @confirmEvent="confirm_window" v-if="stage_reading">
      This will record water reading in the database!
    </confirm_pop_up>

    <div v-if="selectedWaterSource" class="fixed top-0 left-0 w-full h-full pl-8 pr-8 pt-16 pb-16 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <!--POPUP-->
      <div class="bg-white w-full h-full rounded-lg shadow-lg">
        <span class="absolute top-16 right-10 cursor-pointer text-gray-600 text-2xl" @click="closePopup">&times;</span>
        <h2 class="mt-8">{{  capitalize(selectedWaterSource)  }}</h2>
        <!--CONTENTS NG POPUP-->
        <template v-if="popupData[selectedWaterSource]">
          <div v-for="(input, key) in popupData[selectedWaterSource]" :key="key" class="m3-cont flex flex-col flex-start w-auto h-14 mb-8 mt-4 t-7 p-4">
            <label :for="'input_' + key" class="m3-label mt-8 mr-2.5 font-bold text-left">{{ input.label }}</label>
            <input :id="'input_' + key" :type="input.type" :placeholder="input.placeholder" class="flex-1 p-2.5 border-solid border-4 border-bsu-borders rounded-xl rounded text-base text-blue-900 box-border outline-none w-full" v-model="input.value" :class="{ 'border-red-500': input.error }" @input="handleInput($event, key)"/>
          </div>
          <button @click="addReadingToLocal" class="add-reading-btn p-2.5 8 bg-bsu-blue text-white rounded-full cursor-pointer text-base mt-20 w-32 border-2 border-bsu-borders hover:bg-bsu-borders active:bg-bsu-borders">Add Reading</button>
        </template>
      </div>
    </div>

    <div class="reading bg-bsu-blue flex justify-center items-center h-screen">
      <div class="bg-center h-full w-full inset-0 opacity-80 bg-[url('/public/image-30.jpg')]">
        <!--MENU FOR MAIN-->
        <div class="pt-10 pl-4 pr-4">
          <button @click="mainmeter = !mainmeter" class="text-black bg-bsu-base font-bold p-4 border-2 border-bsu-borders w-full rounded-md mb-2">MAIN METER</button>
          <div v-if="mainmeter" class="mb-2">
            <ul class="bg-bsu-blue bg-opacity-60 w-full p-4">
              <li v-for="(source, index) in mainMeterSources" :key="index" :class="{'bg-green-500': isPopupFilled(source), 'bg-bsu-blue': !isPopupFilled(source)}" >
                <div class="hover:bg-bsu-hover border-2 border-bsu-borders rounded-md w-full p-4 mb-2 font-bold text-white" @click="openPopup(source)">{{ capitalize(source) }}</div>
              </li>
            </ul>
          </div>
        </div>
        <!--MENU FOR SUB-->
        <div class="pl-4 pr-4">
          <button @click="submeter = !submeter" class="text-black bg-bsu-base font-bold p-4 border-2 border-bsu-borders w-full rounded-md mb-2">SUBMETER</button>
          <div v-if="submeter" class="mb-2">
            <ul class="bg-bsu-blue bg-opacity-60 w-full p-4">
              <li v-for="(source, index) in subMeterSources" :key="index" :class="{'bg-bsu-borders': isPopupFilled(source), 'bg-bsu-blue': !isPopupFilled(source)}">
                <div class="hover:bg-bsu-hover border-2 border-bsu-borders rounded-md w-full p-4 mb-2 font-bold text-white" @click="openPopup(source)">{{  capitalize(source) }}</div>
              </li>
            </ul>
          </div>
        </div>

        <div v-on:click="submitAllReadings" class="body">
          <a href="#" class="bg-bsu-base bg-opacity-50">
            <span>Submit</span>
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
//import { mapActions } from 'vuex';
import store from "@/store/index.js";
import formatString from "@/format.js";

export default {
  components: {
    'header_bar': header_component,
    'main-content': HomePageView,
    'confirm_pop_up': confirmation_view
  },
  data() {
    return {
      mainMeterSources: ['deep_well_1', 'deep_well_2', 'deep_well_3', 'deep_well_4', 'prime_water'],
      subMeterSources: ['fic_1', 'fic_2','canteen_drinking_fountain', 'executive_lounge', 'ceafa_faculty_room', 'rgr', 'cics_drinking_fountain', 'ssc'],
      selectedWaterSource: '',
      mainmeter: false,
      submeter: false,
      //WaterSource: '',
      BuildingDepartment: '',
      Consumption: '',
      input_x: '',
      input_x0: '',
      stage_reading: false,
      isSubmitting: false,
      /* repetetive pa yung code dito para sana iba iba laman ng fields kada popup pero baka may alam pa 
      kayo ibang way para di humaba to*/
      popupData: {
          'deep_well_1': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'deep_well_2': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'deep_well_3': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'deep_well_4': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'prime_water': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'fic_1': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'fic_2': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'canteen_drinking_fountain': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'executive_lounge': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'ceafa_faculty_room': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'rgr': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'cics_drinking_fountain': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
          'ssc': {
              input1: { type: 'number', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'number', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'number', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' }
          },
        }

    };
  },    
  methods: {
    capitalize(source){
      const formattedStr = formatString(source)
      return formattedStr.toUpperCase()
    },
    openPopup(source) {
      this.selectedWaterSource = source;
    },
    closePopup() {
      this.selectedWaterSource = '';
    },/*
    confirm_window(value){
      console.log("Confirmed value:", value);
      if (value) {
        this.submitForm();
      } else {
        console.log("Submit cancelled")
      }
      //this.WaterSource = '';
      this.BuildingDepartment = '';
      this.Consumption = '';
      this.input_x = '';
      this.input_x0 = '';
      this.stage_reading = false;
    },*/
    async submitForm(dateRead) {
      const [year, month, day] = dateRead.split("-");
      const waterSource = this.selectedWaterSource;
      const consumption = this.popupData[waterSource].input1.value;
      const input_x = this.popupData[waterSource].input2.value;
      const input_x0 = this.popupData[waterSource].input3.value;
      
      let path;

      const data = {
        consumption: consumption,
        input_x: input_x,
        input_x0: input_x0,
        date: dateRead,
        year: year,
        month: month,
        day: day
      };

      try {
        if (waterSource === this.mainMeterSources[0] || 
            waterSource === this.mainMeterSources[1] || 
            waterSource === this.mainMeterSources[2] || 
            waterSource === this.mainMeterSources[3] || 
            waterSource === this.mainMeterSources[4]) {
          path = `meter_records/main_meter/${waterSource}`;
        } else {
          path = `meter_records/submeter/${waterSource}`;
        }
        console.log('hindi ko gets cass')
        await addDoc(collection(db, path), data);
        console.log('submitted successfully')
      } catch (error) {
        console.error("Error storing meter record: ", error);
      }
    },
    handleInput(event, key) {
      const inputValue = event.target.value;
      const inputRegex = /^\d*\.?\d*$/; // allow only numbers and decimal point for inputs
      const maxValue = 999999;

      if (!inputRegex.test(inputValue) || parseFloat(inputValue) <= 0 || parseFloat(inputValue) >= maxValue){
        this.popupData[this.selectedWaterSource][key].error = true;
      } else {
        this.popupData[this.selectedWaterSource][key].value = inputValue;
        this.popupData[this.selectedWaterSource][key].error = false;
      }
    },
    addReadingToLocal() {
      console.log('bat di nagana')
      const waterSource = this.selectedWaterSource;
      // format current date in year-mm-dd
      // also slice them into separate parameter
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      const consumption = this.popupData[waterSource].input1.value;
      const input_x = this.popupData[waterSource].input2.value || '';  // Consider empty as default
      const input_x0 = this.popupData[waterSource].input3.value || ''; // Consider empty as default

      // base case for empty consumption value
      if (!consumption) {
        alert('Consumption is a required field.');
        return;
      }

      const reading = {
        waterSource,
        data: {
            date: formattedDate,
            consumption,
            input_x,
            input_x0
        }
      };

      // Add the reading to Vuex
      store.dispatch('addReading', reading);
      console.log('Reading added:', { waterSource, data: reading.data });

      // Clear the input fields in the UI
      this.resetInputFields(waterSource);
    },
    //resetting input function
    resetInputFields(source) {
      if (this.popupData[source]) {
        this.popupData[source].input1.value = '';
        this.popupData[source].input2.value = '';
        this.popupData[source].input3.value = '';
      }
    },
    async submitAllReadings() {
      this.isSubmitting = true; //temporary fix to looping submit problem 
      
      if (!navigator.onLine) {
        alert('No internet connection. Please connect to the internet and try again.');
        return;
      }

      let hasSubmittedAny = false;

      for (let reading of this.$store.state.readings) {
        if (!reading || !reading.data || !reading.data.consumption) {
          console.error('Invalid or incomplete reading data, skipping:', JSON.stringify(reading));
          continue;
        }

        this.selectedWaterSource = reading.waterSource;
        const dateRead = reading.data.date
        this.popupData[this.selectedWaterSource] = {
            input1: { value: reading.data.consumption },
            input2: { value: reading.data.input_x || '' },
            input3: { value: reading.data.input_x0 || '' }
        };

        await this.submitForm(dateRead);
        console.log('Successfully submitted reading for:', this.selectedWaterSource);
        hasSubmittedAny = true;
      }

      if (hasSubmittedAny) {
        this.$store.dispatch('clearReadings');  // Clear readings if any were submitted
        console.log('All readings cleared from store.');
        alert('All applicable readings submitted successfully!');
      } else {
        alert('No valid readings were available to submit.');
      }
    this.isSubmitting = false;
    }
  },
  computed: {
      isPopupFilled() {
          return (source) => {
          const popupData = this.popupData[source];
          for (const key in popupData) {
              if (Object.prototype.hasOwnProperty.call(popupData, key)) {
              if (!popupData[key].value || popupData[key].error) {
                  return false; //if a field is empty or has an error, return false
              }
              }
          }
          return true; //fields are filled out properly
          };
      },
  },

};
</script>

<style scoped>
.source_icon{
  background-color: black;
  width: inherit;
  height: inherit;
}
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}
.body a {
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
  overflow: hidden;
}
.body a:hover {
  color: white;
}
.body a span {
  font-weight: 600;
  position: relative;
  z-index: 1;
  transition: 1s;
}

.input-error {
  border-color: red !important;
}

/*  .add-reading-btn {
  padding: 10px 20px;
  background-color: #007BFF; /* Bootstrap primary blue, adjust as needed */
/*    color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  width: 100%;
  }

.add-reading-btn:hover {
  background-color: #0056b3; /* Darker blue on hover */
/*}*/
</style>
