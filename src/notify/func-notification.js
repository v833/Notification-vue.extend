import Notification from './Notification.vue'

export default {
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
      verticalOffset: '',
      timer: null,
      autoClose: 3000,
      // visible: false
    }
  },
  methods: {
    createTimer() {
      // 如果data里没有声明timer 则timer挂载在实例上，不具有响应式
      this.timer = setTimeout(() => {
        this.visible = false
      }, this.autoClose)

      this.$once('hook:beforeDestory', this.clearTimer)
    },
    clearTimer() {
      this.timer && clearTimeout(this.timer)
    },
    close() {
      
    }
  },

  mounted() {
    console.log(this);
    this.createTimer()
  },
}