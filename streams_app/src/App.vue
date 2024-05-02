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
import { App } from '@capacitor/app';
import router from './router/index';
import { onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const allowedRoutes = ['/home', '/reading', '/report', '/map'];
    // Function to handle back button press
    const handleBackButton = () => {
      try {
        // Check if the user is on one of the allowed routes
        if (allowedRoutes.includes(router.currentRoute.value.path)) {
            App.exitApp();
        } else {
          // Navigate back to the previous route (equivalent to pressing the back button)
          router.go(-1);
        }
      } catch (error) {
          // Handle any errors that occur during execution
          console.error('An error occurred:', error);
      }
    };
    onMounted(async () => {
      App.addListener('backButton', handleBackButton); 
    });
    // Remove listener when component is unmounted or when leaving allowed routes
    onUnmounted(() => {
      App.removeAllListeners();
    });
  }
}

</script>