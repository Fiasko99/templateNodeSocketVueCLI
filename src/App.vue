<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  sockets: {
    con: function() {
      console.log('socket connect');
    }
  },
}
</script>


<style>
* {
  font-family: 'Roboto', sans-serif !important;
}
</style>
