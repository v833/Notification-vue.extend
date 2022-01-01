import Component from './func-notification'
import Vue from 'vue'
const NotificationConstrutor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)
  if (len <= 1) return
  const removeHeight = instance.vm.height
  // 从上面的开始往下移动，下面的不需要变化
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  // 服务端没有DOM运行环境
  if (Vue.prototype.$isServer) return

  const {
    autoClose,
    ...rest
  } = options
  const instance = new NotificationConstrutor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose || 3000
    }
  })
  // 保证不会有重复的实例
  const id = `nitification_${seed++}`
  instance.id = id
  // 不传节点只是生成了$el对象，不挂载 div标签已经生成
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  // 使transition生效
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  // 监听动画结束时间，将dom从html删除
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    // $destroy只是完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
    // 不能清除DOM
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })

  console.log(instance === instance.$mount()); // true
  return instance
}

notify.content = function (options) {
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }
  return notify(options)
}

// ['info', 'success', 'error', 'warning'].forEach(type => {
//   Message[type] = function (data) {
//     if (typeof data === 'string') {
//       data = {
//         message: data
//       }
//     }
//     data.type = type;
//     //整合data后再次去调用Message()
//     return Message(data);
//   };
// });
export default notify