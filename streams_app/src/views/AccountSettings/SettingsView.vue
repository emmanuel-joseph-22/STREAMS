<template>
    <home-page>
      <header_bar class="acct_header">
        <h1 class="text-3xl text-white font-arial font-bold ml-24 mt-1">Account Settings</h1>
      </header_bar>

      <div class="account-cont flex flex-col items-center justify-center">
        <div class="cont bg-bsu-blue rounded-lg lg:w-1/3 xl:w-1/2 h-60vh flex flex-col items-center justify-center md:w-1/3 w-5/6 mt-24">
          <div class="p-4 w-full flex flex-col items-center mb-14">
            <div class="change flex flex-col items-center lg:w-3/4 mt-10">
              <label for="input-change" class="change-label font-bold text-white text-4xl">{{ defaultName }}</label>
              <label for="input-change" class="change-label font-bold text-white">{{ emailAd }}</label>
            </div>

            <div class="change-box flex flex-col items-center border-2 border-bsu-borders lg:w-2/4 mt-10 rounded-lg bg-white p-4" @click="showPopup = true">
              <label for="input-change" class="change-label font-bold text-black">Change Default Name</label>
            </div>
            <div class="change-box flex flex-col items-center border-2 border-bsu-borders lg:w-2/4 mt-10 rounded-lg bg-white p-4" @click="showPasswordPopup = true">
              <label for="input-change" class="change-label font-bold text-black">Change Password</label>
            </div>

          </div>
        </div>
  
<!--PopUp Default Name-->
        <div v-if="showPopup" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="closePopup"></div>
        <div v-if="showPopup" class="popup-overlay fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/2 bg-[#042334] border-4 border-[#36B4E7] text-[#36B4E7] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out md:w-1/3 w-full">
          <div class="popup-content">
            <div class="flex justify-center items-center">
                <div class="default-name flex flex-col items-start lg:w-2/4 mt-4">
                    <label for="input-change" class="change-label font-bold text-white">Default Name</label>
                    <input disabled v-model="defaultName" id="input-change" type="text" name="change" required placeholder="Default Name" class="change-input w-full lg:w-3/2 px-4 py-2 border-2 border-blue-500 rounded-md text-base text-blue-900 focus:outline-none">
                </div>
            </div>
            <div class="flex justify-center items-center">
                <div class="change-1 flex flex-col items-start lg:w-2/4 mt-4">
                    <label for="input-change-1" class="change-1-label font-bold text-white">New Default Name</label>
                    <input autofocus v-model="newName" id="input-change-1" type="text" name="change-1" required placeholder="New Default Name" class="change-1-input w-full lg:w-3/2 px-4 py-2 border-2 border-blue-500 rounded-md text-base text-blue-900 focus:outline-none">
                </div>
            </div>
            
          </div>
        <div class="flex justify-center mt-4">
            <button @click="changeDefaultName" class="w-16 h-10 rounded-full bg-[#042334] border-2 border-[#36B4E7] text-white hover:bg-[#36B4E7] hover:text-white transition duration-300 ease-in-out font-bold flex items-center justify-center">Save</button>
        </div>
          <button @click="closePopup" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Close</button>
        </div>

    <!-- PopUp Change Password -->
    <div v-if="showPasswordPopup" class="popup-overlay fixed inset-0 bg-gray-900 bg-opacity-60 z-20" @click="closePasswordPopup"></div>
    <div v-if="showPasswordPopup" class="popup-overlay fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-3/5 bg-[#042334] border-4 border-[#36B4E7] text-[#36B4E7] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out md:w-1/3 w-full">
        <div class="popup-content">
            <div class="flex justify-center items-center">
                <div class="password-change flex flex-col items-start lg:w-3/5 mt-4">
                    <label for="current-password" class="change-label font-bold text-white">Current Password</label>
                    <input id="current-password" type="password" v-model="currentPassword" placeholder="Current Password" class="change-input w-full lg:w-3/2 px-4 py-2 border-2 border-blue-500 rounded-md text-base text-blue-900 focus:outline-none">
                </div>
            </div>
            <div class="flex justify-center items-center">
                <div class="password-change flex flex-col items-start lg:w-3/5 mt-4">
                    <label for="new-password" class="change-label font-bold text-white">New Password</label>
                    <input id="new-password" type="password" v-model="newPassword" placeholder="New Password" class="change-input w-full lg:w-3/2 px-4 py-2 border-2 border-blue-500 rounded-md text-base text-blue-900 focus:outline-none">
                </div>
            </div>
            <div class="flex justify-center items-center">
                <div class="password-change flex flex-col items-start lg:w-3/5 mt-4">
                    <label for="retype-new-password" class="change-label font-bold text-white">Re-type New Password</label>
                    <input id="retype-new-password" type="password" v-model="retypenewPassword" placeholder="Re-type New Password" class="change-input w-full lg:w-3/2 px-4 py-2 border-2 border-blue-500 rounded-md text-base text-blue-900 focus:outline-none">
                </div>
            </div>
            <div class="flex justify-center mt-4">
                <button @click="changePassword" class="w-16 h-10 rounded-full bg-[#042334] border-2 border-[#36B4E7] text-white hover:bg-[#36B4E7] hover:text-white transition duration-300 ease-in-out font-bold flex items-center justify-center">Save</button>
            </div>
        </div>
        <button @click="closePasswordPopup" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Close</button>
    </div>

      </div>
    </home-page>
  </template>
  

<script>
  import AccountPageView from './AccountPageView.vue';
  import header_component from "../../components/header_component.vue";
  import store from '@/store';
  import { updateDisplayName } from '@/user';

  export default {
    components: {
      'home-page': AccountPageView,
      'header_bar': header_component,
    },
    data() {
      return {
        showPopup: false,
        defaultName: store.state.userDisplayName,
        emailAd: store.state.userEmail,
        newName: '',
        currentDN: '',
        showPasswordPopup: false,
        currentPassword: '',
        newPassword: ''
      };
    },
    methods: {
      closePopup() {
        this.showPopup = false;
      },
      async changeDefaultName(){
        await updateDisplayName(this.newName)
        store.dispatch('setUserInfo', this.newName)
        this.defaultName = this.newName
        this.closePopup();
      },
      closePasswordPopup() {
        this.showPasswordPopup = false,
        this.currentPassword = '';
        this.newPassword = '';
      },
      changePassword() {
        this.closePasswordPopup();
      }
    },
  };
  </script>
  
  <style scoped>
 .account-cont{
  background-color: var(--navy);
  height: calc(100vh - 60px);
 }
 .acct_header{
  background-color: var(--navy);
  border-bottom: 1px solid rgb(120, 127, 145);
 }
  </style>