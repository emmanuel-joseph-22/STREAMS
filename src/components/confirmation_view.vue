<template>
        <blur/>
        <div class="container">
            <!-- dito ung contents -->
            <div class="warning_content">
                <slot></slot>
            </div>
            <div class="confirm">
                <button @click="confirmAction(false)">Cancel</button>
                <button @click="confirmAction(true) ">Confirm</button>
            </div>
        </div>
</template>
<script>
import blur from './../components/blur_background.vue';
export default{
    components: {
        blur
    },
    methods: {
        confirmAction(confirmValue){
            console.log(confirmValue);
            // pass the confirm value to the parent component
            this.$emit('confirmEvent', confirmValue);
        }
    }
}

</script>

<style scoped>
  .container{
        position: absolute;
        /* icecenter si absolute div */
        top: 200%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #FFFFFF;
        border: 2px solid #3B5271;
        border-radius: 20px;
        min-height: 400px;
        padding: 0 1rem;
        z-index: 20;
  }
    .confirm{
        display: flex;
    }
    .confirm button{
        background-color: #5F88BF;
        color: #F2F5F9;
        width: 40vw;
        padding: 15px 25px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin: 5px;
    }
    .confirm button:first-of-type{
        background-color: rgb(158, 56, 56);
    }

    .confirm button:hover{
        background-color: #3B5271;
    }

    .warning_content{
        margin: 50px auto;
    }

</style>
