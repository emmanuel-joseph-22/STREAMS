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
        // kapag 30 day count
        const last_30_query = query(collection(mainMeterRef, main_meter[i]), orderBy('__name__', 'desc'), limit(30));
        
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
}