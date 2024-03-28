<template> 
    <div>
        <side-bar/>
        <div class="main_content">
            <slot></slot>
        </div>
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
        left: 280px;
        z-index: 16;
        width: calc(100% - 280px);
        min-width: 600px;
        margin: 0 auto;
        background-color: rgba(127, 195, 255, 0.338);
    }

</style>