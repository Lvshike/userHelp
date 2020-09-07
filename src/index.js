
import userHelp from "./packages/userHelp/index"

const components = [
    userHelp
]

const install = function (Vue, opts = {}) {
    // 循环挂载到全局组件
    components.forEach(component => {
      Vue.component(component.name, component)
    })
}

// 支持script方式引入
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    userHelp
  }