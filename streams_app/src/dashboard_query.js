import { doc, getDocs, /*query, orderBy,*/ collection, /*limit*/ /*getDocFromCache*/ } from "firebase/firestore";
import { firestore as db } from './main.js';

//const meterRecordsRef = collection(db, 'meter_records');
//const mainMeterRef = doc(meterRecordsRef, 'main_meter');
//const meter_source = ['deep-well-1', 'deep-well-2', 'deep-well-3', 'deep-well-4', 'prime-water']

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
        
        const last_month_query = 
         kapag 30 day count*/
        const last_30_query = query(collection(mainMeterRef, main_meter[i]), orderBy('__name__', 'desc'), limit(30));
        
        //saka na pag latest na tlga ung date
        const curr_date = new Date().toISOString().split('T')[0];
        const daily_query = query(collection(mainMeterRef, main_meter[i]),)
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
}
export async function monthly_consumption(){
    try{
        const year = '2023';
        const month_path = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
        for(const month in month_path){
            const monthRef = collection(doc(collection(db, 'meter_records'), year), month_path[month]);
            const monthSnapshot = await getDocs(monthRef);
            console.log(year, month_path[month]);
            //let total;
            monthSnapshot.forEach((doc) => {
                if(doc.exists){
                    const value = doc.data()['main_meter']['deep-well-1'].consumption
                    console.log(doc.id, ' => ', value);
                } else {
                    console.log('bitch');
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
}
/*
export async function monthly_consumption(){
    const year = '2023';
    const month_path = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    //const currentDate = new Date();
    //const currentMonth = (currentDate.getMonth() + 1);
    
    const yearRef = doc(meterRecordsRef, year);
    //for(let i = 0; i < currentMonth; i++){
        // for main meter
        //for(let j = 0; j < main_meter.length; j++){
            // dito query  
            const monthly_snapshot = await getDocs(collection(yearRef, month_path[2]));
            console.log("werk")
            //let total;
            monthly_snapshot.forEach((daily) => {
                //const mainMeterDocID = childDoc.id;
                console.log(daily.id, ' => ', daily.data())
                /*
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
                */
                //total =+ parseFloat(consumption_value);
            //})
            /*
            month_snap.forEach(childDoc => {
                //const source = doc(collection(childDoc, 'main_meter'), main_meter[j]).get('consumption');
                console.log(childDoc)
            })*/
            // Create a query to search for documents containing the specified substring
            // snapshot loop then increment the value of consumption
            // store final into the object 
        //}
        // store the total
        // for loop for submeters
        // store the total 
    //}
//}
/*
export async function quarterly_consumption(object){

}*/