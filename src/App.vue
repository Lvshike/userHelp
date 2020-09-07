<template>
  <div id="app" >
    <button @click="handleClick">提交</button>
    <userHelp @getSelectData="ddd" @goHide="d" v-if="show" :dataInfo="dataInfo"></userHelp>
  </div>
</template>
<script>
export default {
  name: "app",
  data(){
    return {
      show:false,
      dataInfo:{
        value:[],
        name:'lalalla'
      }
    }
  },
  methods: {
    handleClick(){
      this.show = true
    },
    d(){
      this.show = false
    },
    ddd(tag){
      console.log(tag,"d")
      this.show = false,
      this.dataInfo.value = tag
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
