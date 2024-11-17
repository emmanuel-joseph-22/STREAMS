<template>
    <div id="app">
      <header>
      <div class="logo">
          <img src="aquatech_v1.png" alt="Aquatech Logo">
          <img src="Batangas_State_Logo_2.png" alt="Batangas State Logo">
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
          <img src="paint.png" alt="Splash Image" class="paint-image">
  
          <!-- Contact Form -->
  
          <div class="contact-info">
            <!-- Facebook Link -->
            <div class="contact-item">
              <img src="fb.png" alt="Facebook Icon" class="contact-icon">
              <span><a href="https://www.facebook.com/your-facebook-link" target="_blank">Your Facebook Page</a></span>
            </div>
            <!-- Address -->
            <div class="contact-item">
              <img src="address.png" alt="Address Icon" class="contact-icon">
              <span>123 Your Street, Your City, Your State, Your Zip</span>
            </div>
            <!-- Phone -->
            <div class="contact-item">
              <img src="phone.png" alt="Phone Icon" class="contact-icon">
              <span>(123) 456-7890</span>
            </div>
  
            <div class="contact-item">
              <img src="mail.png" alt="Phone Icon" class="contact-icon">
              <span>aaronpogi@gmail.com</span>
            </div>
          </div>
  
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
          menuVisible: false, // Tracks whether the menu is visible or not
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
      prevSlide() {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        }
      },
      nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
          this.currentSlide++;
        }
      },
      handleScroll() {
        const sections = document.querySelectorAll('section');
          const navItems = document.querySelectorAll('nav ul li a');
  
          // Calculate the current section in view
          let currentSection;
          sections.forEach(section => {
              const sectionTop = section.getBoundingClientRect().top;
              const sectionBottom = section.getBoundingClientRect().bottom;
  
              // If the section is in view, set it as the current section
              if (sectionTop <= 100 && sectionBottom >= 100) {
                  currentSection = section.id;
              }
          });
  
          // Highlight the corresponding navigation item
          navItems.forEach(navItem => {
              const href = navItem.getAttribute('href').substring(1);
  
              if (href === currentSection) {
                  navItem.classList.add('active'); // Add an 'active' class
              } else {
                  navItem.classList.remove('active'); // Remove the 'active' class
              }
          });
        const scrollPosition = window.scrollY || window.pageYOffset;
  
        // Scroll handling logic for various images and text overlays
        this.handleImageScrollEffects(scrollPosition);
  
        // Limit the scroll position to the bottom of the FAQ section if the user scrolls past it
        const faqSection = document.querySelector('#faq');
        if (faqSection) {
          const faqBottom = faqSection.getBoundingClientRect().bottom + window.scrollY;
          if (scrollPosition > faqBottom - window.innerHeight) {
            window.scrollTo(0, faqBottom - window.innerHeight);
          }
        }
      },
      handleImageScrollEffects(scrollPosition) {
        // Adjust vertical and horizontal positions of various images and text based on scroll position
        const waterImage = document.querySelector('.water-image');
        const moonImage = document.querySelector('.moon-image');
        const mountainImage = document.querySelector('.mountain-image');
        const paintImage = document.querySelector('.paint-image');
        const textOverlay = document.querySelector('.text-overlay');
        const contactSection = document.querySelector('#contact');
        const SText = document.querySelector('.dark-color-3 h2');
        const conInfo = document.querySelector('.contact-info');
  
  
        if (SText) {
          // Use a smaller transformation factor for the parallax effect
          // This will make the moon image move more slowly as you scroll down
          SText.style.transform = `translateX(-${scrollPosition * 0.9}px)`;
        }
  
        // Handle water image scroll effect
        if (waterImage) {
          waterImage.style.transform = `translateY(${scrollPosition * 1.9}px)`;
        }
  
        // Handle moon image scroll effect
        if (moonImage) {
          moonImage.style.transform = `translateX(${scrollPosition * 0.5}px)`;
        }
  
        // Handle mountain image scroll effect
        if (mountainImage) {
          const aboutSection = document.querySelector('#about');
          const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY;
          const aboutBottom = aboutTop + aboutSection.offsetHeight;
          if (scrollPosition >= aboutTop && scrollPosition <= aboutBottom) {
            const halfwayPoint = aboutTop + (aboutSection.offsetHeight / 1);
            let scrollFactor;
            if (scrollPosition <= halfwayPoint) {
              scrollFactor = (scrollPosition - aboutTop) * 1.9;
            } else {
              scrollFactor = (aboutBottom - scrollPosition) * -1.9;
            }
            mountainImage.style.transform = `translateY(${scrollFactor}px)`;
          } else {
            mountainImage.style.transform = 'translateY(0)';
          }
        }
  
        // Handle paint image scroll effect
        if (paintImage && conInfo) {
          const contactSectionTop = contactSection.getBoundingClientRect().top + window.scrollY;
          const contactSectionBottom = contactSectionTop + contactSection.offsetHeight;
          if (scrollPosition >= contactSectionTop && scrollPosition <= contactSectionBottom) {
            const halfwayPoint = contactSectionTop + (contactSection.offsetHeight / 2);
            let scrollFactor;
            let scrollFactor_1;
            if (scrollPosition <= halfwayPoint) {
              scrollFactor = (scrollPosition - contactSectionTop) * 2.3;
              scrollFactor_1 = (scrollPosition - contactSectionTop) * 1.2;
            } else {
              scrollFactor = (contactSectionBottom - scrollPosition) * -2.3;
              scrollFactor_1 = (contactSectionBottom - scrollPosition) * -1.2;
            }
            paintImage.style.transform = `translateY(${scrollFactor}px)`;
            conInfo.style.transform = `translateX(${scrollFactor_1}px)`;
            
          } else {
            paintImage.style.transform = 'translateY(0)';
            conInfo.style.transform = 'translateX(0)';
          }
        }
  
        // Handle text overlay scroll effect
        if (textOverlay) {
          textOverlay.style.transform = `translateX(-${scrollPosition * 0.5}px)`;
        }
      },
    },
  };
  </script>
  
  <style>
  /* Existing styles from your provided code */
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
      display: flex;
      gap: 1rem; /* Space between menu items */
  }
  
  /* Menu button style */
  .menu-button {
      display: none; /* Initially hide the menu button */
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem; /* Larger font size for button */
      cursor: pointer;
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
          color: #000; /* Change text color on hover */
          background-color: #ebebeb; /* Change background color on hover */
          border-radius: 5px; /* Add border radius */
          border-color: #fff;
          box-shadow: 0 0 15px rgba(136, 186, 240, 0.7), /* Colored glow effect */
                0 0 25px rgba(167, 183, 200, 0.5), /* Outer glow effect */
                0 0 40px rgba(236, 242, 249, 0.3); /* Outer glow effect */
          
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
    position: absolute;
    font-size: 5em;
    font-weight: 600;
    margin-left: 130%;
    margin-top: 0%;
    color: #ffffff;
    z-index: 2;
    -webkit-text-stroke: 2px #030303; /* Neon blue stroke */
  }
  
  .contact-info {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 60%; /* Move the form to the right side */
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px; /* Space between each contact item */
  }
  
  .contact-icon {
    background-color: #fffcfc;
    border-radius: 40%;
    width: 24px; /* Adjust icon width as needed */
    height: 24px; /* Adjust icon height as needed */
    margin-right: 10px; /* Space between icon and text */
  }
  
  .contact-item span {
    color: #fff; /* Text color */
  }
  
  .contact-item a {
    color: #fff; /* Text color */
    text-decoration: none; /* Remove underline */
  }
  /* Media query for tablets and smaller screens */
  @media (max-width: 768px) {
      /* Navigation Bar */
      nav ul {
          display: none; /* Initially hide the links */
          flex-direction: column; /* Arrange links in a column */
          padding: 0; /* Remove padding */
          margin: 0; /* Remove margin */
      }
  
      .menu-button {
          display: block; /* Show menu button on smaller screens */
      }
  
      nav ul.show {
          display: flex; /* Show links when the menu is visible */
      }
  
      /* Adjust sections */
      section.full-screen {
          height: 100vh; /* Set the height to 100% of the viewport height */
          padding: 0; /* Remove padding for full screen effect */
          width: 100vw; /* Ensure width takes up the full viewport width */
      }
  
  
      /* Adjust text and button sizes */
      .text-overlay h2 {
          font-size: 3rem; /* Reduce font size */
      }
  
      .text-overlay p {
          font-size: 1rem; /* Reduce font size */
      }
  
      .get-started-button {
          padding: 10px 20px; /* Adjust padding */
          font-size: 14px; /* Adjust font size */
      }
  
      /* Adjust images */
      .water-image, .moon-image, .mountain-image, .paint-image {
          width: 100%; /* Make images full-width */
          height: auto; /* Allow images to auto-scale */
      }
  
      /* Adjust contact form */
      .contact-info {
          width: 100%; /* Set width to full screen width */
          margin-left: 0; /* Reset margin */
      }
  }
  
  /* Media query for mobile screens */
  @media (max-width: 480px) {
  
    header {
          flex-direction: column; /* Stack header elements vertically */
          align-items: center; /* Center the header elements */
          padding: 10px; /* Adjust padding as needed */
      }
  
      /* Adjust the logo styles */
      .logo {
          display: flex;
          flex-direction: row; /* Arrange logos in a row */
          justify-content: left; /* Center the logos */
          width: 100%; /* Set the width to full width of the screen */
          margin-bottom: 10px; /* Add margin below the logos */
      }
  
      /* Adjust the navigation list */
      nav ul {
          display: flex; /* Use flex layout for navigation list */
          flex-direction: row; /* Arrange navigation links horizontally */
          justify-content: center; /* Center the links */
          width: 80%; /* Set width to full width of the screen */
          list-style-type: none; /* Remove list styling */
          padding: 0; /* Remove default padding */
          margin-left: 12%; /* Remove default margin */
          gap: 10px; /* Adjust gap between menu items */
      }
  
      /* Adjust navigation links */
      nav ul li {
          display: inline; /* Display the links inline */
      }
  
      /* Adjust navigation link styles */
      nav ul li a {
          padding: 10px 15px; /* Add padding for touch-friendly size */
          text-align: center; /* Center the text */
      }
  
      nav ul li a:hover {
          /* Optionally, you can leave this section empty or remove it completely */
          background-color: initial; /* Remove hover background color */
          color: initial; /* Remove hover text color */
          box-shadow: none; /* Remove any hover box shadow */
          border-color: initial; /* Remove any hover border color */
      }
      nav ul li a.active {
      background-color: #ebebeb; /* Change background color */
      color: #000; /* Change text color */
      border-radius: 5px; /* Add border radius */
      border-color: #fff; /* Optional: Change border color */
      box-shadow: 0 0 15px rgba(136, 186, 240, 0.7), /* Colored glow effect */
          0 0 25px rgba(167, 183, 200, 0.5), /* Outer glow effect */
          0 0 40px rgba(236, 242, 249, 0.3); /* Outer glow effect */
  }
  
  
      section.full-screen {
          height: 100vh; /* Set the height to 100% of the viewport height */
          padding: 0; /* Remove padding for full screen effect */
          width: 100vw; /* Ensure width takes up the full viewport width */
      }
  
  
      /* Adjust buttons */
      .get-started-button, .nav-button {
          width: 100%; /* Make buttons full width */
          padding: 10px; /* Adjust padding */
      }
  
      /* Adjust font sizes */
      .text-overlay h2 {
          font-size: 2rem; /* Reduce font size */
      }
  
      .text-overlay p {
          font-size: 0.8rem; /* Reduce font size */
      }
      .water-image {
          position: fixed;
          bottom: -6%;
          right: -2%;
    width: 230%; /* Ensure the image fills its container */
    height: 70%; /* Allow the image to scale proportionally */
      }
  
      .mountain-image {
    position: absolute;
    width: 100%; /* Adjust the width as needed */
    height: 50%; /* Allow the image to maintain its aspect ratio */
    margin-bottom: -140%;
    margin-right: 1%;
  }
  .moon-image {
    position: absolute;
    width: 100%; /* Adjust the width as needed */
    height: auto; /* Allow the image to maintain its aspect ratio */
    margin-top: 20%;
    margin-right: 80%
  }
  .paint-image {
    position: absolute;
    width: 100%; /* Adjust the width as needed */
    height: 70%; /* Allow the image to maintain its aspect ratio */
    margin-bottom: 0%;
    margin-right: 0%;
  }
  .text-overlay {
    position: absolute;
    top: 10%;
    left: 50%;
    color: #fff;
  }
  .box-header {
          padding: 8px; /* Reduce padding for smaller screens */
          font-size: 1rem; /* Adjust font size for better readability */
          border-radius: 0; /* Remove border radius for better fitting */
      }
  
      /* Adjust .container for mobile */
      .container {
          margin-left: 0; /* Remove left margin to align container to the center */
          width: 100%; /* Set width to full width for the screen */
          display: flex; /* Use flex layout for responsive design */
          flex-direction: column; /* Stack items vertically */
          align-items: center; /* Center-align items within the container */
          padding: 0; /* Remove padding for better fitting */
      }
  
      /* Adjust .slider-container for mobile */
      .slider-container {
          width: 100%; /* Adjust width to fit the full width of the screen */
          height: auto; /* Allow height to auto-adjust based on content */
          padding: 0; /* Remove padding for better fitting */
          margin-left: 0; /* Remove left margin */
      }
  
      /* Adjust .navigation for mobile */
      .navigation {
          margin: 10px 0; /* Add top and bottom margin */
          justify-content: center; /* Center-align buttons */
      }
  
      /* Adjust .slide for mobile */
      .slide {
          width: 90%; /* Make slides almost full width of the screen */
          margin-left: 5%; /* Center slides within the container */
          height: auto; /* Allow slides to auto-adjust height */
          padding: 10px; /* Reduce padding */
      }
      .contact-info {
          position: absolute; /* Allow it to move with the page */
          margin-bottom: -90%; /* Remove left margin */
          width: 100%; /* Set width to full screen width */
          padding: 10px; /* Add padding for better spacing */
          align-items: center; /* Center-align contact items */
          text-align: center; /* Center-align text */
      }
  
      /* Adjust .contact-item for mobile */
      .contact-item {
          width: 100%; /* Make each item full-width */
          margin-bottom: 10px; /* Increase space between items */
          justify-content: center; /* Center-align icon and text */
      }
  
      /* Adjust .contact-icon for mobile */
      .contact-icon {
          margin-right: 0; /* Remove right margin */
          margin-bottom: 5px; /* Add bottom margin */
          width: 5%; /* Increase width for visibility */
          height: 5%; /* Increase height for visibility */
      }
  
      /* Adjust .contact-item span and .contact-item a for mobile */
      .contact-item span,
      .contact-item a {
          font-size: 0.8rem; /* Increase font size for readability */
      }
      .dark-color-3 h2{
    position: absolute;
    font-size: 2em;
    font-weight: 600;
    margin-left: 640%;
    margin-top: 0%;
    color: #ffffff;
    z-index: 2;
    -webkit-text-stroke: 2px #030303; /* Neon blue stroke */
  }
  }
  
  
  </style>