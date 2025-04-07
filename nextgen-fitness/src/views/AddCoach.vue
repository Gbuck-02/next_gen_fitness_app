<template>
  <div class="coachCode-container">
    <button @click="home">Home</button>
  
    <h1 class="header-message">Enter Coach Code</h1>
  
    <label for="coachCode">Enter your coach's code below:</label>
    <input type="text" id="coachCode" v-model="coachCode" placeholder="Enter code" />
  
    <button @click="submitCoachCode">Submit</button>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      username: this.$route.query.username,
      isCoach: this.$route.query.isCoach,
      coach: this.$route.query.coach,
      coachCode: ''
    };
  },
  methods: {
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

    //Handle submission of the coach code
    submitCoachCode() {
      if (!this.coachCode.trim()) {
        alert("Please enter a valid coach code.");
        return;
      }

      //Send POST request to backend to add a coach invite
      fetch(`http://localhost:3000/api/addCoachInvite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: this.username, 
          coachCode: this.coachCode 
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Coach request sent!");
          this.home();
        } else {
          alert("Invalid coach code. Please try again.");
        }
      })
      .catch(() => {
        alert("An error occurred. Please try again later.");
      });
    }
  }
};
</script>
  
<style scoped>
.coachCode-container {
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
  
input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
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
</style>  