<template>
  <div id="app">
    <header class="app-header">
      <img :src="logo" alt="Logo" class="logo" />
    </header>
    <router-view /> <!-- Content from routed pages -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require('@/components/NextGenLogo.webp'), // Path to logo image
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #f9f9f9;
}

/* Header styling */
.app-header {
  padding: 10px 10px;
  margin-bottom: -10px;
}

/* Adjust the logo size */
.logo {
  width: 150px;
  height: auto;
}
</style>