<template>
    <header class="app-header">
      <img :src="logo" alt="Logo" class="logo" />
    </header>
</template>
  
<script>
  export default {
    data() {
      return {
        logo: require('@/components/NextGenLogo.webp'),  // Make sure to replace with your actual logo path
      };
    },
  };
  </script>