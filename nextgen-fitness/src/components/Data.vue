<template>
    <div class="home-container">
      <button @click="redirect">Log Out</button>
      <h1 class="welcome-message">Home Page</h1>
      <p class="username-message">Welcome, {{ username }}</p>
  
      <!-- display list of users fetched from the backend -->
      <div v-if="users.length">
        <h3>Users:</h3>
        <ul>
          <li v-for="user in users" :key="user.id">{{ user.username }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: this.$route.query.username,
        users: []
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/api/users');
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      submitForm() {
        this.submitted = true;
      },
      redirect() {
        this.$router.push({ name: 'login' });
      }
    },
    mounted() {
      this.fetchUsers();  // Fetch users when the component is mounted
    }
  };
  </script>
  