<template>
    <home-page>
      <header-bar>
        <h1>Report</h1>
      </header-bar>
      <main-content>
        <div class="content-container">
          <!-- Left content -->
          <div class="left-content">
            <!-- Creative rows -->
            <div class="row-container" v-for="(row, index) in rows" :key="row.id">
              <div class="row-content">
                <span class="row-text">{{ row.title }}</span>
              </div>
              <div class="button-container">
                <button
                  :class="{'button': true, 'active-button': activeButtonIndex === index}"
                  @click="handleButtonClick(index)"
                >
                  Click Me
                </button>
              </div>
            </div>
            <!-- Print button -->
            <div id="print_row">
              <button id="print_button" class="button" @click="handlePrint">Print</button>
            </div>
          </div>
          <!-- Right content -->
          <div class="right-content">
            <div class="box1">
              <div class="box-header">Box Header</div>
              <div class="box-body">{{ activeContent }}</div>
            </div>
          </div>
        </div>
      </main-content>
    </home-page>
  </template>
  
  <script>
  import HomePageView from './HomePageView.vue';
  import header from './../../components/header_component.vue';
  
  export default {
    components: {
      'home-page': HomePageView,
      'header-bar': header
    },
    data() {
      return {
        rows: [
          { id: 1, title: 'Daily Water Inventory' },
          { id: 2, title: 'General Daily Water Consumption' },
          { id: 3, title: 'PW Daily Water Consumption' },
          { id: 4, title: 'DW1 Daily Water Consumption' },
          { id: 5, title: 'DW2 Daily Water Consumption' }
        ],
        activeButtonIndex: null, // Initially no button is active
        activeContent: "Content goes here" // Default content for the box body
      };
    },
    methods: {
      handleButtonClick(index) {
        this.activeButtonIndex = index;
        console.log('Button clicked for row', index);
        // You can add logic here to handle button clicks and update the active content
        this.activeContent = this.rows[index].title + " content"; // Example: Update content based on the clicked row
      },
      handlePrint() {
        console.log('Print button clicked');
        // Add logic to handle printing
      }
    }
  };
  </script>
  
  <style scoped>
  /* Creative row styles */
  .row-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px; /* Adjust the width of the row container */
    height: 50px; /* Adjust the height of the row container */
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 2px 2px rgba(1, 1, 1, 1);
    transition: transform 0.3s ease;
    background-color: #f5f5f5; /* Add background color */
    border: 1px solid transparent; /* Add transparent border */
  }
  
  .row-container:hover {
    transform: translateY(-3px);
  }
  
  .row-container.stroke {
    border: 1px solid #ccc; /* Add stroke border */
  }
  
  .row-content {
    flex: 1;
    padding: 0 10px; /* Add padding to the row content */
  }
  
  .row-text {
    font-size: 18px;
    color: #333; /* Change text color */
  }
  
  .button-container {
    margin-left: 10px; /* Adjust the spacing between text and button */
  }
  
  .button {
    width: 100px; /* Adjust button width as needed */
    height: 50px;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
    background-color: #00152c; /* Add button background color */
    color: #fff; /* Change button text color */
    border-radius: 4px; /* Add border radius */
  }
  
  .active-button {
    background-color: #007bff; /* Change background color of active button */
  }
  
  .button:hover {
    transform: scale(1.1);
  }
  
  .content-container {
    display: flex;
    justify-content: space-between;
  }
  
  .left-content,
  .right-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .left-content {
    align-items: flex-start;
    margin-top: 5%;
  }
  
  .right-content {
    align-items: flex-end;
  }
  
  .box1 {
    margin-top: 5%;
    margin-right: 5%;
    min-width: 700px; /* Minimum width for box1 */
    min-height: 500px; /* Minimum height for box1 */
    width: 100%; /* Adjust width as needed */
    background-color: #fff; /* White background color for box body */
    border: 1px solid #ccc; /* Border for box frame */
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .box-header {
    background-color: #00152c; /* Header background color */
    color: #fff; /* Header text color */
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .box-body {
    padding: 20px;
  }
  </style>
  
