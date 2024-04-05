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

</style>