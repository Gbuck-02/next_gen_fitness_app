<template>
  <div class="home-container">
    <button @click="redirect">Log Out</button>
    
    <!-- display Clients Page link if the user is a coach -->
    
    <div v-if="isCoach">
      <router-link :to="{ name: 'clients', query: { coach: username } }">
        <button>Go to Clients Page</button>
      </router-link>
    </div>

    <h1 class="welcome-message">Home Page</h1>
    <p class="username-message">Welcome, {{ username }}</p>

    <!-- display coach information if the user is not a coach -->
    <div v-if="!isCoach && coach">
      <p>Your coach is: {{ coach }}</p>
    </div>

    <div class="form-container">
      <h2>Nutrition Information</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="protein">Protein (g):</label>
          <input type="number" id="protein" v-model="protein" required />
        </div>

        <div class="form-group">
          <label for="carbs">Carbs (g):</label>
          <input type="number" id="carbs" v-model="carbs" required />
        </div>

        <div class="form-group">
          <label for="calories">Calories (kcal):</label>
          <input type="number" id="calories" v-model="calories" required />
        </div>

        <button type="submit" class="submit-button">Submit</button>
      </form>

      <div v-if="submitted" class="summary">
        <h3>Nutrition Summary:</h3>
        <p><strong>Protein:</strong> {{ protein }} g</p>
        <p><strong>Carbs:</strong> {{ carbs }} g</p>
        <p><strong>Calories:</strong> {{ calories }} kcal</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.query.username,
      // Compare to '1' since the query parameter will be passed as a string '1' or '0'
      isCoach: this.$route.query.isCoach === '1', 
      protein: null,
      carbs: null,
      calories: null,
      submitted: false,
      coach: this.$route.query.coach || null
    };
  },
  methods: {
    submitForm() {
      this.submitted = true;
    },
    redirect() {
      this.$router.push({ name: 'login' });
    }
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

/* Coach section styling */
.coach-section {
  background-color: #eaf2ff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.coach-message {
  font-size: 1.5em;
  color: #0b6dff;
}

.clients-heading {
  font-size: 1.3em;
  margin-bottom: 10px;
  color: #333;
}

/* Styling for the clients list */
.clients-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 1.1em;
}

.client-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-name {
  font-weight: bold;
  color: #333;
}

.client-coach {
  font-style: italic;
  color: #777;
}

.no-clients-message {
  font-size: 1.2em;
  color: #ff6347; /* red color */
}

/* Non-coach user section styling */
.non-coach-section {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.coach-message {
  font-size: 1.2em;
  color: #0b6dff;
}

.form-container {
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 1.1em;
  color: #555;
  margin-bottom: 5px;
}

input[type="number"] {
  width: 100%;
  padding: 8px;
  font-size: 1.1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #0b6dff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
}

button:hover {
  background-color: #0057b8;
  cursor: pointer;
}

.summary {
  margin-top: 20px;
  padding: 15px;
  background-color: #e1f7d5;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.summary p {
  font-size: 1.1em;
  color: #333;
}

.buttons{
  display: inline;
}
</style>
