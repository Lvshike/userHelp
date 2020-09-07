import userHelp from './index.vue'
userHelp.install = Vue => Vue.component(userHelp.name, userHelp)

// 支持使用script标签方式引入
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(userHelp)
}

export default userHelp