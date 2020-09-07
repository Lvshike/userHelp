

## 移动端帮助框使用说明

### 安装依赖
npm/cnpm i user-help-mobile@1.0.7 -S

### 在main.js中引入，注册
import userHelp from "user-help-mobile"
Vue.use(userHelp)

### 在组件中使用
<userHelp
  :dataInfo="dataInfo" // 帮助框会回显 dataInfo.value 里面的数据
  choice="radio"  //‘radio/checkbox(默认)’ 单选or多选，默认多选
  type="user"      // 帮助框类型:'user(默认)/department/branch'
  position="form(默认)" 
  @goHide='hide' // 点击帮助框内头部返回图标时触发，关闭帮助框
  @getSelectData="getData" // 点击帮助框内确定按钮时触发，可以拿到已选数据, 同时关闭帮助框
/>

### 注意!!!
 帮助框加入了侧滑功能，暂时只能用 v-if 来控制帮助框的显示隐藏，v-show可能会导致路由出问题，
 可通过dataInfo.value来控制回显