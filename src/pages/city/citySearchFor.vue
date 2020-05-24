<template>
    <div>
      <div class="city-searchFor">
        <form action="">
          <div class="city-searchFor__inp">
            <input type="search" placeholder="输入学校、商务楼、地址"
              v-model="search.input" ref="inputVal" name="city">
          </div>
          <div class="city-searchFor__buttom" @click="postpois">提交</div>
        </form>
      </div>
      <!-- 搜索历史 -->
      <div class="city-searchHistory" v-if="historytitle">
          <div class="city-searchHistory__item">搜索历史</div>
      </div>
      <!-- 搜索结果 -->
      <div class="cityListWarp" v-show="getCityList !== undefined && getCityList.length > 0">
          <ul class="cityListWarp-item">
              <li v-for="(item, key) in getCityList" :key="key"
                      class="cityListWarp-item__liList"
                      @click="nextpage(key , item.geohash,item.latitude,item.longitude,item.name)">
                        <span class="cityListWarp-item__liList__name">{{ item.name }}</span>
                        <span class="cityListWarp-item__liList__address">{{ item.address }}</span>
              </li>
          </ul>
      </div>
      <!-- 清除结果 -->
      <div v-if="historytitle &&  (getCityList !== undefined && getCityList.length > 0)"
        class="clear_all_history"  @click="clearAll" >清空所有</div>
      <!-- 无结果 -->
       <div v-if="placeNone" class="city-noResult" >
         很抱歉！无搜索结果
      </div>
    </div>

</template>

<script>
import { Toast } from 'vant';
import { getStore, setStore, removeStore } from '../../config/mStorage';

export default {
  name: 'citySearchFor',
  data() {
    return {
      getCityList: [], // 城市列表
      historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
      placeNone: false, // 搜索无结果，显示提示信息
      placeHistory: [], // 历史搜索记录
      timer: null,
      search: {
        input: '',
        timer: null,
      },
      queryDataList: [], // 传的城市名称和经纬度

    };
  },
  created() {
    this.initData();
  },
  watch: {
    'search.input': {
      // eslint-disable-next-line no-unused-vars
      handler(value) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.searchValue();
        }, 1000);
      },
      deep: true,
    },
  },
  methods: {
    searchValue() {
      this.$http.gitSearch({
        type: 'search',
        city_id: this.$route.query.CityId,
        keyword: this.$refs.inputVal.value,
      })
        .then((res) => {
          this.getCityList = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    // 获取接口数据
    searchKeywords() {
      this.$http.gitSearch({
        type: 'search',
        city_id: this.$route.query.CityId,
        keyword: this.$refs.inputVal.value,
      })
        .then((res) => {
          this.getCityList = res.data;
          /* 判断历史和搜索是否显示 */
          this.historytitle = false;
          this.placeNone = !res.data.length;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    // 排序数组降序排列
    sortKey(array, key) {
      return array.sort((a, b) => {
        const x = a[key];
        const y = b[key];

        // eslint-disable-next-line no-nested-ternary
        return ((x > y) ? -1 : (x < y) ? 1 : -1);
      });
    },
    // 判断显示状态
    postpois() {
      // 输入值不为空时才发送信息
      if (this.$refs.inputVal.value) {
        this.searchKeywords();
      } else {
        // eslint-disable-next-line no-alert
        /* alert('请先输入查询的内容！！'); */
        Toast.fail({
          message: '请输入查询的内容！！',
          type: 'fail',
        });
      }
    },
    initData() {
      // 获取搜索历史记录
      if (getStore('placeHistory')) {
        this.getCityList = JSON.parse(getStore('placeHistory'));
      } else {
        this.getCityList = [];
      }
    },
    /* 判断是否有一样的记录
    *     没有  就添加
    *     有 就跳转页面
    */
    nextpage(index, geohash, latitude, longitude, name) {
      this.queryDataList.push(latitude, longitude, name);
      setStore('queryDataList', this.queryDataList);
      const history = getStore('placeHistory');
      const choosePlace = this.getCityList[index];
      choosePlace.Count = 0;
      if (history) {
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history);
        this.placeHistory.forEach((item, i) => {
          if (item.geohash === geohash) {
            this.placeHistory[i].Count += 1;
            checkrepeat = true;
          }
        });
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace);
          choosePlace.Count += 1;
        }
      } else {
        this.placeHistory.push(choosePlace);
        choosePlace.Count += 1;
      }
      const newPlaceHistory = this.sortKey(this.placeHistory, 'Count');
      setStore('placeHistory', newPlaceHistory);

      // 选择位置后点击跳转
      this.$router.push({
        name: 'homeIndex',
        query: {
          latitude: choosePlace.latitude,
          longitude: choosePlace.longitude,
          cityName: choosePlace.name,
          geohash: choosePlace.geohash,
        },
      });
    },
    // 清空所有
    clearAll() {
      removeStore('placeHistory');
      this.initData();
    },


  },

};
</script>

<style lang="scss" scoped>
@import '../../style/commonStyle.scss';
.city-searchFor{
  width: 100%;
  height: 240px;
  margin-top: 112px;
  background-color: #fff;
  border-top:2px solid #E4E4E4;
  border-bottom:2px solid #E4E4E4;
  &__inp{
    width: 90%;
    height: 90px;
    margin: 0px auto;
    margin-top: 25px;
    border-radius:7px;
    overflow: hidden;
  }
  &__inp>input{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 28px;
    color: #757575;
    padding-left:15px;
    border: 3px solid #E4E4E4;
  }
  &__buttom{
    width: 90%;
    height: 66px;
    background-color: #3190E8;
    border: none;
    font-size: 27px;
    text-align: center;
    line-height:66px ;
    margin: 27px auto;
    border-radius:7px ;
    color: #F3F8FD;
  }
   &__buttom>input{
     background-color:#3190E8 ;
     border: none;
     color: #F3F8FD;
     border: none;
     outline: none;
   }
}
.city-searchHistory{
  width: 100%;
  &__item{
    width: 90%;
    height: 50px;
    padding: 0px 0px 0px 43px;
    color: #333;
    font-size: 13px;
    display: flex;
    align-items: center;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
  }
}
.city-noResult{
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  font-size: 24px;
  background-color: #FFFFFF;
  text-indent: 45px;
}
.cityListWarp{
  .cityListWarp-item {
    padding: 0px;
    margin: 0px;
    &__liList{
      height: 180px;
      border-bottom:2px solid #e4e4e4;
      background: #fff;
      padding-left: 37px;
      &__link{
        text-decoration: none;
      }
      &__name {
        display: block;
        width: 100%;
        font-size: 27px;
        color: #333333;
        padding: 37px 0px 29px 0px;
      }
      &__address {
        width: 100%;
        display: block;
        font-size: 22px;
        color: #d1d1d1;
      }
    }
  }
}
.clear_all_history{
      @include sc(0.7rem, #666);
      text-align: center;
      line-height: 2rem;
      background-color: #fff;
}
</style>
