import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
//import dataModule from './data';
import {daily_query, monthly_query, getTotalAccumulated, avg_monthly, avg_daily, quarterly_consumption } from '@/dashboard_query';
const store = createStore({
    state: {
        role: null, // User's role state
        // try ko lang tong sa dashboard na data
        //daily
        daily_values: null,
        //monthly
        monthly_values: null,
        //quarterly
        quarterly_values: null,

        //highlights for total
        totalAccumulated: 0, // total consumption
        maxTotalDate: null, // date of peak consumption
        minTotalDate: null, // date lowest consumption
        maxTotal: 0, // peak conusmption
        minTotal: 0, // lowest consumption

        monthly_avg_value: 0, // avg consumption
        maxOfCurrentMonth: 0, // peak consumption
        minOfCurrentMonth: 0, // lowest consumption
        maxMonthDate: null, // date of peak consumption
        minMonthDate: null, // date lowest consumption

        daily_avg_value: 0, // avg consumption
        maxDaily: 0, // peak consumption
        minDaily: 0, // lowest consumption
        maxSource: 0, // water source
        minSource: 0, // water source

        q_avg: 0, //ewan
        peakQrt: 0,
        flopQrt: 0,
        //readings
        readings: JSON.parse(localStorage.getItem('readings')||'[]'), //for reading local storage

        // loader signal
        loading: false
    },
    mutations: {
        // Mutation to set the user's role
        setRole(state, role) {
            state.role = role;
        },
        setDailyConsumption(state, consumption_list){
            state.daily_values = consumption_list
        },
        setMonthlyConsumption(state, consumption_list){
            state.monthly_values = consumption_list
        },
        setQuarterlyConsumption(state, consumption_list){
            state.quarterly_values = consumption_list
        },
        setTotalAccumulated(state, total){
            state.totalAccumulated = total
        }, 
        setMaxTotal(state, max){
            state.maxTotal = max
        },
        setMinTotal(state, min){
            state.minTotal = min
        },
        setMaxTotalDate(state, date){
            state.maxTotalDate = date
        },
        setMinTotalDate(state, date){
            state.minTotalDate = date
        },
        setMonthlyAvg(state, avg){
            state.monthly_avg_value = avg
        },
        setMaxOfCurrentMonth(state, max){
            state.maxOfCurrentMonth = max
        },
        setMinOfCurrentMonth(state, min){
            state.minOfCurrentMonth = min
        },
        setMinMonthDate(state, min){
            state.minMonthDate = min
        },
        setMaxMonthDate(state, min){
            state.maxMonthDate = min
        },
        setDailyAvg(state, avg){
            state.daily_avg_value = avg
        },
        setMaxDaily(state, max){
            state.maxDaily = max
        },
        setMinDaily(state, min){
            state.minDaily = min
        },
        setMaxSource(state, source){
            state.maxSource = source
        },
        setMinSource(state, source){
            state.minSource = source
        },
        setQuarterlyAvg(state, avg){
            state.q_avg = avg
        },
        setPeakQrt(state, max){
            state.peakQrt = max
        },
        setFlopQrt(state, min){
            state.flopQrt = min
        },
        ADD_READING(state, reading) {
            state.readings.push(reading);
        },
        CLEAR_READINGS(state) {
            state.readings = [];
        },
        startLoading(state) {
            state.loading = true; // Set loading state to true
        },
        stopLoading(state) {
        state.loading = false; // Set loading state to false
        }
    },
    actions: {
        // Action to update the user's role in the store
        updateRole({ commit }, role) {
            commit('setRole', role);
        },
        async setDailyConsumption( {commit} ){
            try{
                const fetchedData = await daily_query()
                commit('setDailyConsumption', fetchedData)
            } catch (error) {
                console.log(error)
            }
        },
        async setMonthlyConsumption({commit}){
            try{
                const object = {  
                    'deep_well_1': [], 
                    'deep_well_2': [],
                    'deep_well_3': [],
                    'deep_well_4': [],
                    'prime_water': [],
                    'total_consumption': []
                }
                const fetchedData = await monthly_query(object)
                commit('setMonthlyConsumption', fetchedData)
            } catch (error) {
                console.log(error)
            }
        },
        async setTotalAccumulated({commit}){
            try{
                const [total, min, minDate, max, maxDate] = await getTotalAccumulated()
                commit('setTotalAccumulated', total)
                commit('setMaxTotal', max)
                commit('setMinTotal', min)
                commit('setMaxTotalDate', maxDate)
                commit('setMinTotalDate', minDate)
            } catch(error){
                console.log(error)
            }
        },
        async setMonthlyAvg({commit}){
            try{
                const [avg, min, minDate, max, maxDate] =  await avg_monthly()
                commit('setMonthlyAvg', avg)
                commit('setMaxOfCurrentMonth', max)
                commit('setMinOfCurrentMonth', min)
                commit('setMinMonthDate', minDate)
                commit('setMaxMonthDate', maxDate)
            } catch(error){
                console.log(error)
            }
        },
        async setDailyAvg({commit}){
            try{
                const [avg, min, minSource, max, maxSource] = await avg_daily()
                commit('setDailyAvg', avg)
                commit('setMaxDaily', max)
                commit('setMinDaily', min)
                commit('setMaxSource', maxSource)
                commit('setMinSource', minSource)
            } catch(error){
                console.log(error)
            }
        },
        setQuarterlyConsumption({state, commit}){
            try{
                const quarter_array = quarterly_consumption(state.monthly_values)
                console.log(quarter_array)
                commit('setQuarterlyConsumption', quarter_array)
            } catch(error){
                console.log(error)
            }
        },
        setQuarterlyAvg({commit}){
            try{
                const quarter_cont = store.state.quarterly_values.total_consumption
                if(quarter_cont.length === 0){
                    // no max min and avg  
                    console.log('walang quarterly values total consumption')                  
                } else {
                    let sum = 0
                    let maxVal = quarter_cont[0]
                    let minVal = quarter_cont[0]
                    for(let i = 0; i < quarter_cont.length; i++){
                        if(quarter_cont[i] > maxVal){
                            maxVal = quarter_cont[i]
                        }
                        if(quarter_cont[i] < minVal){
                            minVal = quarter_cont[i]
                        }
                        sum += quarter_cont[i]
                    }           
                    const avg = sum / quarter_cont.length 
                    const final_avg = Math.round(avg * 1000) / 1000
                    commit('setQuarterlyAvg', final_avg)  
                    commit('setPeakQrt', maxVal)  
                    commit('setFlopQrt', minVal)    
                }

            } catch(error) {
                console.log(error)
            }
        },
        addReading({ commit }, reading){
            commit('ADD_READING', reading);
        },
        clearReadings({ commit }){
            commit('CLEAR_READINGS');
        }
    },/*
    module: {
        data: dataModule
    },*/
    plugins: [createPersistedState()], // Add the vuex-persistedstate plugin
});
export default store;
