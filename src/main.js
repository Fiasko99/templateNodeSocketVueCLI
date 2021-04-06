import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false


const apiurl = 'http://localhost:3000'
Vue.prototype.$apiurl = apiurl

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: apiurl,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    },
    options: {
      query: {
        token: `${localStorage.getItem("user-chat-token")}`
      }
    }
  })
);

Vue.prototype.$http = axios;
const token = localStorage.getItem("user-chat-token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    if (error.response !== undefined) {
      if (error.response.status === 401) {
        console.log("Неавторизован ...");
        localStorage.removeItem("user-token");
        router.push("login");
      }
    }
    return Promise.reject(error.response);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
