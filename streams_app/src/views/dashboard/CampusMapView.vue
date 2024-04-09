<template>
    <home-page>
        <main-content>
            <iframe
                width="600"
                height="450"
                style="border:0"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=API_KEY
                &q=Space+Needle,Seattle+WA">
            </iframe>
        </main-content>
    </home-page>
</template>

<script>
import HomePageView from './HomePageView.vue';
import dashboard_content from '../../components/dashboard_content.vue'
import { Capacitor } from '@capacitor/core'; // Import Capacitor from Capacitor

export default {
    components: {
        'home-page': HomePageView,
        'main-content': dashboard_content
    },
    mounted() {
        document.addEventListener('backbutton', this.handleBackButton);
    },
    unmounted() {
        document.removeEventListener('backbutton', this.handleBackButton);
    },
    methods: {
        handleBackButton() {
        if (Capacitor.isNative) {
            if (this.$router.currentRoute.path !== '/') {
            this.$router.go(-1); // Navigate back if not on the home page
            } else {
            if (window.confirm('Do you want to exit the app?')) {
                navigator.app.exitApp(); // Exit the app if on the home page
            }
            }
        }
        }
    }
}
</script>

