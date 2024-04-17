<template>
  <div id="app">
    <header>
      
      <div class="logo">
        <img src="aquatech_v1.png" alt="">
        <img src="Batangas_State_Logo 2.png" alt="">
        <img src="sdo.png" alt="">
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contacts</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="container">
        <section id="home" class="full-screen dark-color-1">
          <div class="image-container">
            <img src="water-png-39965.png" alt="Water Image" class="water-image">
            <div class="text-overlay">
              <div class="text-overlay">
              <h2>STREAMS</h2>
              <p>Sustainable Tracking, Recording, and Evaluation of Aquatic Metering System</p>
              <button class="get-started-button">Get Started</button>
            </div>
            </div>
          </div>
        </section>
        <section id="about" class="full-screen dark-color-2">
          <h2>About Section</h2>
          <p>Learn more about us.</p>
        </section>
        <section id="contact" class="full-screen dark-color-3">
          <h2>Contact Section</h2>
          <p>Contact us for any inquiries.</p>
        </section>
        <section id="faq" class="full-screen dark-color-4">
          <h2>FAQ Section</h2>
          <p>Find answers to frequently asked questions.</p>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const textOverlay = document.querySelector('.text-overlay');
      if (textOverlay) {
        textOverlay.style.transform = `translateX(-${scrollPosition * 0.5}px)`; // Adjust the factor to control the scrolling speed
      }
    }
  }
};
</script>

<style>
/* CSS styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Prevent horizontal scrolling */
  scroll-behavior: smooth;
}

header {
  background-color: #0f0f17;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure the header stays on top */
}
nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
nav ul li {
  display: inline;
  margin-right: 20px;
}
nav ul li a {
  color: #fff;
  text-decoration: none;
  border: 2px solid transparent; /* Add transparent border */
  border-radius:20%;
  padding: 10px 20px; /* Add padding to the buttons */
  transition: all 0.3s; /* Add smooth transition for all properties */
}
nav ul li a:hover {
  color: #000000; /* Change text color on hover */
  background-color: #8dc8ff; /* Change background color on hover */
  border-color: #0059ff; /* Change border color on hover */
}

section.full-screen {
  width: 100vw; /* Set width to 100% of viewport width */
  height: 100vh; /* Set height to 100% of viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
}
.logo img {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}


/* Dark colors for sections */
.dark-color-1 {
  background-color: #000000; /* Dark gray */
  color: #fff;
}
.dark-color-2 {
  background-color: #2b2b2b; /* Dark blue */
  color: #fff;
}
.dark-color-3 {
  background-color: #1e1e1e; /* Dark green */
  color: #fff;
}
.dark-color-4 {
  background-color: #292929; /* Dark purple */
  color: #fff;
}
.image-container {
  position: relative;
  margin-left: 0%;
  margin-right: -7%;
}

.water-image {
  width: 100%; /* Ensure the image fills its container */
  height: auto; /* Allow the image to scale proportionally */
  margin-bottom: -5%;
}

.text-overlay {
  position: absolute;
  top: 30%;
  left: 20%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
}

.text-overlay h2 {
  margin-bottom: -6%; /* Add spacing between the title and paragraph */
  font-size: 6vw; /* Larger responsive font size based on viewport width */
  font-weight: bold; /* Make the font bold */
  color: black; /* Set default text color */
  -webkit-text-stroke: 2px #99d8ff; /* Neon blue stroke */
  transition: color 0.3s; /* Add smooth transition for text color */

  /* Hover styles */
}
.text-overlay p {
  font-size: 0.8vw;
}
.text-overlay h2:hover {
  color: #ffffff; /* Change text color on hover */
  -webkit-text-stroke-color: #1c6dc3; /* Change stroke color on hover */
}
.get-started-button {
  background-color: #1c6dc3; /* Set background color */
  color: #fff; /* Set text color */
  border: none; /* Remove default button border */
  border-radius: 20px; /* Add some border radius for rounded corners */
  padding: 10px 20px; /* Add padding to the button */
  font-size: 16px; /* Set font size */
  cursor: pointer; /* Add cursor pointer on hover */
  transition: background-color 0.3s; /* Add smooth transition for background color */
}

.get-started-button:hover {
  background-color: #99d8ff; /* Change background color on hover */
  color: #000000;
}

</style>
