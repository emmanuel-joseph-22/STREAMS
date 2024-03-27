<template>
    <home-page>
        <header-bar>
            <h1>Report</h1>
        </header-bar>
        <main-content>
            <slot></slot>
        </main-content>
    </home-page>
</template>

<script>
import HomePageView from './HomePageView.vue';
import header from '../../components/header_component.vue'
import dashboard_content from '../../components/dashboard_content.vue'

export default {
    components: {
        'home-page': HomePageView,
        'header-bar': header,
        'main-content': dashboard_content
    }
}
</script>