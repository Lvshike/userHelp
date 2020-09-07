
<template>
  <div class="header">
    <img class="avatar-img" v-if="!isText" :src="avatar" />
    <span v-else class="avatar-text">{{text}}</span>
  </div>
</template>
<script>
export default {
  name: "zlAvatar",
  props: {
    name: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isText: false,
      text: ""
    };
  },
  watch: {
    name: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.rendAvatar();
      },
      deep: true //true 深度监听
    }
  },
  methods: {
    rendAvatar() {
      //默认为原名称
      let text = this.name;
      let pattern = new RegExp("[\u4E00-\u9FA5]+");

      if (this.avatar == null || this.avatar.indexOf("http") < 0 || this.avatar == '') {
        //为中文并且超过2个汉字
        if (pattern.test(this.name) && this.name.length >= 2) {
          text = this.name.substr(this.name.length - 2);
        }
        //为英文
        if (!pattern.test(this.name)) {
          //两个单词
          if (this.name.indexOf(" ") > -1) {
            let arr = this.name.split(" ");
            text = arr[0].substr(0, 1) + arr[1].substr(0, 1);
          } else {
            //1个单词
            text = this.name.substr(0, 2);
          }
        }
        this.text = text;
        this.isText = true;
      }else{
        this.isText = false;
      }
    }
  },
  mounted() {
    this.rendAvatar();
  }
};
</script>
<style lang="scss" scoped>
$rem: 26.67vw;
.header {
  height: 0.4*$rem;
  .avatar-img {
    width: 0.4*$rem;
    height: 0.4*$rem;
    margin-right: 0.035$rem;
    border-radius: 50%;
  }
  .avatar-text {
    float: left;
    text-align: center;
    font-size: 0.13*$rem;
    letter-spacing: 2px;
    width: 0.4*$rem;
    height: 0.4*$rem;
    line-height: 0.4*$rem;
    border-radius: 50%;
    background-color: #3296fb;
    color: #fff;
    margin-right:0.035$rem;
  }
}
</style>