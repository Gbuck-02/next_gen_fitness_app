<template>
  <div class="clients-container">
    <h1 class="clients-heading">Clients of Coach {{ coach }}</h1>

    <ul v-if="clients.length > 0">
      <li v-for="client in clients" :key="client.user">{{ client.user }}</li>
    </ul>
    <p v-else>No clients assigned</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coach: this.$route.query.coach,
      usersList: [
        { user: "Marcus", password: "1234", isCoach: true, Coach: "" },
        { user: "Anna", password: "5678", isCoach: false, Coach: "Marcus" },
        { user: "John", password: "password123", isCoach: false, Coach: null },
        { user: "Sarah", password: "password456", isCoach: false, Coach: "Marcus" },
        { user: "Tom", password: "password789", isCoach: true, Coach: "" }
      ]
    };
  },
  computed: {
    clients() {
      return this.usersList.filter(user => user.Coach === this.coach);
    }
  }
};
</script>


<style scoped>
</style>
