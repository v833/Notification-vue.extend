<template>
  <transition
    name="slide-fade"
    mode="out-in"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <div
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">
        {{ content }}
      </span>
      <a href="" class="btn" @click="handleClose">{{ btn }}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Notification",
  props: {
    content: {
      type: String,
      require: true,
    },
    btn: {
      type: String,
      default: "关闭",
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    handleClose(e) {
      e.preventDefault();
      this.$emit("close");
    },
    // 动画结束触发
    afterLeave() {
      this.$emit("closed");
    },
    // 组件生成完毕
    afterEnter() {},
  },
  computed: {
    style() {
      return {};
    },
  },
};
</script>

<style>
.notification {
  display: inline-flex;
  background-color: #303030;
  color: rgba(255, 255, 255, 1);
  align-items: center;
  padding: 20px;
  min-width: 280px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  flex-wrap: wrap;
  transition: all 0.5s;
}

.content {
  padding: 0;
}

.btn {
  color: #ff4081;
  padding-left: 24px;
  margin-left: auto;
  cursor: pointer;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>