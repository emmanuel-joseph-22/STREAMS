<template>
    <div class="all">
        <div class="container">

          <router-link to="/reading">
          <div class="confirm">
              <button>Confirm</button>
          </div>
          </router-link>
        </div>
    </div>
</template>

<style scoped>
  .all{
      font-family: 'Times New Roman', Times, serif;
      background-color: #F2F5F9;
      height: 100vh;
      width: auto;
      margin: 0;
      padding: 0;
  }

  .container{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #FFFFFF;
      border: 2px solid #3B5271;
      border-radius: 20px;
      margin-top: 30%;
      height: 70vh;
      padding: 0 1rem;
  }

  .confirm button{
      background-color: #5F88BF;
      color: #F2F5F9;
      width: 40vw;
      padding: 15px 25px;
      margin-top: 55vh;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: background-color 0.3s;
  }

  .confirm button:hover{
      background-color: #3B5271;
  }

</style>
