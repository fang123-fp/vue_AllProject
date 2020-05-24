<template>
  <div class="login-header">
      <div class="login-header__item login-header__left" @click="$router.go(-1)">
        <i class="iconfont icon-xiangzuo"></i>
      </div>
      <div class="login-header__item login-header__center"><slot></slot></div>
      <div class="login-header__item login-header__right"></div>
  </div>
</template>

<script>
export default {
  name: 'loginHeader',
};
</script>
<style lang="scss" scoped>
.login-header{
  width: 1242px;
  height: 150px;
  background-color: #3190E8;
  display: flex;
  color: #FFFFFF;
  position: fixed;
  top: 0px;
  z-index: 10;
  &__item{
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: 800;
  }
  &__left,&__right{
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__left{
    .icon-xiangzuo{
      font-size: 38px;
    }
  }
  &__right{
    font-size: 29px;
    font-weight: 500;
  }
}
</style>
