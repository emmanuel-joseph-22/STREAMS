<template>
    <div>
        <!-- nav bar for web -->
        <div class="nav_bar" v-if="!isMobile" :class="{ collapsed: navbarCollapsed }" @click="toggleNavbar" >
            <header>
                <!-- tinanggal ko class=icon ang cute nagzzooom -->
                <div v-show="!navbarCollapsed">
                    <div class="flex">
                        <span style="margin-left: 25px; cursor: pointer;">
                            <img class="streams_icon" src="streams_logo.png" alt="Toggle Icon"  >
                        </span>
                        <div class="name text-[#FFFFFF] font-bold text-xl transition ease-in-out 300 pt-5 pl-3">
                            STREAMS
                        </div>
                    </div>
                </div>
                <div v-if="navbarCollapsed" style="margin-left: 10px; cursor: pointer;">
                    <span>
                        <img class="streams_icon" src="streams_logo.png" alt="Toggle Icon" >
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
                <router-link class="navbar_link" to="/report" title="Reports" v-if="role == 'admin'">
                    <div class="navbar_icon">
                        <!-- nav icon -->
                        <img ref="navIcon" class="icon" src="report_icon.png" :style="{ 'margin-left': navbarCollapsed ? '0' : '41px' }"/>
                        <div class="navlink_label" v-if="!navbarCollapsed">Report</div>
                    </div>
                </router-link>
                
                <router-link class="navbar_link" to="/reading" title="Readings" v-if="role == 'employee'">
                    <div class="navbar_icon">
                        <!-- nav icon -->
                        <img ref="navIcon" class="icon" src="reading_icon.png" :style="{ 'margin-left': navbarCollapsed ? '0' : '41px' }"/>
                        <div class="navlink_label" v-if="!navbarCollapsed">Report</div>
                    </div>
                </router-link>

                <router-link class="navbar_link" to="/events" title="Readings" v-if="role == 'event admin'">
                    <div class="navbar_icon">
                        <!-- nav icon -->
                        <img ref="navIcon" class="icon" src="event_icon.png" :style="{ 'margin-left': navbarCollapsed ? '0' : '41px' }"/>
                        <div class="navlink_label" v-if="!navbarCollapsed">Report</div>
                    </div>
                </router-link>

                <!-- feedback div -->
                <router-link v-if="!role" class="navbar_link" to="/feedback">
                    <div class="navbar_icon">
                        <!-- nav icon -->
                        <img class="icon" src="community.png" :style="{ 'margin-left': navbarCollapsed ? '0' : '41px' }"/>
                        <div class="navlink_label" v-if="!navbarCollapsed">Community</div>
                    </div>
                </router-link>

                <!-- map div -->
                <router-link class="navbar_link"  to="/map" title="Maps">
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
                <div v-if="more_settings" class="fixed inset-0 z-1" @click="showMoreOptions"></div>
                <div class="dropdown_content" v-if="more_settings">
                    <!-- feedback link -->
                    <router-link class="navbar_link" to="/feedback">
                        <div class="other_link_label"><span>Community</span></div>
                    </router-link>
                    <!-- convservation tips ewan san lalagay -->
                    <router-link class="navbar_link" to="/tips">
                        <div class="other_link_label"><span>Learn More</span></div>
                    </router-link>
                    <!-- profile view -->
                    <router-link v-if="role" class="navbar_link" to="/settings">
                        <div class="other_link_label"><span>Account Settings</span></div>
                    </router-link>
                    <!-- baka bet nyo magdark mode
                    <div class="navlink_label" @click="switch_mode">Dark Mode</div>  -->
                    <router-link v-if="role"  class="nav_link" to="/">
                        <div class="other_link_label" @click="logout"><span>Logout</span></div>
                    </router-link>
                    <router-link v-if="!role" class="nav_link" to="/login">
                        <div class="other_link_label">Login</div>
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
                    <router-link to="/reading" v-if="role == 'employee'">
                        <img class="mobile_icon" src="reading_icon.png" />
                    </router-link>   
                    <router-link to="/report" v-if="role == 'admin'">
                        <img class="mobile_icon" src="report_icon.png" />
                    </router-link>
                    <router-link to="/events" v-if="role == 'event admin'">
                        <img class="mobile_icon" src="event_icon.png" />
                    </router-link>                  
                </div>
                <div class="mobile_link">
                    <router-link to="/map"> 
                        <img class="mobile_icon" src="map_icon.png" />
                    </router-link>        
                </div>
            </div>
        </div>

        <!-- sidebar for mobile -->
        <div class="sidebar" v-if="isMobile" :class="{ collapsed: sidebarOpen }"> 
            <div class="flex">
                <div class="more_settings z-10" v-if="!sidebarOpen" @click="toggleSidebar" style="cursor: pointer;">
                    <img src="hamburger.png" alt="more_setting">
                </div>
            </div>
            <div class="flex">
                <div class="fixed inset-0 bg-gray-800 bg-opacity-60 z-20" v-if="sidebarOpen" @click="toggleSidebar"></div>
                <div id="sidebar" class="bg-gray-800 text-white w-16" v-if="sidebarOpen" @click="toggleSidebar">
                    <div class="pl-6 pt-4 flex flex-row">
                        <img src="streams_logo.png" alt="more_setting" class="w-8 h-8">
                        <div class="name text font-bold text-xl transition ease-in-out 300 pt-1 pl-3">
                            STREAMS
                        </div>
                    </div>

                    <router-link class="navbar_label" to="/feedback" title="Feedback">
                        <span class="feedback">Community</span>
                    </router-link>

                    <router-link class="navbar_label" to="/tips" title="Useful Techniques">
                        <span class="tips">Learn More</span>
                    </router-link>

                    <router-link  v-if="role" class="navbar_label" to="/settings" title="Account Setting">
                        <span class="settings">Account Settings</span>
                    </router-link>

                    <router-link v-if="role" class="navbar_label" to="/home" title="Logout">
                        <span class="logout" @click="logout">Logout</span>
                    </router-link>
                    <router-link v-if="!role" class="navbar_label" to="/login">
                        <span class="logout">Login</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import store from './../store/index.js';

