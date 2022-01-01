<script>
export default {
  name: "Tab",

  // provide() {
  //   const data = {}
  //   Object.defineProperty(data, 'value', {
  //     get: () => this.value
  //   })
  //   return data
  // },
  props: {
    index: {
      type: [Number, String],
      required: true,
    },
    label: {
      type: String,
      default: "tab",
    },
  },
  computed: {
    active() {
      return this.$parent.value === this.index;
    },
  },
  render() {
    const tab = this.$slots.label || <span>{this.label}</span>;
    const classNames = {
      tab: true,
      active: this.active,
    };
    return <li on-click={this.handleClick} class={classNames}>{tab}</li>;
  },
  methods: {
    handleClick() {
      this.$parent.onChange(this.index)
    }
  },
  mounted() {
    this.$parent.panes.push(this)
  }
};
</script>

<style>
.tab {
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  bottom: -2px;
  cursor: pointer;
}
.active {
  border-bottom: 2px solid blue;
}
:last-child {
  margin-right: 0;
}
</style>