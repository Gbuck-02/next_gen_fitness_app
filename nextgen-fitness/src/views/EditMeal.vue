<template>
    <div class="editMeal-container">
      <button @click="redirect">Log Out</button>
  
      <button @click="home">Home</button>
  
      <h1 class="header-message">Edit Meal</h1>
  
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
  
      <label for="comments">Enter Comments:</label>
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
            meal: this.$route.query.meal ? this.decodeBase64(this.$route.query.meal) : null,
            calories: '',
            fat: '',
            carbs: '',
            protein: '',
            comments: '',
            food: '',
            formattedDate: '',
            formattedTime: ''
        };
    },
    created() {
        if (this.$route.query.meal) {
            // Decode the meal from the query parameter
            this.meal = this.decodeBase64(this.$route.query.meal);
            const mealObject = JSON.parse(this.meal);
            // Assign values if they exist
            this.calories = mealObject.calories || '';
            this.fat = mealObject.fat || '';
            this.carbs = mealObject.carbs || '';
            this.protein = mealObject.protein || '';
            this.comments = mealObject.comments || '';
            this.food = mealObject.food;
        }
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
        decodeBase64(encodedData) {
            return JSON.parse(decodeURIComponent(atob(encodedData)));
        },
        editMeal() {
            const editedMeal = {
                food: this.food,
                calories: this.calories,
                fat: this.fat,
                carbs: this.carbs,
                protein: this.protein,
                comments: this.comments,
                date: this.date,
            };
            console.log(editedMeal)
/*
            fetch(`http://localhost:3000/api/updateMeal?username=${this.username}`, {
                method: 'PUT', // Use PUT to update an existing record
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedMeal),
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert('Meal updated successfully!');
                    this.$router.push({
                        name: 'home',
                        query: { username: this.username, isCoach: this.isCoach, coach: this.coach }
                    });
                }
            });
            */
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
  cursor: pointer;
}

button:hover {
  background-color: #0854cc;
}
</style>