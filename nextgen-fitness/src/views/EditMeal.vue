<template>
    <div class="editMeal-container">
      <button @click="redirect">Log Out</button>
  
      <button @click="home">Home</button>
  
      <h1 class="header-message">Edit Entry</h1>
  
      <label for="food">Food:</label>
      <input id="food" v-model="food" />
  
      <label for="calories">Calories:</label>
      <input type="number" id="calories" v-model="calories" placeholder="Enter calories" min="0" @input="calories = calories < 0 ? '' : calories" />
  
      <label for="fat">Fat (g):</label>
      <input type="number" id="fat" v-model="fat" placeholder="Enter fat (g)" min="0" @input="fat = fat < 0 ? '' : fat" />
  
      <label for="carbs">Carbs (g):</label>
      <input type="number" id="carbs" v-model="carbs" placeholder="Enter carbs (g)" min="0" @input="carbs = carbs < 0 ? '' : carbs" />
  
      <label for="protein">Protein (g):</label>
      <input type="number" id="protein" v-model="protein" placeholder="Enter protein (g)" min="0" @input="protein = protein < 0 ? '' : protein" />
  
      <label for="comments">Comments:</label>
      <textarea id="comments" v-model="comments" placeholder="Additional notes"></textarea>
  
      <button @click="editMeal">Submit</button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      username: this.$route.query.username,
      isCoach: this.$route.query.isCoach,
      coach: this.$route.query.coach || null,
      date: this.$route.query.date,
      // Decode and parse the meal object if it exists in the query
      meal: this.$route.query.meal ? this.decodeBase64(this.$route.query.meal) : null,
      calories: '',
      fat: '',
      carbs: '',
      protein: '',
      comments: '',
      food: '',
      // To keep track of the original meal before editing
      originalMeal: null
    };
  },
  created() {
    //Populate the form fields with the passed in meal
    if (this.$route.query.meal) {
      this.meal = this.decodeBase64(this.$route.query.meal); // Decode and parse meal
      const mealObject = JSON.parse(this.meal);

      //Fill form with meal values or fallback defaults
      this.calories = mealObject.calories || 0;
      this.fat = mealObject.fat || '';
      this.carbs = mealObject.carbs || '';
      this.protein = mealObject.protein || '';
      this.comments = mealObject.comments || '';
      this.food = mealObject.food;

      //Store a copy of the original meal
      this.originalMeal = {
        food: this.food,
        calories: this.calories,
        fat: this.fat,
        carbs: this.carbs,
        protein: this.protein,
        comments: this.comments,
        date: this.date,
      };

      this.originalMeal = JSON.parse(JSON.stringify(this.originalMeal));
    }
  },
  methods: {
    //Navigate back to login screen
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

    //Decode a base64-encoded and URI-encoded string
    decodeBase64(encodedData) {
      return JSON.parse(decodeURIComponent(atob(encodedData)));
    },

    //Submit updated meal data
    editMeal() {
      //Create edited meal object
      const editedMeal = {
        food: this.food,
        calories: this.calories,
        fat: this.fat,
        carbs: this.carbs,
        protein: this.protein,
        comments: this.comments,
        date: this.date,
      };

      //Combine original and edited meal into one payload
      const mealsData = {
        originalMeal: this.originalMeal,
        editedMeal: editedMeal,
      };

      //Send a PUT request to update the meal entry
      fetch(`http://localhost:3000/api/editMeal?username=${this.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealsData),
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Entry updated!');
          this.$router.push({
            name: 'home',
            query: { username: this.username, isCoach: this.isCoach, coach: this.coach }
          });
        }
      })
      .catch(error => {
        alert('An error occurred while updating the entry.');
      });
    }
  }
}
</script>

<style scoped>
.editMeal-container {
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
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
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
</style>