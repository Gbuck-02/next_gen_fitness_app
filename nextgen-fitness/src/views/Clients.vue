<template>
  <div class="clients-container">
    <button @click="home">Home</button>

    <button @click="viewInvites">Click here to view current user invites</button>

    <h1 class="header-message">Clients of Coach: {{ username }}</h1>
    
    <ul class="clients-list">
      <li 
        v-for="client in clients" 
        :key="client.username" 
        class="client-item"
        @click="handleClientClick(client.username)">
        {{ client.username }}
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.query.username,
      isCoach: this.$route.query.isCoach,
      coach: this.$route.query.coach || null,
      clients: [],  // Will hold the fetched clients
    };
  },
  created() {
    if (this.clients.length === 0) {
      this.fetchClients();
    }
  },
  methods: {
    async fetchClients() {
      try {
        const response = await fetch(`http://localhost:3000/api/clients?coach=${this.username}`);
        const data = await response.json();
        
        if (data.error) {
          console.error('Error fetching clients:', data.error);
        } else {
          this.clients = data.clients; // Assuming the response contains an array of clients
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    handleClientClick(clientName) {
      console.log(`Selected client: ${clientName}`);
      // Handle client selection logic here
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
    }
  },
};
</script>

<style scoped>
.clients-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  max-width: 600px;
  margin: auto;
}

.header-message {
  font-size: 2em;
  color: #0b6dff;
  margin-bottom: 20px;
}

.clients-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.client-item {
  font-size: 1.2rem;
  padding: 12px;
  background-color: #fff;
  margin: 8px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.client-item:hover {
  background-color: #e1e1e1;
}

.client-item:active {
  background-color: #ccc;
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

button:focus {
  outline: none;
}
</style>
