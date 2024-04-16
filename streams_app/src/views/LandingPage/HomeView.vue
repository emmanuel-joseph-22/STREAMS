<template>
    <header>
        <div class="logo">
            <img src="aquatech_v1.png" alt="">
            <img src="Batangas_State_Logo 2.png" alt="">
            <img src="sdo_.png" alt="">
        </div>

        <ul>
           <router-link to="/login"> <a href="#">Home</a> 
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">FAQ</a> </router-link>
        </ul>
    </header>
    <div class="body">
        <img src="water_land.png" alt="">
    </div>
</template> 

<script>

</script>

<style scoped>
 header{
    height: 4rem;
    width: 100vw;
    background-color: #0E5E7B;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 20px 2px #36B4E7;
}

.logo{
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: flex;
    margin-left: 0;
}
ul a{
    color: #FFFFFF;
    font-weight: bold;
    font-size: 18px;
    margin-left: 1rem;
    margin-right: 1rem;
    transition: 1s;
}
ul a:hover{
    font-size: 1.5rem;
    color: #36B4E7;
}
.body {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: end;
}
.body img{
    width: 40vw;
    height: 60vh;
    display: flex;
}
</style>
