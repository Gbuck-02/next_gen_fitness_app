<template>
  <div class="clients-container">
    <button @click="home">Home</button>

    <button @click="viewInvites">Client Requests</button>

    <h1 class="header-message">Clients of Coach: {{ username }}</h1>

    <!-- Clients List -->
    <ul class="clients-list">
      <li 
        v-for="client in clients" 
        :key="client.username" 
        class="client-item"
        @click="handleClientClick(client.username)">
        {{ client.username }}
      </li>
    </ul>

    <!-- Pop-up Invite Box -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h3>Requests for Coach: {{ username }}</h3>
        <div v-if="invites.length === 0" class="no-invites">
          No Requests
        </div>
        <div v-else class="invites-list">
          <div 
            v-for="invite in invites" 
            :key="invite"
            class="invite-item">
            <span>{{ invite }}</span>
            <button @click="acceptInvite(invite)" class="accept-btn">✔️</button>
            <button @click="declineInvite(invite)" class="decline-btn">❌</button>
          </div>
        </div>
        <button @click="closePopup" class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.query.username,
      isCoach: this.$route.query.isCoach,
      coach: this.$route.query.coach || null,
      clients: [],
      invites: [],  // Holds the fetched invites
      showPopup: false,  // Controls the visibility of the popup
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
    viewInvites() {
      this.fetchInvites();  // Fetch invites when the button is clicked
    },
    async fetchInvites() {
      try {
        const response = await fetch(`http://localhost:3000/api/invites?coach=${this.username}`);
        const data = await response.json();
        
        if (data.error) {
          console.error('Error fetching invites:', data.error);
        } else {
          this.invites = data.invites;  // Populate the invites list
          this.showPopup = true;  // Show the popup
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    acceptInvite(username) {
      console.log(`Accepted invite from: ${username}`);
      // Handle the logic for accepting the invite here
    },
    declineInvite(username) {
      console.log(`Declined invite from: ${username}`);
      // Handle the logic for declining the invite here
    },
    closePopup() {
      this.showPopup = false;  // Close the popup
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

.popup {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.popup-content {
  text-align: left;
}

.invites-list {
  margin-top: 10px;
}

.invite-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0;
  font-size: 1.2rem;
}

.invite-item span {
  flex: 1;
}

.accept-btn, .decline-btn {
  font-size: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;
}

.accept-btn {
  color: green;
}

.decline-btn {
  color: red;
}

.no-invites {
  font-size: 1.2rem;
  color: #888;
  padding: 10px 0;
  text-align: center;
}

.close-btn {
  display: block;
  margin-top: 10px;
  background-color: #0b6dff;
  color: white;
  padding: 10px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #0854cc;
}
</style>