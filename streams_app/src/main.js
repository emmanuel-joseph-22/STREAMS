import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* firebase */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
export const firestore = getFirestore(db_app);

createApp(App).use(router).mount('#app')
