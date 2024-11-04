<!-- src/components/pop_up.vue -->
<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <p>{{ message }}</p>
      <button @click="closePopup" class="close-button">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  width: 80%;
  max-width: 400px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.popup-content p {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 20px;
}

.close-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #0056b3;
}
</style>
