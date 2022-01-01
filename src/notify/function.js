import Component from './func-notification'
import Vue from 'vue'

const NotificationConstructor = Vue.extend(Component)

const removeInstance = (instance) => {
  if (!instance) return
  let len = instances.length
  const index = instances.findIndex(item => item.id === instance.id)
  instances.splice(index, 1)
  if (len <= 1) return
  for (let i = index; i < len -1 ; i++) {

  }
}

const instances = []
let seed = 1

const notify = (options) => {
  const {autoClose, ...rest} = options
  const instance = new NotificationConstructor({
    propsData: {...rest},
    data: {
      autoClose: autoClose || 3000,
    }
  })
  const id = `notification_${seed++}`
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset

  instance.$on('closed',() => {
    removeInstance(instance)
    document.body.removeChild(instance.$el)
    instance.$destroy()
  })
  instances.push(instance)
  return instance
}

notify.content = (data) => {
  if (typeof data !== 'string') return
  const _data = {
    content: data
  }
  return notify(_data)
}

export default notify