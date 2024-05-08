import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
//import dataModule from './data';
import { avg_daily, avg_monthly, daily_query, getTotalAccumulated, monthly_query } from '@/dashboard_query';
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
        //highlights
        totalAccumulated: 0,
        maxTotal: 0,
        minTotal: 0,
        monthly_avg_value: 0,
        maxOfCurrentMonth: 0,
        minOfCurrentMonth: 0,
        daily_avg_value: 0,
        maxDaily: 0,
        minDaily: 0,
        maxSource: 0,
        minSource: 0,
        quarter_avg_value: 0, //ewan

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
        setMonthlyAvg(state, avg){
            state.monthly_avg_value = avg
        },
        setMaxOfCurrentMonth(state, max){
            state.maxOfCurrentMonth = max
        },
        setMinOfCurrentMonth(state, min){
            state.minOfCurrentMonth = min
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
        setQuarterlyConsumption({commit}){
            try{
                const object = 0
                console.log('baguhin pa code')
                commit('setQuarterlyConsumption', object)
            } catch(error){
                console.log(error)
            }
        },
        async setTotalAccumulated({commit}){
            try{
                const [total, min, minDate, max, maxDate] = await getTotalAccumulated()
                console.log('min:', minDate, 'max:', maxDate)
                commit('setTotalAccumulated', total)
                commit('setMaxTotal', max)
                commit('setMinTotal', min)
            } catch(error){
                console.log(error)
            }
        },
        async setMonthlyAvg({commit}){
            try{
                const [avg, min, minDate, max, maxDate] =  await avg_monthly()
                console.log('min avg:', minDate, 'max avg:', maxDate)
                commit('setMonthlyAvg', avg)
                commit('setMaxOfCurrentMonth', max)
                commit('setMinOfCurrentMonth', min)
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
