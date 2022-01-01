<template>
  <div id="app">
    <!-- <Notification content="notification" /> -->
    <!-- <button @click="addNotify">click</button> -->
    <button @click="openNotify">click</button>
  </div>
</template>

<script>
import Notification from './notify/Notification.vue'
export default {
  // methods: {
  //   addNotify() {
  //     this.$notify.content("ok");
  //     // this.$notify({
  //     //   content: 'xx',
  //     //   btn: '123'
  //     // })
  //   },
  // },
  methods: {
    openNotify() {
      // this.$notify({
      //   content: 'hello'
      // })
      this.$notify.content('hello')
    }
  },
  components: {
    Notification
  }


};
</script>