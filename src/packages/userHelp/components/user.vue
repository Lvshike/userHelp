<template>
  <div class="user">
    <!--header-->
    <flow-title :back="true" :title="title" @back="close" />
    <!--search-->
    <van-search class="search" disabled @click="search" placeholder="搜索"/>
    <!--tab页-->
    <div  v-if="tab" class="tab">
      <span 
        v-for="item in tabs" 
        :key="item.name" 
        @click="change(item.name)"
        :class="{'active':activeName===item.name}"
      >{{item.title}}</span>
    </div>
    <p v-if="!tab" class="breadcrumb" >
      <span v-for="(item, index) in bread" :key="item.id" @click="item.id==='top'?init():clickOrgItem(item.id)">
        <span>{{item.name}}</span>
        <van-icon v-if="index !== bread.length - 1" class="arrow" name="arrow" />
      </span>
    </p>
    <div :class="{'userContent':true, 'single':checked==='radio'}">
      <div class="listBox">
        <van-checkbox v-if="checked!=='radio'" :value="all" :class="{'selectAll':true,'checked':all}" @click="selectAll">
          <span>全选</span>
        </van-checkbox>
        <div class="box">
          <div v-if="listOrgData.length" :class="{'orgData':true, 'entity': listEntityData.length}">
            <div class="listItem" v-for="item in listOrgData" :key="item.id">
              <p v-if="checked==='radio'" class="left" @click="item.staffCount?clickOrgItem(item.id,item.name):null">
                <span>{{item.name}}</span>
                <span class="userNumber">&nbsp;({{item.staffCount}}人)</span>
              </p>
              <van-checkbox v-else :class="{'left':true,'checked':item.choice}" @click="select(item,'org')" :value="!!item.choice">
                <p :class="{'item':true,'disabled':item.choice}"  @click="select(item)">
                  <span>{{item.name}}</span>
                  <span>&nbsp;({{item.staffCount}}人)</span>
                </p>
              </van-checkbox>
              <p v-if="item.lowerLevel" :class="{'right':true,'disabled':item.choice}" >
                <i class="line"></i>
                <svg width="4vw" height="4vw" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>下级图标</title>
                  <desc>Created with Sketch.</desc>
                  <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="选择人员" class="color" transform="translate(-986.000000, -484.000000)" fill="#3296FA" fill-rule="nonzero">
                          <g id="编组" transform="translate(0.000000, -1.000000)">
                              <g id="右侧" transform="translate(720.000000, 266.000000)">
                                  <g id="总经办" transform="translate(16.000000, 205.000000)">
                                      <g id="下级" transform="translate(250.000000, 10.000000)">
                                          <g id="下级图标" transform="translate(0.000000, 4.000000)">
                                              <path d="M6.4,0 L6.4,3.2 L0,3.2 L0,0 L6.4,0 Z M5.6,0.8 L0.8,0.8 L0.8,2.4 L5.6,2.4 L5.6,0.8 Z" id="矩形"></path>
                                              <path d="M12,4.8 L12,8 L5.6,8 L5.6,4.8 L12,4.8 Z M11.2,5.6 L6.4,5.6 L6.4,7.2 L11.2,7.2 L11.2,5.6 Z" id="矩形"></path>
                                              <path d="M12,9.6 L12,12.8 L5.6,12.8 L5.6,9.6 L12,9.6 Z M11.2,10.4 L6.4,10.4 L6.4,12 L11.2,12 L11.2,10.4 Z" id="矩形"></path>
                                              <polygon id="路径" points="2.8 2.4 2.8 6 6.4 6 6.4 6.8 2 6.8 2 2.4"></polygon>
                                              <polygon id="路径" points="2.8 2.4 2.8 10.8 6.4 10.8 6.4 11.6 2 11.6 2 2.4"></polygon>
                                          </g>
                                      </g>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
                </svg>
                <span class="next" @click="!item.choice?clickOrgItem(item.id,item.name):null">下级</span>
              </p>
            </div>
          </div>
          <div class="entityData">
            <p v-for="item in listEntityData" :key="item.id" class="listItem">
              <van-checkbox :class="{'checked':item.choice}" @click="select(item)" :value="!!item.choice">
                <zlAvatar :name="item.name" :avatar="item.avatar"></zlAvatar>
                <p>
                  <span>{{item.name}}</span>
                  <span>{{ item.positionList.length?item.positionList[0].name:"--" }}</span>
                </p>
              </van-checkbox>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--footer-->
    <div class="footer">
      <div class="shopping" @click="selectData.length?selectList():null">
        <span>已选择：</span>&ensp;
        <span>{{num()}}人</span>
        <van-icon name="arrow" />
      </div>
      <div class="btn-box">
        <van-button type="default" class="clear-btn" @click="clear">清 空</van-button>
        <van-button type="primary" class="submit-btn" @click="submit">确 定</van-button>
      </div>
    </div>
    <!--已选择人员列表-->
    <div v-if="selectShow" class="selectList" >
      <flow-title :back="true" :title="'已选择'+num()+'人'" @back="back" />
      <div class="selectBox">
        <div v-if="selectData.filter(t=>t.staffs).length" :class="{'orgBox':true,'none':selectData.filter(t=>!t.staffs).length}">
          <div v-for="item in selectData.filter(t=>t.staffs)" :key="item.id" class="orgItem">
            <p>
              <span>
                <span>{{item.name}}</span>
                <span>&nbsp;({{item.staffCount}}人)</span>
              </span>
              <span>{{item.parentsName || '--'}}</span>
            </p>
            <span class="delete" @click="deleteItem(item.id)">移 除</span>
          </div>
        </div>
        <div class="userBox">
          <div v-for="item in selectData.filter(t=>!t.staffs)" :key="item.id" class="selectItem">
            <zlAvatar :name="item.name" :avatar="item.avatar"></zlAvatar>
            <p>
              <span>{{item.name}}</span>
              <span>{{item.positionList&&item.positionList.length?item.positionList[0].name:"--" }}</span>
              <span>{{item.parentsName || "--"}}</span>
            </p>
            <span class="delete" @click="deleteItem(item.id)">移 除</span>
          </div>
        </div>
      </div>
      <p class="listSubmit">
        <van-button type="primary" @click="back">确 定</van-button>
      </p>
    </div>
    <!--搜索页面-->        
    <div v-if="isSearch" class="searchDetail" >
      <flow-title :back="true" title="搜索人员" @back="searchBack" />
      <van-search class="autofocus" v-model="searchValue" @input="remoteMethod" placeholder="搜索"/>
      <div v-if="searchData.length&&searchValue" class="searchBox">
        <div  v-for="item in searchData" :key="item.id" class="searchItem">
          <van-checkbox :class="{'checked':item.choice}" @click="choose(item)" :value="item.choice">
            <div class="itemDetail">
              <zlAvatar :name="item.name" :avatar="item.avatar"></zlAvatar>
              <div>
                <p>
                  <span
                    v-for="(t,i) in name(item.name,searchValue)"
                    :key="i"
                    :class="{key:t===searchValue}"
                  >{{t}}</span>
                </p>
                <p >{{ item.spName || "--" }}</p>
                <p >{{ item.parentsName || "--" }}</p>
              </div>
            </div>
          </van-checkbox>
        </div>
      </div>
      <div v-else :class="{'searchBox':true,'null':true}">
        <div v-if="searchValue">
          <img src="../../../assets/icons/user.png" />
          <p >
            <span>找不到关于&nbsp;“</span>
            <span>{{searchValue}}</span>
            <span>”&nbsp;的联系人</span>
          </p>
        </div>
      </div>
      <!--footer-->
      <div class="footer">
        <div class="shopping" @click="selectData.length?selectList():null">
          <span>已选择：</span>&ensp;
          <span>{{num()}}人</span>
          <van-icon name="arrow" />
        </div>
        <div class="btn-box">
          <van-button type="default" class="clear-btn" @click="clear">清 空</van-button>
          <van-button type="primary" class="submit-btn" @click="submit">确 定</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  defaultOrg,
  currentOrg,
  headOrg,
  getAllUserById,
  getAllOrgById,
  getUserInfo,
  helpUser
} from "../../../api/api.js";
import zlAvatar from "./zl-avatar.vue"
import flowTitle from "./flowTitle.vue"
export default {
  name: 'user',
  props:['tags','checked','title'],
  components:{ zlAvatar, flowTitle },
  data() {
    return {
      //当前tab
      activeName:'1',
      //应用id
      appId:'',
      //已选择页面
      selectShow:false,
      //tabs页
      tabs:[
        { title: '按组织架构', name: '1' },
        { title: '所属部门', name: '2'}
      ],
      //面包屑
      breadcrumbs:[],
      //部门列表数据
      listOrgData:[],
      //人员列表数据
      listEntityData:[],
      //已选择数据
      selectData:[],
      //分部下级所有人员，部门信息
      allNextMsg:{},
      //搜索数据
      searchData:[],
      //搜索值
      searchValue:'',
      //控制搜索页面显示
      isSearch:false,
      //
      tab:true,
      historyBack:false
    }
  },
  mounted(){
    this.appId = localStorage.getItem('sysId')  || "",
    this.init()
    this.selectData = this.tags.concat([])
    this.isSideslip()
    document.querySelector(".user .search input").focus()
  },
  beforeDestroy(){
    !this.historyBack && this.$router.go(-1)
    window.removeEventListener("popstate", () => {}, false);
  },
  computed: {
    //控制面包屑显示
    bread(){
      let arr = this.breadcrumbs.slice(this.breadcrumbs.length-2)
      let index = arr.findIndex(v=>v.id === this.breadcrumbs[0].id)
      if(index===-1){
        return [{...this.breadcrumbs[0]}].concat(arr)
      }else{
        return arr
      }
    },
    //全选按钮监听
    all:{
      get(){
        if (!this.listOrgData.length && !this.listEntityData.length) return false
        return this.listOrgData.concat(this.listEntityData).every(t=>t.choice)
      },
      set(val){
        
      },
    }
  },
  methods:{
    isSideslip() {
      // 往历史记录里面添加一条新的当前页面的url
      history.pushState(null, null, document.URL);
      // 给 popstate 绑定一个方法 监听页面刷新
      window.addEventListener(
        "popstate",
        () => {
         this.historyBack = true
          this.$emit("back")
        },
        false
      );
    },
    //搜索页面选择事件
    choose(item){
      let data = this.searchData.concat([])
      data.forEach(t=>{
        if (t.id === item.id) {
          t.choice =! t.choice
          if (t.choice && this.checked ==='radio') {
            this.selectData = [{...t}]
          }else if(t.choice){
            this.selectData.push({...t})
          }else{
            if (this.selectData.findIndex(v=>v.id === item.id) !== -1) {
              this.deleteByIndex(item.id)
            }else{
              let id = new RegExp(`"id":"${t.id}"`)
              let flag = id.test(JSON.stringify(this.selectData))
              if (flag) {
                let data = this.selectData.filter(k=>id.test(JSON.stringify(k)))[0]
                this.deleteByIndex(data.id)
                this.listOrgData.forEach(l=>{
                  if (l.id === data.id) l.choice = false
                })
                let index = data.staffs.findIndex(v=>v.id===item.id)
                data.staffs.splice(index, 1)
                this.selectData.push(...data.staffs)
              }
            }
          }
          this.listEntityData.forEach(l=>{
            if (l.id === t.id) {
              l.choice = t.choice
            }else if(this.checked==='radio'){
              l.choice = false
            }
          })
        }else if(this.checked==='radio'){
          t.choice = false
        }
      })
      this.searchData = data
    },  
    //清空按钮
    clear(){
      this.selectData = []
      let data = this.listEntityData.concat([])
      let orgs = this.listOrgData.concat([])
      let search = this.searchData.concat([])
      data.forEach(t=>t.choice = false)
      orgs.forEach(t=>t.choice = false)
      search.forEach(t=>t.choice = false)
      this.listEntityData = data
      this.listOrgData = orgs
      this.searchData = search
    },
    //tab切换
    change(name){
      this.activeName = name
      this.init()
    },
    //点击列表项
    clickOrgItem(id,name){
      if (this.tab) this.tab = false 
      let index = this.breadcrumbs.findIndex(v=>v.id === id)
      if (name) {
        index===-1 && this.breadcrumbs.push({name,id})
      }else{
        this.breadcrumbs.splice(index+1)
      }
      this.defaultOrg(id)
    },
    //下级数据请求
    defaultOrg(id){
      this.listEntityData = []
      defaultOrg({pid:id},this.appId).then(res=>{
        if (!res.success) return
        this.listOrgData = res.data.org || []
        if (res.data.entity) {
          this.listEntityData = res.data.entity
        }
        this.selectData.forEach(t=>{
          for(let i=0;i<this.listOrgData.length;i++){
            if (this.listOrgData[i].id === t.id) this.listOrgData[i].choice = true
            continue
          }
          for(let i=0;i<this.listEntityData.length;i++){
            if (this.listEntityData[i].id === t.id) this.listEntityData[i].choice = true
            continue
          }
        })
      })
    },
    //初始化
    init(){
      if (!this.tab) this.tab = true
      this.listEntityData = []
      if (this.activeName === '1') {
        headOrg().then(res=>{
          if (!res.success) return
          this.breadcrumbs = [{name: res.data.name, id:'top'}]
        })
        currentOrg(this.appId).then(res=>{
          if (!res.success) return
          let data = res.data.org
          this.selectData.forEach(t=>{
            for(let i=0;i<data.length;i++){
              if (data[i].id === t.id) data[i].choice = true
              continue
            }
          })
          this.listOrgData = data
        })
      }else{
        getUserInfo(this.appId).then(res=>{
          if (!res.success) return
          this.breadcrumbs = [{name: res.data.orgName, id:res.data.orgId}]
          this.defaultOrg(res.data.orgId)
        })
      }
    },
    //根据id删除数组某一项
    deleteByIndex(id,arr){
      let c = arr ? arr : this.selectData
      let index = c.findIndex(v=>v.id===id)
      index!==-1 && c.splice(index,1)
    },
    //单击选中
    select(item, flag){
      let data = flag?this.listOrgData.concat([]):this.listEntityData.concat([])
      data.forEach(t=>{
        if (t.id === item.id) {
          t.choice = !t.choice
          if (this.checked==='radio'&&t.choice) {
            this.selectData = [{...t}]
          }else if(this.checked==='radio'){
            this.selectData = []
          }else if(t.choice){
            if (flag) {
              this.allNextMsg[t.id] = {staffs:[],orgs:[]}
              getAllUserById(t.id).then(res=>{
                if (!res.success) return
                this.allNextMsg[t.id].staffs.push(...res.data)
                res.data.forEach(v=>this.deleteByIndex(v.id))
              })
              getAllOrgById(t.id).then(res=>{
                if (!res.success) return
                res.data.forEach(v=>{
                  if(v.id!==t.id){
                    this.allNextMsg[t.id].orgs.push({name:v.name,id:v.id})
                    this.deleteByIndex(v.id)
                  }
                })
              })
              this.selectData.push({
                ...t,
                staffs:this.allNextMsg[t.id].staffs,
                orgs:this.allNextMsg[t.id].orgs
              })
            }else{
              this.selectData.push({...t})
            }
          }else{ 
            this.deleteByIndex(t.id)
          }
        }else if(this.checked==='radio'){
          t.choice = false
        }
      })
      if(flag){
        this.listOrgData = data
      }else{
        this.listEntityData = data
      }
    },
    //计算总人数
    num(){
      return this.selectData.filter(t=>t.staffCount!==0).reduce((p,n)=>p+(n.staffCount||1),0)
    },
    //控制显示已选择页面
    selectList(){
      this.selectShow = true
    },
    //关闭已选择页面
    back(){
      this.selectShow = false
    },
    //帮助框头部返回
    close(){
      this.$emit("back")
    },
    //已选页面移除事件
    deleteItem(id){
      this.deleteByIndex(id)
      let data = this.listEntityData.concat([])
      let orgs = this.listOrgData.concat([])
      data.forEach(t=>{
        if(t.id === id){
          t.choice = false
        }
      })
      orgs.forEach(t=>{
        if(t.id === id){
          t.choice = false
        }
      })
      this.listEntityData = data
      this.listOrgData = orgs
    },
    //确定提交事件
    submit(){
      let displayArr = []
      let defaultArr = this.selectData.concat([])
      defaultArr.length && this.selectData.forEach(t=>{
        if (t.staffs && t.staffs.length) {
          displayArr.push(...t.staffs)
          let index = defaultArr.findIndex(v=>v.id===t.id)
          index!==-1 && defaultArr.splice(index,1)
        }
      })
      this.selectData = defaultArr.concat(displayArr)
      this.$emit('getSelectData',this.selectData)
    },
    //全选
    selectAll(){
      let orgData = this.listOrgData.concat([])
      let entityData = this.listEntityData.concat([])
      if (!this.all) {
        orgData.forEach(t=>{
          let index = this.selectData.findIndex(v=>v.id===t.id)
          if(index===-1){
            this.allNextMsg[t.id] = {staffs:[],orgs:[]}
            t.choice = true
            getAllUserById(t.id).then(res=>{
              if (!res.success) return
              this.allNextMsg[t.id].staffs.push(...res.data)
                res.data.forEach(v=>this.deleteByIndex(v.id))
            })
            getAllOrgById(t.id).then(res=>{
              if (!res.success) return
              res.data.forEach(v=>{
                if(v.id!==t.id){
                  this.allNextMsg[t.id].orgs.push({name:v.name,id:v.id})
                  this.deleteByIndex(v.id)
                }
              })
            })
            this.selectData.push({
              ...t,
              staffs:this.allNextMsg[t.id].staffs,
              orgs:this.allNextMsg[t.id].orgs
            })
          }
        })
        entityData.forEach(t=>{
          let index = this.selectData.findIndex(v=>v.id===t.id)
          if(index===-1){
            t.choice = true
            this.selectData.push({...t})
          }
        })
      }else{
        orgData.forEach(t=>{
          t.choice = false
          this.deleteByIndex(t.id)
        })
        entityData.forEach(t=>{
          t.choice = false
          this.deleteByIndex(t.id)
        })
      }
      this.listOrgData = orgData
      this.listEntityData = entityData
    },
    //搜索事件
    remoteMethod(value){
      if(value){
        helpUser({ name: value },this.appId).then(res=>{
          if (!res.success) return
          let data = res.data.filter(t=>t)
          data.forEach(t=>{
            let id = new RegExp(`"id":"${t.id}"`)
            let flag = id.test(JSON.stringify(this.selectData))
            if (flag) t.choice = true
          })
          this.searchData = data
        })
      }
    },
    //搜索名字匹配蓝色
    name(a,b){
      let v = []
      let arr = a.split(b)
      if (arr.length===1) return arr
      if (!arr[0]){
        v = [this.searchValue, arr[1]]
      } else if (!arr[1]) {
        v = [arr[0], this.searchValue]
      } else {
        v= [arr[0], this.searchValue, arr[1]]
      }
      return v
    },
    //打开搜索页面
    search(){
      this.isSearch = true
      this.searchData = []
      this.searchValue = ''
      this.$nextTick(()=>{
        document.querySelector(".autofocus input").focus()
      })
    },
    //关闭搜索页面
    searchBack(){
      this.isSearch = false
      this.listOrgData = this.listOrgData.concat([])
    }
  }
}
</script>
