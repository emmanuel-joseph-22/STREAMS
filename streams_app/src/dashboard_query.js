import { doc, getDocs, addDoc, collection, orderBy, query, limit, where /*getDocFromCache*/ } from "firebase/firestore";
import { firestore as db } from './main.js';
import formatString from './format.js';
import store from "./store/index.js";
const main_meter = ['deep_well_1', 'deep_well_2', 'deep_well_3', 'deep_well_4', 'prime_water']
const month_path = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

export async function fetchPie(){
    try{
        store.dispatch('clearPieData')
        await store.dispatch('setPieMainMeter')
    } catch(error) {
        console.log(error)
    }
}
export async function fetchData(){
    try{
        store.commit('clearDashboardData');
        store.commit('startLoading');
        await store.dispatch(`setTotalAccumulated`)
        await store.dispatch('setMonthlyAvg')
        await store.dispatch('setDailyAvg')
        await store.dispatch('setMonthlyConsumption')
        await store.dispatch('setDailyConsumption')
        store.dispatch('setQuarterlyConsumption')
        store.dispatch('setQuarterlyAvg')

        //await lipat_data_hohoho()
    } catch(error){
        console.log(error)
    } finally {
        store.commit('stopLoading');
    }
}

//pagpasok ng data ng emu sa firestore
export async function lipat_data_hohoho(){
    const startDate = new Date(2023, 0, 1);
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    for(let i = 0; i < DW1.length; i++){
        // Calculate the date for the current iteration
        //const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
        //
        const currentDate = new Date(startDate.getTime()); // Create a new date object to avoid modifying the startDate
        currentDate.setDate(startDate.getDate() + (i + 1));
        const formattedDate = currentDate.toISOString().split('T')[0];
            // Split the date field into year, month, and day
        const [year, month, day] = formattedDate.split("-");
        try {
            // Store data in Firestore
            await addDoc(collection(mainMeterRef, 'total_consumption'), {
                consumption: DW2[i] + DW1[i] + prime_water[i],
                date: formattedDate,
                year: year,
                month: month,
                day: day
            });
            console.log(formattedDate)
            //console.log(`Stored water consumption for ${formattedDate}: ${DW2[i]}`);
          } catch (error) {
            console.error("Error storing water consumption: ", error);
          }
    }
    //console.log(prime_water)
}
//
export async function daily_query(){  
    const daily_obj = {}
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    try{
        for(let i = 0; i < main_meter.length; i++){
            let consumption = 0
            const consumption_temp = []
            const dailyQuery = query(collection(mainMeterRef, main_meter[i]), 
                    orderBy('date', 'desc'), limit(30)
                );
            const meterSnapshot = await getDocs(dailyQuery);
            if(meterSnapshot.empty){
                console.log(main_meter[i], 'is empty')
                const array = []
                for (let i = 0; i < 30; i++) {
                array.push(0);
                }
                daily_obj[main_meter[i]] = array
            } else {
                meterSnapshot.forEach((doc) => {
                    // get water consumption
                    consumption = parseFloat(doc.data().consumption);
                    const estConsumption = Math.round(consumption * 1000) / 1000;
                    consumption_temp.push(estConsumption);
                });
                daily_obj[main_meter[i]] = consumption_temp.reverse()
            }
            
        }
        const totalQuery = query(collection(mainMeterRef, 'total_consumption'), 
                orderBy('date', 'desc'), limit(30));
        const totalSnapshot = await getDocs(totalQuery);
        const total_temp = []
        const date_temp = []
        totalSnapshot.forEach((doc) => {
            // get water consumption
            // get date
            const dateField = doc.data().date;
            const dateString = new Date(dateField)
            // format the date into words
            const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric'}).format(dateString);
            date_temp.push(formattedDate)
            const waterConsumption = parseFloat(doc.data().consumption);
            const estConsumption = Math.round(waterConsumption * 1000) / 1000;
            total_temp.push(estConsumption);
        });
        daily_obj['date'] = date_temp.reverse();
        daily_obj['total_consumption'] = total_temp.reverse();
    } catch (error) {
        console.log(error)
    }
    return daily_obj
}
export async function monthly_query(month_obj){
    const currentYear = '2023'
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    try{
        for(let i = 0; i < main_meter.length; i++){

            for(let j = 0; j < month_path.length; j++){  
                let totalConsumption = 0;
                const monthlyQuery = query(collection(mainMeterRef, main_meter[i]), 
                                            orderBy('date', 'asc'),
                                            where('month', '==', month_path[j]),
                                            where('year', '==', currentYear));
                const meterSnapshot = await getDocs(monthlyQuery);
                meterSnapshot.forEach((doc) => {
                    const waterConsumption = parseFloat(doc.data().consumption);
                    totalConsumption += waterConsumption;
                });                
                month_obj[main_meter[i]][j] = Math.round(totalConsumption * 1000) / 1000;
                if(!month_obj['total_consumption'][j]){
                    month_obj['total_consumption'][j] = Math.round(totalConsumption * 1000) / 1000;
                } else {
                    month_obj['total_consumption'][j] += Math.round(totalConsumption * 1000) / 1000;
                }
            }

        }
    } catch (error) {
        console.log(error)
    }
    //console.log(month_obj)
    return month_obj
}
export function quarterly_consumption(month_obj){
    const q_obj = {
        'deep_well_1': [], 
        'deep_well_2': [],
        'deep_well_3': [],
        'deep_well_4': [],
        'prime_water': [],
        'total_consumption': []
    }
    for(let i = 0; i < main_meter.length; i++ ){
        q1_calculator(month_obj, q_obj, i)
        q2_calculator(month_obj, q_obj, i)
        q3_calculator(month_obj, q_obj, i)
        q4_calculator(month_obj, q_obj, i)
    }
    return q_obj
}
// quarterly helper
function q1_calculator(month_obj, q_obj, i){
    const meter = main_meter[i];
    if(month_obj[meter]){
        const q_total = month_obj[meter][0] +  month_obj[meter][1] +  month_obj[meter][2] 
        q_obj[meter][0] = Math.round(q_total * 1000) / 1000;
        
        if(!q_obj['total_consumption'][0]){
            q_obj['total_consumption'][0] = Math.round(q_total * 1000) / 1000;
        } else {
            q_obj['total_consumption'][0] = Math.round((q_obj['total_consumption'][0] + q_total) * 1000) / 1000;
        }
    }
}
function q2_calculator(month_obj, q_obj, i){
    const meter = main_meter[i];
    const q_total = month_obj[meter][3] +  month_obj[meter][4] +  month_obj[meter][5];
    q_obj[meter][1] = Math.round(q_total * 1000) / 1000;
    if(!q_obj['total_consumption'][1]){
        q_obj['total_consumption'][1] = Math.round(q_total * 1000) / 1000;
    } else {
        q_obj['total_consumption'][1] = Math.round((q_obj['total_consumption'][1] + q_total) * 1000) / 1000;
    }
}
function q3_calculator(month_obj, q_obj, i){
    const meter = main_meter[i];
    const q_total = month_obj[meter][6] +  month_obj[meter][7] +  month_obj[meter][8] 
    q_obj[meter][2] = Math.round(q_total * 1000) / 1000;
    if(!q_obj['total_consumption'][2]){
        q_obj['total_consumption'][2] = Math.round(q_total * 1000) / 1000;
    } else {
        q_obj['total_consumption'][2] = Math.round((q_obj['total_consumption'][2] + q_total) * 1000) / 1000;
    }
}
function q4_calculator(month_obj, q_obj, i){
    const meter = main_meter[i];    
    const q_total = month_obj[meter][9] +  month_obj[meter][10] +  month_obj[meter][11] 
    q_obj[meter][3] = Math.round(q_total * 1000) / 1000;
    if(!q_obj['total_consumption'][3]){
        q_obj['total_consumption'][3] = Math.round(q_total * 1000) / 1000;
    } else {
        q_obj['total_consumption'][3] = Math.round((q_obj['total_consumption'][3] + q_total) * 1000) / 1000;
    }
}
/*

export function quarterly_consumption(month_obj){
    const q_obj = {}
    //const currentMonth = new Date().getMonth() + 1;
    for(let i = 0; i < main_meter.length; i++ ){
        /*
        if(currentMonth > 3 && currentMonth < 7){
            //q1
            q1_calculator(month_obj, q_obj, i)
        } else if (currentMonth > 6 && currentMonth < 10){
            //q1
            q1_calculator(month_obj, q_obj, i)
            q2_calculator(month_obj, q_obj, i)
        } else if (currentMonth > 9 && currentMonth <= 12){
            //q3
            q1_calculator(month_obj, q_obj, i)
            q2_calculator(month_obj, q_obj, i)
            q3_calculator(month_obj, q_obj, i)
        } else if (currentMonth < 4) {
            //q4
            q1_calculator(month_obj, q_obj, i)
            q2_calculator(month_obj, q_obj, i)
            q3_calculator(month_obj, q_obj, i)
            q4_calculator(month_obj, q_obj, i)
        //}
    }
    return q_obj
}

export async function monthly_and_daily_query(month_obj, daily_obj){
    /*const date_obj = new Date();
    const currentMonth = date_obj.getMonth() + 1;
    const currentDay = date_obj.getDate();

    try{
        for(let i = 0; i < main_meter.length; i++){

            const daily_value_temp = {}

            for(let j = 0; j < month_path.length; j++){
            
                const sourceRef = collection(mainMeterRef, main_meter[i]);
                const meterSnapshot = await getDocs(sourceRef);
                let totalConsumption = 0;
                meterSnapshot.forEach((doc) => {
                    const dateField = doc.data().date;
                    const waterConsumption = parseFloat(doc.data().consumption);
                    const dateString = new Date(dateField)
                    if(dateField.substring(5, 7) === `${month_path[j]}` && dateField.length >= 7){
                        totalConsumption += waterConsumption;
                        if(month_path[j] == 12){
                            const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(dateString);
                            const estConsumption = Math.round(waterConsumption * 1000) / 1000;
                            daily_value_temp[formattedDate] = estConsumption;
                        }
                    }     
                });

                month_obj.value[main_meter[i]][j] = Math.round(totalConsumption * 1000) / 1000;
                if(!month_obj.value['total_consumption'][j]){
                    month_obj.value['total_consumption'][j] = Math.round(totalConsumption * 1000) / 1000;
                } else {
                    month_obj.value['total_consumption'][j] += Math.round(totalConsumption * 1000) / 1000;
                }
            }
            // sort daily dictionary
            const dataArray = Object.entries(daily_value_temp);

            // Sort the array based on dates
            dataArray.sort((a, b) => compareDates(a, b));
            // Convert sorted array back to the dictionary
            const sortedConsumptionData = Object.fromEntries(dataArray);
            
            // this will extract the date-key and consumption-value into their respective array
            const consumptionArray = []
            const date_temp = []
            for (const date in sortedConsumptionData) {
                // Push the value corresponding to each date into the array
                date_temp.push(date)
                consumptionArray.push(Math.round(sortedConsumptionData[date] * 1000) / 1000);
            }

            daily_obj.value[main_meter[i]] = consumptionArray;
            if(daily_obj.value['date']){
                daily_obj.value['date'] = date_temp
            }
            for(let i = 0; i < consumptionArray.length; i++){
                if(!daily_obj.value['total_consumption'][i]){
                    daily_obj.value['total_consumption'][i] = Math.round(consumptionArray[i] * 1000) / 1000;
                    
                } else {
                    daily_obj.value['total_consumption'][i] = Math.round((daily_obj.value['total_consumption'][i] + consumptionArray[i]) * 1000) / 1000;
                    
                }
            }

        }
    } catch (error) {
        console.log(error)
    }
    return month_obj, daily_obj
}*/
// for reports
export async function fetchWaterSourceData(waterSource){
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    const prevMonth = (new Date().getMonth()).toString().padStart(2, '0');
    const date_temp = [];
    const consumptionArray = [];
    try{
        const reportsQuery = query(collection(mainMeterRef, waterSource), where('month', '==', prevMonth), orderBy('date', 'desc'));    
        const reportSnapshot = await getDocs(reportsQuery);
        //console.log(reportSnapshot.size)
        reportSnapshot.forEach( (doc) => {
            const dateField = doc.data().date;
            const dateString = new Date(dateField)
            // format the date into words
            const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
            
            // for water consumption
            const waterConsumption = doc.data().consumption;
            const estConsumption = Math.round(waterConsumption * 1000) / 1000;
            date_temp.push(formattedDate)
            consumptionArray.push(estConsumption);
        });
    } catch (error) {
        console.log(error)
    }        
    return { dates: date_temp.reverse(), values: consumptionArray.reverse() }; 
}
/* la pang case for submeter
export async function fetch_data(main_meter_object){
    //const date_obj = new Date();
    //const prevMonth = date_obj.getMonth();
    /*
    const currentMonth = prevMonth + 1;
    const currentDay = date_obj.getDate();

    //const last_30_query = query(collection(mainMeterRef, main_meter[i]), orderBy('__name__', 'desc'), limit(30));
        
    const currentYear = 2023;
    try{
        for(let i = 0; i < main_meter.length; i++){
            //const daily_value_temp = {}
            const records_temp = {}
            const sourceRef = collection(mainMeterRef, main_meter[i]);
            const meterSnapshot = await getDocs(sourceRef);
            meterSnapshot.forEach((doc) => {
                const dateField = doc.data().date;
                const waterConsumption = parseFloat(doc.data().consumption);
                const dateString = new Date(dateField)
                if(dateField.substring(0, 5) === `${currentYear}`){
                    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(dateString);
                    const estConsumption = Math.round(waterConsumption * 1000) / 1000;
                    records_temp[formattedDate] = estConsumption;                    
                }
            });
            // sort daily dictionary
            const dataArray = Object.entries(records_temp);

            // Sort the array based on dates
            dataArray.sort((a, b) => compareDates(a, b));
            // Convert sorted array back to the dictionary
            const sortedConsumptionData = Object.fromEntries(dataArray);
            main_meter_object[main_meter[i]] = sortedConsumptionData;
        }
        console.log(main_meter_object)
    } catch (error) {
        console.log(error)
    }
    return main_meter_object
}*/
// highlights for accumulated
export async function getTotalAccumulated(){
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    let total = 0;
    let maxConsumption = null;
    let maxDate = null;
    let minConsumption = null;
    let minDate = null;
    const currentYear = 2023
    const startDate = new Date(currentYear, 0, 1);
    // Extract year, month, and day
    const year = startDate.getFullYear();
    // JavaScript months are zero-based, so January is 0
    const month = startDate.getMonth() + 1; // Adding 1 to adjust month to be from 1 to 12
    const day = startDate.getDate();
    // Format into "year-mm-dd" format
    const formattedStartDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const currentDate = new Date();
    currentDate.setFullYear(currentYear);
    // Extract year, month, and day
    const curryear = currentDate.getFullYear();
    // JavaScript months are zero-based, so January is 0
    const currmonth = currentDate.getMonth() + 1; // Adding 1 to adjust month to be from 1 to 12
    const currday = currentDate.getDate();
    // Format into "year-mm-dd" format
    const formattedCurrentDate = `${curryear}-${currmonth < 10 ? '0' + currmonth : currmonth}-${currday < 10 ? '0' + currday : currday}`;
    try{
        let total_consumption = 0
        const dailyQuery = query(collection(mainMeterRef, 'total_consumption'), 
                orderBy('date', 'asc'), 
                where('date', '>=', formattedStartDate),
                where('date', '<=', formattedCurrentDate)
            );
        const meterSnapshot = await getDocs(dailyQuery);
        meterSnapshot.forEach((doc) => {
            // get water consumption
            const waterConsumption = parseFloat(doc.data().consumption);
            if(!maxConsumption){
                maxConsumption = waterConsumption
                const date = doc.data().date
                const dateString = new Date(date)
                const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
    
                maxDate = formattedDate;
            } else {
                if(maxConsumption < waterConsumption ){
                    maxConsumption = waterConsumption
                    const date = doc.data().date
                    const dateString = new Date(date)
                    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
                    maxDate = formattedDate;
                } else {
                    // skip
                }
            }
            if(!minConsumption){
                minConsumption = waterConsumption
                const date = doc.data().date
                const dateString = new Date(date)
                const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
                minDate = formattedDate
            } else {
                if(minConsumption > waterConsumption ){
                    minConsumption = waterConsumption
                    const date = doc.data().date
                    const dateString = new Date(date)
                    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
                    minDate = formattedDate
                } else {
                    // skip
                }
            }
            total_consumption += waterConsumption;
        });
        total += total_consumption;
    } catch (error) {
        console.log('error', error)
    }
    const estConsumption = Math.round(total * 1000) / 1000;
    const estMin = Math.round(minConsumption * 1000) / 1000;
    const estMax = Math.round(maxConsumption * 1000) / 1000;
    return [ estConsumption, estMin, minDate, estMax, maxDate ]
}
// highlights for avg monthly
export async function avg_monthly(){
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    let avg_est = 0
    let maxConsumption = null;
    let maxDate = null;
    let minConsumption = null;
    let minDate = null;
    const prevMonth = (new Date().getMonth()).toString().padStart(2, '0');
    const consumptionArray = [];
    try{
        const reportsQuery = query(collection(mainMeterRef, 'total_consumption'), where('month', '==', prevMonth), orderBy('date', 'asc'));          
        const reportSnapshot = await getDocs(reportsQuery);
        reportSnapshot.forEach( (doc) => {

            const waterConsumption = doc.data().consumption;
            const estConsumption = Math.round(waterConsumption * 1000) / 1000;
            if(!maxConsumption){
                maxConsumption = waterConsumption
                const date = doc.data().date
                const dateString = new Date(date)
                const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
    
                maxDate = formattedDate;
            } else {
                if(maxConsumption < waterConsumption ){
                    maxConsumption = waterConsumption
                    const date = doc.data().date
                    const dateString = new Date(date)
                    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
                    maxDate = formattedDate;
                } else {
                    // skip
                }
            }
            if(!minConsumption){
                minConsumption = waterConsumption
                const date = doc.data().date
                const dateString = new Date(date)
                const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
                minDate = formattedDate
            } else {
                if(minConsumption > waterConsumption ){
                    minConsumption = waterConsumption
                    const date = doc.data().date
                    const dateString = new Date(date)
                    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric'}).format(dateString);
                    minDate = formattedDate
                } else {
                    // skip
                }
            }
            consumptionArray.push(estConsumption);
        });
        const sum = consumptionArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const avg_month_consumption = sum / consumptionArray.length
        avg_est = Math.round(avg_month_consumption * 1000) / 1000;

    } catch (error) {
        console.log(error)
    }        
    const estMin = Math.round(minConsumption * 1000) / 1000;
    const estMax = Math.round(maxConsumption * 1000) / 1000;
    return [avg_est, estMin, minDate, estMax, maxDate]
}
// highlights for avg monthly
export async function avg_daily(){
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    let avg_est = 0
    let maxConsumption = null;
    let maxSource = null;
    let minConsumption = null;
    let minSource = null;
    //const date_temp = [];
    const consumptionArray = [];
    try{
        for(let i = 0; i < main_meter.length; i++){
            const reportsQuery = query(collection(mainMeterRef, main_meter[i]), orderBy('date', 'desc'), limit(1));          
            const reportSnapshot = await getDocs(reportsQuery);
             //console.log(reportSnapshot.size)
            reportSnapshot.forEach( (doc) => {
                const waterConsumption = doc.data().consumption;
                const estConsumption = Math.round(waterConsumption * 1000) / 1000;
                consumptionArray.push(estConsumption);

                if(!maxConsumption){
                    maxConsumption = waterConsumption
                    maxSource = main_meter[i]
                } else {
                    if(maxConsumption < waterConsumption ){
                        maxConsumption = waterConsumption
                        maxSource =  main_meter[i]
                    } else {
                        // skip
                    }
                }
                if(!minConsumption){
                    minConsumption = waterConsumption
                    minSource = main_meter[i]
                } else {
                    if(minConsumption > waterConsumption ){
                        minConsumption = waterConsumption
                        minSource = main_meter[i]
                    } else {
                        // skip
                    }
                }
            });    
        }
        const sum = consumptionArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const avg_consumption = sum / consumptionArray.length
        avg_est = Math.round(avg_consumption * 1000) / 1000;
    } catch (error) {
        console.log(error)
    }        
    const estMin = Math.round(minConsumption * 1000) / 1000;
    const estMax = Math.round(maxConsumption * 1000) / 1000;
    const min_meter = formatString(minSource)
    const max_meter = formatString(maxSource)
    return [avg_est, estMin, min_meter, estMax, max_meter];
}

