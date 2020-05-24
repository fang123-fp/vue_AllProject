<template>
    <div class="city-header">
        <div class="city-header__item city-header__left" @click="$router.go(-1)">
          <i class="iconfont icon-xiangzuo"></i>
        </div>
        <div class="city-header__item city-header__center">{{ $route.query.CityName }}</div>
        <div class="city-header__item city-header__right"
          @click="$router.push({ path:'/'})">切换城市</div>
    </div>
</template>
<script>
export default {
  name: 'cityHeader',
};
</script>

<style lang="scss" scoped>
.city-header{
  width: 1242px;
  height: 120px;
  background-color: #3190E8;
  display: flex;
  color: #FFFFFF;
  position: fixed;
  top: 0px;
  z-index: 10;
  &__item{
    width: 60%;
    display: flex;
    font-size: 50px;
    font-weight: 800;
  }
  &__center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__left,&__right{
    width: 20%;
  }
  &__left{
    .icon-xiangzuo{
      font-size: 27px;
      display: flex;
      align-items: center;
      margin-left: 20px;
      font-size:50px;
    }
  }
  &__right{
    font-size: 45px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
