<template>
    <div class="home-container">
      <button @click="redirect">Log Out</button>
  
      <button @click="home">Home</button>
  
      <button v-if="isCoach !== 'true' && coach === null" @click="addCoach">Add a Coach</button>
  
      <!-- Display clients page button if the user is a coach -->
      <div v-if="isCoach === 'true'">
        <router-link :to="{ name: 'clients', query: { username: this.coach, isCoach: this.isCoach, coach: this.homeCoach } }">
          <button>Clients</button>
        </router-link>
      </div>
      
      <div class="coach-view">
      <h1 class="welcome-message">Currently viewing {{ username }}'s stats</h1>
  
      <!-- Date navigation -->
      <div class="date-navigation">
        <button @click="changeDate('previous')">Previous Day</button>
        <span>{{ formattedDate }}</span>
        <button @click="changeDate('next')">Next Day</button>
      </div>
  
      <!-- Display meal statistics -->
      <div class="meal-stats" v-if="mealStats.length > 0">
        <div v-for="(meal, index) in mealStats" :key="index" class="meal-item">
          <div class="meal-content">
            <p><strong>{{ meal.formatted_time }}</strong> - {{ meal.food }}</p>
            <p>Calories: {{ meal.calories }}, Fat: {{ meal.fat }}, Carbs: {{ meal.carbs }}, Protein: {{ meal.protein }}</p>
            <p>Comments: {{ meal.comments }}</p>
            <!-- Only show coach_comments if coach has a value -->
            <p v-if="coach">Coach Comments: {{ meal.coach_comment || ''}}</p>
          </div>
          
          <!-- Three-Dot Menu Icon -->
          <div class="menu-container">
            <span class="menu-icon" @click.stop="toggleMenu(index)">⋮</span>
            
            <!-- Edit Meal Button (Toggled) -->
            <button v-if="activeMenu === index" class="edit-button" @click.stop="editMeal(meal)">
              Edit Meal
            </button>
          </div>
          
          <hr />
        </div>
      </div>
      <div v-else>
        <p>No meal statistics found for this date.</p>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: this.$route.query.username,
        isCoach: this.$route.query.isCoach,
        coach: this.$route.query.coach,
        activeMenu: null,
        homeCoach: null,
        currentDate: new Date().toISOString().split('T')[0], // Store the selected date
        mealStats: [] // Store meal stats
      };
    },
    computed: {
      formattedDate() {
      // Manually set the date from currentDate to avoid UTC interpretation
      const dateParts = this.currentDate.split('-'); // Split the date string into parts (year, month, day)
      const localDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // month is 0-based in JavaScript Date
  
      // Return the formatted date in local time zone
      return localDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    },
    methods: {
      redirect() {
        this.$router.push({ name: 'login' });
      },
      async fetchMealStats() {
          try {
            const response = await fetch(`http://localhost:3000/api/getStats?username=${this.username}&date=${this.currentDate}`);
              if (response.ok) {
                  const data = await response.json();
                  this.mealStats = data; // Update mealStats with the response directly
              } else {
                  console.error("Error fetching meal stats:", response.status);
                  this.mealStats = []; // Reset if error occurs
              }
          } catch (error) {
              console.error("Error:", error);
              this.mealStats = []; // Reset if error occurs
          }
      },
      changeDate(direction) {
          const date = new Date(this.currentDate);
          if (direction === 'next') {
              date.setDate(date.getDate() + 1);
          } else if (direction === 'previous') {
              date.setDate(date.getDate() - 1);
          }
          this.currentDate = date.toISOString().split('T')[0];
          this.fetchMealStats();
      },
      toggleMenu(index) {
        this.activeMenu = this.activeMenu === index ? null : index;
      },
      encodeBase64(data) {
      return btoa(encodeURIComponent(JSON.stringify(data)));
      },
      editMeal(meal) {
        const encodedMeal = this.encodeBase64(JSON.stringify(meal));
        this.$router.push({
          name: 'editmealclient',
          query: {
            username: this.username,
            isCoach: this.isCoach,
            coach: this.coach,
            meal: encodedMeal,
            date: this.currentDate
          }
        });
      },
      closeMenu() {
        this.activeMenu = null;
      },
      home() {
      this.isCoach = true;
      this.$router.push({
        name: 'home',
        query: {
          username: this.coach,
          isCoach: this.isCoach,
          coach: this.homeCoach
        }
      });
    }
    },
    created() {
      this.fetchMealStats();
    },
    mounted() {
      // Close menu when clicking outside
      document.addEventListener("click", this.closeMenu);
    },
    beforeUnmount() {
      document.removeEventListener("click", this.closeMenu);
    }
  };
  </script>
  
  <style scoped>
  .home-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
}

  
  .welcome-message {
    font-size: 2em;
    color: #0b6dff;
  }
  
  .username-message {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  
  button {
    cursor: pointer;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #0b6dff;
    color: white;
    margin: 10px 5px;
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  
  button:hover {
    background-color: #0854cc;
    transform: translateY(-2px);
  }
  
  button:focus {
    outline: none;
  }
  
  .date-navigation {
    margin: 20px 0;
  }
  
  .date-navigation button {
    margin: 0 10px;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .meal-stats {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: left;
    position: relative;
  }
  
  .meal-item {
    position: relative;
    padding: 15px;
    border-bottom: 1px solid #ddd;
  }
  
  .menu-container {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .menu-icon {
    cursor: pointer;
    font-size: 20px;
    padding: 5px;
    color: #555;
  }
  
  .menu-icon:hover {
    color: #0b6dff;
  }
  
  .edit-button {
    position: absolute;
    top: 30px;
    right: 0;
    border: 2px solid black;
    background-color: #0b6dff;
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .edit-button:hover {
    background-color: #0854cc;
  }

  .coach-view{
    border: 5px solid #0b6dff; /* Blue border around the container */
    border-radius: 10px; /* Rounded corners for the border */
    margin: 20px auto; /* Center the container with some margin */
    max-width: 900px; /* Optional: Limit the container width */
  }

  </style>