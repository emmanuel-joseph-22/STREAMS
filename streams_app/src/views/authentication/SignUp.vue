<template>
    <div class="signup">
        <div class="prj-name">
            <h1 class="streams fixed ml-10 mt-10 font-bold text-4xl font-sans">STREAMS</h1>
            <img src="Batangas_State_Logo 2.png" class="fixed left-44 pl-10 pt-8">
            <img src="434129671_1095342188180256_5566497575336269927_n-removebg-preview 1.png" class="fixed left-56 pl-14 pt-8">
            <img src="434098720_2156500128032719_6742569181348426872_n-removebg-preview 1.png" class="fixed left-72 pl-12 pt-8">
        </div>
        <div class="container relative bottom-10 top-40 mx-auto w-full sm:w-3/4 text-black rounded-lg items-center justify-center p-5">
            <h1 class="signup font-black text-stroke text-5xl text-blue-300 mb-20 font-sans">SIGN UP</h1>
            <div class="forms">
                <label for="email" class="form_label font-bold flex flex-col mb-1 text-left"><b>Email</b></label>
                <input autofocus id="input_email" type="text" name="email" required placeholder="Email" class="px-20 pl-4 py-2 mb-6 border border-black-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="email"/>

                <label for="name"  class="form_label font-bold flex flex-col mb-1 text-left"><b>Name</b></label>
                <input type="text" id="input_name" name="name" required placeholder="Name" class="pl-4 py-2 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="name"/>

                <label for="password"  class="form_label font-bold flex flex-col mb-1 text-left"><b>Password</b></label>
                <input type="password" id="input_password" name="password" required placeholder="Password" class="pl-4 py-2 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="password"/>
                
                <p v-if="errorMsg">{{ errorMsg }}</p>
                
                <button  @click="signup" class="submit bg-blue-700 text-blue-200 py-2 px-20 rounded-full mt-5" id="sign-up" value="Sign Up">Log In</button>
                <label for="or-text" class="font-bold flex flex-col mb-1 text-mid my-5">-OR-</label>
                <router-link to="/home" id="guest" class="font-bold underline cursor-pointer flex flex-col text-mid my-5"><b>Guest</b></router-link>
                <br/>
                <router-link to="/login" id="login">Login</router-link>
            </div>
        </div>
    </div>

</template>

<style src="../../themes/auth.css"></style>

<script setup>

import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//may something dito
import { db_app as db } from 'firebase/database';
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const name = ref("");

const router = useRouter()
const signup = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => { // eslint-disable-line no-unused-vars

            var user = auth.currentUser;

            var database_ref = db.ref();

            var user_data = {
                email : email.value,
                name : name.value,
                last_login : Date.now()
            }
            database_ref.child('users/admin/' + user.uid).set(user_data)
            console.log("Successfully Registered!");

            router.push('/home')
        })
        .catch((error) => {
            console.log(error.code);
        });

}

</script>