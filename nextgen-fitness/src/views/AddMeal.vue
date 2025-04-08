<template>
  <div class="addMeal-container">
    <button @click="redirect">Log Out</button>

    <button @click="home">Home</button>

    <button @click="addPreviousMeal">Quick Log</button>

    <h1 class="header-message">Log a Food Item</h1>
  
    <label for="food">Food:</label>
    <input type="text" id="food" v-model="food" placeholder="Enter food" />
  
    <label for="calories">Calories:</label>
    <input type="number" id="calories" v-model="calories" placeholder="Enter calories" min="0" @input="calories = calories < 0 ? '' : calories" />
  
    <label for="fat">Fat (g):</label>
    <input type="number" id="fat" v-model="fat" placeholder="Enter fat (g)" min="0" @input="fat = fat < 0 ? '' : fat" />
  
    <label for="carbs">Carbs  (g):</label>
    <input type="number" id="carbs" v-model="carbs" placeholder="Enter carbohydrates (g)" min="0" @input="carbs = carbs < 0 ? '' : carbs" />

  
    <label for="protein">Protein (g):</label>
    <input type="number" id="protein" v-model="protein" placeholder="Enter protein (g)" min="0" @input="protein = protein < 0 ? '' : protein" />
  
    <label for="comments">Comments:</label>
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
  
      //Navigate the user to the "add old meal" page for quick meal adding
      addPreviousMeal() {
        this.$router.push({
          name: 'addold',
          query: {
            username: this.username,
            isCoach: this.isCoach,
            coach: this.coach
          }
        });
      },
  
      //Submit the new meal data to the backend
      submitData() {
        //Prepare the meal data with proper capitalization for food name
        const meal = {
          food: this.food.charAt(0).toUpperCase() + this.food.slice(1),
          calories: this.calories,
          fat: this.fat,
          carbs: this.carbs,
          protein: this.protein,
          comments: this.comments
        };
  
        //Send the meal data to the backend via a POST request
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
</style>  