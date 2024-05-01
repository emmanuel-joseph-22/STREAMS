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
        <button v-if="isUserLocationWithinBounds" class="recenter-btn" @click="recenterMap">Recenter Map</button>
      </div>
    </main-content>
  </home-page>
</template>

<script>
import HomePageView from './HomePageView.vue';
import dashboard_content from '../../components/dashboard_content.vue';
import { Map, Marker } from 'maplibre-gl';
import { toRefs, onUnmounted, onMounted, reactive } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

export default {
  components: {
    'home-page': HomePageView,
    'main-content': dashboard_content
  },
  name: "MapComponent",
  setup() {
    const state = reactive({
      mapContainer: null,
      map: null,
      userMarker: null,
      currentUserPosition: [121.074490, 13.784249], // Default center
      isUserLocationWithinBounds: false,
      showPopup: false,
      popupContent: '',
    });

    const bounds = [
      [121.073247, 13.783082], // Southwest coordinates
      [121.075437, 13.785484]  // Northeast coordinates
    ];

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

    function hidePopup() {
      state.showPopup = false;
    }
    
    function isWithinBounds(coords) {
      return coords.longitude >= bounds[0][0] && coords.longitude <= bounds[1][0] &&
             coords.latitude >= bounds[0][1] && coords.latitude <= bounds[1][1];
    }

    onMounted(async () => {
      if (!state.mapContainer) return;
      const apiKey = '3Giyb8izMH7QvlPNRm0I';
      state.map = new Map({
        container: state.mapContainer,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
        center: state.currentUserPosition,
        zoom: 15,
        pitch: 45,
        bearing: -45,
        maxBounds: bounds
      });

      state.map.on('load', () => {
        watchUserPosition();
        addMarkers();
      });
    });

    function watchUserPosition() {
      const watchId = Geolocation.watchPosition({
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
      }, (position, err) => {
        if (err) {
          console.error('Error watching position:', err);
          return;
        }
        state.currentUserPosition = [position.coords.longitude, position.coords.latitude];
        state.isUserLocationWithinBounds = isWithinBounds(position.coords);

        if (state.isUserLocationWithinBounds) {
          if (!state.userMarker) {
            state.userMarker = new Marker({ color: "#FF6347" })
              .setLngLat(state.currentUserPosition)
              .addTo(state.map);
          } else {
            state.userMarker.setLngLat(state.currentUserPosition);
          }
        } else {
          console.log("User's location is outside the defined bounds.");
          if (state.userMarker) {
            state.userMarker.remove();
            state.userMarker = null;
          }
        }
      });

      onUnmounted(() => {
        Geolocation.clearWatch({ id: watchId });
      });
    }

    function addMarkers() {
      markerData.forEach(({ coordinate, name }) => {
        const marker = new Marker()
          .setLngLat(coordinate)
          .addTo(state.map);

        const label = document.createElement('div');
        label.className = 'marker-label';
        label.textContent = name;
        marker.getElement().appendChild(label);

        marker.getElement().addEventListener('click', () => {
          state.showPopup = true;
          state.popupContent = name;
        });
      });
    }

    return {
      ...toRefs(state),
      recenterMap() {
        if (state.currentUserPosition && state.isUserLocationWithinBounds) {
          state.map.flyTo({ center: state.currentUserPosition, zoom: 18, essential: true });
        }
      },
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

.recenter-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.recenter-btn:hover {
  background-color: #3e8e41;
}
</style>
