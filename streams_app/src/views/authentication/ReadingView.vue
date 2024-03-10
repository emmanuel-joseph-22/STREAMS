<template>
    <div class="reading">
        <div class="employee">
            <h1>EMPLOYEE'S READING</h1>
        </div>

        <router-link to = "/">
            <button class="submit bg-blue-700 text-blue-200 py-2 px-4 rounded-full mt-5 flex flex-col">Log In</button>
        </router-link>
    </div>
</template>


<style>
    .reading{
        background-color: aqua;
        display: flex;
        height: 100%;
    }
    .reading h1{
        font-size: 25vh;
        text-align: center;
        color: brown;
}
</style>