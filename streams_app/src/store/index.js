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
        monthly_avg_value: 0,
        daily_avg_value: 0,
        quarter_avg_value: 0 //ewan
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
        setMonthlyAvg(state, avg){
            state.monthly_avg_value = avg
        },
        setDailyAvg(state, avg){
            state.daily_avg_value = avg
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
                const total = await getTotalAccumulated()
                commit('setTotalAccumulated', total)
            } catch(error){
                console.log(error)
            }
        },
        async setMonthlyAvg({commit}){
            try{
                const avg = await avg_monthly()
                commit('setMonthlyAvg', avg)
            } catch(error){
                console.log(error)
            }
        },
        async setDailyAvg({commit}){
            try{
                const avg = await avg_daily()
                commit('setDailyAvg', avg)
            } catch(error){
                console.log(error)
            }
        }
    },/*
    module: {
        data: dataModule
    },*/
    plugins: [createPersistedState()], // Add the vuex-persistedstate plugin
});
export default store;
