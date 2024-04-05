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
        position: relative;
        height: 200px;
        left: 95px;
        z-index: 16;
        width: calc(100% - 290px);
        transition: ease-in-out 0.3s;
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