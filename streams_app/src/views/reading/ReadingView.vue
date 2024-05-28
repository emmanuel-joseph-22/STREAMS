<template>
  <div>
    <water_drop v-if="hide_everything"/>    
    <main-content>
      <header_bar class="sticky top-0 bg-white">
        <h1 class="text-3xl text-left text-bsu-light-blue font-semibold ml-3 mt-1">Reading</h1>
      </header_bar>
      <confirm_pop_up @confirmEvent="confirm_window" v-if="stage_reading">
        This will record water reading in the database!
      </confirm_pop_up>

      <toast_notification ref="toast" />

      <div v-if="selectedWaterSource" class="fixed top-0 left-0 w-full h-full pl-8 pr-8 pt-16 pb-16 flex justify-center items-center bg-black bg-opacity-50 z-20">
        <!--POPUP-->
        <div class="bg-white w-full h-full rounded-lg shadow-lg">
          <span class="absolute top-16 right-10 cursor-pointer text-gray-600 text-2xl" @click="closePopup">&times;</span>
          <h2 class="mt-8">{{  capitalize(selectedWaterSource)  }}</h2>
          <!--CONTENTS NG POPUP-->
          <div class="m3-cont flex flex-col flex-start w-auto h-14 mb-8 mt-4 t-7 p-4">
            <label for="input1" class="m3-label mt-8 mr-2.5 font-bold text-left">{{ popupData[selectedWaterSource].input1.label }}</label>
            <input id="input1" :type="popupData[selectedWaterSource].input1.type" :placeholder="popupData[selectedWaterSource].input1.placeholder" class="flex-1 p-2.5 border-solid border-4 border-bsu-borders rounded-xl rounded text-base text-blue-900 box-border outline-none w-full" v-model="popupData[selectedWaterSource].input1.value" :class="{ 'border-red-500': popupData[selectedWaterSource].input1.error }" @input="handleInput($event, 'input1')" inputmode="numeric"/>

            <label for="input2" class="m3-label mt-8 mr-2.5 font-bold text-left">{{ popupData[selectedWaterSource].input2.label }}</label>
            <input id="input2" :type="popupData[selectedWaterSource].input2.type" :placeholder="popupData[selectedWaterSource].input2.placeholder" class="flex-1 p-2.5 border-solid border-4 border-bsu-borders rounded-xl rounded text-base text-blue-900 box-border outline-none w-full" v-model="popupData[selectedWaterSource].input2.value" :class="{ 'border-red-500': popupData[selectedWaterSource].input2.error }" @input="handleInput($event, 'input2')" inputmode="numeric"/>

            <label for="input3" class="m3-label mt-8 mr-2.5 font-bold text-left">{{ popupData[selectedWaterSource].input3.label }}</label>
            <input id="input3" :type="popupData[selectedWaterSource].input3.type" :placeholder="popupData[selectedWaterSource].input3.placeholder" class="flex-1 p-2.5 border-solid border-4 border-bsu-borders rounded-xl rounded text-base text-blue-900 box-border outline-none w-full" v-model="popupData[selectedWaterSource].input3.value" :class="{ 'border-red-500': popupData[selectedWaterSource].input3.error }" @input="handleInput($event, 'input3')" inputmode="numeric"/>
            <button @click="addReadingToLocal" class="add-reading-btn p-2.5 bg-bsu-blue text-white rounded-full cursor-pointer mt-4 text-base w-32 border-2 border-bsu-borders hover:bg-bsu-borders active:bg-bsu-borders self-center">Add Reading</button>
          </div>
        </div>
      </div>

      <div class="overflow-y-auto">
        <div class="reading bg-bsu-blue flex justify-center items-center h-full">
          <div class="bg-center h-full w-full inset-0 bg-white flex flex-col">
            <!--MENU FOR MAIN-->
            <div class="pt-10 pl-4 pr-4 bg-bsu-base">
              <button @click="mainmeter = !mainmeter" class="main-meter-box bg-bsu-alt-base bg-opacity-90 text-white font-bold p-4 border-2 border-bsu-borders w-full rounded-md mb-2">MAIN METER</button>
              <div v-if="mainmeter" class="mb-2">
                <ul class="bg-bsu-blue bg-opacity-30 w-full p-4">
                  <li v-for="(source, index) in mainMeterSources" :key="index" class="cursor-pointer rounded-md" :class="{'bg-bsu-borders': isPopupFilled(source), 'bg-bsu-blue': !isPopupFilled(source)}" >
                    <div class="hover:bg-bsu-borders border-2 border-bsu-borders rounded-md w-full p-4 mb-2 font-bold text-white" @click="openPopup(source)">{{ capitalize(source) }}</div>
                  </li>
                </ul>
              </div>
            </div>
            <!--MENU FOR SUB-->
            <div class="pl-4 pr-4">
              <button @click="submeter = !submeter" class="sub-meter-box bg-bsu-alt-base text-white bg-opacity-90 font-bold p-4 border-2 border-bsu-borders w-full rounded-md mb-2">SUBMETER</button>
              <div v-if="submeter" class="mb-2">
                <ul class="bg-bsu-blue bg-opacity-30 w-full p-4">
                  <li v-for="(source, index) in subMeterSources" :key="index" class="cursor-pointer rounded-md" :class="{'bg-bsu-borders': isPopupFilled(source), 'bg-bsu-blue': !isPopupFilled(source)}">
                    <div class="hover:bsu-borders border-2 border-bsu-borders rounded-md w-full p-4 mb-2 font-bold text-white" @click="openPopup(source)">{{  capitalize(source) }}</div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="body">
              <a href="#" class="bg-bsu-base bg-opacity-50" @click="submitAllReadings">
                <span>Submit</span>
                <div class="wave"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main-content>
  </div>
