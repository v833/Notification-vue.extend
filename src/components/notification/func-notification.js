import Notification from './Notification.vue';
export default {
  // 可以直接覆盖内容
  extends: Notification,
  computed: {
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`,
      }
    }
  },
  data() {
    return {
      // 使用数据要先声明
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  },
  mounted() {
    this.createTimer()
  },
  methods: {
    createTimer() {
      if (this.autoClose) {
         // 如果data里没有声明timer 则timer挂载在实例上，不具有响应式
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
      this.$once('hook:beforeDestory', this.clearTimer)
    },
    clearTimer() {
      this.timer && clearTimeout(this.timer)
    },
    // 覆盖 Notification 组件的对应方法
    // 注意这里v-show为true时不会触发transition事件
    afterEnter() {
      this.height = this.$el.offsetHeight
    },
  }
}