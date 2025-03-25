<template>
  <div class="newUser">
    <div class="newUser-container">
      <h1>Create a New Account</h1>
      <h3>Please enter a username and password</h3>

      <div class="input-group">
        <label for="username">Username:</label>
        <input type="text" v-model="user" id="username" placeholder="Enter username" />
      </div>

      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" placeholder="Enter password" />
      </div>

      <div class="action-buttons">
        <button @click="newUserLogin">Sign Me Up!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      password: '',
    };
  },
  methods: {
    newUserLogin() {
      const newUserData = {
        username: this.user,
        pass: this.password,
        isCoach: false,
      };

      fetch('http://localhost:3000/api/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            this.$router.push({
              name: 'home',
              query: {
                username: data.username,
                isCoach: data.isCoach,
                coach: data.coach,
              },
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while creating the user.');
        });
    },
  },
};
</script>

<style scoped>
.newUser {
  font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.newUser-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  color: #0b6dff;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-weight: bold;
  color: #333;
  font-size: 1em;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  margin-top: 8px;
}

.action-buttons button {
  background: #0b6dff;
  border: 0;
  padding: 12px 20px;
  color: white;
  border-radius: 20px;
  font-size: 16px;
  margin-top: 20px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.action-buttons button:hover {
  background-color: #0854cc;
  transform: translateY(-2px);
}

button:focus {
  outline: none;
}
</style>