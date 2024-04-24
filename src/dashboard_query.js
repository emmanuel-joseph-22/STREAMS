import { doc, getDocs, query, orderBy, collection, limit /*getDocFromCache*/ } from "firebase/firestore";
import { firestore as db } from './main.js';

const meterRecordsRef = collection(db, 'meter_records');
const mainMeterRef = doc(meterRecordsRef, 'main_meter');
const main_meter = ['deep-well-1', 'deep-well-2', 'deep-well-3', 'deep-well-4', 'prime-water']

// fetches daily water consumption
export async function daily_consumption(object){
    const total = []
    for (let i = 0; i < main_meter.length; i++) {
        //temporaries for date and time
        const value_temp = []
        const date = []
        /* saka na tong previous month pag realtime na ginagawa reading
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Month is zero-based
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Handle January edge case
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const currentDay = currentDate.getDate();
        
        const last_month_query = */
        // kapag 30 day count
        const last_30_query = query(collection(mainMeterRef, main_meter[i]), orderBy('__name__', 'desc'), limit(30));
        // saka na pag latest na tlga ung date
        //const curr_date = new Date().toISOString().split('T')[0];
        //const daily_query = query(collection(mainMeterRef, main_meter[i]),)
        const querySnapshot = await getDocs(last_30_query);
        console.log(i)
        querySnapshot.forEach(doc => {
            // ni format date into text format (e.g., "April 20, 2022")
            // stores only once
            if(i == 0){
                const date_string = new Date(doc.id)
                const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' /* pede iadd ung year: 'numeric' */}).format(date_string);
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
}/*

export async function monthly_consumption(object){
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = (currentDate.getMonth() + 1)
    for(let i = 0; i < currentMonth; i++){
        // set the search substring
        const substringID = currentYear + '-' + currentMonth.toString().padStart(2, '0');
        // for main meter
        for(let j = 0; j < main_meter.length; j++){
            // dito query  
            // Create a query to search for documents containing the specified substring
            const monthly_query = query(collection(mainMeterRef, main_meter[j]), where("searchSubstrings", "array-contains", substringID));

            // snapshot loop then increment the value of consumption
            // store final into the object 
        }
        // store the total
        // for loop for submeters
        // store the total 
    }
    return object
}

export async function quarterly_consumption(object){

}*/