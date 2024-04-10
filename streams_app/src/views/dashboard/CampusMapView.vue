<template>
    <home-page>
        <main-content>
          <div class="map-wrap">
            <a href="https://www.maptiler.com" class="watermark"><img
            src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
            <div class="map" ref="mapContainer"></div>
          </div>
        </main-content>
    </home-page>
</template>

<script>
import HomePageView from './HomePageView.vue';
import dashboard_content from '../../components/dashboard_content.vue'
import { Map } from 'maplibre-gl';
import { shallowRef, onUnmounted, markRaw, watch } from 'vue';


export default {
  components: {
    'home-page': HomePageView,
    'main-content': dashboard_content
  },
  name: "MapComponent",
  setup() {
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);


    // Watch for changes to mapContainer.value
    watch(
      () => mapContainer.value,
      (newValue, oldValue) => {
        if (newValue && !oldValue) {
          const apiKey = '3Giyb8izMH7QvlPNRm0I';
          const initialState = { lng: 121.074490, lat: 13.784249, zoom: 18 };
          const bounds = [
            [121.073466, 13.783145], // Southwest coordinates
            [121.075113, 13.785380] // Northeast coordinates
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
              maxBounds: bounds,            })
          );
        }
      }
    );
    onUnmounted(() => {
      map.value?.remove();
    });

    return {
      map,
      mapContainer
    };
  }
};
</script>

<style scoped>
@import '~maplibre-gl/dist/maplibre-gl.css';

.map-wrap {
  position: relative;
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
</style>
