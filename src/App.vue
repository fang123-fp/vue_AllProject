<template>
  <div class="app">
    <van-loading type="spinner" size="24px" color="#1989fa" class="loading" v-show="vantLoadingIsShow">加载中...</van-loading>
        <!-- 被缓存的视图组件 -->
        <keep-alive include="homeIndex,addAddress">
          <router-view v-if="isRouterAlive"></router-view>
        </keep-alive>
  </div>
</template>
<script>

import { state } from './store/index';

export default {
  name: 'App',
  provide() { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, // 控制视图是否显示的变量
    };
  },
  computed: {
    vantLoadingIsShow() {
      return state.vantLoadingIsShow;
    },
  },
  methods: {
    reload() {
      this.isRouterAlive = false; // 先关闭
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },

};
</script>

<style lang="scss" scoped>
.app{
  width: 1242px;
  background-color: #F5F5F5;
  height: 2208px;
  overflow: hidden;
  .loading{
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}

</style>
