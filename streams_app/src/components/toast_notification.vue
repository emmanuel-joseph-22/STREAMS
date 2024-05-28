<template>
    <transition name="toast-fade">
      <div class="toast" v-if="visible" :class="type">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        type: '',
      };
    },
    methods: {
      show(message, type = 'success') {
        this.message = message;
        this.type = type;
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 1000);
      },
    },
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    z-index: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    max-width: 90%;
    text-align: center;
  }
  
  .toast.success {
    background-color: #4fb073;
  }
  .toast-fade-enter-active,
  .toast-fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .toast-fade-enter,
  .toast-fade-leave-to {
    opacity: 0;
  }
  </style>
  