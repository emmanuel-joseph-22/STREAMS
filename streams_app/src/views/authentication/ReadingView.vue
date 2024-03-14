<template>
    <div class="read">
        <div class="profile">
            <img class="img" src="account.png" alt="/icon1">
            <div class="overlay">
                <img src="settings.png" alt="/icon2">
            <router-link to="/login">
                <img src="exit.png" alt="/icon3">
            </router-link>
            </div>
        </div>

        <div class="content">
            <div class="water-source">
                <label for="water-source" class="water-source-label">Water source</label>
                <select id="water-source" v-model="WaterSource" class="water-source-dropdown">
                    <option value="deep-well-1">Deep Well 1</option>
                    <option value="deep-well-2">Deep Well 2</option>
                    <option value="deep-well-3">Deep Well 3</option>
                    <option value="prime-water">Prime Water</option>
                </select>
            </div>

            <div class="building-department">
                <label for="building-department" class="building-department-label">Building Department</label>
                <select id="building-department" v-model="BuildingDepartment" class="building-department-dropdown">
                    <option value="CIT">CIT</option>
                    <option value="CEAFA">CEAFA</option>
                    <option value="CICS">CICS</option>
                    <option value="RGR">RGR</option>
                </select>
            </div>

            <div class="m3-cont">
                <label for="input_cubic" class="m3-label">m3:</label>
                <input autofocus id="input_cubic" type="text" name="cubic" required placeholder="m3: " class="m3-input"/>
            </div>

            <div class="m3-cont-x">
                <label for="input_x" class="x-label">x0.001</label>
                <input autofocus id="input_x" type="text" name="x" required placeholder="x0.001 " class="x-input"/>
            </div>

            <div class="m3-cont-x0">
                <label for="input_x0" class="x0-label">x0.0001</label>
                <input autofocus id="input_x0" type="text" name="x0" required placeholder="x0.0001 " class="x-input"/>
            </div>

            <div class="submit">
                <button>SUBMIT</button>
            </div>

            <nav class="bot-navi">
                <!--<a href="#" class="bot-navi-item">Home</a>-->
                <a href="#" class="bot-navi-item">
                    <img src="home.png" alt="Home" class="navi-image">
                    Home
                </a>
                <!--<a href="#" class="bot-navi-item">Reading</a>-->
                <a href="#" class="bot-navi-item">
                    <img src="water-meter.png" alt="reading" class="navi1-image">
                    Reading
                </a>
                <!--<a href="#" class="bot-navi-item">Map</a>-->
                <a href="#" class="bot-navi-item">
                    <img src="map.png" alt="map" class="navi2-image">
                    Map
                </a>
            </nav>

        </div>
    </div>
</template>

<style scoped>
    body {
        background-color: #F2F5F9;
        margin: 0;
    }

    .read {
        display: flex;
        position: relative;
        height: 100vh; 
    }

    .profile {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 100vh;
        padding: 8px;
        overflow: fixed;
    }

    .img {
        width: 25px;
        height: 25px;
        transition: transform 0.5s ease;
    }

    .overlay {
        position: absolute;
        top: 0;
        top: 100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(217, 207, 255, 0.5);
        color: #3B5271;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease;
        transform: translateY(-100%);
    }

    .profile:hover .img {
        margin-top: 0;
        margin-left: 80px;
        transform: scale(1.1);
    }

    .profile:hover .overlay {
        opacity: 1;
        width: 120px;
    }

    .overlay img {
        width: 25px;
        height: 25px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .content {
        flex: 1;
        padding: 8px;
        margin-top: 60px;
        margin-left: 20px;
        overflow-y: auto; 
    }

    .water-source label,
    .building-department label {
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .water-source-dropdown,
    .building-department-dropdown {
        width: 90%; 
        padding: 8px;
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
        margin-top: 20px;
        margin-left: 70px;
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
        flex: 1;
        padding: 8px;
        border: 2px solid #5F88BF;
        border-radius: 4px;
        font-size: 16px;
        color: #3B5271;
        box-sizing: border-box;
        outline: none;
    }

    .submit{
        background-color: #5F88BF;
        color: #F2F5F9;
        width: 40%;
        padding: 10px 20px;
        margin-top: 70px;
        margin-left: 100px;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .submit:hover{
        background-color: #3B5271;
    }

    .bot-navi {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #C9D8EC;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 60px;
    }

    .navi-image{
        display: block;
        margin: 0 auto 3px;
        width: 28px; 
        height: auto;
    }

    .navi1-image{
        display: block;
        margin: 0 auto 2px;
        width: 38px; 
        height: auto;
    }

    .navi2-image{
        display: block;
        margin: 0 auto 3px;
        width: 30px; 
        height: auto;
    }

    .bot-navi-item {
        text-decoration: none;
        color: #3B5271;
        font-weight: bold;
        padding: 10px;
        transition: all 0.3s ease;
    }

    .bot-navi-item:hover {
        background-color: #3B5271;
        border-radius: 10px;
        color: #C9D8EC;
    }
</style>
