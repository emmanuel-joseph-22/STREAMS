<template>
    <div class="login">
        <div class="prj-name">
            <b>STREAMS</b>
        </div>
        <div class="container">
            <h1 class="signup">LOG IN</h1>
            <div class="forms">
                <label for="user_id"><b>User ID</b></label>
                <input autofocus id="input_userid" type="text" name="user_id" required placeholder="User ID"/>

                <label for="password"><b>Password</b></label>
                <input type="password" id="input_password" name="password" required placeholder="Password"/>
                
                <p v-if = "errorMsg">{{ errorMsg }}</p>
                
                <button  v-on:click = "login" class="submit" id="sign-up" value="Sign Up">Log In</button>
                <label for="guest" id="guest"><b>Guest</b></label>
            </div>
        </div>
    </div>

</template>

<style scoped>
   .container{
        margin: 0 5px 0 45px ;
        background-color: #C9D8EC;
        min-height: 85vh;
        color: black;
        border-radius: 20px;
    }
    h1{
        font-weight: 900;
        margin: 40px 230px 0 210px;
        padding: 65px 0 0 10px;
        color: #5F88BF;
        -webkit-text-stroke-color: black;
        -webkit-text-stroke-width: 1px;
    }
    .forms{
        margin: auto;
        display: flex;
        flex-direction: column;
        padding: 10%
    }
    .forms b{
        font-size: 16px;
    }
    .forms input[type="text"],
    .forms input[type="password"] {
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 7px;
        font-size: 16px;
        background-color: white;
        color: black;
    }
    .forms button{
        padding: 10px;
        margin: 40px 150px;
        border-radius: 25px;
        font-size: 16px;
        background-color: #5F88BF;
        color: #C9D8EC;
    }
    #guest{
        padding: 3px;
        margin-left: 200px;
        font-size: 16px;
        color: black;
        text-decoration: underline;
        cursor: pointer;
    }
    button{
        margin-top: 5%;
        cursor: pointer;
    }
</style>


<script setup>

import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const errorMsg = ref()

const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("You have logged in");
            console.log(auth.currentUser);
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
