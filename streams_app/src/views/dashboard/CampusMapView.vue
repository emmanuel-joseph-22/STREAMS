<template>
    <home-page>
        <main-content>
            <slot></slot>
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
