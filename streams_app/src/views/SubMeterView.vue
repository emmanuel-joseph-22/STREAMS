<template>
    <div class="all">
        <div class="nav">
            <div class="nav-links">
                <ul>
                    <router-link to="/reading"><li><a href="#">MAIN</a></li></router-link>
                    <li><a href="#">SUBMETER</a></li>
                </ul>
            </div>
        </div>
    
        <div class="container">
            <div class="content">
                <div class="main">
                    <label for="main" class="main-label">Water Source</label>
                    <select id="main" class="main-dropdown">
                        <option value="fic-1">FIC 1</option>
                        <option value="fic-2"> FIC 2</option>
                        <option value="canteen-drinking-fountain">CANTEEN DRINKING FOUNTAIN</option>
                        <option value="exec-lounge">EXECUTIVE LOUNGE</option>
                        <option value="ceafa-faculty">CEAFA FACULTY ROOM</option>
                        <option value="rgr">RGR</option>
                        <option value="cics-drinking-fountain">CICS DRINKING FOUNTAIN</option>
                        <option value="ssc">SSC</option>
                    </select>
                </div>
                <div class="m3-cont">
                    <label for="input_cubic" class="m3-label"></label>
                    <input autofocus id="input_cubic" type="text" required placeholder="m3: " class="m3-input"/>
            </div>
    
                <div class="m3-cont-x">
                    <label for="input_x" class="x-label"></label>
                    <input autofocus id="input_x" type="text" name="x" required placeholder="x0.001 " class="x-input"/>
                </div>
    
                <div class="m3-cont-x0">
                    <label for="input_x0" class="x0-label"></label>
                    <input autofocus id="input_x0" type="text" name="x0" required placeholder="x0.0001 " class="x-input"/>
                </div>
    
                <router-link to="/confirmation">
                <div class="submit">
                    <button>SUBMIT</button>
                </div>
                </router-link>
            </div>
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
    
        .nav{
            display: flex;
            justify-content: space-between;
            background-color: #3B5271;
            border-radius: 40px;
            color: #FFFFFF;
            height: 40px;
            margin-top: 30%;
            padding: 0 4rem;
        }
    
        .nav ul{
            display: flex;
            list-style-type: none; 
        }
    
        .nav ul li{
            font-weight: bold;
            margin: 0 10px;
            padding: 0;
        }
    
        .nav ul li a{
            text-decoration: none;
            color: #FFFFFF;
            font-size: 16px;
            transition: all ease 0.5s;
            margin-top: 8px;
            padding: 1px 40px;
            display: inline-block;
        }
    
        .nav ul li a:hover{
            background-color: #C9D8EC;
            color: #3B5271;
            border: 13px;
            border-radius: 30px;
        }

        .container{
            display: flex;
            background-color: #FFFFFF;
            border: 2px solid #3B5271;
            border-radius: 20px;
            margin-top: 10px;
            height: 70vh;
            padding: 0 1rem;
        }
    
        .content{
            flex: 1;
            padding: 8px;
            margin-top: 80px;
            margin-left: 10px;
            overflow-y: auto;
        }
    
        .main label{
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
            margin-top: 10px;
            text-align: justify;
        }
    
        .main-dropdown{
            width: 80vw;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #5F88BF;
            color: #3B5271;
            border-radius: 4px;
            box-sizing: border-box;
        }
    
        .m3-cont,
        .m3-cont-x,
        .m3-cont-x0 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 90%;
            margin-top: 30px;
        }
    
        .m3-label,
        .x-label,
        .x0-label {
            margin-right: 10px;
            font-weight: bold;
        }
    
        .m3-input,
        .x-input,
        .x0-input {
            width: 80vw;
            flex: 1;
            padding: 10px;
            border: 2px solid #5F88BF;
            border-radius: 4px;
            font-size: 16px;
            color: #3B5271;
            box-sizing: border-box;
            outline: none;
        }
    
        .submit button{
            background-color: #5F88BF;
            color: #F2F5F9;
            width: 40%;
            padding: 15px 25px;
            margin-top: 70px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
    
        .submit button:hover{
            background-color: #3B5271;
        }
    
    </style>
    