import Vue from 'vue'
import App from './App.vue'
import Notification from './components/notification/index'
Vue.config.productionTip = false

Vue.use(Notification)
new Vue({
  render: h => h(App),
}).$mount('#app');
