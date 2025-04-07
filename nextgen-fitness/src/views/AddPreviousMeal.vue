<template>
  <div class="addMeal-container">
    <button @click="redirect">Log Out</button>
    <button @click="home">Home</button>

    <h1 class="header-message">Quick Log a Previous Food</h1>

    <!-- First dropdown unique meal names -->
    <label for="food">Select Previously Logged Food:</label>
    <select id="food" v-model="selectedMealName" @change="updateMealInstances">
      <option value="null" disabled selected hidden>Select Food</option>
      <option v-for="meal in sortedUniqueMealNames" :key="meal" :value="meal">
        {{ meal }}
      </option>
    </select>

    <!-- Second dropdown for specific meal instances -->
    <div v-if="selectedMealName">
      <label for="mealInstance">Select Entry Instance:</label>
      <select id="mealInstance" v-model="selectedMeal" @change="fillNutritionalValues">
        <option value="null" disabled selected hidden>Select a specific food entry</option>
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
      // Data related to the meals
      foodOptions: [],
      uniqueMealNames: [],
      mealInstances: [],
      selectedMealName: null,
      selectedMeal: null,
      calories: '',
      fat: '',
      carbs: '',
      protein: '',
      comments: ''
    };
  },
  created() {
    //Fetch the food options (meal data) as soon as the component is created
    this.fetchFoodOptions();
  },
  computed: {
    //Sort the unique meal names alphabetically (case-insensitive)
    sortedUniqueMealNames() {
      return this.uniqueMealNames.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    }
  },
  methods: {
    //Navigate back to the login screen
    redirect() {
      this.$router.push({ name: 'login' });
    },

     //Navigate the user to the home page
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

    //Fetch food options (meal data) from the backend
    fetchFoodOptions() {
      fetch(`http://localhost:3000/api/getMeals?username=${this.username}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            this.foodOptions = data;

            const uniqueNames = [...new Set(data.map(meal => meal.food))];
            this.uniqueMealNames = uniqueNames;
          }
        })
        .catch(error => console.error('Error fetching food options:', error));
    },

    //Update the list of meal instances based on the selected meal name
    updateMealInstances() {
      if (this.selectedMealName) {
        //Filter the food options to get only the meals that match the selected name
        this.mealInstances = this.foodOptions.filter(meal => meal.food === this.selectedMealName);
        this.selectedMeal = null;
      }
    },

    //Fill in the nutritional values (calories, fat, carbs, protein) based on the selected meal
    fillNutritionalValues() {
      if (this.selectedMeal) {
        //Populate the input fields with the selected meal's nutritional values
        this.calories = this.selectedMeal.calories;
        this.fat = this.selectedMeal.fat;
        this.carbs = this.selectedMeal.carbs;
        this.protein = this.selectedMeal.protein;
      } else {
        //Reset values if no meal is selected
        this.calories = '';
        this.fat = '';
        this.carbs = '';
        this.protein = '';
      }
    },

    //Submit the selected meal data to the backend
    submitData() {
      if (!this.selectedMeal) {
        alert("Must select a specific entry instance!");
        return;
      }
      const meal = {
        food: this.selectedMeal.food,
        calories: this.calories,
        fat: this.fat,
        carbs: this.carbs,
        protein: this.protein,
        comments: this.comments
      };
      //Send the meal data to the backend via a POST request
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
          alert('Entry logged!');
          this.$router.push({
            name: 'home',
            query: {
              username: this.username,
              isCoach: this.isCoach,
              coach: this.coach
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
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #fff;
}

button {
  all: unset;
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

textarea {
  resize: vertical; 
}

select {
  cursor: pointer; 
}

.meal-search {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>