<template>
    <div>
        <!-- nav bar for web -->
        <div class="nav_bar" v-if="!isMobile" :class="{ collapsed: navbarCollapsed }">
            <header>
                <!-- tinanggal ko class=icon ang cute nagzzooom -->
                <div v-show="!navbarCollapsed">
                    <div class="flex">
                        <span @click="toggleNavbar" title="Close Bar">
                            <img class="icon" src="fake_logo.png" alt="Toggle Icon">
                        </span>
                        <div class="name text font-bold text-xl transition ease-in-out 300">
                            STREAMS
                        </div>
                    </div>
                </div>
                <div v-if="navbarCollapsed" @click="toggleNavbar" title="Open Bar">
                    <span>
                        <img class="icon" src="fake_logo.png" alt="Toggle Icon">
                    </span>
                </div>

                <router-link class="navbar_link" :to="{ name: 'dashboard' }" title="Home">
                    <div class="navbar_icon home_icon">
                        <!-- nav icon -->
                        <img ref="navIcon" class="icon" src="home_icon.png" :style="{ 'margin-left': navbarCollapsed ? '0' : '41px' }"/>
                        <!-- nav link label -->
                        <div class="navlink_label" v-if="!navbarCollapsed">Home</div>
                    </div>
                </router-link>
                <!-- report div -->
                <router-link class="navbar_link" to="/report" title="Reports">
                    <div class="navbar_icon">
                        <!-- nav icon -->
                        <img ref="navIcon" class="icon" src="report_icon.png" :style="{ 'margin-left': navbarCollapsed ? '0' : '41px' }"/>
                        <div class="navlink_label" v-if="!navbarCollapsed">Report</div>
                    </div>
                </router-link>
                <!-- map div -->
                <router-link class="navbar_link" to="/map" title="Maps">
                    <div class="navbar_icon">
                        <!-- nav icon -->
                        <img class="icon" src="map_icon.png" :style="{ 'margin-left': navbarCollapsed ? '0' : '41px' }"/>
                        <div class="navlink_label" v-if="!navbarCollapsed">Maps</div>
                    </div>
                </router-link>
            </header>
            <div class="empty_space"></div>
                <!-- hamburger icon -->
                <div class="dropdown_menu" @click="showMoreOptions">
                    <div class="hamburger" :style="{ 'margin-left': navbarCollapsed ? '0' : '41px' }">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    <div class="navlink_label" v-if="!navbarCollapsed">More</div>
                </div>
                <div class="dropdown_content" v-if="more_settings">
                    <!-- feedback link -->
                    <router-link class="navbar_link" to="/feedback">
                        <div class="other_link_label"><span>Feedback</span></div>
                    </router-link>
                    <!-- convservation tips ewan san lalagay -->
                    <router-link class="navbar_link" to="/tips">
                        <div class="other_link_label"><span>Useful Techniques</span></div>
                    </router-link>
                    <!-- profile view -->
                    <router-link class="navbar_link" to="/settings">
                        <div class="other_link_label"><span>Account Settings</span></div>
                    </router-link>
                    <!-- baka bet nyo magdark mode
                    <div class="navlink_label" @click="switch_mode">Dark Mode</div>  -->
                    <router-link class="nav_link" to="/">
                    <div class="other_link_label" @click="logout"><span>Logout</span></div>
                    </router-link>
                </div>
        </div>

        <!-- bottom nav bar for mobile -->
        <div class="nav_mobile" v-if="isMobile">
            <div class="flexbox_icons">
                <div class="mobile_link">
                    <router-link :to="{ name: 'dashboard' }">
                        <img class="mobile_icon" src="home2.png" />
                    </router-link>
                </div>
                <div class="mobile_link">
                    <router-link to="/reading">
                        <img class="mobile_icon" src="metro.png" />
                    </router-link>            
                </div>
                <div class="mobile_link">
                    <router-link to="/map"> 
                        <img class="mobile_icon" src="map2.png" />
                    </router-link>        
                </div>
            </div>
        </div>

        <!-- top bar for mobile -->
        <div class="more_settings_button" v-if="isMobile">
            <img src="account.png" alt="more settings"/>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            more_settings: false,
            dark_mode: false,
            isMobile: false,
            admin: true,
            navbarCollapsed: true
        }
    },
    mounted(){
        this.checkScreenWidth();
        window.addEventListener('resize', this.checkScreenWidth);
        
    },
    unmounted(){
        window.removeEventListener('resize', this.checkScreenWidth);
    
    },
    methods: {
        // for dark mode
        switch_mode(){
            this.dark_mode = !this.dark_mode
        },
        logout(){
            // call nalang si log out function
            console.log('logged out')
        },
        showMoreOptions(){
            this.more_settings = !this.more_settings
        },
        checkScreenWidth(){
            const screenWidth = window.innerWidth;
            const mobileThreshold = 766;

            this.isMobile = screenWidth <= mobileThreshold;
        },
        toggleNavbar() {
            this.navbarCollapsed = !this.navbarCollapsed;
            if (this.navbarCollapsed) {
                this.more_settings = false;
            }
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
        width: 250px;
        height: 100%;
        box-sizing: border-box;
        padding: 10px 14px;
        background-color: var(--navy);
        border-right: 1px solid var(--border);
        transition: ease-in-out 0.6s;
        overflow: hidden;
        z-index: 10; /* oa nyan */
        display: flex;
        flex-direction: column;
    }
    .nav_bar.collapsed {
        width: 90px;
        transition: ease-in-out 0.4s;
    }
    .nav_bar > header {
        position: relative;
        top: 15px;
    }
    .navbar_link{
        text-decoration: none;
    }
    .navbar_icon{
        width: 95%;
        height: 70px;
        text-align: center;
        display: flex;
        padding-left: 7px;
        margin: 5px auto;
    }
    .navbar_icon:hover{
        background-color: var(--navbarHover);
        transition: background-color 0.5s;
        border-radius: 12px;
        cursor: pointer;
    }
    .home_icon{
        margin-top: 150px;
    }
    .icon{
        width: 44px;
        height: 42px;
        margin-top: 10px;
        fill: white;
        transition: ease-in-out 0.6s;
    }
    .navlink_label, .other_link_label{
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
    .other_link_label:hover{
        background-color: var(--dropdownHover);
        color: var( --text_color);
        border-radius: 10px;
        cursor: pointer;
    }
    .navlink_label > span:hover{
        color: var(--link_hover);
    }
    .empty_space{
        height: 100%;
    }
    .dropdown_menu{
        width: 95%;
        margin: 15px auto;
        text-align: center;
        display: flex;
        margin-bottom: auto;
        padding-left: 6px;
        transition: ease-in-out 0.3s
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
        display: inline-block;
        text-align: center;
        transition: ease-in-out 0.6s;
    }
    .bar{
        width: 35px;
        height: 5px;
        background-color: var(--white);
        margin: 8px 0 8px 5px;
        /* idk
        -webkit-box-shadow: 0 0 3px var(--box-shadow-color);
        box-shadow: 0 0 3px var(--box-shadow-color);*/
    }
    .dropdown_content{
        display: block;
        position: fixed;
        bottom: 100px;
        left: 10px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px 20px;
        background-color: var(--dropdown);
        color: var(--white);
        width: 250px;
        height: 290px;
        border-radius: 20px;
        text-decoration: none;
        z-index: 19;
        text-align: left;
    }
</style>
<style scoped>
/* mobile navigation bar */
.nav_mobile{
    position: fixed;
    z-index: 15;
    align-items: center;
    bottom: 0;
    width: 100%;
    padding: 8px;
    background-color: var(--navy);
    border-top: 1px solid var(--white);
    transition: ease-in-out 0.3s;
}
.flexbox_icons{
    display: flex;
    justify-content: center;
}
.mobile_link{
    text-decoration: none;
    align-items: center;
    color: var(--white);
    text-align: center;
    margin: 0 auto;
}
.mobile_icon{
    height: 30px;
    width: 30px;
}
.more_settings_button{
    position: fixed;
    z-index: 10;
    display: flex;
    width: 35px;
    height: 35px;
    margin-left: calc(5px + 5vw);
    margin-top: 15px;
}
.more_settings_button:hover{
    cursor: pointer;
}
</style>
