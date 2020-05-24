<template>
  <div class="search-item">
    <!-- 搜索框 -->
      <div class="search-inp">
        <input type="search" name="search" :placeholder="icon"
          class="iconfont search" v-model="populartext" @input="checkInput">
        <div @click="searchTarget('')">搜索</div>
      </div>
      <div v-if="popularTextShow">
          <!--历史搜索  -->
          <div class="search-item__history">
            <div class="search-item__history__item">
              <span class="search-item__history__item__title">历史搜索</span>
              <span class="search-item__history__item__icon">
                <i class="iconfont icon-shanchu" @click="clearAllHistory"
                  v-show="searchHistory.length"></i>
              </span>
            </div>
            <!-- 历史内容 -->
            <div class="search-item__history__text">
              <ul class="search-item__history__text__uiA"
                  v-for="(item,index) in searchHistory" :key="index" @click="searchTarget(item)">
                <li>{{ item }}</li>
              </ul>
            </div>
          </div>
          <!-- 热门搜索 -->
          <div class="search-item__popular">
            <div class="search-item__popular__item">
              <span class="search-item__popular__item__title">热门搜索</span>
              <span class="search-item__popular__item__icon"></span>
            </div>
            <!-- 热门搜索内容 -->
            <div class="search-item__popular__text">
              <ul class="search-item__popular__text__uiA"
                v-for="(item,index) in popularList" :key="index" @click='searchTarget(item)'>
                <li>{{ item }}</li>
              </ul>
            </div>
          </div>
      </div>
      <!-- 商品列表 -->
      <div class="home-productShowcase"
          v-if="showPopularList !== undefined && showPopularList.length > 0">
        <h3 class="home-productShowcase__title">商家</h3>
        <div class="index-film" v-for="(item,index) in showPopularList" :key="index">
          <div class="index-film__pic">
            <img :src="showPicUrl+item.image_path" alt=""
            class="index-film__pic__img"/>
          </div>
          <div class="index-film__text">
            <div class="index-film__text__title">
              <span class="index-film__text__title__title">{{ item.name }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                   <polygon points="0,14 4,0 24,0 20,14"
                     style="fill:none;stroke:#FF6000;stroke-width:1" />
                  <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                  <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
              </svg>
            </div>
            <div class="index-film__text__score">
                <span class="index-film__text__score__howPeople">
                    月售{{item.recent_order_num }}单</span>
            </div>
            <div class="index-film__text__director">
                <span class="index-film__text__director__star">
                  {{item.float_minimum_order_amount }}元起送
                </span>
                <span>/</span>
                <span class="index-film__text__director__item">
                 距离{{ item.distance }}
                </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 无结果 -->
      <div v-if="popularListShow" class="city-noResult">
         很抱歉！无搜索结果
      </div>
  </div>
</template>

<script>
import { getStore, setStore } from '../../config/mStorage';

export default {
  name: 'searchInp',
  data() {
    return {
      icon: '\ue60c 输入商家、商品名称',
      popularList: ['古茗', '螺丝粉', '炸鸡', '汉堡', '煲仔饭', '奶茶', '披萨', '蛋糕', '鸡排', '面包'],
      populartext: '',
      popularTextShow: true, // 历史搜索和热门记录显示
      popularListShow: false, // 搜索列表显示隐藏
      showPicUrl: 'https://elm.cangdu.org/img/', // 图片路径
      showPopularList: [], // 展示数据列表
      searchHistory: [], // 搜索历史记录
    };
  },
  methods: {
    search() {
      this.$http.gitRestaurantsSearch({
        geohash: this.$route.query.geohash,
        keyword: this.populartext,
      })
        .then((res) => {
          this.showPopularList = res.data;
          this.popularTextShow = false;
          this.popularListShow = !res.data.length;
        }).catch((err) => {
          console.log(err.message);
        });
    },
    /* 把热门搜索值放在input */
    popularClick(e) {
      this.populartext = e.target.innerHTML;
    },
    // 点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
    async searchTarget(searchHistory) {
      if (searchHistory) {
        this.populartext = searchHistory;
      } else if (!this.populartext) {
        return;
      }
      // 隐藏历史记录

      // 获取搜索结果
      this.showPopularList = await this.search();
      /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
      const history = getStore('searchHistory');
      if (this.searchHistory != null) {
        let checkrepeat = false;
        this.searchHistory = JSON.parse(history);
        this.searchHistory.forEach((item) => {
          if (item === this.populartext) {
            checkrepeat = true;
          }
        });
        if (!checkrepeat) { // 如果没有值
          this.searchHistory.push(this.populartext);
        }
      } else {
        this.searchHistory.push(this.populartext);
      }
      setStore('searchHistory', this.searchHistory);
    },
    // 搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
    checkInput() {
      if (this.populartext === '') {
        this.popularTextShow = true; // 显示历史记录
        this.showPopularList = []; // 清空搜索结果
        this.popularListShow = false; // 隐藏搜索为空提示
        this.showPopular = false;
      }
    },
    // 清除所有历史记录
    clearAllHistory() {
      this.searchHistory = [];
      setStore('searchHistory', this.searchHistory);
    },
  },
  mounted() {
    // 获取搜索历史记录
    if (getStore('searchHistory')) {
      this.searchHistory = JSON.parse(getStore('searchHistory'));
    }
  },
};
</script>
<style lang="scss" scoped>
 @import '../../style/commonStyle.scss';
.search-item{
  margin-top: 150px;
  /* background-color: $fc;
  height: 95vh; */
  .search-inp{
    width: 98%;
    height:128px;
    overflow: hidden;
    padding:33px 0px 40px 23px;
    display: flex;
    background-color: $fc;
  }
  .search-inp>input{
    width: 85%;
    height: 90px;
    border: none;
    outline: none;
    font-size: 28px;
    color: #757575;
    padding-left:15px;
    background-color:$bc;
    border-radius:5px ;
  }
  .search-inp>div{
    width: 15%;
    height: 90px;
    border: none;
    font-size: 28px;
    color: #333333;
    background-color: $fc;
    font-weight: 800;
    display: flex;
    line-height: 90px;
    justify-content: center;
  }
  &__history{
    background-color: $fc;
    &__item{
      width: 100%;
      height: 80px;
      display: flex;
      position: relative;
      &__title,&__icon{
        display: block;
        height: inherit;
        .icon-shanchu{
          position: absolute;
          top: 0px;
          right: 30px;
          font-size:25px;
          color: #D1D1D1;
        }
      }
      &__title{
        font-size: 28px;
        font-weight: 800;
        color: #666666;
        margin-left:27px ;
      }
    }
    &__text{
      &__uiA{
        list-style: none;
        display: inline-block;
        padding:22px 27px;
        margin: 0px;
      }
      &__uiA>li{
        padding:25px 23px ;
        background-color: #F7F7F7;
        font-size: 20px;
        color: #666666;
      }
    }
  }
  &__popular{
    padding-top: 67px;
    background-color: $fc;
    height: 75vh;
    &__item{
      width: 100%;
      height: 80px;
      &__title,&__icon{
        display: block;
        height: inherit;
      }
      &__title{
        font-size: 28px;
        font-weight: 800;
        color: #666666;
        margin-left:27px ;
      }
    }
    &__text{
      &__uiA{
        list-style: none;
        display: inline-block;
        padding:22px 27px;
        margin: 0px;
      }
      &__uiA>li{
        padding:25px 23px ;
        background-color: #F7F7F7;
        font-size: 20px;
        color: #666666;
      }
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
    border-top: 2px solid #F7F7F7;
    border-bottom: 2px solid #F7F7F7;
  }
}
.home-productShowcase{
  width: 100%;
  height: 84vh;
  background-color:#F5F5F5;
  &__title{
    font-size: 0.6rem;
    line-height: 2rem;
    text-indent: 0.5rem;
    font-weight: bold;
    color: #666;
  }
}
.index-film{
  width: 100%;
  height: 280px;
  display: flex;
  border-bottom: 1px solid #F6F6F6;
  background-color: $fc;
  &__pic{
    width: 20%;
    height: inherit;
    display: flex;
    justify-content: center;
    padding: 20px 0px 0px 0px;
    box-sizing: border-box;
    &__img{
      width: 180px;
      height: 180px;
    }
  }
  &__text{
    width: 80%;
    height: 240px;
    border-bottom: 1px solid #F6F6F6;
    &__title{
      width: 100%;
       height: 50px;
       font-size: 45px;
       color: #333333;
       font-weight: 800;
       padding: 10px 0px 0px;
       position: relative;
       &__title{
         margin: 0px 0px 0px 11px;
       }
       .pay_icon{
         margin-left: 15px;
       }
    }
    &__score{
      width: 100%;
      height: 100px;
      position: relative;
      display: flex;
      align-items: center;
      &__howPeople{
        color: #676767;
        font-size: 34px;
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

      }
    }
  }
}


</style>
