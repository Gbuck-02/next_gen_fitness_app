<template>
    <div class="addMeal-container">
      <button @click="redirect">Log Out</button>

      <button @click="home">Home</button>

      <button @click="addPreviousMeal">Quick Add a Meal</button>

      <h1 class="header-message">Enter a New Meal</h1>
  
      <label for="food">Enter Meal/Food Eaten:</label>
      <input type="text" id="food" v-model="food" placeholder="Enter food" />
  
      <label for="calories">Enter Calories:</label>
      <input type="number" id="calories" v-model="calories" placeholder="Enter calories" min="0" @input="calories = calories < 0 ? '' : calories" />
  
      <label for="fat">Enter Fat (g):</label>
      <input type="number" id="fat" v-model="fat" placeholder="Enter fat (g)" min="0" @input="fat = fat < 0 ? '' : fat" />
  
      <label for="carbs">Carbs (g):</label>
      <input type="number" id="carbs" v-model="carbs" placeholder="Enter carbs (g)" min="0" @input="carbs = carbs < 0 ? '' : carbs" />

  
      <label for="protein">Enter Protein (g):</label>
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
            food: '',
            calories: '',
            fat: '',
            carbs: '',
            protein: '',
            comments: ''
        };
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
    addPreviousMeal(){
      this.$router.push({
        name: 'addold',
          query:{
            username: this.username,
            isCoach: this.isCoach,
            coach: this.coach
        }
      });
    },
    submitData() {
      const meal = {
        food: this.food,
        calories: this.calories,
        fat: this.fat,
        carbs: this.carbs,
        protein: this.protein,
        comments: this.comments
      };

        fetch(`http://localhost:3000/api/addmeal?username=${this.username}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',  // Set content type to JSON
            },
            body: JSON.stringify(meal),  // Send the meal data in the body
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            }
            else {
            alert('Meal added successfully!');
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
</style>  