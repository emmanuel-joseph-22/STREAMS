<template>
    <div class="signup">
        <div class="prj-name">
            <b>STREAMS</b>
        </div>
        <div class="container">
            <h1 class="signup">SIGN UP</h1>
            <div class="forms">
                <label for="email" class="form_label"><b>Email</b></label>
                <input autofocus id="input_email" type="text" name="email" required placeholder="Email" v-model="email"/>

                <label for="name"  class="form_label"><b>Name</b></label>
                <input type="text" id="input_name" name="name" required placeholder="Name" v-model="name"/>

                <label for="password"  class="form_label"><b>Password</b></label>
                <input type="password" id="input_password" name="password" required placeholder="Password" v-model="password"/>
                
                <p v-if = "errorMsg">{{ errorMsg }}</p>
                
                <button  @click = "signup" class="submit" id="sign-up" value="Sign Up">Log In</button>
                <router-link to="/home" id="guest"><b>Guest</b></router-link>
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