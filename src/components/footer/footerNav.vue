<template>
  <div class="index-nav">
      <div class="index-nav__item" @click="$router.push({ path: '/home' })">
        <i :class="['iconfont icon-kugou index-nav__item__icon',{'itemActive':$route.path.indexOf('home') !== -1}]"></i>
        <span :class="['index-nav__item__a',{'itemActive':$route.path.indexOf('home') !== -1}]">首页</span>
      </div>
      <div class="index-nav__item" @click="$router.push({ path: '/search' })">
        <i :class="['iconfont icon-faxian index-nav__item__icon',{'itemActive':$route.path.indexOf('search') !== -1}]"></i>
        <span :class="['index-nav__item__a',{'itemActive':$route.path.indexOf('search') !== -1}]">发现</span>
      </div>
      <div class="index-nav__item" @click="$router.push({ path: '/order' })">
        <i :class="['iconfont icon-dingdan index-nav__item__icon',{'itemActive':$route.path.indexOf('order') !== -1}]"></i>
        <span :class="['index-nav__item__a',{'itemActive':$route.path.indexOf('order') !== -1}]">订单</span>
      </div>
      <div class="index-nav__item"  @click="$router.push({ path: '/mine' })">
        <i :class="['iconfont icon-wodedangxuan index-nav__item__icon',{'itemActive':$route.path.indexOf('mine') !== -1}]"></i>
        <span :class="['index-nav__item__a',{'itemActive':$route.path.indexOf('mine') !== -1}]">我的</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'footerNav',
  data() {
    return {
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.index-nav{
  width: 100%;
  border-top:2px solid #F1F1F1;
  display: flex;
  justify-content: space-around;
  padding: 21px 0px 12px 0px;
  position: fixed;
  bottom: 0px;
  background-color: #FFFFFF;
  &__item{
    width: 109px;
    height: 115px;
    text-align: center;
    cursor: pointer;
    &__icon{
      font-size: 50px;
      color: #818181;
    }
    &__a{
      width: inherit;
      display: block;
      color: #A7A7AB;
      font-size: 17px;
    }
  }
  .itemActive{
      color:#0598FF;
  }
 }
</style>
