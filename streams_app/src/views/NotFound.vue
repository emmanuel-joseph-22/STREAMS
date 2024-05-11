
<template>
    <div class="container">
        <h1>404</h1>
        <h3>Page not found</h3>
        <router-link :to="{ name: 'home' }">
            <button class="return">Go back</button>
        </router-link>
    </div>
</template>

<style scoped>
    .container {
        margin: 0 auto;
        margin-top: 20vh;
        max-width: 400px;
        display: flex;
        flex-direction: column;
    }
    .container h1 {
        font-size: 3rem;

    }
    .container h3 {
        margin-top: -15px;
        font-size: 2rem;
    }
    .container button[class="return"]{
        background-color: #630606;
        color: #ffffff;
        border: none;
        margin-top: 20vh;
        width: 200px;
        height: 40px;
        border-radius: 25px;    
        cursor: pointer;
        -webkit-border-radius: 25px;
        -moz-border-radius: 25px;
        -ms-border-radius: 25px;
        -o-border-radius: 25px;
        align-self: center;
    }
  
  .container button[class="return"]:hover {
    background-color: #a30d0d;
  }
</style>