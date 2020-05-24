<template>
  <div>
    <header class="shop-title">
      <div class="shop-title__title">
        <span class="shop-title__title__text">{{ $route.query.name }}</span>
        <i class="iconfont icon-arrow_right"  @click="$router.go(-1)"></i>
      </div>
      <div class="shop-title__evaluation">
        <span >评价{{ $route.query.rating }}</span>
        <span class="shop-title__evaluation__item">月售{{ $route.query.recent_order_num }}单</span>
        <span>蜂鸟快送约{{ $route.query.order_lead_time }}</span>
      </div>
      <div class="shop-title__label" v-show="splitValueList !== undefined && splitValueList.length > 0">
          <span class="shop-title__label__item" v-for="(item,index) in splitValueList" :key="index">{{ item }}</span>
          <!-- <span class="shop-title__label__item shop-title__label__discount">15减8</span>
          <span class="shop-title__label__item">15减8</span>
          <span class="shop-title__label__item shop-title__label__lastDiscount">15减8</span> -->
          <span class="shop-title__label__dicCount" >
            {{ splitValueList.length }}个优惠<i class="iconfont icon-xiangxia" @click="isShowDiscount"></i>
          </span>
      </div>
      <div class="shop-title__announcement">
        公告：{{ $route.query.promotion_info }}
      </div>
      <van-action-sheet v-model="show" class="action-sheet"  title="优惠活动" :round="false" >
        <div class="content">
          <div class="content_item" v-for="item in restaurantDetailsList.activities" :key="item._id">
            <span>{{ item.name }}</span>
            <span>{{ item.description }}</span>
          </div>
        </div>
      </van-action-sheet>
    </header>
  </div>

</template>

<script>
export default {
  name: 'shopTitle',
  data() {
    return {
      restaurantDetailsList: [], // 餐馆详情
      splitValueList: [], // 分割的值
      show: false,
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
          this.splitValueList = res.data.activities[0].description.split('，');
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    isShowDiscount() {
      this.show = !this.show;
    },
  },
};
</script>
<style lang="scss" scoped>
.shop-title{
  width: 100%;
  height: 350px;
  margin-top: 50px;
  &__title{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 38px;
    color: #333333;
    font-weight: 800;
    &__text{
      height: 78px;
      line-height:78px;
    }
    .icon-arrow_right{
      font-size: 20px;
      color: #545454;
    }
  }
  &__evaluation{
    width: 100%;
    height: 50px;
    font-size: 21px;
    color: #767676;
    display: flex;
    justify-content: center;
    &__item{
      margin: 0px 29px;
    }

  }
  &__label{
    height:53px;
    font-size: 19px;
    color: #FF634E;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    &__item{
      padding:5px 9px;
      border: 1px solid;
      margin-left: 11px;
    }
    &__discount{
      margin: 0px 10px;
    }
    &__lastDiscount{
      margin: 0px 108px 0px 10px;
    }
    &__dicCount{
      color: #999;
      margin-left: 108px;
      .icon-xiangxia{
        margin-left: 9px;
      }
    }
  }
  &__announcement{
    width: 100%;
    height: 68px;
    margin-top: 25px;
    font-size: 21px;
    color: #999999;
    text-align: center;
  }
  .action-sheet{
    position: absolute;
    z-index: 100001;
    .content{
      height: 500px;
      .content_item{
        width: 100%;
        span:nth-child(1){
          font-size: 20px;
          color: #FE4F37;
          padding: 6px 9px;
          border: 2px solid #FFC9C1;
          margin: 28px 10px 0px 52px;
        }
        span:nth-child(2){
          font-size: 20px;
          color: #666666;
        }
      }
    }
  }
}
</style>
