<template>
  <div id="app">
    <button @click="addNotify">click</button>
  </div>
</template>

<script>
export default {
  methods: {
    addNotify() {
      this.$notify.content("ok");
    },
  },
};
</script>