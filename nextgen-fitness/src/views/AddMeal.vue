<template>
    <div class="addMeal-container">
      <button @click="redirect">Log Out</button>
  
      <label for="food">Enter Meal/Food Eaten:</label>
      <input type="text" id="food" v-model="food" placeholder="Enter food" />
  
      <label for="calories">Enter Calories:</label>
      <input type="number" id="calories" v-model="calories" placeholder="Enter calories" />
  
      <label for="fat">Enter Fat (g):</label>
      <input type="number" id="fat" v-model="fat" placeholder="Enter fat (g)" />
  
      <label for="carbs">Enter Carbs (g):</label>
      <input type="number" id="carbs" v-model="carbs" placeholder="Enter carbs (g)" />
  
      <label for="protein">Enter Protein (g):</label>
      <input type="number" id="protein" v-model="protein" placeholder="Enter protein (g)" />
  
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
    submitData() {
      const meal = {
        food: this.food,
        calories: this.calories,
        fat: this.fat,
        carbs: this.carbs,
        protein: this.protein,
        comments: this.comments
      };
        console.log(meal)

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
  
  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button{
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0854cc;
  }
  </style>  