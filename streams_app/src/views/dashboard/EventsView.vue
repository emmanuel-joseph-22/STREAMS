<template>
    <div class="container mx-auto px-4 py-6">
        <header-bar>
            <h1 class="text-4xl font-semibold ml-24">Events</h1>
        </header-bar>
        <home-page>
            <!-- Button to toggle the form -->
            <div class="my-8">
                <button @click="toggleForm" class="bg-blue-500 text-white px-4 py-2 rounded-md">
                    {{ showForm ? 'Close' : 'Add Event' }}
                </button>
            </div>

            <!-- Table for CEAFA Building events -->
            <div class="my-8">
                <h2 class="text-2xl font-semibold mb-4">CEAFA Building Events</h2>
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
            <div class="my-8">
                <h2 class="text-2xl font-semibold mb-4">Fitness Development Center Events</h2>
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
        
        <!-- Error message display -->
        <div v-if="error" class="text-red-500 text-sm mb-2">{{ error }}</div>

        <form @submit.prevent="saveEventData" class="grid gap-4">
            <!-- Building Location Dropdown -->
            <select v-model="newRow.buildingLocation" class="input-field" :class="{ 'border-red-500': error === 'Please select a building location.' }">
                <option value="" disabled selected>Select Building Location</option>
                <option value="CEAFA Building">CEAFA Building</option>
                <option value="Fitness Development Center">Fitness Development Center</option>
            </select>

            <!-- Other form inputs... -->
            <input v-model="newRow.dateOfEvent" type="date" placeholder="Date of Event" class="input-field" :class="{ 'border-red-500': error === 'Please provide a date of event.' }" />
            <input v-model="newRow.timeOfEvent" type="time" placeholder="Time of Event" class="input-field" :class="{ 'border-red-500': error === 'Please provide a time of event.' }" />
            <input v-model="newRow.facility" type="text" placeholder="Facility" class="input-field" :class="{ 'border-red-500': error === 'Please provide a facility.' }" />
            <input v-model="newRow.numberOfHours" type="number" placeholder="Number of Hours" class="input-field" :class="{ 'border-red-500': error === 'Please provide the number of hours.' }" />
            <input v-model="newRow.department" type="text" placeholder="Office/College Department" class="input-field" :class="{ 'border-red-500': error === 'Please provide a department.' }" />
            <input v-model="newRow.purposeEvent" type="text" placeholder="Purpose/Event" class="input-field" :class="{ 'border-red-500': error === 'Please provide the purpose/event.' }" />

            <!-- Save and Close buttons -->
            <div class="flex justify-between mt-4">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                <button @click="toggleForm" class="bg-gray-500 text-white px-4 py-2 rounded-md">Close</button>
            </div>
        </form>
    </div>
</div>

        </home-page>
    </div>
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
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    width: 100%;
    box-sizing: border-box;
}

/* Error styling */
.input-field.border-red-500 {
    border-color: red;
}
</style>
