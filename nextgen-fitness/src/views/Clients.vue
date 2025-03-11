<template>
  <div>
    <h1>Clients of Coach: {{ username }}</h1>
    <!-- Render your clients here -->
    <ul>
      <li v-for="client in clients" :key="client.id">{{ client.name }}</li>
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
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      try {
        const response = await fetch(`http://localhost:3000/api/clients?coach=${this.coach}`);
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
  },
};
</script>