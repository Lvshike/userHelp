<template>
  <div class="helpBox">
    <component 
      @getSelectData="getData" 
      :checked="choice" 
      :tags="selectData" 
      :is="type" 
      @back="back" 
      :title="dataInfo.name"
    ></component>
  </div>
</template>

<script>
import user from './components/user.vue';
import department from './components/department.vue';
import branch from './components/branch.vue';

export default {
  name: 'userHelp',
  props: {
    //接收的主要信息
    dataInfo: {
      type: Object,
      default: () => {
        return {
          value: []
        };
      }
    },
    //单选or多选
    choice: {
      type: String,
      default: 'checkbox'
    },
    //帮助框类型
    type: {
      type: String,
      default: 'user'
    },
    //所处位置，表单/子表/详情
    position: {
      type: String,
      default: 'form'
    }
  },
  components: {
    user,
    department,
    branch
  },
  data() {
    return {
      //已选择的数据
      selectData: [],
    };
  },
  created() {
    this.selectData = this.dataInfo.value && typeof this.dataInfo.value === 'string' ? JSON.parse(this.dataInfo.value) : this.dataInfo.value || [];
  },
  methods: {
    //关闭帮助框
    back() {
      this.$emit('goHide');
    },
    //获取选择的数据
    getData(data) {
      this.selectData = data.concat([]);
      for (let i = 0; i < data.length; i++) {
        data[i] = {
          name: data[i].name,
          id: data[i].id,
          avatar: data[i].avatar,
          positionList: data[i].positionList,
          parentsName: data[i].parentsName
        };
      }
      this.$emit('getSelectData', data);
    },
  },
};
</script>
<style lang="scss">
  @import '../../styles/index.scss';
</style>
