<template>
    <div class="login">
        <div class="prj-name"> <!-- ginawan ko ng definition sa baba -->
            <h1 class="streams relative font-bold text-4xl font-sans">STREAMS</h1>
            <div class="logo-container relative">
                <img src="Batangas_State_Logo 2.png" class="relative logo">
                <img src="434129671_1095342188180256_5566497575336269927_n-removebg-preview 1.png" class="relative logo"/>
                <img src="434098720_2156500128032719_6742569181348426872_n-removebg-preview 1.png" class="relative logo" />
            </div>
        </div>
        <div class="container relative h-17/20 text-black rounded-lg items-center justify-center p-5">
            <h1 class="signup font-black text-stroke text-5xl text-blue-300 mb-20 font-sans">LOG-IN</h1>
            <div class="forms">
                <label for="user_id" class="form_label font-bold flex flex-col mb-1 text-left"><b>User ID</b></label>
                <input autofocus id="input_userid" type="text" name="user_id" required placeholder="User ID" class="px-20 pl-4 py-2 mb-6 border border-black-500 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="email"/>

                <label for="password"  class="form_label font-bold flex flex-col mb-1 text-left"><b>Password</b></label>
                <input type="password" id="input_password" name="password" required placeholder="Password" class="pl-4 py-2 mb-6 border border-black-500 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="password"/>
                
                <p v-if="errorMsg">{{ errorMsg }}</p>
            
                <button  v-on:click="login" class="submit bg-blue-700 text-blue-200 py-2 px-20 rounded-full mt-5" id="sign-up" value="Sign Up">Log In</button>
                <br/>
                <label for="or-text" class="font-bold flex flex-col mb-1 text-mid my-5">-OR-</label>
                <router-link to="/home" id="guest" class="font-bold underline cursor-pointer flex flex-col text-mid my-5"><b>Guest</b></router-link>
                <br/>
                <span>New to STREAMS? <router-link to="/signup" class="underline ">Create an Account</router-link></span>
            </div>
        </div>
    </div>

</template>

<style>
.login{
    display: flex;
    max-width: 540px;
    margin: 0 auto;
    flex-direction: column;
}
.prj-name{
    position: absolute;
    left: 0;
    display: flex;
}
.logo-container{
  display: flex;
  margin: 0 auto;
  flex-direction: row;
}
.logo {
    width: 60px;
    height: 60px;
    margin: 10px;
}
.container{
    margin-top: 50px;
}
@media screen and (max-width: 766px) {
    .prj-name{
        position: relative;
        margin: 0 auto;
        flex-direction: column;
    }
    .logo{
        position: relative;
        width: 40px;
        height: 40px;
    }

}
.text-stroke {
    color: #86B6F6; /* Set the text color */
    text-shadow: 
      -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000; /* Set the stroke effect */
  }
</style>

<script setup>

import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const errorMsg = ref()

const router = useRouter();
const login = () => {
    
    const auth = getAuth(); 
    console.log("bitch")
    signInWithEmailAndPassword(auth, email.value, password.value)
        // eslint-disable-next-line
        .then((data) => { 
            console.log("You have logged in");
            console.log(auth.currentUser);
            router.push('/home');
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
