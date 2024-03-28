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

export default {
    components: {
        'home-page': HomePageView,
        'main-content': dashboard_content
    }
}
</script>
