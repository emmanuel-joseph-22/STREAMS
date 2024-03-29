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
        position: absolute;
        height: 200px;
        left: 285px;
        z-index: 16;
        width: calc(100% - 290px);
        min-width: 600px;
        margin: 0 auto;
        background-color: rgba(136, 199, 255, 0);
        transition: ease-in-out 0.3s;
    }

    @media screen and (max-width: 1000px){
        .main_content{
            left: 95px;
        }
    }
    @media screen and (max-width: 766px){
        .main_content{
            left: 0;
        }
    }

</style>