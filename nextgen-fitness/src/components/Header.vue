<!-- header component that is used at the top of each page -->
<template>
    <header class="app-header">
      <img :src="logo" alt="Logo" class="logo" />
    </header>
</template>
  
<script>
  export default {
    data() {
      return {
        logo: require('@/components/NextGenLogo.webp'),
      };
    },
  };
  </script>