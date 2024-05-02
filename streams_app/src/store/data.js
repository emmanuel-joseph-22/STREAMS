//import { ref } from 'vue';

export default {
    state: {
        monthlyData: null,
        dailyData: null,
        quarterlyData: null
    },
    mutations: {
        setMonthlyData(state, data) {
          state.monthlyData = data;
        },
        setDailyyData(state, data) {
            state.dailyData = data;
        },
        setQuarterlyData(state, data) {
            state.quarterlyData = data;
        }
      },
      actions: {
        async fetchData({ commit }, daily_obj, monthly_obj, quarter_obj) {
          try {
            
            commit('setMonthlyData', monthly_obj);
            commit('setDailyData', daily_obj);
            commit('setQuarterlyData', quarter_obj);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        },
    },
    getters: {
        monthlyData(state) {
            return state.monthlyData;
        },
        dailyData(state) {
            return state.dailyData;
        },
        quarterlyData(state) {
            return state.quarterlyData;
        },
    }
}