export default {
  data() {
    return {
      more_settings: false,
      dark_mode: false,
      isMobile: false,
      admin: true,
      navbarCollapsed: true,
      showSidebar: false,
      sidebarOpen: false,
      role: store.state.role,
    };
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);

        console.log(this.role);
        // Set a timeout to change the value of role after a certain amount of time
        setTimeout(() => {
            this.role = store.state.role; // Change 'new_role' to the desired value
        }, 1000); // 5000 milliseconds = 5 seconds
            
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
            store.dispatch('updateRole', null);
            store.dispatch('setUID', null)
            store.dispatch('setUserInfo', null, null)
            const auth = getAuth()
            signOut(auth).then(() => {
                console.log("Logged out!");
            })
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
    },
    /*toggleSidebar() {
        var sidebar = document.getElementById("sidebar");
        var mainContent = document.querySelector(".flex");

        sidebar.classList.toggle("active");
        mainContent.classList.toggle("active");

        document.addEventListener("click", event => {
            const isInSidebar = sidebar.contains(event.target);
            const isInMainContent = mainContent.contains(event.target);

            if (!(isInSidebar || isInMainContent)) {
                this.toggleSidebar();
            }
        });
    }*/
    toggleSidebar() {
          this.sidebarOpen = !this.sidebarOpen;
          if (!this.sidebarOpen) {
            this.more_settings = false;
          }
      }
  },
};
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
        border-right: 1px solid rgb(120, 127, 145);
        transition: ease-in-out 0.6s;
        overflow: hidden;
        z-index: 10; /* oa nyan */
        display: flex;
        flex-direction: column;
        cursor: pointer;
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
    .streams_icon{
        width: 44px;
        height: 42px;
        margin-top: 10px;
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
        color: var(--navy);
        font-weight: 500;
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
        height: auto;
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
.more_settings{
    position: fixed;
    z-index: 10;
    display: flex;
    width: 29px;
    height: 25px;
    margin-left: calc(5px + 5vw);
    margin-top: 17px;
}
.more_settings.collapsed {
    width: 90px;
    transition: ease-in-out 0.6s;
}
#sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;
    background-color:var(--navy);
    transition: ease-in-out 0.6s;
    transform: translateX(-50px) 0.6s ease-in-out;
    z-index: 20;
}
  
#sidebar.collapsed {
    transform: translateX(-140px);
  }

.flex-1 {
    margin-left: 200px;
    transition: margin-left 0.3s;
}
  
.flex-1.active {
    margin-left: 200px;
}
.navbar_label:first-of-type{
    margin-top: 40px;
}
.navbar_label{
    width: 95%;
    height: 50px;
    text-align: center;
    display: flex;
    padding-left: 7px;
    margin: 15px auto;
    font-size: 1.2rem;
}

.logout{
    display: inline-block;
    text-align: center;
    transition: ease-in-out 0.6s;
}
</style>