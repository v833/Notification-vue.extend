// import Notification from './Notification.vue'
import notify from './function'

// vue.use默认使用 install 方法
export default (Vue) => {
  // 用 name 注册组件
  // Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}