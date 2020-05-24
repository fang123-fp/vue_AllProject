<template>
  <div class="index-nearbyshops">
      <div class="index-nearbyshops__item">
          <div class="index-nearbyshops__item__top">
              <span class="index-nearbyshops__item__top__horizontalLine"></span>
              <span class="index-nearbyshops__item__top__span">推荐商家</span>
              <span class="index-nearbyshops__item__top__horizontalLine"></span>
          </div>
          <div class="index-nearbyshops__item__screen">
              <span class="index-nearbyshops__item__screen__store">综合排序
                <i class="iconfont icon-xiangxia"></i>
              </span>
              <span class="index-nearbyshops__item__screen__salesVolume">距离最近</span>
              <span class="index-nearbyshops__item__screen__distance">销量最高</span>
              <span class="index-nearbyshops__item__screen__icon">筛选
                 <i class="iconfont icon-shaixuan"></i>
              </span>
          </div>
      </div>
      <!-- 商品展示组件 -->
      <product-showcase></product-showcase>
  </div>
</template>

<script>
import productShowcase from './productShowcase.vue';

export default {
  name: 'homeRm',
  data() {
    return {};
  },
  components: {
    productShowcase,
  },
};
</script>
<style lang="scss" scoped>
.index-nearbyshops{
  width: 100%;
  background-color: #fff;
  &__item{
    width: 100%;
    background-color: #fff;
    border-radius: 50px 50px 0px 0px;
    margin-top:32px;
    &__top{
      width: 100%;
      height: 102px;
      display: flex;
      align-items: center;
      justify-content: center;
      &__span{
        font-size: 27px;
        color: #1A1A1A;
        margin: 0px 28px;
      }
      &__horizontalLine{
        width:40px;
        height: 2px;
        display: block;
        background-color: #999999;
      }
    }
    &__screen{
      width: 100%;
      height: 47px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &__store,&__salesVolume,&__distance,&__icon{
        font-size: 25px;
        color: #868686;
        &icon-xiangxia{
          font-size: 4px;
          color: #333333;
        }
      }
      &__icon{
        .icon-shaixuan{
          font-size: 20px;
          color: #666;
        }
      }
    }
  }
}
</style>
