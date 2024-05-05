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
    async mounted(){
        await store.dispatch(`setTotalAccumulated`)
        await store.dispatch('setMonthlyAvg')
        await store.dispatch('setDailyAvg')
        await store.dispatch('setDailyConsumption')
        await store.dispatch('setMonthlyConsumption')
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