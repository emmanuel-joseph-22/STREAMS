<template> 
        <div class="main_content">
            <side-bar/>
            <slot></slot>
        </div>
</template>

<script>
import side_bar from '../../components/sidebar_component.vue';

export default {
    components: {
        "side-bar": side_bar
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
        left: 130px;
        z-index: 16;
        width: calc(100% - 290px);
        min-width: 600px;
        margin: 0 auto;
        background-color: rgb(136, 199, 255);
        transition: ease-in-out 0.3s;
    }

    @media screen and (max-width: 1000px){
        .main_content{
            left: 40px;
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