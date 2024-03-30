<template>
    <div class="account-cont">
        <img src="user.png" alt="User" class="user-img">
        <div class="settings">
            <h1 class="mr-4">AQUATECH</h1>

            <div class="edit">
                <img src="edit.png" alt="edit">
            </div>
            <router-link to="/password">
            <div class="password">
                <label for="password" class="password-label">Password</label>
                <input autofocus id="password" type="text" required placeholder="Password" class="password-input"/>
            </div>
            </router-link>

            <router-link to="/home">
            <div class="save">
                <button>SAVE</button>
            </div>
            </router-link>

        </div>
    </div>
</template>

<script>

</script>

<style scoped>
    .account-cont{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #FFFFFF;
        border: 2px solid #3B5271;
        border-radius: 20px;
        margin-top: 40px;
        margin-left: 32%;
        height: 90vh;
        width: 40vw;
        padding: 0 1rem;
        cursor: pointer;
    }

    .account-cont img{
        width: 150px;
        height: 150px;
        margin: 20px;
    }

    .settings{
        flex: 1;
        padding: 8px;
        margin-top: 20px;
        margin-left: 8px;
        width: 100%;
    }

    .settings h1{
        font-size: 2rem;
        font-weight: bold;
        font-family: 'Times New Roman', Times, serif;
        color: #3B5271;
        margin-top: 0;
    }

    .edit img{
        width: 20px;
        height: 20px;
        position: absolute;
        margin-left: 25%;
        top: 43%;
    }

    .password{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 20px;
    }

    .password-label{
        margin-top: 20px;
        margin-right: 10px;
        font-weight: bold;
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
        background-color: #5F88BF;
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
        background-color: #3B5271;
    }
</style>