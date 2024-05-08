<template>
    <div class="bg-cover bg-center opacity-90 bg-[url('/public/Alangilan-entrance-facade.jpg')] h-screen">
        <div class="login relative flex flex-column">
            <h1 class="streams fixed left-10 mt-10 font-bold text-1xl font-sans sm:text-1xl md:text-2xl lg:text-4xl text-blue-400">STREAMS</h1>
            <div class="prj-name absolute flex">
                <img src="Batangas_State_Logo 2.png" class="fixed left-44 pl-10 pt-8">
                <img src="434129671_1095342188180256_5566497575336269927_n-removebg-preview 1.png" class="fixed left-56 pl-14 pt-8">
                <img src="aquatech_v1.png" class="fixed left-72 pl-12 pt-8">
            </div>
            <dark_blur/>
            <div class="cont relative w-full shadow-black shadow-md bg-white bg-opacity-70 sm:w-5/6 md:w-4/6 lg:w-2/6 xl:w-2/6 mx-auto mt-44 sm:mt-40 mb-16 rounded-none sm:rounded-md">
                <div class="container relative bottom-0 top-0 mx-auto w-full sm:w-3/4 text-black rounded-lg items-center justify-center p-5">
                    <h1 class="signup relative top-4 font-black text-stroke text-4xl sm:text-5xl text-blue-5-0 mb-10 sm:mb-10 font-sans text-center">STREAMS</h1>
                    <div class="forms">
                        <label for="user_id" class="form_label font-bold flex flex-col mb-1 text-left"><b>Email</b></label>
                        <input autofocus id="input_userid" :class="{ 'border-red-600 border-2': errorMsg && !emailIsValid() }" type="text" name="user_id" required placeholder="Email" class="px-4 py-2 mb-4 border border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="email"/>

                        <label for="password" class="relative form_label font-bold flex flex-col mb-1 text-left"><b>Password</b></label>
                        <div class="relative">
                            <input :type="passwordVisibility ? 'text' : 'password'" id="input_password" :class="{ 'border-red-600 border-2': errorMsg && !passwordIsValid() }" name="password" required placeholder="Password" class="relative pl-4 pr-10 py-2 mb-6 border border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" v-model="password"/>
                            <button @click="togglePasswordVisibility" class="absolute top-6 transform -translate-y-1/2 right-2 focus:outline-none">
                                <img v-if="!passwordVisibility" src="hide.png" alt="Hide password" class="h-6 w-6">
                                <img v-else src="view.png" alt="Show password" class="h-6 w-6">
                            </button>
                        </div>
                        <div v-if="errorMsg" class="flex items-center bg-red-200 border-2 border-red-600 p-2 rounded-xl">
                            <img src="exclamation.png" alt="Error icon" class="w-6 h-6 mr-2">
                            <p class="font-bold text-red-600 text-sm">{{ errorMsg }}</p>
                        </div>
                        <div v-on:click="login" class="body mt-4">
                            <a href="#" class="bg-bsu-base bg-opacity-50">
                                <span>Log In</span>
                                <div class="wave"></div>
                            </a>
                        </div>
                        <br/>
                        <label for="or-text" class="font-bold relative flex flex-col mb-1 text-mid my-5">-OR-</label>
                        <router-link to="/home" id="guest" class="font-bold underline cursor-pointer flex flex-col text-mid my-2 sm:my-5"><b>Guest</b></router-link>
                        <br/>
                        <router-link to="/signup" class="relative text-center">Sign Up</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/*.cont{
    background-color: white;
    border: 2px solid #36B4E7;
    width: 40%;
    height: 100vh;
    margin-top: 10px;
    margin-left: 35%;
}*/
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
/*.container{
    margin-top: 50px;
}*/
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
  .body{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .body a{
        position: relative;
        display: block;
        padding: 10px 30px;
        border: 2px solid #00aeff;
        border-radius: 50px;
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: 4px;
        color: #00aeff;
        text-decoration: none;
        overflow: hidden
    }
    .body a:hover{
        color: white;
    }
    .body a span{
        position: relative;
        z-index: 1;
        transition: 1s;
    }
    .body a .wave{
        position: absolute;
        top: calc(100% + 22px);
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #00aeff;
        transition: 1s;
    }
    .body a:hover .wave{
        top: 0;
    }
    .body a .wave::before{
        content: '';
        position: absolute;
        top: -22px;
        left: 0;
        width: 100%;
        height: 22px;
        background-image: 'wave.png';
        animation: animate 0.5s linear infinite;
    }
    @keyframes animate{
            0%
        {
            background-position-x: 0;
            background-position-x: -22px;
        }
        100%
        {
            background-position-x: 118px;
        }
    }
</style>

<script setup>
    import { ref } from 'vue';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    import { useRouter } from 'vue-router';
    import dark_blur from '@/components/darkblur_component.vue';
    import { firestore as db } from './../../main.js';
    import store from './../../store/index.js'; // Import the Vuex store
    import { doc, getDoc } from 'firebase/firestore';
import { fetchData } from '@/dashboard_query.js';

    const email = ref("");
    const password = ref("");
    const errorMsg = ref("");
    const passwordVisibility = ref(false);

    const router = useRouter();

    const togglePasswordVisibility = () => {
        passwordVisibility.value = !passwordVisibility.value;
    };

    const emailIsValid = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email.value);
    };

    const passwordIsValid = () => {
        return password.value.length >= 8; 
    };

    const fetchUserRole = async (userId) => {
    try {
        // Reference the user document in the users collection
        const userDocRef = doc(db, 'users', userId);

        // Fetch the user document using getDoc
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // Access the role field from the document data
            const userData = userDoc.data();
            const userRole = userData.role;

            // Return the user's role
            console.log(`User Role for user ID ${userId}: ${userRole}`);
            return userRole;
        } else {
            console.log(`User document for user ID ${userId} does not exist.`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching user role for user ID ${userId}:`, error);
        return null;
    }
};
    

    const login = async () => {
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
            store.commit('startLoading');
            // Successful login
            const user = userCredential.user; // Retrieve the user object
            const userId = user.uid; // Retrieve the user ID (UID)
            const userRole = await fetchUserRole(userId);

            console.log("User ID (UID):", userId);
            console.log("User role:", userRole);

            // Dispatching the action to update the role in the store
            store.dispatch('updateRole', userRole);

            // Check if the role is updated in the store
            console.log("Vuex store role:", store.state.role);
            await fetchData()
            router.push('/home');
            
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
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
        }
        store.commit('stopLoading');
    };

</script>
