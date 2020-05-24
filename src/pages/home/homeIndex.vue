<template>
  <div class="home-index">
    <!-- 首页头部 -->
    <home-header></home-header>
    <!-- 服务列表 -->
    <server-list></server-list>
     <!-- 推荐商家 -->
    <home-rm></home-rm>
    <!-- 导航栏 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import homeHeader from './homeHeader.vue';
import serverList from './serverList.vue';
import homeRm from './homeRm.vue';
import footerNav from '../../components/footer/footerNav.vue';

export default {
  name: 'homeIndex',
  components: {
    homeHeader,
    serverList,
    homeRm,
    footerNav,
  },
};
</script>
<style lang="scss" scoped>
.home-index{
  width: 1242px;
}

</style>