</template>

<script>
import loaderSpinner from "@/components/loaderSpinner.vue";
import { collection, addDoc, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { firestore as db } from './../../main.js';
import header_component from "../../components/header_component.vue";
import HomePageView from "./../dashboard/HomePageView.vue";
import confirmation_view from "./../../components/confirmation_view.vue";
import toast_notification from "./../../components/toast_notification.vue";
//import { mapActions } from 'vuex';
import store from "@/store/index.js";
import formatString from "@/format.js";
import { getTotalConsumption } from "@/dashboard_query.js";

export default {
  components: {
    'water_drop': loaderSpinner,
    'header_bar': header_component,
    'main-content': HomePageView,
    'confirm_pop_up': confirmation_view,
    'toast_notification': toast_notification
  },
  data() {
    return {
      mainMeterSources: ['deep_well_1', 'deep_well_2', 'deep_well_3', 'deep_well_4', 'prime_water'],
      subMeterSources: ['fic_1', 'fic_2','canteen_drinking_fountain', 'executive_lounge', 'ceafa_faculty_room', 'rgr', 'cics_drinking_fountain', 'ssc'],
      selectedWaterSource: null,
      mainmeter: false,
      submeter: false,
      //WaterSource: '',
      BuildingDepartment: '',
      Consumption: '',
      input_x: '',
      input_x0: '',
      stage_reading: false,
      isSubmitting: false,
      hide_everything: false,
      /* repetetive pa yung code dito para sana iba iba laman ng fields kada popup pero baka may alam pa 
      kayo ibang way para di humaba to*/
      popupData: {
          'deep_well_1': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'deep_well_2': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
            },
          'deep_well_3': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'deep_well_4': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'prime_water': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'fic_1': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'fic_2': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'canteen_drinking_fountain': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'executive_lounge': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'ceafa_faculty_room': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'rgr': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'cics_drinking_fountain': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'ssc': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
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
      this.selectedWaterSource = null;
    },
    // for preventing duplication
    async checkExisitngRecord(category, source, date){
      try {
        const waterReadingsRef = collection(db, `meter_records/${category}/${source}`)

        const q = query(waterReadingsRef, where('date', '==', date));

        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){
          return querySnapshot.docs[0].id;
        } else {
          return null;
        }
      } catch(error) {
        console.log('error checking existing reading: ', error)
        throw error
      }
    },
    // this will submit a single reading into firestore
    async submitForm(dateRead) {
      const [year, month, day] = dateRead.split("-");
      const waterSource = this.selectedWaterSource;
      const consumption = this.popupData[waterSource].input1.value;
      const input_x = this.popupData[waterSource].input2.value;
      const input_x0 = this.popupData[waterSource].input3.value;
      
      let path;
      let source_category;
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
        // identify the category of the source 
        //to set the path in firestore and 
        // in querying in checkexsitingrecord function
        if (this.mainMeterSources.includes(waterSource)) {
          path = `meter_records/main_meter/${waterSource}`;
          source_category = 'main_meter'
        } else {
          path = `meter_records/submeter/${waterSource}`;
          source_category = 'submeter'
        }
        // get reading ID if there is
        const readingID = await this.checkExisitngRecord(source_category, waterSource, dateRead)
        
        // if so, update the exisitng record in firestore
        // if the id container is empty, add the data in a new reading ID
        if(readingID){
          await setDoc(doc(collection(db, path), readingID), data)
          console.log(`updated reading for ${waterSource} at ${dateRead} successfully!`)
        } else if(!readingID){
          await addDoc(collection(db, path), data);
          console.log('submitted successfully')
        } else {
          console.log('unsuccessful submission')
        }
      } catch (error) {
        console.error("Error storing meter record: ", error);
      }
    },
    /*
    getTotalConsumptionReading(){
      let submeterTotal = 0
      let mainMeterTotal = 0
      for(let reading of this.$store.state.readings){
        if(this.mainMeterSources.includes(reading.waterSource)){
          mainMeterTotal += reading.data.consumption
        } else if(this.subMeterSources.includes(reading.waterSource)){
          submeterTotal += reading.data.consumption
        }
      }
      return [mainMeterTotal, submeterTotal]
    },*/
    async submitTotalConsumption(dateRead, consumption){

      try {
        const [year, month, day] = dateRead.split("-")
        const data = {
          consumption: consumption,
          date: dateRead,
          year: year,
          month: month,
          day: day
        };
        const path = `meter_records/main_meter/total_consumption`;
        // get reading ID if there is
        const readingID = await this.checkExisitngRecord('main_meter', 'total_consumption', dateRead)
        
        // if so, update the exisitng record in firestore
        // if the id container is empty, add the data in a new reading ID
        if(readingID){
          await setDoc(doc(collection(db, path), readingID), data)
          console.log(`updated reading for total consumption in main meter at ${dateRead} successfully!`)
        } else if(!readingID){
          await addDoc(collection(db, path), data);
          console.log('submitted successfully')
        } else {
          console.log('unsuccessful submission')
        }
      } catch (error) {
        console.error("Error storing total water consumption: ", error);
      }
    },
    handleInput(event, key) {
      const inputValue = event.target.value;
      const inputRegex = /^\d*\.?\d*$/; // allow only numbers and decimal point for inputs

      if (key === 'input1') {
        if (!inputRegex.test(inputValue) || parseFloat(inputValue) < 0 || parseFloat(inputValue) > 999999) {
          this.popupData[this.selectedWaterSource][key].error = true;
        } else {
          this.popupData[this.selectedWaterSource][key].value = inputValue;
          this.popupData[this.selectedWaterSource][key].error = false;
        }
      } else {
        if (inputValue && (!inputRegex.test(inputValue) || parseFloat(inputValue) < 0)) {
          this.popupData[this.selectedWaterSource][key].error = true;
        } else {
          this.popupData[this.selectedWaterSource][key].value = inputValue;
          this.popupData[this.selectedWaterSource][key].error = false;
        }
      }
    },
    addReadingToLocal() {
      const waterSource = this.selectedWaterSource;

      // check if a reading has already been added in a source
      if (this.popupData[waterSource].isReadingAdded) {
        // confirm if they want to edit the previous input
        if (confirm('A reading has already been added for this water source. Do you want to edit the previous input?')) {
          // reset the flag a reading has been added
          this.popupData[waterSource].isReadingAdded = false;
        } else {
          // do not proceed 
          return;
        }
      }

      // if consumption exceeds limit
      const consumption = parseFloat(this.popupData[waterSource].input1.value);
      if (consumption > 999999) {
        alert('Consumption cannot exceed 999999.');
        return;
      }
      
      // if consumption field is field and valid
      if (this.popupData[waterSource].input1.error || !this.popupData[waterSource].input1.value) {
        alert('Please fill the Consumption field with a valid value.');
        return;
      }

      // format current date in year-mm-dd
      // also slice them into separate parameter
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      const input_x = this.popupData[waterSource].input2.value || '';  // Consider empty as default
      const input_x0 = this.popupData[waterSource].input3.value || ''; // Consider empty as default
      
      // if the reading already exists in the store
      const existingReading = this.$store.state.readings.findIndex(reading => reading.waterSource === waterSource);
      if (existingReading !== -1) {
        // if the reading exists, update values
        this.$store.state.readings[existingReading].data = {
          date: formattedDate,
          consumption,
          input_x,
          input_x0
        };
      } else {
        // if the reading does not exist, add to the store
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
      }

      this.popupData[waterSource].isReadingAdded = true;
      console.log('eto ung reading: ', store.state.readings)
      // Clear the input fields in the UI
      this.resetInputFields(waterSource);
      this.closePopup();
      this.$refs.toast.show('Record added successfully!', 'success');
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
      this.hide_everything = true;
      this.isSubmitting = true; //temporary fix to looping submit problem 
      let dateRead = null;
      if (!navigator.onLine) {
        alert('No internet connection. Please connect to the internet and try again.');
        this.isSubmitting = false;
        return;
      }
      let hasSubmittedAny = false;
      for (let reading of this.$store.state.readings) {
        if (!reading || !reading.data || !reading.data.consumption) {
          console.error('Invalid or incomplete reading data, skipping:', JSON.stringify(reading));
          continue;
        }
        this.selectedWaterSource = reading.waterSource;
        dateRead = reading.data.date
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

      // fetch the five water meters from firestore then compute for total
      // write it back to firestore .... / totalconsumption / ...
      const total = await getTotalConsumption(dateRead);
      console.log('Total consumption: ', total)
      this.submitTotalConsumption(dateRead, total)
      this.isSubmitting = false;
      this.hide_everything = false;
      this.closePopup()
      this.resetPopUp()
    },
    //resets the data object popup para malinis (kuko emoji)
    resetPopUp(){
      this.popupData = {
          'deep_well_1': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'deep_well_2': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
            },
          'deep_well_3': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'deep_well_4': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'prime_water': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'fic_1': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'fic_2': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'canteen_drinking_fountain': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'executive_lounge': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'ceafa_faculty_room': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'rgr': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'cics_drinking_fountain': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
          'ssc': {
              input1: { type: 'text', placeholder: 'm3:', label: 'Consumption', value: '', error: '' },
              input2: { type: 'text', placeholder: 'x0.001', label: 'one-thousandth (milli)', value: '', error: '' },
              input3: { type: 'text', placeholder: 'x0.0001', label: 'ten-thousandth (micro)', value: '', error: '' },
              isReadingAdded: false
          },
        }
    }
  },
  computed: {
    isPopupFilled() {
      return (source) => {
        const popupData = this.popupData[source];
        if (popupData.isReadingAdded) {
          return true; // if Add Resding button is clicked, consider it filled
        }
        for (const key in popupData) {
          if (Object.prototype.hasOwnProperty.call(popupData, key)) {
            if (!popupData[key].value || popupData[key].error) {
              return false; // if any field is empty or has an error, return false
            }
          }
        }
        return false; // fields are not filled out properly
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
  padding: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
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