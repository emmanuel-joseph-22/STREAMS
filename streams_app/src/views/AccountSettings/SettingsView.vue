<template>
    <home-page>
        <div class="account-cont">
            <div class="cont">
            <img src="user.png" alt="User" class="user-img">
            <div class="settings">
                <h1 class="mr-4">AQUATECH</h1>
                <h2>aquatech@gmail.com</h2>
                <!--<div class="def-name">
                    <label for="def-name" class="def-name-label">Default Name</label>
                    <input autofocus id="def-name" type="text" required placeholder="Default Name" class="def-name-input"/>
                </div>
                
                <router-link to="/password">-->
                <!--<div class="password">
                    <label for="password" class="password-label">Change Password</label>
                    <div class="password-input-cont">
                        <input autofocus id="password" type="text" required placeholder="Password" class="password-input"/>
                        <router-link to="/password">
                        <img src="next.png" alt="next-icon">
                        </router-link>
                    </div>   
                </div>-->
                <!--</router-link>-->
                <div class="default">
                    <h3>Default Name</h3>
                    <div class="def-icon">
                        <router-link to="/defname"><img src="next.png" alt=""></router-link>
                    </div>
                </div>

                <div class="password">
                    <h4>Change Password</h4>
                    <div class="pass-icon">
                        <router-link to="/password"><img src="next.png" alt=""></router-link>
                    </div>
                </div>

                <router-link to="/home">
                    <div class="body">
                        <a href="#">
                            <span>SUBMIT</span>
                            <div class="wave"></div>
                        </a>
                    </div>
                </router-link>
            </div>
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
    .account-cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    .account-cont img{
        width: 130px;
        height: 130px;
        margin: 15px;
        margin-left: 40%;
    }

    .cont{
        background-color: #042334;
        border-radius: 20px;
        width: 50%;
        height: 95vh;
        margin-top: 15px;
        margin-left: 10px;
    }

    .settings{
        flex: 1;
        padding: 8px;
        margin-top: 10px;
        margin-left: 8px;
        width: 100%;
    }

    .settings h1{
        font-size: 2rem;
        font-weight: bold;
        font-family: 'Times New Roman', Times, serif;
        color: #FFFFFF;
    }

    .settings h2{
        color: #4E636F;
        font-weight: bold;
    }

/*check*/
    .default h3,
    .password h4{
        color: #0E5E7B;
        font-size: 16px;
        font-weight: bold;
        margin-top: 10px;
        margin-right: 60%;
        opacity: 1;
    }
/*check*/
    .default,
    .password{
        width: 60%;
        height: 45px;
        box-sizing: border-box;
        border: 2px solid #5F88BF;
        border-radius: 3px;
        margin-top: 40px;
        margin-left: 20%;
        background-color: #FFFFFF;
        align-items: center;
    }   
/*check*/
    .def-icon img,
    .pass-icon img{
        width: 30px;
        height: 30px;
        margin: 10px;
        margin-top: -25px;
        margin-left: 26vw;
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
        /*dl nyo yung wave.png na asa public then paltan nyo na lang areng url nung location nung wave sa device nyo*/
        background-image: 'wave.png';
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