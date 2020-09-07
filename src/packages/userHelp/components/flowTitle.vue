<template>
  <div class="flow-title" >
    <van-nav-bar :left-arrow="is_left_arrow" @click-left="Back">
      <div slot="title" class="title-content" >{{title}}</div>
    </van-nav-bar>
  </div>
</template>
<script>

export default {
  name: 'flow-title',
  components: {},
  props: {
    is_left_arrow: {
      default: true
    },
    title: {
      default: ''
    },
    back: {
      default: false
    }
  },
  data() {
    return {
      clickTime: 0
    };
  },
  computed: {},
  created() { },
  mounted() {
  },
  methods: {
    Back() {
      this.back == true ? this.$emit('back') : this.$router.go(-1);
    },
  }
};
</script>
<style lang="scss" scoped>
$rem: 26.67vw;
.flow-title {
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 998;
  ::v-deep .van-nav-bar {
    .van-nav-bar__title {
      max-width: 100%;
      .title-content {
        width: 3*$rem; // 为了顶部双击回滚到顶部，增加到指定宽度
      }
    }
  }
}
</style>
<style lang="scss">
$rem: 26.67vw;
.flow-title .van-nav-bar{
  height: 0.45*$rem;
  line-height:0.45*$rem;
  .van-icon {
    color: #555;
    font-size: 0.23*$rem;
  }
}

</style>