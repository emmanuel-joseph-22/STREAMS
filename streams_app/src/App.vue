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

export default {
  setup(){
    // Function to handle back button press
    const handleBackButton = () => {
      // Check if the user is on the last screen of the navigation stack
      if (router.currentRoute.value.path === '/home') { // Adjust 'Home' to match your home route name
        // Show confirmation dialog
        if (confirm('Do you want to exit the app?')) {
          // If the user confirms, exit the app
          App.exitApp();
        }
      } else {
        // If not on the last screen, navigate back
        router.go(-1);
      }
    };

    // Add listener for back button
    App.addListener('backButton', handleBackButton);

    // Remove listener when component is unmounted
    const beforeUnmount = () => {
      App.removeListener('backButton', handleBackButton);
    };

    return { beforeUnmount };
  }
}

</script>