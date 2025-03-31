<template>
  <div class="addMeal-container">
    <button @click="redirect">Log Out</button>
    <button @click="home">Home</button>

    <h1 class="header-message">Quick Add a Previous Meal</h1>

    <!-- First Dropdown: Unique Meal Names -->
    <label for="food">Select Meal:</label>
    <select id="food" v-model="selectedMealName" @change="updateMealInstances">
      <option value="null" disabled selected hidden>Select a Previous Meal</option>
      <option v-for="meal in uniqueMealNames" :key="meal" :value="meal">
        {{ meal }}
      </option>
    </select>

    <!-- Second Dropdown: Specific Meal Instances -->
    <div v-if="selectedMealName">
      <label for="mealInstance">Select Meal Instance:</label>
      <select id="mealInstance" v-model="selectedMeal" @change="fillNutritionalValues">
        <option value="null" disabled selected hidden>Select a specific meal</option>
        <option v-for="meal in mealInstances" :key="meal.id" :value="meal">
          {{ meal.food }} ({{ meal.formatted_date }})
        </option>
      </select>
    </div>

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
      foodOptions: [],  // Full list of food items from the database
      uniqueMealNames: [],  // Unique meal names for the first dropdown
      mealInstances: [],  // Filtered list of meals matching the selected meal name
      selectedMealName: null,  // Meal name selected from the first dropdown
      selectedMeal: null,  // Specific meal instance selected from the second dropdown
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
    home() {
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
      fetch(`http://localhost:3000/api/getMeals?username=${this.username}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            this.foodOptions = data;

            // Extract unique meal names
            const uniqueNames = [...new Set(data.map(meal => meal.food))];
            this.uniqueMealNames = uniqueNames;
          }
        })
        .catch(error => console.error('Error fetching food options:', error));
    },
    updateMealInstances() {
      if (this.selectedMealName) {
        // Filter the full list to get only instances of the selected meal name
        this.mealInstances = this.foodOptions.filter(meal => meal.food === this.selectedMealName);
        this.selectedMeal = null; // Reset selection
      }
    },
    fillNutritionalValues() {
      if (this.selectedMeal) {
        this.calories = this.selectedMeal.calories;
        this.fat = this.selectedMeal.fat;
        this.carbs = this.selectedMeal.carbs;
        this.protein = this.selectedMeal.protein;
      } else {
        // Reset values if no meal is selected
        this.calories = '';
        this.fat = '';
        this.carbs = '';
        this.protein = '';
      }
    },
    submitData() {
      if (!this.selectedMeal) {
        alert("Must select a specific meal instance!");
        return;
      }

      const meal = {
        food: this.selectedMeal.food,
        calories: this.calories,
        fat: this.fat,
        carbs: this.carbs,
        protein: this.protein,
        comments: this.comments,
      };

      fetch(`http://localhost:3000/api/addmeal?username=${this.username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

.meal-search {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>