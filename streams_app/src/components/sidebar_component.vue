<template>
    <div>
        <div class="nav_bar">
            <!-- STREAMS brand -->
            <div class="branding_div">
                <!-- STREAMS brand template -->
                <img src="sdo.png" alt="Streams logo" class="icon">
                <h1>STREAMS</h1>
                <div>Sustainable Tracking, Recording, Evaluating of Aqua Metering System</div>
            </div>
            <!-- dashboard/home div -->
            <router-link class="navbar_link" :to="{ name: 'dashboard' }">
                <div class="navbar_icon home_icon">
                    <!-- nav icon -->
                    <img class="icon" src="home2.png"/>
                    <!-- nav link label -->
                    <div class="navlink_label">Home</div>
                
                </div>
            </router-link>
            <!-- report div -->
            <router-link class="navbar_link" to="/report">
                <div class="navbar_icon">
                    <!-- nav icon -->
                    <img class="icon" src="report.png"/>
                    <div class="navlink_label">Report</div>
                </div>
            </router-link>
            <!-- map div -->
            <router-link class="navbar_link" to="/map">
                <div class="navbar_icon">
                    <!-- nav icon -->
                    <img class="icon" src="map2.png"/>
                    <div class="navlink_label">Maps</div>
                </div>
            </router-link>

            <div class="empty_space"></div>
            <!-- hamburger icon -->
            <div class="dropdown_menu" @click="showMoreOptions">
                <div class="hamburger">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                <div class="navlink_label">More</div>
            </div>
            <div class="dropdown_content" v-if="more_settings">
                <!-- feedback link -->
                <router-link class="navbar_link" to="/">
                    <div class="navlink_label"><span>Feedback</span></div>
                </router-link>
                <!-- convservation tips ewan san lalagay
                <router-link class="navbar_link" to="/">
                    <div class="navlink_label">Tips</div>
                </router-link> -->
                <!-- profile view -->
                <router-link class="navbar_link" to="/">
                    <div class="navlink_label"><span>Account Settings</span></div>
                </router-link>
                <!-- baka bet nyo magdark mode
                <div class="navlink_label" @click="switch_mode">Dark Mode</div>  -->
                <div class="navlink_label" @click="logout"><span>Logout</span></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            more_settings: false,
            dark_mode: false
        }
    },
    mounted(){
    },
    unmounted(){

    },
    methods: {
        // for dark mode
        switch_mode(){

        },
        logout(){
            // call nalang si log out function
            console.log('logged out')
        },
        showMoreOptions(){
            this.more_settings = !this.more_settings
        }
    }
}
</script>

<style src="../themes/main.css"/>
<style scoped>
    .nav_bar{
        position: fixed;
        left: 0; 
        top: 0;
        /* ansolute size */
        width: 280px;
        height: 100%;

        box-sizing: border-box;
        padding: 10px 20px 10px 10px;
        background-color: var(--navy);
        border-right: 1px solid var(--border);
        transition: ease-in-out 0.3s;
        overflow: hidden;
        z-index: 10; /* oa nyan */

        display: flex;
        flex-direction: column;
    }
    .branding_div{
        display: flex;
    }
    .branding_div, .navbar_icon{
        width: 95%;
        height: 70px;
        margin: 6px auto;
        text-align: center;
        display: flex;
        transition: transform 0.24s ease-in-out;
    }
    .navbar_icon:hover{
        background-color: var(--navbarHover);
        border-radius: 15px;
        cursor: pointer;
    }
    .home_icon{
        margin-top: 20vh;
    }
    .icon{
        width: 44px;
        height: 42px;
        margin-top: 10px;
        margin-left: 41px;
        flex-shrink: 0;
        fill: white;
    }
    .navlink_label{
        transition: ease-in-out 0.3s;
        transition-delay: .2s;
        margin-left: 24px;
        line-height: 67px;
        white-space: nowrap;
        color: white;
        font-size: 1.14rem;
        text-decoration: none;
        cursor: pointer;
    }
    .navlink_label > span:hover{
        color: var(--link_hover);
    }
    .empty_space{
        height: 100%;
    }
    .navbar_link{
        text-decoration: none;
    }

    /* styles tulad ng nav icon pero para sa hamburger 
kase di ko mababa ung nav icon last of type sa bottom */
    .dropdown_menu{
        width: 95%;
        height: 70px;
        margin: 15px auto;
        text-align: center;
        display: flex;
        position: relative;
        margin-bottom: auto;
    }
    .dropdown_menu:hover{
        background-color: var(--navbarHover);
        border-radius: 15px;
        cursor: pointer;
    }
    .hamburger{
        width: 45px;
        height: 65px;
        margin-top: 10px;
        margin-left: 45px;
        display: inline-block;
        text-align: center;
    }
    .bar{
        width: 35px;
        height: 5px;
        background-color: var(--white);
        margin: 8px 0 8px 5px;
        /*
        -webkit-box-shadow: 0 0 3px var(--box-shadow-color);
        box-shadow: 0 0 3px var(--box-shadow-color);*/
    }
    .dropdown_content{
        display: block;
        position: fixed;
        bottom: 100px;
        left: 10px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 12px 20px;
        background-color: var(--dropdown);
        color: var(--white);
        width: 250px;
        height: 200px;
        border-radius: 20px;
        text-decoration: none;
        z-index: 20;
        text-align: left;
    }
</style>