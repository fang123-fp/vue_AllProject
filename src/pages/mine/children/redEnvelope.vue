<template>
  <div class="redEnvelope-warp">
      <header-title headTitle="红包卡券"></header-title>
      <div class="redEnvelope-warp__title ">
        <span :class="{'active': value === index}" @click="clickRedenvelope(index)" v-for="(item,index) in isShowCollectTitle" :key="index">{{ item }}</span>
      </div>
      <div class="redEnvelope-warp__contenter">
          <div class="redEnvelope-warp__contenter__item" v-for="item in UsePromotionList" :key="item.id">
            <div class="redEnvelope-warp__contenter__item__left">
              <span></span>
            </div>
            <div class="redEnvelope-warp__contenter__item__center">
              <div class="redEnvelope-warp__contenter__item__center__top">
                <div class="redEnvelope-warp__contenter__item__center__top__pic">
                    <span></span>
                </div>
                <div class="redEnvelope-warp__contenter__item__center__top__center">
                  <div class="redEnvelope-warp__contenter__item__center__top__center__top">
                    <div class="coupon-title">{{ item.name }}</div>
                    <div class="coupon-money">
                      <span class="coupon-money__symbol">￥</span>
                      <span>{{ item.sum_condition }}</span>
                    </div>
                  </div>
                  <div class="redEnvelope-warp__contenter__item__center__top__center__bottom">
                     <span>{{item.begin_date }} 00:00-{{ item.end_date  }} 23:59</span>
                     <span>{{ item.description_map.sum_condition }}</span>
                  </div>
                </div>
              </div>
              <div class="redEnvelope-warp__contenter__item__center__buttom">
                <span>{{ item.description_map.online_paid_only }}<i class="iconfont icon-down2"></i></span>
                <span>去使用</span>
              </div>
            </div>
            <div class="redEnvelope-warp__contenter__item__right">
              <span></span>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import headerTitle from '../../../components/heaher/header.vue';
import { getStore } from '../../../config/mStorage';

export default {
  name: 'redEnvelope',
  components: {
    headerTitle,
  },
  data() {
    return {
      userId: JSON.parse(getStore('userInfo')).data.user_id,
      UsePromotionList: [],
      isShowCollectTitle: ['最新领购', '即将到期'],
      value: 0, // 数组下标
    };
  },
  created() {
    this.UsePromotion();
  },
  methods: {
    // 可用红包
    UsePromotion() {
      this.$http.gitUsePromotion({
        user_id: this.userId,
        limit: 50,
      })
        .then((res) => {
          this.UsePromotionList = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    // 过期红包
    UseExpired() {
      this.$http.gitUseExpired({
        user_id: this.userId,
        limit: 50,
      })
        .then((res) => {
          this.UsePromotionList = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    // 点击选项卡
    clickRedenvelope(id) {
      this.value = id;
      if (id === 0) {
        this.UsePromotion();
      } else {
        this.UseExpired();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.redEnvelope-warp{
  width: 100%;
  height: 2208px;
  background-color: #F5F5F5;
  &__title{
    width: 100%;
    height: 126px;
    background-color: #fff;
    margin-top: 150px;
    font-size: 46px;
    color: #808080;
    display: flex;
    align-items: center;
    font-weight: bold;
    span:nth-child(1){
      margin: 0px 88px 0px 56px;
    }

  }
  .active{
    color: #4AA4F8;
  }
  &__contenter{
     margin-top: 36px;
    &__item{
      width: 95%;
      height:362px;
      background-color: #fff;
      border-radius: 15px;
      margin:32px auto;
      display: flex;
      &__left{
        width:5%;
        height: inherit;
        position: relative;
        span{
          width:22px;
          height:42px;
          display: block;
          border-radius:0px 30px 30px 0px;
          background-color: #F5F5F5;
          position: absolute;
          top: 210px;
          left: 0px;
        }
      }
      &__right{
        width:5%;
        height: inherit;
        position: relative;
        span{
          width:11px;
          height:42px;
          display: block;
          border-radius:30px 0px 0px 30px;
          background-color: #F5F5F5;
          position: absolute;
          top: 210px;
          right:0px;
        }
      }
      &__center{
        width:90%;
        &__top{
          width: 100%;
          height: 231px;
          display: flex;
          border-bottom: 2px  dashed #E9E9E9;
          &__pic{
            width: 18%;
            height: inherit;
            display: flex;
            align-items: center;
            span{
              display: block;
              width: 154px;
              height: 154px;
              background-color: #49A3F8;
              border-radius:10px ;
            }
          }
          &__center{
            width: 82%;
            height: inherit;
            &__top{
              width: 100%;
              height: 120px;
              display: flex;
              .coupon-title{
                width: 80%;
                font-size: 48px;
                color: #000000;
                padding: 48px 0px 0px;
              }
              .coupon-money{
                width: 20%;
                color: #EB5940;
                position: relative;
                .coupon-money__symbol{
                  font-size: 10px;
                  position: absolute;
                  top: 50px;
                  right: 200px;
                }
                span:nth-child(2){
                  font-size: 100px;
                  font-weight: bold;
                  position: absolute;
                  top: 32px;
                  right: 74px;
                }
              }
            }
            &__bottom{
              width: 100%;
              height:120px ;
              position: relative;
              span{
                font-size: 20px;
                color: #7F7F7F;
              }
              span:nth-child(1){
                position: absolute;
                top: 28px;
                letter-spacing: -2px;
              }
              span:nth-child(2){
                position: absolute;
                right: 40px;
                top: 30px;
                font-size: 32px;

              }
            }
          }
        }
        &__buttom{
          position: relative;
          width: 100%;
          height: 131px;
          display: flex;
          align-items: center;
          span:nth-child(1){
            font-size: 32px;
            color: #7F7F7F;
            .icon-down2{
              margin-left: 24px;
              font-size: 16px;
            }
          }
          span:nth-child(2){
            font-size: 18px;
            color: #fff;
            padding: 22px 46px;
            border-radius:40px ;
            background-color: #EB5940;
            position: absolute;
            right: 0px;
          }
        }
      }
    }
  }

}
</style>
