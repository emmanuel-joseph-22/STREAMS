<template>
  <div>
    <!--<img src="image23.png">-->
    <router-view/>
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  color: #4E636F;
}
</style>

<script>
import { Capacitor } from '@capacitor/core'; // Import Capacitor from Capacitor

export default {
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
};
</script>