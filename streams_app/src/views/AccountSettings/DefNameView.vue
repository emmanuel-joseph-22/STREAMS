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
                <div class="body">
                    <a href="#">
                        <span>CONFIRM</span>
                        <div class="wave"></div>
                    </a>
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

    .body{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 25vh;
    }
    .body a{
        position: relative;
        display: block;
        padding: 10px 30px;
        border: 2px solid #00aeff;
        border-radius: 50px;
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: 4px;
        color: #00aeff;
        text-decoration: none;
        overflow: hidden
    }
    .body a span{
        position: relative;
        z-index: 1;
        transition: 1s;
    }
    .body a .wave{
        position: absolute;
        top: calc(100% + 22px);
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #00aeff;
        transition: 1s;
    }
    .body a:hover .wave{
        top: 0;
    }
    .body a .wave::before{
        content: '';
        position: absolute;
        top: -22px;
        left: 0;
        width: 100%;
        height: 22px;
        background: url(C:\Users\Asus\Downloads\wave.png);
        animation: animate 0.5s linear infinite;
    }
    @keyframes animate{
            0%
        {
            background-position-x: 0;
            background-position-x: -22px;
        }
        100%
        {
            background-position-x: 118px;
        }
    }
</style>