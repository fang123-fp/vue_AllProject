<template>
  <div class="searchAddress">
    <header-title headTitle='搜索地址'></header-title>
    <!-- 搜索框 -->
    <div class="search-inp" >
      <input type="search" name="search" :placeholder="icon"
        class="iconfont search" v-model="searchValue">
        <div @click="searchNearby">搜索</div>
    </div>
    <!-- 搜索记录 -->
    <div class="cityListWarp" v-if="searchNearbyList !==undefined && searchNearbyList.length > 0">
        <ul class="cityListWarp-item">
            <li class="cityListWarp-item__liList" v-for="item in searchNearbyList" :key="item.geohash" @click="choooedAddress(item)">
                <span class="cityListWarp-item__liList__name">{{ item.name }}</span>
                <span class="cityListWarp-item__liList__address">{{ item.address }}</span>
            </li>
        </ul>
    </div>
    <!-- 未搜索 -->
    <div class="empty_tips" v-if="tipsIsShow">
        <p>找不到地址？</p>
        <p>尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号等）可稍后输入哦</p>
    </div>
    <!-- 无结果 -->
    <div class="empty_result" v-if="searchNearbyList.length === 0 && !tipsIsShow">没有找到该结果</div>
  </div>
</template>

<script>
import headerTitle from '../../../components/heaher/header.vue';
import { getStore } from '../../../config/mStorage';

export default {
  name: 'searchAddress',
  data() {
    return {
      icon: '\ue60c 请输入小区/写字楼/学校等',
      searchValue: '',
      city_id: JSON.parse(getStore('guessList')).id,
      searchNearbyList: [],
      tipsIsShow: true,
    };
  },
  methods: {
    searchNearby() {
      this.$http.gitSearchNearby({
        city_id: this.city_id,
        keyword: this.searchValue,
      })
        .then((res) => {
          this.searchNearbyList = res.data;
          this.tipsIsShow = false;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    choooedAddress(item) {
      this.$bus.$emit('IndexChanged', item);
      /*  this.$router.push({ path: '/confirmOrder/addAddress', query: { name: item.name, geohash: item.geohash } }); */
      this.$router.go(-1);
    },
  },
  components: {
    headerTitle,

  },
};
</script>

<style lang="scss" scoped>
  .searchAddress{
    width:1242px;
    height: 2208px;
    overflow: hidden;
    background-color: #fff;
    .search-inp{
      width: 98%;
      height:86px;
      overflow: hidden;
      padding:33px 0px 40px 23px;
      display: flex;
      margin-top: 150px;
      input{
        width: 1054px;
        height: 80px;
        border: none;
        outline: none;
        font-size: 23px;
        color: #757575;
        padding-left:15px;
        border-radius:5px ;
        background-color: #F5F5F5;
        border:2px solid #DDDDDD ;
        border-radius:4px ;
      }
      div{
        width: 109px;
        height: 80px;
        border: none;
        font-size: 25px;
        color: #fff;
        font-weight: 800;
        display: flex;
        line-height: 80px;
        background-color: #0197FF;
        justify-content: center;
        margin: 0px 25px;
        border-radius:5px ;
      }
    }
    .cityListWarp{
      .cityListWarp-item {
        padding: 0px;
        margin: 0px;
        &__liList{
          width: 98%;
          height: 115px;
          border-bottom:2px solid #e4e4e4;
          background: #fff;
          margin-left: 2%;
          &__link{
            text-decoration: none;
          }
          &__name {
            display: block;
            width: 100%;
            font-size: 27px;
            color: #333333;
            margin: 22px 0px 10px 0px;
          }
          &__address {
            width: 100%;
            display: block;
            font-size: 22px;
            color: #d1d1d1;
            margin: 0px 0px 29px 0px;
          }
        }
      }
    }
    .empty_tips{
      width: 100%;
      height: 200px;
      font-size: 35px;
      position: absolute;
      top: 40%;
        p{
          width: 100%;
          color: #aaa;
          text-align: center;
          line-height: 20px;
        }
    }
    .empty_result{
      width: 100%;
      height: 150px;

      text-align: center;
      color: #aaa;
      border-top:2px solid #E4E4E4;
    }
  }

</style>