export async function getMainMetersToPie(){
    const meterRecordsRef = collection(db, 'meter_records');
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    //const date_temp = [];
    const consumptionArray = [];
    try{
        for(let i = 0; i < main_meter.length; i++){
            const reportsQuery = query(collection(mainMeterRef, main_meter[i]), orderBy('date', 'desc'), limit(1));          
            const reportSnapshot = await getDocs(reportsQuery);
             //console.log(reportSnapshot.size)
            reportSnapshot.forEach((doc) => {
                const waterConsumption = doc.data().consumption;
                const estConsumption = Math.round(waterConsumption * 1000) / 1000;
                consumptionArray[i]=estConsumption;
            });    
        }    
        return consumptionArray;
    } catch (error) {
        console.log(error)
    }        

}


// search
export async function search_record(date_input, waterSource){
    const meterRecordsRef = collection(db, 'meter_records');
    const subMeterRef = doc(meterRecordsRef, 'submeter')
    const mainMeterRef = doc(meterRecordsRef, 'main_meter'); 
    let value = 0;
    try {  
        if(main_meter.includes(waterSource)){
            const [year, month, day] = date_input.split("-");
            const recordQuery = query(collection(mainMeterRef, waterSource), 
                                where('month', '==', month),
                                where('day', '==', day),
                                where('year', '==', year), 
                                limit(1));
            const recordSnapshot = await getDocs(recordQuery);
            recordSnapshot.forEach((doc) => {
                const waterConsumption = doc.data().consumption;
                value = Math.round(waterConsumption * 1000) / 1000;
            });            
        } else {
            const [year, month, day] = date_input.split("-");
            const recordQuery = query(collection(subMeterRef, waterSource), 
                                where('month', '==', month),
                                where('day', '==', day),
                                where('year', '==', year), 
                                limit(1));
            const recordSnapshot = await getDocs(recordQuery);
            recordSnapshot.forEach((doc) => {
                const waterConsumption = doc.data().consumption;
                value = Math.round(waterConsumption * 1000) / 1000;
            });      
        }

        
    } catch(error) {
        console.log("Error searching a record:", error)
    }
    return value
}


