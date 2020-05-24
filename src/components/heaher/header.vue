<template>
  <div class="search-header">
     <header class='search-header__item'>
        <div class="search-header__item__icon" @click="$router.go(-1)">
          <i class="iconfont icon-xiangzuo"></i>
        </div>
        <div class="search-header__item__text">
            <span class="search-header__item__text__title">{{headTitle}}</span>
        </div>
        <div class="search-header__item__right"></div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'searchHeader',
  props: ['headTitle'],
};
</script>
<style lang="scss" scoped>
 @import '../../style/commonStyle.scss';

.search-header{
    background-color:#0096FF;
    @include wh(100%,150px);
    position: fixed;
    z-index: 10001;
    left: 0;
    top: 0;
    &__item{
      display: flex;
      @include wh(100%,150px);
      &__icon{
        .icon-xiangzuo{
          @include sc(60px,$fc);
          margin: 0px 23px;
        }
      }
      &__text{
        width: 60%;
        height: inherit;
        @include fj();
        justify-content: center;
        font-size:40px;
        color: $fc;
        font-weight: 700;
      }
      &__icon,&__right{
        width: 20%;
        height: inherit;
        @include fj();
      }
    }
}
</style>
