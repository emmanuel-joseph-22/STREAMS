<template>
    <div class="bg-cover bg-center inset-0 opacity-90 bg-opacity-10 bg-[url('/public/Alangilan-entrance-facade.jpg')] h-screen">
      <div class="signup relative flex flex-column">
        <div class="prj-name">
          <h1 class="streams fixed left-10 mt-10 font-bold text-1xl font-sans sm:text-1xl md:text-2xl lg:text-4xl text-blue-400">STREAMS</h1>
          <img src="Batangas_State_Logo 2.png" class="fixed left-44 pl-10 pt-8">
          <img src="434129671_1095342188180256_5566497575336269927_n-removebg-preview 1.png" class="fixed left-56 pl-14 pt-8">
          <img src="aquatech_v1.png" class="fixed left-72 pl-12 pt-8">
        </div>
        <div class="cont relative w-full shadow-black shadow-md bg-white bg-opacity-70 sm:w-5/6 md:w-4/6 lg:w-2/6 xl:w-2/6 mx-auto mt-44 sm:mt-28 mb-4 rounded-none sm:rounded-md">
          <div class="container relative bottom-0 top-0 mx-auto w-full sm:w-3/4 text-black rounded-lg items-center justify-center p-5">
            <h1 class="signup relative mt-4 font-black text-stroke text-4xl sm:text-5xl text-blue-5-0 mb-10 sm:mb-20 font-sans text-center">STREAMS</h1>
            <div class="forms">
              <label for="email" class="relative form_label font-bold flex flex-col mb-1 text-left"><b>Email</b></label>
              <input id="input_email" :class="{ 'border-red-600 border-2': errorMsg && !emailIsValid() }" type="text" name="email" required placeholder="Email" class="relative px-20 pl-4 py-2 mb-6 border border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="email" />
  
              <label for="name" class="relative form_label font-bold flex flex-col mb-1 text-left"><b>Name</b></label>
              <input type="text" id="input_name" :class="{ 'border-red-600 border-2': errorMsg && !nameIsValid() }" name="name" required placeholder="Name" class="relative pl-4 py-2 mb-6 border border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="name" />
  
              <label for="password" class="relative form_label font-bold flex flex-col mb-1 text-left"><b>Password</b></label>
              <div class="relative">
                <input :type="passwordVisibility ? 'text' : 'password'" id="input_password" :class="{ 'border-red-600 border-2': errorMsg && !passwordIsValid() }" name="password" required placeholder="Password" class="relative pl-4 pr-10 py-2 mb-6 border border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="password" />
                <button @click="togglePasswordVisibility" class="absolute top-6 transform -translate-y-1/2 right-2 focus:outline-none">
                  <img v-if="!passwordVisibility" src="hide.png" alt="Hide password" class="h-6 w-6" />
                  <img v-else src="view.png" alt="Show password" class="h-6 w-6" />
                </button>
              </div>
  
              <!-- Role Dropdown -->
              <label for="role" class="relative form_label font-bold flex flex-col mb-1 text-left"><b>Role</b></label>
              <select id="role" class="relative pl-4 py-2 mb-6 border border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="role">
                <option value="" disabled>Select role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
  
              <div v-if="errorMsg" class="flex items-center bg-red-200 border-2 border-red-600 p-2 rounded-xl">
                <img src="exclamation.png" alt="Error icon" class="w-6 h-6 mr-2">
                <p class="font-bold text-red-600 text-sm">{{ errorMsg }}</p>
              </div>
  
              <div v-on:click="signup" class="body mt-4">
                <a href="#" class="bg-bsu-base bg-opacity-50">
                  <span>Sign Up</span>
                  <div class="wave"></div>
                </a>
              </div>
              <!--<button @click="signup" class="submit border-2 border-solid border-bsu-borders text-bsu-borders py-2 px-20 rounded-full mt-5" id="sign-up" value="Sign Up">SIGN UP</button>-->
              <label for="or-text" class="font-bold relative flex flex-col mb-1 text-mid my-5">-OR-</label>
              <br />
              <router-link to="/login" id="login" class="relative text-center">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firestore as db } from "../../main.js"; // Import Firestore instance
import { setDoc, doc } from "firebase/firestore"; // Import Firestore functions
import store from './../../store'; // Import the Vuex store
import { useRouter } from "vue-router";

// Reactive data properties
const email = ref("");
const password = ref("");
const name = ref("");
const role = ref("");
const errorMsg = ref("");
const passwordVisibility = ref(false);

// Router setup
const router = useRouter();

// Function to toggle password visibility
const togglePasswordVisibility = () => {
    passwordVisibility.value = !passwordVisibility.value;
};

// Function to validate email format
const emailIsValid = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email.value);
};

// Function to validate name format
const nameIsValid = () => {
    const nameWithoutSpaces = name.value.trim();
    if (/\d/.test(nameWithoutSpaces)) {
        return false; // Name cannot contain digits
    } else if (nameWithoutSpaces === "") {
        return false; // Name cannot be empty
    } else {
        return true; // Valid
    }
};

// Function to validate password format
const passwordIsValid = () => {
    return (
        password.value.length >= 8 &&
        /[A-Z]/.test(password.value) &&
        /\d/.test(password.value) &&
        !/\s/.test(password.value)
    );
};

// Function to set user data in Firestore
const setUserData = async (userId, data) => {
    try {
        // Reference the user document in the users collection
        const userDocRef = doc(db, "users", userId);

        // Set data in the user document using setDoc
        await setDoc(userDocRef, data);
        console.log(`Data set successfully for user ID ${userId}`);
    } catch (error) {
        console.error(`Error setting data for user ID ${userId}:`, error);
    }
};

// Signup function
const signup = async () => {
    // Reset error message
    errorMsg.value = "";


    if (!emailIsValid()) {
        errorMsg.value = "Please enter a valid email.";
        return;
    }

    // Validate password second
    if (!passwordIsValid()) {
        errorMsg.value = "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and have no spaces.";
        return;
    }

    // Validate role last
    if (!role.value) {
        errorMsg.value = "Please select a role.";
        return;
    }

    try {
        // Initialize Firebase Authentication
        const auth = getAuth();

        // Create a new user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        
        // User data from authentication
        const user = userCredential.user;

        // Define the user data to be stored in Firestore
        const userData = {
            email: email.value,
            name: name.value,
            role: role.value,
            last_login: new Date().getTime(),
        };

        // Set user data in Firestore using setUserData function
        await setUserData(user.uid, userData);

        console.log("Successfully registered and data saved in Firestore!");

        store.dispatch('updateRole', userData.role);

        // Redirect to the '/home' route
        router.push("/home");
    } catch (error) {
        console.error("Error during signup:", error.code, error.message);
        errorMsg.value = `Error during signup: ${error.message}`;
    }
};
</script>
  
