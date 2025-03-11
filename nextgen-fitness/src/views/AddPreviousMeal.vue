<template>
  <div class="addMeal-container">
    <button @click="redirect">Log Out</button>

    <button @click="home">Home</button>

    <h1 class="header-message">Quick Add a Previous Meal</h1>

    <label for="food">Select Meal/Food Eaten:</label>
    <select id="food" v-model="selectedFood" @change="fillNutritionalValues">
      <option value="null" disabled selected hidden>Select a Previous Meal</option>
      <option v-for="foodItem in foodOptions" :key="foodItem.id" :value="foodItem">
        {{ foodItem.food }}
      </option>
    </select>

    <label for="calories">Calories:</label>
    <input type="number" id="calories" v-model="calories" placeholder="Enter calories" min="0" @input="calories = calories < 0 ? '' : calories" />

    <label for="fat">Fat (g):</label>
    <input type="number" id="fat" v-model="fat" placeholder="Enter fat (g)" min="0" @input="fat = fat < 0 ? '' : fat" />

    <label for="carbs">Carbs (g):</label>
    <input type="number" id="carbs" v-model="carbs" placeholder="Enter carbs (g)" min="0" @input="carbs = carbs < 0 ? '' : carbs" />

    <label for="protein">Protein (g):</label>
    <input type="number" id="protein" v-model="protein" placeholder="Enter protein (g)" min="0" @input="protein = protein < 0 ? '' : protein" />

    <label for="comments">Enter Comments:</label>
    <textarea id="comments" v-model="comments" placeholder="Additional notes"></textarea>

    <button @click="submitData">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.query.username,
      isCoach: this.$route.query.isCoach,
      coach: this.$route.query.coach,
      foodOptions: [],  // To hold the food items fetched from the server
      selectedFood: null,  // To hold the selected food item
      calories: '',
      fat: '',
      carbs: '',
      protein: '',
      comments: '',
    };
  },
  created() {
    this.fetchFoodOptions();
  },
  methods: {
    redirect() {
      this.$router.push({ name: 'login' });
    },
    home(){
      this.$router.push({
        name: 'home',
          query: {
            username: this.username,
            isCoach: this.isCoach,
            coach: this.coach
          }
      });
    },
    fetchFoodOptions() {
      fetch(`http://localhost:3000/api/getMeals?username=${this.username}`)  // Adjust this URL to your new endpoint
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            this.foodOptions = data;  // Assuming the response contains an array of food items
          }
        })
        .catch(error => console.error('Error fetching food options:', error));
    },
    fillNutritionalValues() {
      if (this.selectedFood) {
        this.calories = this.selectedFood.calories;
        this.fat = this.selectedFood.fat;
        this.carbs = this.selectedFood.carbs;
        this.protein = this.selectedFood.protein;
      } else {
        // Reset values if no food is selected
        this.calories = '';
        this.fat = '';
        this.carbs = '';
        this.protein = '';
      }
    },
    submitData() {
      const meal = {
        food: this.selectedFood.food,
        calories: this.calories,
        fat: this.fat,
        carbs: this.carbs,
        protein: this.protein,
        comments: this.comments,
      };

      fetch(`http://localhost:3000/api/addmeal?username=${this.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meal),
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Meal added successfully!');
          this.$router.push({
            name: 'home',
            query: {
              username: this.username,
              isCoach: this.isCoach,
              coach: this.coach,
            },
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.addMeal-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  max-width: 400px;
  margin: auto;
}

.header-message {
  font-size: 2em;
  color: #0b6dff;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px; /* Adjusted padding for consistency */
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px; /* Consistent font size */
  background-color: #fff; /* Ensuring input background color consistency */
}

button {
  all: unset; /* Reset default button styles */
  cursor: pointer;
  padding: 10px 20px; /* Consistent padding */
  font-size: 16px; /* Consistent font size for buttons */
  border-radius: 4px; /* Rounded corners */
  border: 1px solid #ccc; /* Border color */
  background-color: #0b6dff; /* Primary button color */
  color: white; /* Text color */
  margin: 10px 5px; /* Space between buttons */
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

button:hover {
  background-color: #0854cc; /* Darker shade on hover */
  transform: translateY(-2px); /* Slight hover effect */
}

button:focus {
  outline: none; /* Remove focus outline */
}

textarea {
  resize: vertical; /* Allow vertical resizing */
}

select {
  cursor: pointer; /* Make the select dropdown more interactive */
}
</style>