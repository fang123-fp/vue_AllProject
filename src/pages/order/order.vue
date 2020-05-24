<template>
  <div class="order">
    <!--头部 -->
    <header-title head-title="我的订单"></header-title>
    <div class="redEnvelope-warp__contenter">
          <div class="redEnvelope-warp__contenter__item">
            <div class="redEnvelope-warp__contenter__item__left">
                <span></span>
            </div>
            <div class="redEnvelope-warp__contenter__item__center">
              <div class="redEnvelope-warp__contenter__item__center__top">
                  <div class="redEnvelope-warp__contenter__item__center__top__title">
                      <div class="redEnvelope-warp__contenter__item__center__top__title__titleName">
                        放散阀<i class="iconfont icon-xiangyou"></i>
                      </div>
                      <div class="redEnvelope-warp__contenter__item__center__top__title__date">2017-3-5 23:59</div>
                  </div>
                  <div class="redEnvelope-warp__contenter__item__center__top__IsAround">
                    <span>已送达</span>
                  </div>
              </div>
              <div class="redEnvelope-warp__contenter__item__center__bottom">
                <div class="redEnvelope-warp__contenter__item__center__bottom__contenter">
                    <span>和路雪梦龙红覆盆子口味冰淇淋制品...</span>
                    <span>￥23.5</span>
                </div>
                <div class="redEnvelope-warp__contenter__item__center__bottom__button">
                    <span>送祝福</span>
                    <span>再来一单</span>
                </div>
              </div>
            </div>
          </div>
    </div>
    <div class="order__history">
      <span>查看三个月前的外卖订单</span>
      <i class="iconfont icon-down2"></i>
    </div>
    <!-- 导航栏 -->
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import footerNav from '../../components/footer/footerNav.vue';
import headerTitle from '../../components/heaher/header.vue';

export default {
  name: 'order',
  components: {
    footerNav,
    headerTitle,
  },
};
</script>

<style lang="scss" scoped>
.redEnvelope-warp{
  width: 100%;
  height: 2208px;
  background-color: #F5F5F5;
  &__contenter{
     margin-top: 200px;
    &__item{
      width: 95%;
      height:300px;
      background-color: #fff;
      border-radius: 15px;
      margin:0px auto;
      display: flex;
      &__left{
        width:10%;
        height: inherit;
        display: flex;
        justify-content: center;
        margin-top: 30px;
        span{
          width:67px;
          height:67px;
          display: block;
          border-radius:10px;
          background-color: red;
        }
      }
      &__center{
        width:88%;
        &__top{
          width: 100%;
          height: 120px;
          display: flex;
          border-bottom: 2px  dashed #E9E9E9;
          &__title{
            width: 50%;
            height: 120px;
            &__titleName{
              font-size:26px ;
              color: #000;
              font-weight: bold;
              margin: 30px 0px 8px;
              .icon-xiangyou{
                font-size:18px ;
                margin-left: 35px;
                color: #797979;
              }
            }
            &__date{
              font-size: 17px;
              color: #868686;
            }
          }
          &__IsAround{
            width: 50%;
            height: inherit;
            display: flex;
            align-items: center;
            position: relative;
            span{
                position: absolute;
                right: 0px;
                font-size:22px ;
                color: #373737;
            }
          }
        }
        &__bottom{
          height: 170px;
          &__contenter{
            position: relative;
            width: 100%;
            display: flex;
            padding: 27px 0px 10px 0px;
            align-items: center;
            span:nth-child(1){
              font-size: 32px;
              color: #343434;
              .icon-down2{
                margin-left: 24px;
                font-size: 16px;
              }
            }
            span:nth-child(2){
              font-size: 19px;
              color: #282828;
              position: absolute;
              right: 0px;
            }
          }
          &__button{
            position: relative;
            span{
              font-size: 21px;
              color: #494949;
              padding:17px 23px;
              border: 2px solid #DDDDDD;
              border-radius:10px ;
            }
            span:nth-child(1){
              position: absolute;
              right: 225px;
            }
            span:nth-child(2){
              position: absolute;
              right: 0px;
              color: #01A6FF;
              border: 2px solid;
            }
          }
        }
      }
   }
  }
}
.order__history{
  font-size: 25px;
  color: #7F7F7F;
  width: 100%;
  height:109px ;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-down2{
    margin-left: 15px;
  }
}
</style>
