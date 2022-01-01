<template>
  <div id="app">
    <button @click="addNotify">click</button>

    <input type="text" v-model="inputContent" />
    <tabs :value="tabValue" @change="handleChangeTab">
      <tab label="tab1" index="1">
        <span>index1{{ inputContent }}</span>
      </tab>
      <tab index="2">
        <span slot="label" style="color: red">tab2</span>
        <span>index2</span>
      </tab>
      <tab label="tab3" index="3">
        <span>index3</span>
      </tab>
    </tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabValue: 0,
      inputContent: "2",
    };
  },
  methods: {
    addNotify() {
      this.$notify.content("ok");
    },
    handleChangeTab(value) {
      this.tabValue = value;
    },
  },
};
</script>