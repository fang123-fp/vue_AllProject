<template>
  <div class="search-index">
    <!-- 搜索头部 -->
    <search-header head-title="搜索"></search-header>
    <!-- 搜索框 -->
    <search-inp></search-inp>
    <!-- 导航栏 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import searchHeader from '../../components/heaher/header.vue';
import searchInp from './searchInp.vue';
import footerNav from '../../components/footer/footerNav.vue';

export default {
  name: 'searchIndex',
  components: {
    searchHeader,
    searchInp,
    footerNav,
  },
};
</script>
<style lang="scss" scoped>
.search-index{
  width: 1242px;
  background-color: #F5F5F5;
}
</style>
