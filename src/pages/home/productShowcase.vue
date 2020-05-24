<template>
   <div class="productShowcase">
      <div class="index-film" v-for="(item,index) in shouList" :key="index"
          @click="$router.push({ path:'/shop',
              query:{ id:item.id,
                      image_path:item.image_path,
                      name:item.name,
                      rating:item.rating,
                      distance:item.distance,
                      recent_order_num:item.recent_order_num,
                      order_lead_time:item.order_lead_time,
                      promotion_info:item.promotion_info,
                      tips:item.piecewise_agent_fee.tips,
                    }})">
              <div class="index-film__pic">
                <img :src="showPicUrl+item.image_path" alt=""
                class="index-film__pic__img"/>
              </div>
              <div class="index-film__text">
                <div class="index-film__text__title">
                  <span class="index-film__text__title__brand">品牌</span>
                  <span class="index-film__text__title__title">{{ item.name}}</span>
                  <span class="index-film__text__title__some">···</span>
                </div>
                <div class="index-film__text__score">
                    <van-rate v-model="item.rating" size="10px" color="#FFD101" allow-half readonly />
                    <span class="index-film__text__score__color">{{ item.rating }}</span>
                    <span class="index-film__text__score__howPeople">
                      月售{{ item.recent_order_num }}单
                    </span>
                    <span class="index-film__text__score__Dada">
                      {{ item.delivery_mode.text}}</span>
                </div>
                <div class="index-film__text__director">
                    <span class="index-film__text__director__star">
                      ￥{{item.float_minimum_order_amount}}起送
                    </span>
                    <span class="index-film__text__director__item">
                      {{ item.piecewise_agent_fee.tips}}
                    </span>
                    <div class="index-film__text__director__div">
                      <span class="index-film__text__director__item__div__date">
                        {{ item.distance}}
                      </span>
                      <span>|</span>
                      <span class="index-film__text__director__item__div__kilometer">
                        {{ item.order_lead_time }}
                      </span>
                    </div>
                </div>
              </div>
      </div>
   </div>
</template>

<script>
import { getStore } from '../../config/mStorage';

export default {
  name: 'productShowcase',
  data() {
    return {
      shouList: [],
      showPicUrl: 'https://elm.cangdu.org/img/',
      /* value: 4.7, */
    };
  },

  created() {
    this.shopping();
  },
  methods: {
    shopping() {
      this.$http.gitRestaurants({
        latitude: JSON.parse(getStore('queryDataList'))[0],
        longitude: JSON.parse(getStore('queryDataList'))[1],
      })
        .then((res) => {
          this.shouList = res.data;
        }).catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.productShowcase{
  width: 100%;
  height: 6100px;
}
.index-film{
  width: 98%;
  height: 235px;
  margin-top: 60px;
  display: flex;
  border-bottom: 1px dashed #F6F6F6;
  margin-left: 2%;
  &__pic{
    width: 18%;
    height: inherit;
    display: flex;
    justify-content: center;
    &__img{
      width: 180px;
      height: 180px;
    }
  }
  &__text{
    width: 80%;
    height: inherit;

    &__title{
      width: 100%;
       height: 50px;
       font-size: 45px;
       color: #333333;
       font-weight: 800;
       padding: 10px 0px 0px;
       position: relative;
       &__brand{
         padding: 8px 7px;
         background-color: #FEEB26;
         color: #6F3F15;
         font-size: 20px;
         border-radius:5px ;
       }
       &__title{
         margin: 0px 0px 0px 11px;
       }
       &__some{
         position: absolute;
         right: 30px;
       }
    }
    &__score{
      width: 100%;
      height: 100px;
      position: relative;
      display: flex;
      align-items: center;
      .icon-dianpingxingxing,.icon-banxingxing{
        font-size: 22px;
        color: #FFD101;
        display:inline-block;
        vertical-align:4px;
      }
      &__color,&__howPeople{
        font-size: 34px;
      }
      &__color{
        color: #FFA150;
        margin-left: 12px;
      }
      &__howPeople{
        color: #676767;
        margin-left: 24px;
      }
      &__Dada{
         padding: 6px 6px;
         background-color: #0297FF;
         color: #F5FBFF;
         font-size: 20px;
         border-radius:4px ;
         position: absolute;
         right: 23px;
         top:25%;
      }
    }
    &__director{
      width: 100%;
      height: 71px;
      font-size: 33px;
      color: #707070;
      position: relative;
      &__item,&__star{
        font-size: 22px;
        color: #666666;
        padding: 0px 10px;

      }
      &__star{
          border-right:2px solid #DFDFDF;
      }
      &__div{
        height:20px;
        position: absolute;
        top: 0px;
        right: 20px;
        &__date,&__kilometer{
          padding: 0px 12px;
          color: #999999;
          font-size: 20px;
        }
      }
    }
  }
}

</style>
