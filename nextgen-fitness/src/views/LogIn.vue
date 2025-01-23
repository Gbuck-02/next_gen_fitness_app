<template>
  <div class="login">
    <h1>Welcome!!!</h1>
    <h3>Please enter your username and password to log in</h3>

    <label>Username:</label>
    <input type="text" v-model="user" />

    <label>Password:</label>
    <input type="password" required v-model="password" />
    <br />
    <button @click="handleLogin">Log In</button>
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
    handleLogin() {
      // prepare request data
      const loginData = {
        username: this.user,
        password: this.password,
      };
      console.log(loginData)

      // Make POST request to API
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            // login successful
            this.$router.push({
              name: 'home',
              query: {
                username: data.username,
                isCoach: data.isCoach,
                coach: data.Coach,
              },
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while logging in.');
        });
    },
  },
};
</script>

<style scoped>
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
}
</style>