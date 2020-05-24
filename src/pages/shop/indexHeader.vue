<template>
  <div class="shop-header">
     <header class='shop-header__item'>
        <div class="shop-header__item__icon" @click="$router.go(-1)">
          <i class="iconfont icon-xiangzuo"></i>
        </div>
        <div class="shop-header__item__text">
            <span class="shop-header__item__text__title"></span>
        </div>
        <div class="shop-header__item__right"></div>
    </header>
    <div class="shop-header__pic">
      <img :src="showPicUrl+$route.query.image_path" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopHeader',
  data() {
    return {
      showPicUrl: 'https://elm.cangdu.org/img/',
    };
  },
};
</script>
<style lang="scss" scoped>
 @import '../../style/commonStyle.scss';

.shop-header{
    @include wh(100%,26.726248vw);
    background:url('../../assets/images/fangyi.png');
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    &__item{
      display: flex;
      @include wh(100%,95px);
      &__icon{
        .icon-xiangzuo{
          @include sc(55px,$fc);
          margin: 0px 23px;
        }
      }
      &__text{
        width: 60%;
        height: inherit;
        @include fj();
        justify-content: center;
        font-size: .8rem;
        color: $fc;
        font-weight: 700;
      }
      &__icon,&__right{
        width: 20%;
        height: inherit;
        @include fj();
      }
    }
    &__pic{
      width:250px;
      height: 250px;
      background: #000;
      position: absolute;
      z-index: 10;
      left: 50%;
      transform: translate(-50%,14%);
      border-radius:20px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
}
</style>
