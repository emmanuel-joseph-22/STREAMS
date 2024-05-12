import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";
import './assets/tailwind.css';
import { fetchData, fetchPie } from './dashboard_query';
import { getUserInfo } from './user';

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


onAuthStateChanged(auth, async user => {
  if (user) {
    try {
      if(!store.state.userID){
        store.dispatch('setUID', user.uid)
        const [name, email] = await getUserInfo()
        store.dispatch('setUserInfo', name, email)    
      }      
      //should make a separate case for fetching pie idk
      await fetchPie()
      if(!store.state.daily_values || !store.state.monthly_values || !store.state.quarterly_values ){
        await fetchData()
      }
      // Redirect to the previous route or the home page if no previous route exists
      router.push('/'); 
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  } else {
    // User is not authenticated, redirect to the login page or perform any other action
    router.push('/login');

  }
});

