import Vue from 'vue'
import App from './App.vue'
import { Dialog,Popover, Table, TableColumn } from 'element-ui';
import userHelp from './packages/userHelp/index'
import Vant from "vant"
import 'element-ui/lib/theme-chalk/index.css';
import "vant/lib/index.css"
// console.log(mam.avatarList,'==');
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(userHelp)
Vue.use(Vant)
new Vue({
  el: '#app',
  render: h => h(App)
})
