<template> 
        <div class="main_content relative transition ease-in-out duration-300">
            <nav-bar/>
            <slot></slot>
        </div>
</template>

<script>
import nav_bar from '../../components/nav_bar_component.vue';
/*
import { monthly_consumption, quarterly_consumption } from '../dashboard_query.js';

import { reactive } from 'vue';
import { useStore } from 'vuex';
import dataModule from './../../store/data'*/

export default {
    components: {
        "nav-bar": nav_bar
    },/*
    data(){
        return {
            daily_water_consumption_container: {
                'date': [],
                'deep_well_1': [], 
                'deep_well_2': [],
                'deep_well_3': [],
                'deep_well_4': [],
                'prime_water': [],
                'total_consumption': []
            }, 
            monthly_water_consumption_container: {
                'deep_well_1': [], 
                'deep_well_2': [],
                'deep_well_3': [],
                'deep_well_4': [],
                'prime_water': [],
                'total_consumption': []
            },
            quarter_container: {
                'deep_well_1': [], 
                'deep_well_2': [],
                'deep_well_3': [],
                'deep_well_4': [],
                'prime_water': [],
                'total_consumption': []
            }
        }
    },
    async mounted(){
        await monthly_consumption(this.monthly_water_consumption_container, this.daily_water_consumption_container)
        await quarterly_consumption(this.monthly_water_consumption_container, this.quarter_container)
        console.log(quarterly_consumption)
        console.log(this.monthly_water_consumption_container)
        const store = useStore();
        // Define reactive state
        const state = reactive({
            loading: true,
            });
        try{
            // Dispatch fetchData action from data.js module
            await store.dispatch(`${dataModule.namespaced}/fetchData`,
                this.daily_water_consumption_container,
                this.monthly_water_consumption_container,
                this.quarter_container
            );
/*
            // After fetching, update reactive state with fetched data
            state.monthlyData = store.getters[`${dataModule.namespaced}/monthlyData`];
            state.dailyData = store.getters[`${dataModule.namespaced}/dailyData`];
            state.quarterlyData = store.getters[`${dataModule.namespaced}/quarterlyData`];
            
            state.loading = false;
            console.log(state)
        } catch(error) {
            console.log("Error fetching data:", error)
            state.loading = false;
        }
        // Return reactive state and any other values needed by the component
        return {
            ...state,
        };
  
    }  */
    
}
</script>

<style scoped>
    .main_content{
        height: 200px;
        left: 85px;
        width: calc(100% - 89px);
    }
    @media screen and (max-width: 1000px){
        .main_content{
            left: 90px;
            width: calc(100% - 90px);
        }
    }
    @media screen and (max-width: 766px){
        .main_content{
            left: 0;
            width: 100%;
        }
    }
</style>