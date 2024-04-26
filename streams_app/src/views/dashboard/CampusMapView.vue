<template>
    <home-page>
      <main-content>
        <div class="map-wrap">
          <div class="map" ref="mapContainer"></div>
          <div v-if="showPopup" class="popup">
            <div class="popup-content">
              <h3>{{ popupContent }}</h3>
              <button @click="hidePopup">Close</button>
            </div>
          </div>
        </div>
      </main-content>
    </home-page>
  </template>
  
  <script>
  import HomePageView from './HomePageView.vue';
  import dashboard_content from '../../components/dashboard_content.vue'
  import { Map, Marker } from 'maplibre-gl';
  import { shallowRef, onUnmounted, markRaw, watch, ref } from 'vue';
  import { Geolocation, Capacitor } from '@capacitor/core';
  
  
  export default {
    components: {
      'home-page': HomePageView,
      'main-content': dashboard_content
    },
    name: "MapComponent",
    setup() {
      const mapContainer = shallowRef(null);
      const map = shallowRef(null);
      const showPopup = ref(false);
      const popupContent = ref('');

    async function checkPermissions() {
      const permStatus = await Geolocation.checkPermissions();
        if (permStatus.location === 'denied') {
          await Geolocation.requestPermissions();
  }
}
    async function getCurrentLocation() {
      // Check if the app is running on a mobile device
      if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
        await checkPermissions();
        try {
          const coordinates = await Geolocation.getCurrentPosition();
          if (isWithinBounds(coordinates.coords)) {
            centerMapOnLocation(coordinates.coords);
          } else {
            console.log("User's location is outside the defined map bounds.");
          }
          return coordinates.coords;
        } catch (error) {
          console.error('Error getting location:', error);
        }
      } else {
        console.log("Geolocation skipped: not on a mobile device.");
      }
    }

    function isWithinBounds(coords) {
      const bounds = map.value.getMaxBounds(); // use the map's set bounds
      return (
        coords.longitude >= bounds.getWest() &&
        coords.longitude <= bounds.getEast() &&
        coords.latitude >= bounds.getSouth() &&
        coords.latitude <= bounds.getNorth()
      );
    }

    function centerMapOnLocation(coords) {
      if (map.value) {
        map.value.flyTo({
          center: [coords.longitude, coords.latitude],
          essential: true
        });
      }
    }

      // Watch for changes to mapContainer.value
      watch(
        () => mapContainer.value,
        async (newValue, oldValue) => {
          if (newValue && !oldValue) {
            const apiKey = '3Giyb8izMH7QvlPNRm0I';
            const initialState = { lng: 121.074490, lat: 13.784249, zoom: 15};
            const bounds = [
              [121.073247, 13.783082], // Southwest coordinates
              [121.075437, 13.785484]  // Northeast coordinates
            ];

            map.value = markRaw(
              new Map({
                container: newValue,
                style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
                center: [initialState.lng, initialState.lat],
                zoom: initialState.zoom,
                minZoom: initialState.zoom,
                pitch: 45,
                bearing: -45,
                maxBounds: bounds
              })
            );
  
            // Define marker coordinates and names
            const markerData = [
              { coordinate: [121.075121, 13.783806], name: "METRO FIC A" },
              { coordinate: [121.075185, 13.783749], name: "METRO FIC B" },
              { coordinate: [121.075218, 13.783957], name: "BEHIND CANTEEN - DRINKING FOUNTAIN" },
              { coordinate: [121.075147, 13.784504], name: "CEAFA - DEEP WELL 1" },
              { coordinate: [121.075121, 13.784442], name: "EXECUTIVE LOUNGE SUPPLY" },
              { coordinate: [121.074717, 13.784218], name: "SUPPLY 2ND FLOOR FACULTY" },
              { coordinate: [121.074304, 13.784650], name: "SSC SUPPLY" },
              { coordinate: [121.074224, 13.785317], name: "MAIN PRIME WATER" },
              { coordinate: [121.073612, 13.785098], name: "CIT METER" },
              { coordinate: [121.074256, 13.784009], name: "CICS - DRINKING FOUNTAIN" },
              { coordinate: [121.074191, 13.783405], name: "RGR" },
              { coordinate: [121.074143, 13.783327], name: "CICS - DEEP WELL 2" },
            ];
              
            // Create and add multiple markers
            markerData.forEach(({ coordinate, name }) => {
              const marker = new Marker() // Create the marker
                .setLngLat(coordinate) // Set marker position
                .addTo(map.value); // Add marker to the map
  
              // Create a label element
              const label = document.createElement('div');
              label.className = 'marker-label';
              label.textContent = name; // Set the custom label text
  
              // Append the label to the marker element
              marker.getElement().appendChild(label);
  
              // Add click event listener to the marker
              marker.getElement().addEventListener('click', () => {
                popupContent.value = `${name} clicked at ${coordinate[0]}, ${coordinate[1]}!`;
                showPopup.value = true;
              });
            });
            await getCurrentLocation();
          }
        }
      );
  
      const hidePopup = () => {
        showPopup.value = false;
      };
  
      onUnmounted(() => {
        map.value?.remove();
      });
  
      return {
        map,
        mapContainer,
        showPopup,
        popupContent,
        hidePopup
      };
    }
  };
  </script>
  
  <style scoped>
  @import '~maplibre-gl/dist/maplibre-gl.css';
  
  .map-wrap {
    position: center;
    width: 100%;
    height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
  }
  
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .watermark {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 999;
  }
  
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
  }
  
  .popup-content {
    text-align: center;
  }
  
  .popup-content h3 {
    margin-bottom: 10px;
  }
  
  .popup-content button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .marker-label {
    position: absolute;
    top: -15px; /* Adjust the position of the label */
    left: -15px; /* Adjust the position of the label */
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #333;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
  }
  </style>
