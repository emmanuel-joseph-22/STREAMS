<template>
    <header-bar>
        <h1 class="text-4xl font-semibold ml-24">Events</h1>
    </header-bar>
    <home-page>
        <div class="grid grid-cols-8 gap-4 relative w-full mx-auto sm:w-5/6 md:w-4/6 lg:w-5/6 xl:w-5/6 mx-auto mt-8 sm:mt-12 mb-16">
            <div class="col-span-7 overflow-x-auto">
                <div class="grid grid-cols-1">
                    <table class="table-auto w-full">
                        <thead>
                            <tr>
                                <th class="border border-gray-700 px-4 py-2" style="width: 164px;">Cell Number</th>
                                <th class="border border-gray-700 px-4 py-2" style="width: 150px;">Date of Events</th>
                                <th class="border border-gray-700 px-4 py-2" style="width: 170px;">Time of Events</th>
                                <th class="border border-gray-700 px-4 py-2" style="width: 158px;">Facility</th>
                                <th class="border border-gray-700 px-4 py-2" style="width: 185px;">Number of Hours</th>
                                <th class="border border-gray-700 px-4 py-2" style="width: 146px;">Office/College Department</th>
                                <th class="border border-gray-700 px-4 py-2">Purpose/Event</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in tableData" :key="index">
                                <td class="border border-gray-700 bg-gray-500 px-2 text-white">{{ index + 1 }}</td>
                                <td class="border border-gray-700 p-2">
                                    <div class="flex items-center">
                                        <input v-model="row.column1" type="date" class="border-none px-4 py-2 w-full">
                                    </div>
                                </td>
                                <td class="border border-gray-700 bg-gray-500 p-2">
                                    <input v-model="row.column2" type="time" class="border-none bg-gray-500 px-4 py-2 w-full text-white">
                                </td>
                                <td class="border border-gray-700 p-2">{{ row.column3 }}</td>
                                <td class="border border-gray-700 bg-gray-500 p-2 text-white">{{ row.column4 }}</td>
                                <td class="border border-gray-700 p-2">{{ row.column5 }}</td>
                                <td class="border border-gray-700 bg-gray-500 p-2 text-white">{{ row.column6 }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button @click="togglePopup" class="px-4 py-2 bg-blue-500 text-white">Add Record</button>
                    <div v-if="showPopup" class="fixed inset-0 bg-gray-900 bg-opacity-60 z-20">
                        <div class="popup-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-[500px] bg-[#042334] border-4 border-[#36B4E7] text-[#36B4E7] rounded-lg shadow-lg z-30 p-4 transition-transform transition-opacity duration-500 ease-out">
                            <h2 class="text-white">Add Record</h2>
                            <form @submit.prevent="addRow" class="mt-8 form-container">
                                <div class="grid grid-row-7 gap-4 w-full">
                                    <input type="date" v-model="newRow.column1" placeholder="Date of Events" class="form-input px-4 py-2 rounded-md" />
                                    <input v-model="newRow.column2" type="time" placeholder="Time of Events" class="form-input px-4 py-2 rounded-md" />
                                    <input v-model="newRow.column3" type="text" placeholder="Facility" class="form-input px-4 py-2 rounded-md" />
                                    <input v-model="newRow.column4" type="number" placeholder="Number of Hours" class="form-input px-4 py-2 rounded-md" />
                                    <input v-model="newRow.column5" type="text" placeholder="Office/College Department" class="form-input px-4 py-2 rounded-md" />
                                    <input v-model="newRow.column6" type="text" placeholder="Purpose/Event" class="form-input px-4 py-2 rounded-md" />
                                </div>
                            </form>
                            <button @click="addRow" type="submit" class="submit absolute bottom-12 text-white">Save</button>
                            <button @click="togglePopup" class="btn-close absolute bottom-4 right-4 text-red-500 hover:text-red-700">Close</button>
                        </div>
                    </div>
        </div>
    </home-page>
</template>



<script>
import HomePageView from "./../dashboard/HomePageView.vue";
import header from './../../components/header_component.vue';
import { ref } from 'vue';

export default {
    components: {
        'home-page' : HomePageView,
        'header-bar': header
    },
    data() {
        return {
            tableData: [],
            newRow: {
                column1: '',
                column2: '',
                column3: '',
                column4: '',
                column5: '',
                column6: ''
            }
        };
    },
    methods: {
        addRow() {
            this.tableData.push({ ...this.newRow });
            this.newRow = {
                column1: '',
                column2: '',
                column3: '',
                column4: '',
                column5: '',
                column6: ''
            };
        },
        handleButtonClick(row) {
            console.log('Setting date:', row.date);
        }
    },
    setup(){
        const showPopup = ref(false);

        const togglePopup = () => {
            showPopup.value = !showPopup.value;
        };

        return {
            showPopup,
            togglePopup
        };
    }
};
</script>

<style>
.form-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: flex-start;
}
.form-input {
    flex: 1;
    min-width: 0;
}
</style>