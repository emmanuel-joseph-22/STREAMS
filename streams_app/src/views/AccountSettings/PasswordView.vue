<template>
    <div class="default">
        <div class="change">
            <label for="input-change" class="change-label">Old Password</label>
            <input autofocus id="input-change" type="text" name="change" required placeholder="Old Password" class="change-input"/>
        </div>
        <div class="change-1">
            <label for="input-change-1" class="change-1-label">New Password</label>
            <input autofocus id="input-change-1" type="text" name="change-1" required placeholder="New Password" class="change-1-input"/>
        </div>
        <div class="change-2">
            <label for="input-change-2" class="change-2-label">Retype New Password</label>
            <input autofocus id="input-change-2" type="text" name="change-2" required placeholder="Retype New Password" class="change-2-input"/>
        </div>
        <router-link to="/settings">
        <div class="confirm">
            <button>CONFRIM</button>
        </div>
        </router-link>
    </div>
</template>


<style scoped>
    .default{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #FFFFFF;
        border: 2px solid #3B5271;
        border-radius: 20px;
        margin-top: 80px;
        margin-left: 32%;
        height: 70vh;
        width: 30vw;
        padding: 0 1rem;
    }

    .change,
    .change-1,
    .change-2 {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 90%;
        margin-top: 30px;
    }

    .change-label,
    .change-1-label,
    .change-2-label {
        margin-right: 10px;
        font-weight: bold;
    }

    .change-input,
    .change-1-input,
    .change-2-input {
        width: 90%;
        flex: 1;
        padding: 10px;
        border: 2px solid #5F88BF;
        border-radius: 4px;
        font-size: 16px;
        color: #3B5271;
        box-sizing: border-box;
        outline: none;
    }

    .confirm button{
        background-color: #5F88BF;
        color: #F2F5F9;
        width: 100%;
        padding: 10px 20px;
        margin-top: 40px;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .confirm button:hover{
        background-color: #3B5271;
    }
</style>