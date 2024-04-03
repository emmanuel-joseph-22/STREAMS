<template>
    <div class="account-cont">
        <div class="cont">
        <img src="user.png" alt="User" class="user-img">
        <div class="settings">
            <h1 class="mr-4">AQUATECH</h1>

            <div class="def-name">
                <label for="def-name" class="def-name-label">Default Name</label>
                <input autofocus id="def-name" type="text" required placeholder="Default Name" class="def-name-input"/>
            </div>
             
            <router-link to="/password">
            <div class="password">
                <label for="password" class="password-label">Change Password</label>
                <input autofocus id="password" type="text" required placeholder="Password" class="password-input"/>
            </div>
            </router-link>

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
        width: 150px;
        height: 150px;
        margin: 15px;
        margin-left: 38%;
    }

    .cont{
        background-color: #042334;
        border-radius: 20px;
        width: 50%;
        height: 90vh;
        margin-top: 25px;
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

    .password{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 30px;
    }

    .password-label{
        margin-top: 30px;
        margin-right: 37%;
        font-weight: bold;
        color: #FFFFFF;
    }

    .password-input{
        width: 60%;
        flex: 1;
        padding: 8px;
        border: 2px solid #5F88BF;
        border-radius: 4px;
        font-size: 16px;
        color: #3B5271;
        box-sizing: border-box;
        outline: none;
    }
    
    .save button{
        background-color: #0E5E7B;
        color: #F2F5F9;
        width: 40%;
        padding: 10px 20px;
        margin-top: 60px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .save button:hover{
        background-color: #36B4E7;
    }
</style>