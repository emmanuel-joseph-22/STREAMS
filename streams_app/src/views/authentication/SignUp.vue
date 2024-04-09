<template>
<div class="bg-cover bg-center inset-0 opacity-90 bg-opacity-10 bg-[url('/public/Alangilan-entrance-facade.jpg')]">
    <div class="signup  relative flex flex-column">
        <div class="prj-name">
            <h1 class="streams fixed left-10 mt-10 font-bold text-1xl font-sans sm:text-1xl md:text-2xl lg:text-4xl text-blue-400">STREAMS</h1>
            <img src="Batangas_State_Logo 2.png" class="fixed left-44 pl-10 pt-8">
            <img src="434129671_1095342188180256_5566497575336269927_n-removebg-preview 1.png" class="fixed left-56 pl-14 pt-8">
            <img src="aquatech_v1.png" class="fixed left-72 pl-12 pt-8">
        </div>
        <dark_blur/>
        <div class="cont relative w-full bg-white sm:w-5/6 md:w-4/6 lg:w-2/6 xl:w-2/6 mx-auto mt-44 sm:mt-28 mb-4 rounded-md">
            
            <div class="container relative bottom-0 top-0 mx-auto w-full sm:w-3/4 text-black rounded-lg items-center justify-center p-5">
                <h1 class="signup relative mt-4 font-black text-stroke text-4xl sm:text-5xl text-blue-5-0 mb-10 sm:mb-20 font-sans text-center">SIGN UP</h1>
                <div class="forms">
                    <label for="email" class="relative form_label font-bold flex flex-col mb-1 text-left"><b>Email</b></label>
                    <input autofocus id="input_email" type="text" name="email" required placeholder="Email" class="relative px-20 pl-4 py-2 mb-6 border border-black-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="email"/>

                    <label for="name"  class="relative form_label font-bold flex flex-col mb-1 text-left"><b>Name</b></label>
                    <input type="text" id="input_name" name="name" required placeholder="Name" class="relative pl-4 py-2 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="name"/>

                    <label for="password"  class="relative form_label font-bold flex flex-col mb-1 text-left"><b>Password</b></label>
                    <input type="password" id="input_password" name="password" required placeholder="Password" class="relative pl-4 py-2 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="password"/>
                    
                    <p v-if="errorMsg">{{ errorMsg }}</p>
                    
                    <button  @click="signup" class="submit bg-blue-700 text-blue-200 py-2 px-20 rounded-full mt-5" id="sign-up" value="Sign Up">Sign Up</button>
                    <label for="or-text" class="font-bold relative flex flex-col mb-1 text-mid my-5">-OR-</label>
                    <router-link to="/home" id="guest" class="font-bold underline cursor-pointer flex flex-col text-mid my-2 sm:my-5"><b>Guest</b></router-link>
                    <br/>
                    <router-link to="/login" id="login" class="relative text-center">Login</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style src="../../themes/auth.css"></style>

<script setup>
import dark_blur from '@/components/darkblur_component.vue';
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

