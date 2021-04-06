<template>
  <div>
    <h1>About</h1>
  </div>
</template>

<script>
  export default {
    async mounted () {
      let data = {
          userlogin: 'user',
          userpass: 'user'
        }
      await this.$http.post(`${this.$apiurl}/auth/login`, data)
      .then(res => res = res.data)
      .then(res => {
        const token = res.token;
        localStorage.removeItem("user-chat-token");
        localStorage.setItem("user-chat-token", token);
        this.$http.defaults.headers.common["Authorization"] = token;
        console.log('Вход успешен');
      })
      this.$socket.disconnect()
      this.$socket.open()
      
    },
  }
</script>

<style scoped>

</style>