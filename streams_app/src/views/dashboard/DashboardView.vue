<template>
    <home-page>
        <header-bar>
            <h1>Dashboard bitch fdraft na magulo</h1>
        </header-bar>
        <main-content>
            <!-- bldg department filter -->
            <div class="dash_container">
                <select class="field">
                    <option value="CM1" class="dept_option">Water Meter (CM1)</option>
                    <option value="DW1" class="dept_option">Deep well 1</option>
                    <option value="DW2" class="dept_option">Deep well 2</option>
                </select>
                <br/>
                <!-- record - date -->
                <input class="field" type="date"/>
                <br/>
                <!-- record details -->
                <div class="record_details">
                    <div>Date: {{ date }}</div>
                    <div>Time: {{ time }}</div>
                    <div>m3: {{ meter }}</div>
                </div>
            </div>
            <div class="dash_container">
                <!-- graph -->
                <div class="graph">
                    <div>Water Consumption (m^3)</div>
                    <div class="consumption_category">
                        <div>Monthly</div>
                        <div class="data_pattern">

                        </div>
                    </div>
                    <div class="consumption_category">
                        <div>Yearly</div>
                        <div class="data_pattern">

                        </div>
                    </div>
                </div>
            </div>

        </main-content>
    </home-page>
</template>

<script>
import HomePageView from './HomePageView.vue';
import header from '../../components/header_component.vue';
import dashboard_content from '../../components/dashboard_content.vue'

export default {
    components: {
        'home-page': HomePageView,
        'header-bar': header,
        'main-content': dashboard_content
    },
    data(){
        return {
            date: 'April 1, 2024',
            time: '11:30 p.m.',
            meter: '10m^3'
        }
    }
}
</script>

<style scoped>
.dash_container{
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    align-items: center;
    margin: 40px 0 0 0;
}

.field{
    width: 80%;
    height: 50px;
    border-radius: 12px;
    border: 1px solid black;
    background-color: rgb(193, 221, 246);
    font-size: 1.1rem;
}

.dept_option {
    height: 50px;
    width: 80px;
}

.record_details{
    text-align: left;
    width: 80%;
    height: 200px;
    border-radius: 12px;
    border: 1px solid black;
    background-color: white;
}
/* record details text */
.record_details > div{
    margin: 35px;
    font-size: 1rem;
}
.graph{
    text-align: left;
    width: 100%;
    height: auto;
    border-radius: 12px;
    border: 1px solid black;
    background-color: rgba(193, 221, 246, 0.541);
    padding: 10px 0;
}

</style>

<style scoped>
/*more specific anik anik*/
.consumption_category{
    font-weight: bold;
    font-size: 1rem;
    margin: 10px 0;
}
.data_pattern{
    width: inherit;
    height: 200px;
    background-color: rgb(193, 221, 246);
}
</style>