<template>
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        
        <!-- Conditionally show Clients button if user is a coach -->
        <li v-if="isCoach">
          <router-link to="/clients">
            <button>Go to Clients Page</button>
          </router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    props: {
      isCoach: {
        type: Boolean,  // Ensure this is passed as a Boolean
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  .navbar ul {
    display: flex;
    list-style-type: none;
  }
  
  .navbar li {
    margin-right: 15px;
  }
  
  .navbar a {
    color: white;
    text-decoration: none;
  }
  
  .navbar a:hover {
    text-decoration: underline;
  }
  </style>
  