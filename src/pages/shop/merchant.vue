<template>
  <div class="order-evaluation__merchant">
      <div class="order-evaluation__merchant__deliveryInformation">
          <div class="order-evaluation__merchant__deliveryInformation__title">
            <span>配送信息</span>
          </div>
          <div class="order-evaluation__merchant__deliveryInformation__content">
            <span class="order-evaluation__merchant__deliveryInformation__content__distance">由商家配送提供配送，约{{ $route.query.order_lead_time }}送达， 距离{{ $route.query.distance }}</span>
            <span class="order-evaluation__merchant__deliveryInformation__content__deliveryFee">{{ tips }}</span>
          </div>
      </div>
      <div class="order-evaluation__merchant__merchantServices">
          <div class="order-evaluation__merchant__merchantServices__title">
            <span>商家服务</span>
          </div>
          <div class="order-evaluation__merchant__merchantServices__content">
            <div class="order-evaluation__merchant__merchantServices__content__distance" v-for="(item,index) in restaurantDetailsList.supports" :key="index">
              <span>{{ item.icon_name }}</span>
              {{ item.description }}
            </div>
           <!--  <div class="order-evaluation__merchant__merchantServices__content__deliveryFee">
              <span>票</span>
              该商家支持开发票，请在下单时填写好发票抬头
            </div> -->
          </div>
      </div>
      <div class="order-evaluation__merchant__realBusiness">
              <div class="order-evaluation__merchant__realBusiness__title">
                  <span>商家实景</span>
              </div>
              <div class="order-evaluation__merchant__realBusiness__pic">
                <div class="order-evaluation__merchant__realBusiness__pic__item">
                  <img src="../../assets/images/QQ.png" alt="">
                  <span>其他(1张)</span>
                </div>
                <div class="order-evaluation__merchant__realBusiness__pic__item">
                    <img src="../../assets/images/QQ.png" alt="">
                    <span>其他(1张)</span>
                </div>
                <div class="order-evaluation__merchant__realBusiness__pic__item">
                    <img src="../../assets/images/QQ.png" alt="">
                    <span>其他(1张)</span>
                </div>
                <div class="order-evaluation__merchant__realBusiness__pic__item">
                  <img src="../../assets/images/QQ.png" alt="">
                  <span>其他(1张)</span>
                </div>
              </div>
      </div>
      <div class="order-evaluation__merchant__information">
        <div class="order-evaluation__merchant__information__title">
          <span>商家信息</span>
        </div>
        <div class="order-evaluation__merchant__information__content">
          {{ promotion_info }}
            <!-- <span>比萨张专业的比萨外送店，外送产品全程保温，选用24小时</span>
            <span>以上的低温发酵面团，厨房通透、明亮、清洁，让您看得见</span>
            <span>所有产品制作的全过程，给您一个看得见的安心厨房，带你</span>
            <span>畅享手拍、无油的健康美味。</span> -->
        </div>
        <div class="order-evaluation__merchant__information__category">
          <span class="order-evaluation__merchant__information__category__title">品类</span>
          <span class="order-evaluation__merchant__information__category__titleName">{{ category }}</span>
        </div>
        <div class="order-evaluation__merchant__information__phone">
          <span class="order-evaluation__merchant__information__phone__title">联系电话</span>
          <span class="order-evaluation__merchant__information__phone__titleName">
            <a :href="'tel:' + phone">
               <i class="iconfont icon-dianhua"></i>
                联系商家
            </a>
          </span>
        </div>
        <div class="order-evaluation__merchant__information__adress">
          <div class="order-evaluation__merchant__information__adress__title">地址</div>
          <div class="order-evaluation__merchant__information__adress__titleName">
            {{ address }}
          </div>
        </div>
        <div class="order-evaluation__merchant__information__businessHours">
          <span class="order-evaluation__merchant__information__businessHours__title">营业时间</span>
          <span class="order-evaluation__merchant__information__businessHours__titleName">
           {{ opening_hours[0] }} - {{ opening_hours[1] }}
          </span>
        </div>
      </div>
      <div class="order-evaluation__merchant__businessQualification">
        <span class="order-evaluation__merchant__businessQualification__title">营业资质</span>
        <span class="order-evaluation__merchant__businessQualification__titleName">
          <i class="iconfont icon-xiangyou"></i>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'merchant',
  data() {
    return {
      restaurantDetailsList: [], // 餐馆详情
      tips: '', // 配送费
      address: '', // 地址
      phone: '', // 手机号
      category: '', // 快餐便当
      promotion_info: '', // 公告
      opening_hours: [], // 时间
    };
  },
  created() {
    this.restaurantDetails();
  },
  methods: {
    restaurantDetails() {
      this.$http.gitRestaurantDetails({
        shopid: this.$route.query.id,
      })
        .then((res) => {
          this.restaurantDetailsList = res.data;
          this.tips = res.data.piecewise_agent_fee.tips;
          this.address = res.data.address;
          this.phone = res.data.phone;
          this.category = res.data.category;
          this.promotion_info = res.data.promotion_info;
          this.opening_hours = res.data.opening_hours[0].split('/');
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/commonStyle.scss';
.order-evaluation__merchant{
  width: 100%;
  background-color: #F5F5F5;
  &__deliveryInformation{
    width: 100%;
    height:300px;
    border-bottom:1px solid #EEEEEE;
    background-color: #fff;
    &__title{
      padding: 38px 0px 42px 32px;
      span{
        font-size:28px;
        font-weight: 800;
        color: #000;
      }
    }
    &__content{
       &__distance,&__deliveryFee{
         @include sc(23px,#666);
         display: block;
      }
      &__distance{
         padding: 0px 0px 20px 32px;
      }
      &__deliveryFee{
         padding-left:32px;
      }
    }

  }
  &__merchantServices{
    width: 100%;
    border-bottom:1px solid #EEEEEE;
    background-color: #fff;
    margin-top: 20px;
    &__title{
      padding: 40px 0px 40px 32px;
      span{
        font-size:28px;
        font-weight: 800;
        color: #000;
      }
    }
    &__content{
       &__distance,&__deliveryFee{
         @include sc(23px,#666);
         display: block;
      }
      &__distance{
         margin: 0px 0px 47px 32px;
         span{
           padding: 5px 10px;
           border: 2px solid #999999;
           @include sc(21px,#999999);
         }
      }
      &__deliveryFee{
         padding-left:32px;
         span{
           padding: 5px 12px;
           border: 2px solid #999999;
           @include sc(21px,#999999);
         }
      }
    }

  }
  &__realBusiness{
    width: 100%;
    height:350px;
    border-bottom:1px solid #EEEEEE;
    background-color: #fff;
    margin-top: 25px;
    &__title{
      padding: 40px 0px 23px 32px;
      span{
        font-size:28px;
        font-weight: 800;
        color: #000;
      }
    }
    &__pic{
      width: 100%;
      margin:0px 40px 0px -42px;
      display: flex;
      justify-content: space-around;
      &__item{
        width: 180px;
        height: 180px;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        span{
          width: 180px;
          height: 36px;
          padding: 5px 10px;
          background-color: #232222;
          opacity: 0.7;
          font-size: 20px;
          color: #E9E8E8;
          position: absolute;
          bottom: 0px;
          left: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

  }
  &__information{
    width: 100%;
    background-color: #fff;
    &__title{
      padding: 40px 0px 40px 32px;
      span{
        font-size:28px;
        font-weight: 800;
        color: #000;
      }
    }
    &__content{
      width: 95%;
      height: 230px;
      margin:0px auto;
      font-size: 25px;
      color: #666666;
      border-bottom:1px solid #EEEEEE ;
      span{
        margin-top: 9px;
        display: block;
        letter-spacing: 4px;
      }
    }
    &__category{
      width: 97%;
      height: 95px;
      margin-left:3%;
      font-size: 25px;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom:1px solid #EEEEEE ;
      &__title{
        font-weight: 800;
      }
      &__titleName{
        color: #696969;
        position: absolute;
        right: 32px;
      }
    }
    &__phone{
      width: 97%;
      height: 98px;
      margin-left:3%;
      font-size: 25px;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom:1px solid #EEEEEE ;
      &__title{
        font-weight: 800;
      }
      &__titleName{
        a{
          color: #01A6FF;
          position: absolute;
          right: 32px;
          top: 30%;
        }
      }
    }
    &__adress{
      width: 97%;
      height: 125px;
      margin-left:3%;
      font-size: 25px;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom:1px solid #EEEEEE ;
      &__title{
        font-weight: 800;
        width: 30%;
      }
      &__titleName{
        width: 60%;
        text-align: right;
        position: absolute;
        right: 32px;
        @include sc(23px,#666666);
      }
    }
    &__businessHours{
      width: 97%;
      height: 93px;
      margin-left:3%;
      font-size: 25px;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom:1px solid #EEEEEE ;
      &__title{
        font-weight: 800;
      }
      &__titleName{
        color: #696969;
        position: absolute;
        right: 32px;
      }
    }

  }
  &__businessQualification{
      width: 100%;
      height: 104px;

      font-size: 25px;
      display: flex;
      align-items: center;
      position: relative;
      background-color: #fff;
      border-bottom:1px solid #EEEEEE ;
      margin-top: 23px;
      &__title{
        font-weight: 800;
        margin-left:32px;
      }
      &__titleName{
        color: #696969;
        position: absolute;
        right: 32px;
      }
    }

}

</style>
