import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBR5Tyx6-Oj996DaGOP2WKY80ijL4zWN_0",
    authDomain: "streams-database-c8590.firebaseapp.com",
    databaseURL: "",
    projectId: "streams-database-c8590",
    storageBucket: "streams-database-c8590.appspot.com",
    messagingSenderId: "415149398034",
    appId: "1:415149398034:web:daeb25890b4f7e5ac8a0cb"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

createApp(App).use(router).mount('#app')
