<template>
    <home-page>
        <div class="account-cont flex flex-col items-center justify-center mt-20">
            <div class="cont bg-blue-900 rounded-lg lg:w-1/3 xl:w-1/2 h-60vh flex flex-col items-center justify-center md:w-1/3 w-5/6 mt-28" style="background-color: #042334;">
                <div class="p-4 w-full flex flex-col items-center mb-20">
                    <div class="change flex flex-col items-center lg:w-3/4 mt-10">
                        <label for="input-change" class="change-label font-bold text-white text-4xl">{{ defaultName }}</label>
                        <label for="input-change" class="change-label font-bold text-white">{{ emailAd }}</label>
                    </div>
                    <router-link to="/defname" class="change-box flex flex-col items-center border-2 border-blue-500 lg:w-3/4 mt-10 rounded-lg bg-white p-4">
                        <label for="input-change" class="change-label font-bold text-black">Change Default Name</label>
                    </router-link>
                    <router-link to="/password" class="change-box flex flex-col items-center border-2 border-blue-500 lg:w-3/4 mt-10 rounded-lg bg-white p-4">
                        <label for="input-change" class="change-label font-bold text-black">Change Password</label>
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
    data() {
        return {
            defaultName: 'Aquatech',
            emailAd: 'aquatech@gmail.com'
        };
    },
    mounted() {
      
    }
}
</script>