/* no use pero baka magamit pa ung algo
export async function monthly_consumption(){
    try {

    }
    const yearRef = doc(meterRecordsRef, year);
    for(let i = 0; i < currentMonth; i++){
        // for main meter
        for(let j = 0; j < main_meter.length; j++){
            // dito query  
            const monthly_snapshot = await getDocs(collection(yearRef, month_path[2]));
            console.log("werk")
            //let total;
            monthly_snapshot.forEach((daily) => {
                //const mainMeterDocID = childDoc.id;
                console.log(daily.id, ' => ', daily.data())
                
                const dayRef = monthDocSnapshot.ref;
                const metro = collection(dayRef, 'main_meter')
                console.log('okay')
                const mainMeterDocRef = doc(metro, main_meter[0]);
                console.log('eto 2 okay')
                const mainMeterDocSnapshot = getDoc(mainMeterDocRef);
                console.log('eto okay?')
                if(mainMeterDocSnapshot.exists){
                    const consumption = mainMeterDocSnapshot.get('consumption');
                    console.log(consumption);
                } else {
                    console.log('error')
                }
                
                total =+ parseFloat(consumption_value);
            })
            
            month_snap.forEach(childDoc => {
                //const source = doc(collection(childDoc, 'main_meter'), main_meter[j]).get('consumption');
                console.log(childDoc)
            })
            // Create a query to search for documents containing the specified substring
            // snapshot loop then increment the value of consumption
            // store final into the object 
        }
        // store the total
        // for loop for submeters
        // store the total 
    //}
}}

*/
/* eto daily water consumption dipa ayos nabago ung approach
export async function daily_consumption(object){
    // dito nalang mag get current date tas saka iimplpement ung next 30 days
    // pero for now, ung december data muna
    const month = 12
    const startDate = new Date(2023, month - 1, 1);
    startDate.setFullYear(2023, month - 1, 1);
    //const total = []
    try{
        //pasok outer loop for sources
        for(let i = 0; i < main_meter.length; i++){
            const sourceRef = collection(mainMeterRef, main_meter[i]);
            const querySnapshot = await getDocs(sourceRef);
            var totalConsumption = 0;
            querySnapshot.forEach((doc) => {
                const dateValue = doc.data().date;
                const waterValue = doc.data().consumption;
                if(dateValue.length >= 7 && dateValue.substring(5, 7) === `${month}`){
                    // get consumption field
                    totalConsumption += waterValue;
                    //console.log(`${main_meter[i]}: ${dateValue}, ${waterValue}`)
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
    return object
    
    
    /* second code
    for (let i = 0; i < main_meter.length; i++) {
        //temporaries for date and time
        const value_temp = []
        const date = []
         saka na tong previous month pag realtime na ginagawa reading
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Month is zero-based
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Handle January edge case
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const currentDay = currentDate.getDate();
        
        const last_month_query = 
         kapag 30 day count 
        const last_30_query = query(collection(mainMeterRef, main_meter[i]), orderBy('__name__', 'desc'), limit(30));
        
        //saka na pag latest na tlga ung date
        //const curr_date = new Date().toISOString().split('T')[0];
        //const daily_query = query(collection(mainMeterRef, main_meter[i]),)
        const querySnapshot = await getDocs(last_30_query);
        console.log(i)
        querySnapshot.forEach(doc => {
            // ni format date into text format (e.g., "April 20, 2022")
            // stores only once
            if(i == 0){
                const date_string = new Date(doc.id)
                const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date_string);
                date.push(formattedDate);
                object['date'] = date;
            }
            value_temp.push(doc.data().consumption);
            object[main_meter[i]] = value_temp;
        });
    }
    for (let i = 0; i < object['date'].length; i++){
        total[i] = parseFloat(object[main_meter[0]][i]) + parseFloat(object[main_meter[1]][i]) + parseFloat(object[main_meter[4]][i])
    }
    object['total_consumption'] = total
    return object
}*/

