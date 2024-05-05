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
*/
import store from '@/store';

export default {
    components: {
        "nav-bar": nav_bar
    },
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
        await store.dispatch(`setTotalAccumulated`)
        await store.dispatch('setMonthlyAvg')
        await store.dispatch('setDailyAvg')
        //await store.dispatch('setDailyConsumption', this.daily_water_consumption_container)
        //await store.dispatch('setMonthlyConsumption', this.monthly_water_consumption_container)
    }
    
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