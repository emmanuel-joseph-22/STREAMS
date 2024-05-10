import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";
import './assets/tailwind.css';
import { fetchData } from './dashboard_query';
/*web app's Firebase configuration*/
const firebaseConfig = {
  apiKey: "AIzaSyBR5Tyx6-Oj996DaGOP2WKY80ijL4zWN_0",
  authDomain: "streams-database-c8590.firebaseapp.com",
  projectId: "streams-database-c8590",
  storageBucket: "streams-database-c8590.appspot.com",
  messagingSenderId: "415149398034",
  appId: "1:415149398034:web:daeb25890b4f7e5ac8a0cb",
  databaseURL: "https://streams-database-c8590-default-rtdb.asia-southeast1.firebasedatabase.app/" // Updated URL
};

export const db_app = initializeApp(firebaseConfig);
// for offline/caching
initializeFirestore(db_app, { 
  localCache: persistentLocalCache(/*settings*/{}) 
});
export const firestore = getFirestore(db_app);
export const database = getDatabase(db_app);

// vue app
export const app = createApp(App);
app.use(router).use(store)
app.provide('firestore', firestore)
app.mount('#app');

// Get the authentication instance
const auth = getAuth(db_app);

// Dispatch Vuex action to start loading spinner


onAuthStateChanged(auth, async user => {
  if (user) {
    try {
      if(!store.state.daily_values || !store.state.monthly_values || !store.state.quarterly_values ){
        console.log('bitch magffffetch')
        await fetchData()
      }
      // User is already authenticated, proceed with auto-login
      router.push('/'); // Redirect to the home page or any authenticated page
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  } else {
    // User is not authenticated, redirect to the login page or perform any other action
    router.push('/login');

  }
});

