import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";
import './assets/tailwind.css';

/*web app's Firebase configuration*/
const firebaseConfig = {
  apiKey: "AIzaSyBR5Tyx6-Oj996DaGOP2WKY80ijL4zWN_0",
  authDomain: "streams-database-c8590.firebaseapp.com",
  projectId: "streams-database-c8590",
  storageBucket: "streams-database-c8590.appspot.com",
  messagingSenderId: "415149398034",
  appId: "1:415149398034:web:daeb25890b4f7e5ac8a0cb"
};

export const db_app = initializeApp(firebaseConfig);
// for offline/caching
initializeFirestore(db_app, { 
  localCache: persistentLocalCache(/*settings*/{}) 
});
export const firestore = getFirestore(db_app);

// vue app
export const app = createApp(App);
app.use(router).use(store)
app.provide('firestore', firestore)
app.mount('#app');

// Get the authentication instance
const auth = getAuth(db_app);

onAuthStateChanged(auth, user => {
  if (user) {
    // User is already authenticated, proceed with auto-login
    router.push('/'); // Redirect to the home page or any authenticated page
  } else {
    // User is not authenticated, redirect to the login page or perform any other action
    router.push('/login');
  }
});

