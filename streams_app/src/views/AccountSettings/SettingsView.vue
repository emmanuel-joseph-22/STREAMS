<template>
    <div class="account-cont">
        <div class="cont">
        <img src="user.png" alt="User" class="user-img">
        <div class="settings">
            <h1 class="mr-4">AQUATECH</h1>
            <h2>aquatech@gmail.com</h2>
            <!--<div class="def-name">
                <label for="def-name" class="def-name-label">Default Name</label>
                <input autofocus id="def-name" type="text" required placeholder="Default Name" class="def-name-input"/>
            </div>
             
            <router-link to="/password">-->
            <!--<div class="password">
                <label for="password" class="password-label">Change Password</label>
                <div class="password-input-cont">
                    <input autofocus id="password" type="text" required placeholder="Password" class="password-input"/>
                    <router-link to="/password">
                    <img src="next.png" alt="next-icon">
                    </router-link>
                </div>   
            </div>-->
            <!--</router-link>-->
            <div class="default">
                <h3>Default Name</h3>
                <div class="def-icon">
                    <router-link to="/defname"><img src="next.png" alt=""></router-link>
                </div>
            </div>

            <div class="password">
                <h4>Change Password</h4>
                <div class="pass-icon">
                    <router-link to="/password"><img src="next.png" alt=""></router-link>
                </div>
            </div>

            <router-link to="/home">
            <div class="save">
                <button>SAVE CHANGES</button>
            </div>
            </router-link>
        </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
    .account-cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    .account-cont img{
        width: 130px;
        height: 130px;
        margin: 15px;
        margin-left: 40%;
    }

    .cont{
        background-color: #042334;
        border-radius: 20px;
        width: 50%;
        height: 95vh;
        margin-top: 15px;
        margin-left: 10px;
    }

    .settings{
        flex: 1;
        padding: 8px;
        margin-top: 10px;
        margin-left: 8px;
        width: 100%;
    }

    .settings h1{
        font-size: 2rem;
        font-weight: bold;
        font-family: 'Times New Roman', Times, serif;
        color: #FFFFFF;
    }

    .settings h2{
        color: #4E636F;
        font-weight: bold;
    }

/*check*/
    .default h3,
    .password h4{
        color: #0E5E7B;
        font-size: 16px;
        font-weight: bold;
        margin-top: 10px;
        margin-right: 60%;
        opacity: 1;
    }
/*check*/
    .default,
    .password{
        width: 60%;
        height: 45px;
        box-sizing: border-box;
        border: 2px solid #5F88BF;
        border-radius: 3px;
        margin-top: 40px;
        margin-left: 20%;
        background-color: #FFFFFF;
        align-items: center;
    }   
/*check*/
    .def-icon img,
    .pass-icon img{
        width: 30px;
        height: 30px;
        margin: 10px;
        margin-top: -25px;
        margin-left: 26vw;
    }

    .save button{
        background-color: #0E5E7B;
        color: #F2F5F9;
        width: 40%;
        padding: 10px 20px;
        margin-top: 35px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .save button:hover{
        background-color: #36B4E7;
    }
</style>