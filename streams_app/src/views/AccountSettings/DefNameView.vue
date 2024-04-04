<template>
    <home-page>
        <div class="default">
            <div class="cont">
            <div class="change">
                <label for="input-change" class="change-label">Default Name</label>
                <input autofocus id="input-change" type="text" name="change" required placeholder="Default Name" class="change-input"/>
            </div>
            <div class="change-1">
                <label for="input-change-1" class="change-1-label">New Default Name</label>
                <input autofocus id="input-change-1" type="text" name="change-1" required placeholder="New Default Name" class="change-1-input"/>
            </div>

            <router-link to="/settings">
            <div class="confirm">
                <button>CONFRIM</button>
            </div>
            </router-link>
            </div>
        </div>
    </home-page>
</template>

<script>
import AccountPageView from './AccountPageView.vue';

    export default {
        components: {
            'home-page': AccountPageView,
        },
        data(){

        },
        mounted(){
        
        }
    }
</script>

<style scoped>
    .default{
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    .cont{
        background-color: #042334;
        border-radius: 20px;
        width: 50%;
        height: 60vh;
        margin-top: 80px;
        margin-left: 10px;
    }

    .change,
    .change-1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60%;
        margin-top: 40px;
        margin-left: 18%;
    }

    .change-label,
    .change-1-label {
        margin-right: 60%;
        font-weight: bold;
        color: #FFFFFF;
    }

    .change-input,
    .change-1-input { 
        width: 90%;
        flex: 1;
        padding: 10px;
        border: 2px solid #5F88BF;
        border-radius: 4px;
        font-size: 16px;
        color: #3B5271;
        box-sizing: border-box;
        outline: none;
    }

    .confirm button{
        background-color: #0E5E7B;
        color: #F2F5F9;
        width: 40%;
        padding: 10px 20px;
        margin-top: 40px;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .confirm button:hover{
        background-color: #36B4E7;
    }
</style>