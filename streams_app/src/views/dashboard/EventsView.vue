<template>
    <home-page>
        <header-bar>
            <h1 class="font-arial font-bold text-4xl ml-3">Events</h1>
        </header-bar>
    <div class="container mx-auto px-4 py-6">
            <button @click="toggleForm" class="circle-button fixed bottom-16 right-5 lg:bottom-10 m-2 w-14 h-14 rounded-full bg-[#042334] border-2 border-[#36B4E7] text-white  hover:cursor-pointer hover:text-white transition duration-300 ease-in-out font-bold flex items-center justify-center z-10">
                <img src="add.png" alt="add-events-icon" class="w-6 h-6">
            </button>

            <!-- Table for CEAFA Building events -->
            <h2 class="text-2xl font-semibold mb-4">CEAFA Building Events</h2>
            <div class="my-8 overflow-x-auto">
                <table class="w-full bg-white border rounded shadow-md">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-4 py-2 border">Event Number</th>
                            <th class="px-4 py-2 border">Date of Event</th>
                            <th class="px-4 py-2 border">Time of Event</th>
                            <th class="px-4 py-2 border">Facility</th>
                            <th class="px-4 py-2 border">Number of Hours</th>
                            <th class="px-4 py-2 border">Department</th>
                            <th class="px-4 py-2 border">Purpose/Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(event, index) in ceafaEvents" :key="index">
                            <td class="px-4 py-2 border">{{ index + 1 }}</td>
                            <td class="px-4 py-2 border">{{ event.dateOfEvent }}</td>
                            <td class="px-4 py-2 border">{{ event.timeOfEvent }}</td>
                            <td class="px-4 py-2 border">{{ event.facility }}</td>
                            <td class="px-4 py-2 border">{{ event.numberOfHours }}</td>
                            <td class="px-4 py-2 border">{{ event.department }}</td>
                            <td class="px-4 py-2 border">{{ event.purposeEvent }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Table for Fitness Development Center events -->
            <h2 class="text-2xl font-semibold mb-4">Fitness Development Center Events</h2>
            <div class="my-8 overflow-x-auto">
                <table class="w-full bg-white border rounded shadow-md">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-4 py-2 border">Event Number</th>
                            <th class="px-4 py-2 border">Date of Event</th>
                            <th class="px-4 py-2 border">Time of Event</th>
                            <th class="px-4 py-2 border">Facility</th>
                            <th class="px-4 py-2 border">Number of Hours</th>
                            <th class="px-4 py-2 border">Department</th>
                            <th class="px-4 py-2 border">Purpose/Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(event, index) in fdcEvents" :key="index">
                            <td class="px-4 py-2 border">{{ index + 1 }}</td>
                            <td class="px-4 py-2 border">{{ event.dateOfEvent }}</td>
                            <td class="px-4 py-2 border">{{ event.timeOfEvent }}</td>
                            <td class="px-4 py-2 border">{{ event.facility }}</td>
                            <td class="px-4 py-2 border">{{ event.numberOfHours }}</td>
                            <td class="px-4 py-2 border">{{ event.department }}</td>
                            <td class="px-4 py-2 border">{{ event.purposeEvent }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Floating popup form -->
            <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
                <div class="popup-box bg-white p-6 rounded-md shadow-md w-2/3 md:w-1/2 lg:w-1/3">
                    <h2 class="text-lg font-semibold mb-4">Add Event</h2>


        <form @submit.prevent="saveEventData" class="grid gap-4">
            <!-- Building Location Dropdown -->
            <div class="input-container">
                <select v-model="newRow.buildingLocation" class="input-field" :class="{ 'border-red-500': error === 'Please select a building location.' }">
                    <option value="" disabled selected>Select Building Location</option>
                    <option value="CEAFA Building">CEAFA Building</option>
                    <option value="Fitness Development Center">Fitness Development Center</option>
                </select>
                <div v-if="error === 'Please select a building location.'" class="error-message">{{ error }}</div>
            </div>

            <!-- Date of Event -->
            <div class="input-container">
                <input v-model="newRow.dateOfEvent" type="date" placeholder="Date of Event" class="input-field" :class="{ 'border-red-500': error === 'Please provide a date of event.' }" />
                <div v-if="error === 'Please provide a date of event.'" class="error-message">{{ error }}</div>
            </div>

            <!-- Time of Event -->
            <div class="input-container">
                <input v-model="newRow.timeOfEvent" type="time" placeholder="Time of Event" class="input-field" :class="{ 'border-red-500': error === 'Please provide a time of event.' }" />
                <div v-if="error === 'Please provide a time of event.'" class="error-message">{{ error }}</div>
            </div>

            <!-- Facility -->
            <div class="input-container">
                <input v-model="newRow.facility" type="text" placeholder="Facility" class="input-field" :class="{ 'border-red-500': error === 'Please provide a facility.' }" />
                <div v-if="error === 'Please provide a facility.'" class="error-message">{{ error }}</div>
            </div>

            <!-- Number of Hours -->
            <div class="input-container">
                <input v-model="newRow.numberOfHours" type="number" placeholder="Number of Hours" class="input-field" :class="{ 'border-red-500': error === 'Please provide the number of hours.' }" />
                <div v-if="error === 'Please provide the number of hours.'" class="error-message">{{ error }}</div>
            </div>

            <!-- Department -->
            <div class="input-container">
                <select v-model="newRow.department" class="input-field" type="text" placeholder="Office/College Department" :class="{ 'border-red-500': error === 'Please provide a department.' }" >
                    <option value="" disabled selected>Office/College Department</option>
                    <option value="CIT Department">CIT</option>
                    <option value="CEAFA Department">CEAFA</option>
                    <option value="CICS Department">CICS</option>
                </select>
                <div v-if="error === 'Please provide a department.'" class="error-message">{{ error }}</div>
            </div>

            <!-- Purpose/Event -->
            <div class="input-container">
                <input v-model="newRow.purposeEvent" type="text" placeholder="Purpose/Event" class="input-field" :class="{ 'border-red-500': error === 'Please provide the purpose/event.' }" />
                <div v-if="error === 'Please provide the purpose/event.'" class="error-message">{{ error }}</div>
            </div>

            <!-- Save and Close buttons -->
            <div class="flex justify-between mt-4">
                <button type="submit" class="w-26 md:w-14 text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out flex items-center justify-center">Save</button>
                <button @click="toggleForm" class="text-red-500 hover:text-red-700">Close</button>
            </div>
        </form>
    </div>
</div>
    </div>
</home-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import HomePageView from './../dashboard/HomePageView.vue';
import HeaderBar from './../../components/header_component.vue';
import { firestore as db } from "../../main.js";
import { setDoc, doc, collection, query, where, getDocs } from "firebase/firestore";

export default {
    components: {
        'home-page': HomePageView,
        'header-bar': HeaderBar,
    },
    setup() {
        // Define state using ref
        const showForm = ref(false);
        const newRow = ref({
            dateOfEvent: '',
            timeOfEvent: '',
            facility: '',
            numberOfHours: '',
            department: '',
            purposeEvent: '',
            buildingLocation: '',
        });
        const error = ref(null);
        const ceafaEvents = ref([]);
        const fdcEvents = ref([]);

        // Define methods
        const toggleForm = () => {
            showForm.value = !showForm.value;
        };

        const validateForm = () => {
            // Reset error
            error.value = null;

            // Validate according to the specified prioritization
            if (!newRow.value.buildingLocation) {
                error.value = 'Please select a building location.';
            } else if (!newRow.value.dateOfEvent) {
                error.value = 'Please provide a date of event.';
            } else if (!newRow.value.timeOfEvent) {
                error.value = 'Please provide a time of event.';
            } else if (!newRow.value.facility) {
                error.value = 'Please provide a facility.';
            } else if (!newRow.value.numberOfHours) {
                error.value = 'Please provide the number of hours.';
            } else if (!newRow.value.department) {
                error.value = 'Please provide a department.';
            } else if (!newRow.value.purposeEvent) {
                error.value = 'Please provide the purpose/event.';
            }

            return error.value === null;
        };

        const generateDocId = () => {
            return `event_${Date.now()}`;
        };

        const resetForm = () => {
            newRow.value = {
                dateOfEvent: '',
                timeOfEvent: '',
                facility: '',
                numberOfHours: '',
                department: '',
                purposeEvent: '',
                buildingLocation: '',
            };
            error.value = null;
        };

        const fetchEvents = async () => {
            try {
                const currentDate = new Date();
                const endOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

                const startOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

                const ceafaQuery = query(
                    collection(db, 'events', 'BSU_Alangilan', 'CEAFA Building'),
                    where('dateOfEvent', '>=', startOfPreviousMonth.toISOString()),
                    where('dateOfEvent', '<=', endOfCurrentMonth.toISOString())
                );

                const fdcQuery = query(
                    collection(db, 'events', 'BSU_Alangilan', 'Fitness Development Center'),
                    where('dateOfEvent', '>=', startOfPreviousMonth.toISOString()),
                    where('dateOfEvent', '<=', endOfCurrentMonth.toISOString())
                );

                const [ceafaSnapshot, fdcSnapshot] = await Promise.all([
                    getDocs(ceafaQuery),
                    getDocs(fdcQuery)
                ]);

                ceafaEvents.value = ceafaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                fdcEvents.value = fdcSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                console.log('Filtered CEAFA Events:', ceafaEvents.value);
                console.log('Filtered FDC Events:', fdcEvents.value);
            } catch (error) {
                console.error('Error fetching events data:', error);
            }
        };

        const saveEventData = async () => {
            if (!validateForm()) {
                return;
            }

            try {
                const eventId = generateDocId();
                const buildingLocation = newRow.value.buildingLocation;

                const eventDocRef = doc(db, 'events', 'BSU_Alangilan', buildingLocation, eventId);

                await setDoc(eventDocRef, {
                    dateOfEvent: newRow.value.dateOfEvent,
                    timeOfEvent: newRow.value.timeOfEvent,
                    facility: newRow.value.facility,
                    numberOfHours: newRow.value.numberOfHours,
                    department: newRow.value.department,
                    purposeEvent: newRow.value.purposeEvent,
                });

                console.log('Event data saved successfully to Firestore!');
                await fetchEvents();
                resetForm();
                toggleForm();
            } catch (error) {
                console.error('Error saving event data to Firestore:', error);
            }
        };

        // Use onMounted lifecycle hook
        onMounted(async () => {
            await fetchEvents();
        });

        // Return reactive data and methods
        return {
            showForm,
            newRow,
            error,
            ceafaEvents,
            fdcEvents,
            toggleForm,
            validateForm,
            generateDocId,
            resetForm,
            fetchEvents,
            saveEventData,
        };
    },
};
</script>



<style scoped>
.container {
    margin: 0 auto;
    padding: 20px;
}

.input-field {
    padding: 8px;
    border: 2px solid #d1d5db;
    border-radius: 0.375rem;
    width: 100%;
    box-sizing: border-box;
}

/* Error styling */
.input-field.border-red-500 {
    border-color: red;
}  


.error-message {
    position: relative;
    padding: 4px;
    text-align: left;
    font-size: 0.75rem;
    color: red;
}

</style>