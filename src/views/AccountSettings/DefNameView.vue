<template>
    <home-page>
        <div class="default flex flex-col items-center justify-center mt-20">
            <div class="cont bg-blue-900 rounded-lg lg:w-1/3 xl:w-1/4 h-60vh flex flex-col items-center justify-center" style="background-color: #042334;">
                <div class="p-4 w-full flex flex-col items-center">
                    <div class="change flex flex-col items-start lg:w-3/4 mt-10">
                    <label for="input-change" class="change-label font-bold text-white">Default Name</label>
                    <input v-model="currentDN" id="input-change" type="text" name="change" required placeholder="Default Name" class="change-input w-full lg:w-3/2 px-4 py-2 border-2 border-blue-500 rounded-md text-base text-blue-900 focus:outline-none">
                </div>
                <div class="change-1 flex flex-col items-start lg:w-3/4 mt-10">
                    <label for="input-change-1" class="change-1-label font-bold text-white">New Default Name</label>
                    <input autofocus id="input-change-1" type="text" name="change-1" required placeholder="New Default Name" class="change-1-input w-full lg:w-3/2 px-4 py-2 border-2 border-blue-500 rounded-md text-base text-blue-900 focus:outline-none">
                </div>
                <router-link to="/settings">
                    <div class="body mt-4 p-5">
                        <a href="#">
                            <span>Confirm</span>
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
        return {
            currentDN: 'AquaTech',
        };
    },
    mounted(){

    }
}
</script>