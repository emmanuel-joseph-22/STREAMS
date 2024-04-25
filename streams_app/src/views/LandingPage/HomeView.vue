<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="aquatech_v1.png" alt="Aquatech Logo">
        <img src="Batangas_State_Logo 2.png" alt="Batangas State Logo">
        <img src="sdo.png" alt="SDO Logo">
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section id="home" class="full-screen dark-color-1">
        <div class="image-container">
          <img src="water-png-39965.png" alt="Water Image" class="water-image">
          <div class="text-overlay">
            <h2>STREAMS</h2>
            <p>Sustainable Tracking, Recording, and Evaluation of Aquatic Metering System</p>
            <button class="get-started-button">Get Started</button>
          </div>
        </div>
      </section>

      <section id="about" class="full-screen dark-color-2">
        <div class="top_text">
          <h2>About STREAMS</h2>
          <p>Learn more about us.</p>
        </div>

        <!-- Slider container -->
        <div class="container">
          <div class="slider-container">
            <transition name="slide-transition" mode="out-in">
              <!-- Display current slide with transition -->
              <div class="slide" :key="currentSlide">
                <h2 class="box-header">{{ slides[currentSlide].title }}</h2>
                <p>{{ slides[currentSlide].content }}</p>
              </div>
            </transition>

            <!-- Navigation buttons -->
            <div class="navigation">
              <button @click="prevSlide" :disabled="currentSlide === 0" class="nav-button">Previous</button>
              <button @click="nextSlide" :disabled="currentSlide === slides.length - 1" class="nav-button">Next</button>
            </div>
          </div>
        </div>

        <!-- Image elements in the About section -->
        <img src="moon.png" alt="Moon Image" class="moon-image">
        <img src="mountain.png" alt="Mountain Image" class="mountain-image">
      </section>


      <section id="contact" class="full-screen dark-color-3">
        <h2>STREAMS</h2>
        
         <img src="paint.png" alt="splash Image" class="paint-image">

      </section>

      <section id="faq" class="full-screen dark-color-4">
        <h2>FAQ Section</h2>
        <p>Find answers to frequently asked questions.</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0, // Keeps track of the current slide index
      slides: [
        {
          title: 'AQUATECH',
          content: '"Aquatech is a dedicated group of students united by a shared passion for technology and sustainability. Our team combines diverse skills and perspectives to tackle real-world challenges in water management. Together, we work to develop innovative projects like STREAMS that make a difference in our communities and contribute to a sustainable future."'
        },
        {
          title: 'STREAMS',
          content: '"STREAMS (Sustainable Tracking, Recording, and Evaluation of Aquatic Metering System) is a comprehensive software application designed to help schools manage their water usage efficiently and sustainably. By offering real-time water meter monitoring, visual maps, and detailed reports, STREAMS empowers schools to track, analyze, and optimize their water resources, reducing waste and promoting conservation."'
        },
        {
          title: 'MISSION',
          content: '"Our mission at Aquatech is to revolutionize water management in educational institutions by providing innovative solutions that foster sustainability and efficiency. Through our STREAMS software, we aim to equip schools with the tools they need to accurately monitor and manage their water usage, ultimately contributing to a greener, more sustainable future."'
        },
        {
          title: 'VISION',
          content: '"Our vision is to lead the transformation of water management in schools by delivering state-of-the-art technology that promotes environmental stewardship and operational excellence. We envision a future where every educational institution can harness the power of data to make informed decisions and preserve water resources for generations to come."'
        },
      ],
    };
  },
  mounted() {
    
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // Move to the previous slide
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    // Move to the next slide
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
      }
    },
    handleScroll() {
      const scrollPosition = window.scrollY || window.pageYOffset;

// Get the mountain image element
const mountainImage = document.querySelector('.mountain-image');

// Get the section containing the mountain image
const aboutSection = document.querySelector('#about');

if (aboutSection) {
  // Calculate the top and bottom position of the about section relative to the current scroll position
  const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY;
  const aboutBottom = aboutTop + aboutSection.offsetHeight;

  // Check if the scroll position is within the bounds of the about section
  if (scrollPosition >= aboutTop && scrollPosition <= aboutBottom) {
    // Calculate the halfway point of the about section
    const halfwayPoint = aboutTop + (aboutSection.offsetHeight / 1);

    // Calculate the scroll factor
    let scrollFactor;
    if (scrollPosition <= halfwayPoint) {
      // Normal scroll effect before the halfway point
      scrollFactor = (scrollPosition - aboutTop) * 1.9;
    } else {
      // Reverse scroll effect after the halfway point
      scrollFactor = (aboutBottom - scrollPosition) * -1.9;
    }

    // Apply the scroll effect to the mountain image
    if (mountainImage) {
      mountainImage.style.transform = `translateY(${scrollFactor}px)`;
    }
  } else {
    // Reset the mountain image position when the about section is not in view
    if (mountainImage) {
      mountainImage.style.transform = 'translateY(0)';
    }
  }
}

// Get the land image element
const landImage = document.querySelector('.land-image');
const benchImage = document.querySelector('.bench-image');
// Get the section containing the land image
const about3Section = document.querySelector('#about3');

if (about3Section) {
  // Calculate the top and bottom position of the about3 section relative to the current scroll position
  const about3Top = about3Section.getBoundingClientRect().top + window.scrollY;
  const about3Bottom = about3Top + about3Section.offsetHeight;

  // Check if the scroll position is within the bounds of the about3 section
  if (scrollPosition >= about3Top && scrollPosition <= about3Bottom) {
    // Calculate the halfway point of the about3 section
    const halfwayPoint = about3Top + (about3Section.offsetHeight / 2);

    // Calculate the scroll factor
    let scrollFactor;
    let scrollFactor_1;
    if (scrollPosition <= halfwayPoint) {
      // Normal scroll effect before the halfway point
      scrollFactor = (scrollPosition - about3Top) * 1.9;
      scrollFactor_1 = (scrollPosition - about3Top) * 2.5;
    } else {
      // Reverse scroll effect after the halfway point
      scrollFactor = (about3Bottom - scrollPosition) * -1.9;
      scrollFactor_1 = (about3Bottom - scrollPosition) * -1.9;
    }

    // Apply the scroll effect to the land image
    if (landImage) {
      landImage.style.transform = `translateY(${scrollFactor}px)`;
    }
    if (benchImage) {
      benchImage.style.transform = `translateY(${scrollFactor_1}px)`;
    }
  } else {
    // Reset the land image position when the about3 section is not in view
    if (benchImage) {
      benchImage.style.transform = 'translateY(0)';
    }
  }
  
}

// Get the mountain image element
const kiteImage = document.querySelector('.kite-image');

// Get the section containing the mountain image
const about4Section = document.querySelector('#about4');

if (about4Section) {
  // Calculate the top and bottom position of the about section relative to the current scroll position
  const about4Top = about4Section.getBoundingClientRect().top + window.scrollY;
  const about4Bottom = about4Top + about4Section.offsetHeight;

  // Check if the scroll position is within the bounds of the about section
  if (scrollPosition >= about4Top && scrollPosition <= about4Bottom) {
    // Calculate the halfway point of the about section
    const halfwayPoint = about4Top + (about4Section.offsetHeight / 1);

    // Calculate the scroll factor
    let scrollFactor;
    if (scrollPosition <= halfwayPoint) {
      // Normal scroll effect before the halfway point
      scrollFactor = (scrollPosition - about4Top) * 1.9;
    } else {
      // Reverse scroll effect after the halfway point
      scrollFactor = (about4Bottom - scrollPosition) * -1.9;
    }

    // Apply the scroll effect to the mountain image
    if (kiteImage) {
      kiteImage.style.transform = `translateY(${scrollFactor}px)`;
    }
  }
}



  // Adjust the vertical position of the water image based on the scroll position
  const waterImage = document.querySelector('.water-image');
  if (waterImage) {
    waterImage.style.transform = `translateY(${scrollPosition * 1.9}px)`;
  }

  // Adjust the vertical position of the moon image based on the scroll position for parallax effect
  const moonImage = document.querySelector('.moon-image');
  if (moonImage) {
    // Use a smaller transformation factor for the parallax effect
    // This will make the moon image move more slowly as you scroll down
    moonImage.style.transform = `translateX(${scrollPosition * 0.5}px)`;
  }

  

  const SText = document.querySelector('.dark-color-3 h2');
  if (SText) {
    // Use a smaller transformation factor for the parallax effect
    // This will make the moon image move more slowly as you scroll down
    SText.style.transform = `translateX(-${scrollPosition * 0.9}px)`;
  }

  // Get the land image element
const paintImage = document.querySelector('.paint-image');

// Get the section containing the land image
const contactSection = document.querySelector('#contact');

if (contactSection) {
  // Calculate the top and bottom position of the about3 section relative to the current scroll position
  const about3Top = contactSection.getBoundingClientRect().top + window.scrollY;
  const about3Bottom = about3Top + contactSection.offsetHeight;

  // Check if the scroll position is within the bounds of the about3 section
  if (scrollPosition >= about3Top && scrollPosition <= about3Bottom) {
    // Calculate the halfway point of the about3 section
    const halfwayPoint = about3Top + (contactSection.offsetHeight / 2);

    // Calculate the scroll factor
    let scrollFactor;

    if (scrollPosition <= halfwayPoint) {
      // Normal scroll effect before the halfway point
      scrollFactor = (scrollPosition - about3Top) * 1.9;
    } else {
      // Reverse scroll effect after the halfway point
      scrollFactor = (about3Bottom - scrollPosition) * -1.9;
    }

    // Apply the scroll effect to the land image
    if (paintImage) {
      paintImage.style.transform = `translateY(${scrollFactor}px)`;
    }
  } 
}


  // Adjust the horizontal position of the text overlay based on the scroll position
  const textOverlay = document.querySelector('.text-overlay');
  if (textOverlay) {
    textOverlay.style.transform = `translateX(-${scrollPosition * 0.5}px)`;
  }

  // Limit the scroll position to the bottom of the FAQ section if the user scrolls past it
  const faqSection = document.querySelector('#faq');
  if (faqSection) {
    const faqBottom = faqSection.getBoundingClientRect().bottom + window.scrollY;
    if (scrollPosition > faqBottom - window.innerHeight) {
      window.scrollTo(0, faqBottom - window.innerHeight);
    }
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
  background: linear-gradient(to bottom, #000000, #333333); /* Dark gray to a lighter gray */
  color: #fff; /* Keep the text color as white */
}
.dark-color-2 {
  background: linear-gradient(to bottom, #333333, #88b0dc); /* Dark gray to a lighter gray */
  color: #fff; /* Keep the text color as white */
}
.dark-color-3 {
  background: linear-gradient(to bottom, #88b0dc, #000000); /* Dark gray to a lighter gray */
  color: #fff;
}
.dark-color-4 {
  background: linear-gradient(to bottom, #000000, #333333); /* Dark gray to a lighter gray */
  color: #fff; /* Keep the text color as white */
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


.moon-image {
  position: absolute;
  width: 40%; /* Adjust the width as needed */
  height: auto; /* Allow the image to maintain its aspect ratio */
  margin-top: -20%;
  margin-right: -20%
}

.mountain-image {
  position: absolute;
  width: 100%; /* Adjust the width as needed */
  height: auto; /* Allow the image to maintain its aspect ratio */
  margin-bottom: -20%;
  margin-right: 1%;
}



.paint-image {
  position: absolute;
  width: 70%; /* Adjust the width as needed */
  height: 70%; /* Allow the image to maintain its aspect ratio */
  margin-bottom: 0%;
  margin-right: 30%;
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
/* CSS for about page rectangles */
/* Styles for top_text */
.top_text {
  text-align: center; /* Center the header and paragraph text */
  margin-bottom: 20px; /* Add some space below the top text */
}








.box-header {
  background-color: #00152c; /* Header background color */
  color: #fff; /* Header text color */
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.container {
  display:block; /* Arrange rectangles in a row */
  justify-content: flex-start; /* Align rectangles to the left side */
  flex-wrap: wrap; /* Allow wrapping of rectangles for smaller screens */
  align-items: center; /* Center the rectangles vertically */
  margin-left: -80%; /* Center the entire container */
  width: 100%; /* Adjust width as needed */
  z-index: 2; /* Higher z-index value ensures the rectangle is on top */
  position: relative;
}

/* Styling the slider container */
.slider-container {
  display: flex;
  flex-direction: column; /* Ensure vertical alignment of slide and navigation */
  align-items: center; /* Center the slide and navigation buttons */
  margin-left: 10%; /* Center the entire container */
  overflow: hidden;
  width: 100%; /* Adjust width as needed */
  height: 100%; /* Adjust height as needed */
}

/* Styling the navigation buttons */
.navigation {
  margin-left: 10%; /* Add spacing between the slide and navigation buttons */
  display: flex;
  justify-content: center; /* Center the buttons horizontally */
}


.slide {
   background: linear-gradient(to bottom, #333333, #88b0dc); /* Dark gray to a lighter gray */
  color: #fff; /* Text color */
  padding: 20px; /* Padding inside the rectangles */
  margin-left: 10%; /* Margin around the rectangles */
  border-radius: 10px; /* Rounded corners */
  text-align: center; /* Center the text within the rectangle */
  height: 60vh; /* Set fixed height for rectangles */
  width: 20vw;
  box-sizing: border-box; /* Include padding and border in width and height calculation */


}

/* Add hover effects for rectangles */
.slide:hover {
  /* Existing hover styles... */
  background: linear-gradient(to bottom, #88b0dc, #333333); /* Dark gray to a lighter gray */
  color: #ffffff;
  /* Add a glowing shadow effect */
  box-shadow: 0 0 15px rgba(136, 186, 240, 0.7), /* Colored glow effect */
              0 0 25px rgba(167, 183, 200, 0.5), /* Outer glow effect */
              0 0 40px rgba(236, 242, 249, 0.3); /* Outer glow effect */
  z-index: 3; /* Ensure hover state keeps the rectangle in front */
}

/* Navigation buttons */
.nav-button {
  width: 100px; /* Define a fixed width for the buttons */
  padding: 2% 4%;
  margin: 2%;
  border: none;
  border-radius: 5px;
  background-color: #ccd5e4; /* Blue background */
  color: rgb(0, 0, 0);
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  text-align: center; /* Center the text within the button */
}

/* Hover effect for navigation buttons */
.nav-button:hover {
  box-shadow: 0 0 10px rgba(0, 98, 255, 0.7); /* Glowing blue shadow */
  background-color: #1a2a47; /* Blue background */
  color: rgb(255, 255, 255);
}

/* Slide transition */
.slide-transition-enter-active,
.slide-transition-leave-active {
  transition: opacity 0.5s, transform 0.5s; /* Change timing as desired */
}

.slide-transition-enter,
.slide-transition-leave-to /* .slide-transition-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(-20%); /* Adjust the transform value as desired */
}

.dark-color-3 h2{
  font-size: 5em;
  font-weight: 600;
  margin-left: 130%;
  margin-top: 0%;
  color: #ffffff;
  z-index: 2;
  -webkit-text-stroke: 2px #030303; /* Neon blue stroke */
}



</style>
