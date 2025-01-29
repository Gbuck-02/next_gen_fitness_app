<template>
  <div class="home-container">
    <button @click="redirect">Log Out</button>
    
    <!-- display clients page link if the user is a coach -->
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

    <div class="home_layout">
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.query.username,
      // compare to '1' since the query parameter will be passed as a string '1' or '0' instead of T/F
      isCoach: this.$route.query.isCoach === '1',
      coach: this.$route.query.coach || null,
      protein: null,
      carbs: null,
      calories: null
    };
  },
  methods: {
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
</style>
