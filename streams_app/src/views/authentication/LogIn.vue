<template>
    <div class="login">
        <div class="prj-name">
            <b>STREAMS</b>
        </div>
        <div class="container">
            <h1 class="signup">LOG IN</h1>
            <div class="forms">
                <label for="user_id" class="form_label"><b>User ID</b></label>
                <input autofocus id="input_userid" type="text" name="user_id" required placeholder="User ID" v-model="email"/>

                <label for="password"  class="form_label"><b>Password</b></label>
                <input type="password" id="input_password" name="password" required placeholder="Password" v-model="password"/>
                
                <p v-if = "errorMsg">{{ errorMsg }}</p>
            
                <button  v-on:click = "login" class="submit" id="sign-up" value="Sign Up">Log In</button>
                <br/>
                <router-link to="/home" id="guest"><b>Guest</b></router-link>
                <br/>
                <router-link to="/signup">Sign Up</router-link>
            </div>
        </div>
    </div>

</template>

<style src="../../themes/auth.css"></style>


<script setup>

import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const errorMsg = ref()

const router = useRouter();
const login = () => {
    
    const auth = getAuth(); 
    signInWithEmailAndPassword(auth, email.value, password.value)
        // eslint-disable-next-line
        .then((data) => { 
            console.log("You have logged in");
            console.log(auth.currentUser);
            router.push('/home')
        })
        .catch((error) => {
            console.log(error.code);
            switch(error.code){
                case "auth/invalid-email":
                    errorMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errorMsg.value = "Email not found";
                    break;
                case "auth/wrong-password":
                    errorMsg.value = "Invalid Password";
                    break;
                default:
                    errorMsg.value = "Email or password was incorrect";
                    break;
            }
        });

}

</script>
