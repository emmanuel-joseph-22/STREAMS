<template> 
    <div class="main_content">
        <nav-bar/>
        <slot></slot>
    </div>
</template>

<script>
import nav_bar from '../../components/nav_bar_component.vue';

export default {
components: {
    "nav-bar": nav_bar
},
data(){
    return{

    }
},
methods: {
    
}
}
</script>

<style scoped>
    .main_content{
        height: 200px;
        margin-left: 85px;
        width: calc(100% - 89px);
    }
    @media screen and (max-width: 1000px){
        .main_content{
            margin-left: 90px;
            width: calc(100% - 90px);
        }
    }
    @media screen and (max-width: 766px){
        .main_content{
            margin-left: 0;
            width: 100%;
        }
    }
</style>