<template>
  <div class="home-header">
      <div class="home-header__item">
        <router-link :to="'/city'" class="home-header__item__positioning" >
          <i class="iconfont icon-dingwei"></i>
        </router-link>
        <span class="home-header__item__name">{{ headerName }}</span>
        <span class="home-header__item__down">
          <i class="iconfont icon-xiangxia"></i>
        </span>
      </div>
      <div class="home-header__inp">
          <input type="text" class="iconfont search" :placeholder="icon"
            @click="$router.push({ name:'searchIndex',
              query:{ geohash:itemGeohash }})">
      </div>
  </div>
</template>

<script>
import { getStore } from '../../config/mStorage';

export default {
  name: 'homeHeader',
  data() {
    return {
      icon: '\ue60c 搜索商家、商品名称',
      guessCity: '', // 当前城市
      headerName: '', // 城市的名称
      itemGeohash: this.$route.query.geohash,
    };
  },
  created() {
    this.city();
    this.initData();
  },
  methods: {
    city() {
      this.$http.gitGuess()
        .then((res) => {
          this.guessCity = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    initData() {
      // 获取搜索历史记录
      if (getStore('queryDataList')) {
        // eslint-disable-next-line prefer-destructuring
        this.headerName = JSON.parse(getStore('queryDataList'))[2];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-header{
  width: 100%;
  background: #0097FE;
  height: 210px;
  position: fixed;
  z-index: 10;
  top: 0px;
  &__item{
    display: flex;
    height: 103px;
    &__positioning,&__name,&__down{
      display: block;
      height: 103px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
    }
    &__positioning{
      text-decoration: none;
      font-size: 32px;
      padding: 0px 10px 0px 28px;
      .icon-dingwei{
        font-size: 33px;
      }
    }
    &__name{
      font-size:35px;
      font-weight: 800;
    }
    &__down{
      width: 10px;
      font-size: 7px;
      padding: 0px 0px 0px 11px;
    }
  }
  &__inp{
    width: 100%;
    height: 86px;
    display: flex;
    justify-content: center;

  }
  &__inp>input{
    width: 90%;
    height: 73px;
    outline: none;
    border: none;
    border-radius:3px ;
    font-size: 27px;
    display: flex;
    justify-content: center;
    text-align: center;
    color:#9E9E9E ;
  }

}
</style>