//lipat data bla bla bla ignore nyo nalang

const prime_water = [
    0,
    0,
    0,
    115.97,
    26.28,
    28.27,
    0,
    0,
    55.38,
    23.02,
    23.55,
    25.83,
    31.67,
    0,
    0,
    0,
    81.08,
    25.66,
    23.04,
    29.72,
    0,
    0,
    92.78,
    29.97,
    20.71,
    19.2,
    50.9,
    0,
    0,
    88.05,
    23.14,
    23.73,
    22.31,
    31.164,
    10.388,
    10.388,
    18.9,
    32.88,
    22.7,
    22.23,
    45.294,
    15.098,
    15.098,
    27.12,
    19.88,
    26.33,
    24.49,
    34.236,
    11.412,
    11.412,
    19.21,
    21.18,
    17.83,
    25.38,
    12.69,
    12.69,
    12.69,
    26.73,
    15.27,
    22.89,
    20.32,
    34.134,
    11.378,
    11.378,
    15.48,
    19.4,
    21.87,
    21.04,
    37.386,
    12.462,
    12.462,
    22.39,
    23.01,
    40.19,
    42.88,
    75.534,
    25.178,
    25.178,
    46.26,
    48.65,
    46.16,
    50.4,
    76.674,
    25.558,
    25.558,
    48.29,
    51.28,
    50.7,
    47.68,
    82.428,
    27.476,
27.476,
51.13,
51.07,
66.4596,
60.55208,
60.55208,
60.55208,
60.55208,
37.31,
26.81,
37.31,
26.81,
35.85,
11.95,
11.95,
22.32,
24.96,
23.22,
39.1995,
11.977625,
11.977625,
11.977625,
41.406,
13.802,
13.802,
40.43,
31.9275,
9.755625,
9.755625,
9.755625,
33.82,
42.35,
40.74,
59.226,
19.742,
19.742,
37.97,
36.89,
39.21,
37.95,
38.766,
12.922,
12.922,
19.01,
26.08,
23.64,
22.74,
38.382,
12.794,
12.794,
20.65,
27.66,
20.73,
20.69,
36.006,
12.002,
12.002,
45.23,
23.2,
28.93,
19.12,
39.54,
13.18,
13.18,
24.09,
27,
21.37,
24.12,
31.296,
15.648,
15.648,
15.648,
27.1,
27.59,
25.31,
39.96,
13.32,
13.32,
26.46,
23.72,
19.35,
32.68,
38.676,
12.892,
12.892,
27.91,
23.94,
23.94,
34.41,
28.32,
9.44,
9.44,
25.89,
21.13,
26.4,
46.21,
56.508,
18.836,
18.836,
40.69,
38.03,
32.04,
34.16,
54.882,
18.294,
18.294,
34.63,
41.83,
36.04,
35.2,
77.478,
25.826,
25.826,
38.49,
47.81,
45.02,
38.92,
64.29,
21.43,
21.43,
41.19,
41.19,
42.89,
32.48,
33.3531,
33.3531,
33.3531,
37.62,
33.44,
33.21,
37,
42.6063,
42.6063,
42.6063,
37.09,
31.94,
35.41,
25.48,
30.723,
30.723,
30.723,
10.241,
25.68,
25.42,
16.02,
19.074,
19.074,
19.074,
6.358,
21.09,
21.13,
19.97,
18.693,
18.693,
18.693,
39.450,
29.550,
32.970,
23.330,
24.147,
24.147,
24.147,
23.880,
19.690,
25.240,
32.600,
20.643,
20.643,
20.643,
27.650,
23.660,
27.310,
30.100,
29.520,
29.520,
29.520,
24.480,
25.210,
33.980,
36.350,
29.167,
29.167,
29.167,
24.660,
25.570,
25.800,
28.140,
13.640,
43.830,
43.830,
21.700,
30.750,
19.350,
27.480,
18.017,
18.017,
18.017,
25.000,
17.740,
19.940,
17.990,
18.007,
18.007,
18.007,
29.290,
25.740,
22.650,
19.820,
22.057,
22.057,
22.057,
28.050,
28.050,
28.050,
28.050,
29.217,
29.217,
29.217,
35.530,
31.430,
29.650,
38.140,
35.003,
35.003,
35.003,
30.080,
30.370,
30.660,
28.440,
26.347,
26.347,
26.347,
30.500,
30.701,
30.701,
30.701,
30.701,
30.701,
30.701,
30.701,
30.701,
27.770,
24.540,
28.180,
28.180,
28.180,
31.920,
28.000,
16.980,
21.088,
21.088,
21.088,
21.088,
16.060,
26.760,
15.030,
27.570,
19.167,
19.167,
19.167,
23.050,
20.980,
19.310,
22.020,
17.930,
17.930,
17.930,
17.930,
17.930,
21.630,
16.530,
6.450,
22.856,
22.856
]
const DW1 = [
    0,
    0,
    0,
    191.6,
    29.76,
    36.55,
    0,
    0,
    95.17,
    25.02,
    21.53,
    51.76,
    18.11,
    0,
    0,
    0,
    166.44,
    33.41,
    32.84,
    30.88,
    0,
    0,
    90.12,
    52.97,
    37.11,
    21.28,
    37.57,
    0,
    0,
    127.06,
    33.76,
    34.85,
    48.7,
    60.936,
    20.312,
    20.312,
    45.67,
    48.66,
    45.67,
    48.89,
    69.87,
    23.29,
    23.29,
    44.98,
    23.36,
    53.9,
    36.95,
    65.55,
    21.85,
    21.85,
    21.56,
    57.17,
    58.04,
    70.588,
    35.294,
    35.294,
    35.294,
    38.24,
    53.66,
    40.64,
    54.59,
    76.188,
    25.396,
    25.396,
    35.12,
    48.29,
    48.42,
    42.28,
    73.158,
    24.386,
    24.386,
    51.26,
    43.03,
    38.02,
    36.76,
    79.248,
    26.416,
    26.416,
    36.96,
    51.69,
    45.56,
    38.4,
    75.93,
    25.31,
    25.31,
    29.42,
    50.02,
    58.24,
    37.03,
    64.344,
    21.448,
    21.448,
    37.4,
    38.45,
    27.3096,
    24.88208,
    24.88208,
    24.88208,
    24.88208,
    40.75,
    34.05,
    40.75,
    34.05,
    61.092,
    20.364,
    20.364,
    38.49,
    54.98,
    33.39,
    64.8945,
    19.828875,
    19.828875,
    19.828875,
    43.68,
    14.56,
    14.56,
    40.66,
    82.215,
    25.12125,
    25.12125,
    25.12125,
    29.75,
    36.4,
    59.8,
    66.006,
    22.002,
    22.002,
    45.25,
    36.84,
    47.11,
    45.03,
    79.224,
    26.408,
    26.408,
    56.82,
    47.22,
    46.25,
    52.38,
    82.194,
    27.398,
    27.398,
    30.64,
    54.23,
    45.76,
    42.2,
    48.03,
    16.01,
    16.01,
    65.07,
    39.32,
    30.25,
    31.16,
    52.356,
    17.452,
    17.452,
    26.81,
    38.04,
    39.19,
    47.62,
    37.904,
    18.952,
    18.952,
    18.952,
    32.62,
    39.32,
    34.91,
    51.498,
    17.166,
    17.166,
    33.87,
    29.54,
    29.59,
    57.21,
    45.96,
    15.32,
    15.32,
    39.8,
    27.72,
    27.72,
    38.32,
    58.722,
    19.574,
    19.574,
    37.81,
    21.23,
    33.38,
    29.25,
    58.704,
    19.568,
    19.568,
    44.41,
    17.6,
    13.29,
    72.69,
    58.17,
    19.39,
    19.39,
    33.51,
    41.04,
    36.42,
    24.84,
    37.782,
    12.594,
    12.594,
    18.2,
    38.55,
    17.59,
    19.05,
    51.924,
    17.308,
    17.308,
    27.73,
    27.73,
    29.6,
    27.2,
    19.0872,
    19.0872,
    19.0872,
    19.22,
    57.91,
    20.48,
    38.17,
    21.9879,
    21.9879,
    21.9879,
    28.07,
    37.16,
    35.94,
    38.14,
    55.4466,
    55.4466,
    55.4466,
    16.802,
    33.91,
    50.4,
    48.64,
    58.428,
    58.428,
    58.428,
    19.476,
    47.58,
    59.68,
    51.4,
    50.513,
    50.513,
    50.513,
    58.550,
    52.400,
    61.910,
    51.800,
    56.500,
    56.500,
    56.500,
    32.810,
    33.240,
    26.850,
    35.950,
    26.537,
    26.537,
    26.537,
    49.520,
    15.280,
    52.310,
    23.350,
    19.230,
    19.230,
    19.230,
    22.080,
    37.040,
    28.120,
    42.540,
    21.957,
    21.957,
    21.957,
    31.460,
    32.190,
    32.690,
    34.460,
    13.370,
    39.250,
    39.250,
    32.290,
    48.230,
    30.530,
    35.550,
    33.210,
    33.210,
    33.210,
    46.530,
    33.000,
    31.030,
    33.740,
    21.090,
    21.090,
    21.090,
    33.760,
    16.030,
    31.130,
    40.210,
    14.298,
    14.298,
    14.298,
    10.700,
    10.700,
    10.700,
    10.700,
    17.230,
    17.230,
    17.230,
    32.490,
    31.680,
    33.530,
    21.740,
    25.713,
    25.713,
    25.713,
    31.690,
    34.510,
    33.290,
    34.270,
    30.277,
    30.277,
    30.277,
    54.950,
    37.930,
    37.930,
    37.930,
    37.930,
    37.930,
    37.930,
    37.930,
    37.930,
    33.610,
    15.750,
    37.360,
    37.360,
    37.360,
    45.860,
    55.330,
    24.070,
    46.168,
    46.168,
    46.168,
    46.168,
    47.740,
    34.980,
    19.390,
    40.050,
    29.543,
    29.543,
    29.543,
    15.560,
    35.810,
    19.700,
    20.900,
    16.752,
    16.752,
    16.752,
    16.752,
    16.752,
    29.990,
    35.950,
    15.020,
    21.776,
    21.776
]
const DW2 = [
    0,
    0,
    0,
    126.42,
    18.03,
    22.14,
    0,
    0,
    95.35,
    30,
    33.18,
    27.89,
    22.4,
    0,
    0,
    0,
    161.19,
    22.72,
    20.64,
    19.71,
    0,
    0,
    58.97,
    22.63,
    14.82,
    25.57,
    18.62,
    0,
    0,
    108.71,
    47.1,
    33.9,
    46.99,
    64.386,
    21.462,
    21.462,
    24.52,
    32.79,
    28.53,
    28.71,
    63.342,
    21.114,
    21.114,
    43.36,
    39.22,
    37.93,
    45.26,
    58.776,
    19.592,
    19.592,
    33.71,
    27.92,
    50.08,
    26.808,
    13.404,
    13.404,
    13.404,
    22.18,
    24.22,
    43.53,
    38.9,
    54.372,
    18.124,
    18.124,
    30.32,
    17.4,
    23.72,
    31.16,
    56.694,
    18.898,
    18.898,
    36.76,
    25.74,
    24.11,
    31.89,
    58.59,
    19.53,
    19.53,
    42.98,
    22.34,
    30.52,
    35.5,
    26.958,
    8.986,
    8.986,
    27.53,
    38.48,
    36.03,
    33.35,
    51.42,
    17.14,
17.14,
24,
25.49,
14.6178,
13.31844,
13.31844,
13.31844,
13.31844,
13.33,
30.29,
13.33,
30.29,
44.748,
14.916,
14.916,
29.98,
31.38,
27.02,
47.853,
14.62175,
14.62175,
14.62175,
62.58,
20.86,
20.86,
41.42,
46.8945,
14.328875,
14.328875,
14.328875,
31.33,
29.11,
27.37,
46.554,
15.518,
15.518,
17.57,
28.82,
23.91,
35.02,
61.608,
20.536,
20.536,
23.78,
18.91,
23.58,
32.79,
70.176,
23.392,
23.392,
21.78,
23.48,
18.96,
19.12,
30.018,
10.006,
10.006,
26.91,
19.41,
9.55,
21.85,
15.216,
5.072,
5.072,
22.4,
36.31,
8.48,
13.55,
22.644,
11.322,
11.322,
11.322,
26.91,
20.23,
17.29,
33.726,
11.242,
11.242,
25.78,
30.12,
22.92,
28.18,
34.344,
11.448,
11.448,
30.3,
20.635,
20.635,
37.8,
64.608,
21.536,
21.536,
32.97,
40.33,
38.91,
29.76,
48.312,
16.104,
16.104,
40.02,
11.24,
39.35,
35.53,
78.594,
26.198,
26.198,
48.84,
37.38,
38.91,
32.44,
56.508,
18.836,
18.836,
41.71,
33.12,
37.33,
29.286,
28.7124,
9.5708,
9.5708,
33.67,
33.67,
21.08,
21.05,
19.9914,
19.9914,
19.9914,
28.24,
10.99,
10.12,
12.91,
14.1966,
14.1966,
14.1966,
17.48,
17.77,
16.11,
21.09,
43.2069,
43.2069,
43.2069,
13.093,
45.99,
50,
38.29,
46.476,
46.476,
46.476,
15.492,
50.54,
49.52,
46.61,
39.567,
39.567,
39.567,
48.170,
44.640,
31.930,
35.000,
27.180,
27.180,
27.180,
40.450,
38.360,
32.800,
36.890,
33.617,
33.617,
33.617,
43.340,
35.130,
36.320,
33.170,
28.047,
28.047,
28.047,
32.610,
33.990,
36.230,
41.810,
36.577,
36.577,
36.577,
34.340,
37.500,
50.520,
43.140,
18.350,
57.630,
57.630,
46.240,
43.990,
46.570,
29.580,
42.530,
42.530,
42.530,
48.370,
47.600,
41.640,
48.530,
42.700,
42.700,
42.700,
49.040,
43.050,
35.430,
60.270,
44.463,
44.463,
44.463,
42.260,
42.260,
42.260,
42.260,
44.760,
44.760,
44.760,
45.120,
50.100,
53.210,
51.020,
45.770,
45.770,
45.770,
44.970,
96.120,
0.000,
48.180,
42.193,
42.193,
42.193,
47.530,
50.944,
50.944,
50.944,
50.944,
50.944,
50.944,
50.944,
50.944,
34.990,
29.030,
27.160,
27.160,
27.160,
34.370,
33.780,
30.920,
34.897,
34.897,
34.897,
34.897,
46.920,
47.360,
25.650,
27.500,
27.813,
27.813,
27.813,
30.650,
27.450,
27.240,
24.120,
22.694,
22.694,
22.694,
22.694,
22.694,
26.060,
19.740,
22.830,
22.830,
22.830
]