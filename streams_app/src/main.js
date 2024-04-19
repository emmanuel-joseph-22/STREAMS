import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './assets/tailwind.css';

/* firebase */
import { initializeApp } from "firebase/app";
import { getFirestore/*, initializeFirestore, persistentLocalCache*/ } from "firebase/firestore";


/*web app's Firebase configuration*/
const firebaseConfig = {
  apiKey: "AIzaSyBR5Tyx6-Oj996DaGOP2WKY80ijL4zWN_0",
  authDomain: "streams-database-c8590.firebaseapp.com",
  projectId: "streams-database-c8590",
  storageBucket: "streams-database-c8590.appspot.com",
  messagingSenderId: "415149398034",
  appId: "1:415149398034:web:daeb25890b4f7e5ac8a0cb"
};

// Initialize Firebase inside createApp
export const app = createApp(App);
export const db_app = initializeApp(firebaseConfig);

// for offline/caching
// Defaults to single-tab persistence if no tab manager is specified.
//initializeFirestore(db_app, { 
  //localCache: persistentLocalCache(/*settings*/{}) 
//});
export const firestore = getFirestore(db_app);

// Provide Firestore instance to all components via provide/inject
app.provide('firestore', firestore);

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
// Mount the app with router
app.use(router).mount('#app');
