<template>
  <div class="clients-container">
    <button @click="home">Home</button>

    <button @click="viewInvites">Client Requests</button>

    <p class="coach-code"> Your Coach Code is: {{ coachCode }}</p>

    <h1 class="header-message">Current Clients</h1>

    <ul class="clients-list">
      <li 
        v-for="client in clients" 
        :key="client.username" 
        class="client-item"
        @click="handleClientClick(client.username)">
        {{ client.username }}
      </li>
    </ul>

    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h3>Active Requests</h3>
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
      invites: [],
      showPopup: false,
      coachCode: ""
    };
  },
  created() {
    //Fetch initial client list and coach code on component creation
    if (this.clients.length === 0) {
      this.fetchClients();
    }
    this.fetchCoachCode();
  },
  methods: {
    //Fetches the list of clients assigned to the current coach
    async fetchClients() {
      try {
        const response = await fetch(`http://localhost:3000/api/clients?coach=${this.username}`);
        const data = await response.json();
        
        if (data.error) {
          console.error('Error fetching clients:', data.error);
        } else {
          this.clients = data.clients || [];
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },

    //Retrieves the coach code associated with the current coach
    async fetchCoachCode() {
      try {
        const response = await fetch(`http://localhost:3000/api/coach-code?coach=${this.username}`);
        const data = await response.json();
        if (data.coachCode) {
          this.coachCode = data.coachCode;
        }
      } catch (error) {
        console.error('Error fetching coach code:', error);
      }
    },

    //Navigates to the selected client's statistics page
    handleClientClick(clientName) {
      this.$router.push({
        name: 'clientstats',
        query: {
          username: clientName,
          isCoach: this.isCoach,
          coach: this.username
        }
      });
    },

    //Triggered when the user clicks to view invites
    viewInvites() {
      this.fetchInvites();
    },

    //Fetches all pending invites sent to this coach
    async fetchInvites() {
      try {
        const response = await fetch(`http://localhost:3000/api/invites?coach=${this.username}`);
        const data = await response.json();
        
        if (data.error) {
          console.error('Error fetching invites:', data.error);
        } else {
          this.invites = data.invites || [];
          this.showPopup = true;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },

    //Accepts a specific client invite and updates client and invite list
    async acceptInvite(username) {
      try {
        const response = await fetch('http://localhost:3000/api/accept-invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, coach: this.username }),
        });

        const data = await response.json();
        
        if (data.message) {
          this.fetchInvites();
          this.fetchClients();
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error accepting invite:', error);
      }
    },

    //Declines a specific client invite and refreshes the invite list
    async declineInvite(username) {
      try {
        const response = await fetch('http://localhost:3000/api/decline-invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, coach: this.username }),
        });

        const data = await response.json();
        
        if (data.message) {
          this.fetchInvites();
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error declining invite:', error);
      }
    },

    //Closes the invites popup window
    closePopup() {
      this.showPopup = false;
    },

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

.coach-code {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0b6dff;
  margin: 10px 0;
}
</style>