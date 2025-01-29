<template>
  <div class="newUser">
    <h1>Create a New Account</h1>
    <h3>Please enter a username and password</h3>

    <label>Username:</label>
    <input type="text" v-model="user" />

    <label>Password:</label>
    <input type="password" required v-model="password" />
    <br />
    <button @click="newUserLogin">Sign Me Up!</button>
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
        username: this.user,   //username entered by the user
        pass: this.password,   //password entered by the user
        isCoach: false, //whether the user is a coach(always false)
      };

      fetch('http://localhost:3000/api/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),  // convert data to JSON for API
      })
        .then((response) => response.json())
        .then((data) => {
          //check for errors or success in the response
          if (data.error) {
            alert(data.error);  //display error message
          } else {
            console.log('User created:', data.message);  //log the success message
            //redirect to the home page
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