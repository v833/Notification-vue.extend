import Vue from 'vue'
import App from './App.vue'
import Notification from './components/notification/index'
Vue.config.productionTip = false

import Tabs from './components/tabs'
Vue.use(Tabs)
Vue.use(Notification)
new Vue({
  render: h => h(App),
}).$mount('#app');
