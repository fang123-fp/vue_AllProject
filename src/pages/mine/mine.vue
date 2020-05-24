<template>
  <div>
      <!--头部  -->
      <header-title head-title="我的"></header-title>
      <div class="mine">
        <div class="mine__title">
          <div class="mine__title__item left">
            <img :src="showPicUrl+avatar" alt="">
          </div>
          <div class="mine__title__item center">
            <router-link :to="userInfoList && userInfoList.user_id ? '/mine/info' : '/login'" class="profile-link">
                <span class="mine__title__item__name">{{ username }}</span>
            </router-link>
            <span class="mine__title__item__phone">
              <i class="iconfont icon-dianhua1"></i>
              {{ mobile }}
            </span>
          </div>
          <div class="mine__title__item right">
            <i class="iconfont icon-xiangyou" @click="$router.go(-1)"></i>
          </div>
        </div>
        <div class="mine__integral">
          <div class="mine__integral__item left" @click="$router.push({ path:'/mine/redEnvelope'})">
            <div class="mine__integral__item__number"><span>{{ count }}</span>个</div>
            <div class="mine__integral__item__redEnvelope">红包</div>
          </div>
          <div class="mine__integral__item right">
            <div class="mine__integral__item__number"><span>{{ pointNumber }}</span>个</div>
            <div class="mine__integral__item__redEnvelope">金币</div>
          </div>
        </div>
        <div class="mine__adress"  @click="$router.push({ path:'/confirmOrder'})">
            <div class="mine__adress__left">
              <i class="iconfont icon-dizhi"></i>
              我的地址
            </div>
            <div class="mine__adress__right">
              <i class="iconfont icon-xiangyou"></i>
            </div>
        </div>
        <div class="mine__shareIt">
          <div class="mine__shareIt__item">
                <div class="mine__shareIt__item__left">
                  <i class="iconfont icon-shangchengmoren"></i>
                </div>
                <div class="mine__shareIt__item__center">
                    金币商城
                </div>
                <div class="mine__shareIt__item__right">
                    <i class="iconfont icon-xiangyou"></i>
                </div>
          </div>
          <div class="mine__shareIt__envelope">
                <div class="mine__shareIt__envelope__left">
                  <i class="iconfont icon-liwu"></i>
                </div>
                <div class="mine__shareIt__envelope__center">
                    分享拿20元现金
                </div>
                <div class="mine__shareIt__envelope__right">
                    <i class="iconfont icon-xiangyou"></i>
                </div>
          </div>
        </div>
        <div class="mine__shareIt">
          <div class="mine__shareIt__item">
                <div class="mine__shareIt__item__left">
                  <i class="iconfont icon-kefu"></i>
                </div>
                <div class="mine__shareIt__item__center">
                    我的客服
                </div>
                <div class="mine__shareIt__item__right">
                    <i class="iconfont icon-xiangyou"></i>
                </div>
          </div>
          <div class="mine__shareIt__envelope">
                <div class="mine__shareIt__envelope__left">
                  <i class="iconfont icon-guize"></i>
                </div>
                <div class="mine__shareIt__envelope__center">
                    规则中心
                </div>
                <div class="mine__shareIt__envelope__right">
                    <i class="iconfont icon-xiangyou"></i>
                </div>
          </div>
        </div>
      </div>
      <!-- 导航栏 -->
      <footer-nav></footer-nav>
  </div>
</template>

<script>
import headerTitle from '../../components/heaher/header.vue';
import footerNav from '../../components/footer/footerNav.vue';
import { getStore } from '../../config/mStorage';

export default {
  name: 'mine',
  components: {
    footerNav,
    headerTitle,
  },
  data() {
    return {
      username: '登录/注册', // 用户名
      resetname: '',
      mobile: '暂无绑定手机号', // 电话号码
      count: 0, // 红包个数
      pointNumber: 0, // 金币数
      avatar: '', // 头像地址
      userInfoList: [],
      showPicUrl: 'https://elm.cangdu.org/img/',

    };
  },

  methods: {
    initData() {
      this.userInfoList = JSON.parse(getStore('userInfo')).data;
      if (this.userInfoList && this.userInfoList.user_id) {
        this.avatar = this.userInfoList.avatar;
        this.username = this.userInfoList.username;
        this.mobile = this.userInfoList.mobile || '暂无绑定手机号';
        this.count = this.userInfoList.balance;
        this.pointNumber = this.userInfoList.gift_amount;
      } else {
        this.username = '登录/注册';
        this.mobile = '暂无绑定手机号';
      }
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style lang="scss" scoped>
.mine{
  width: 1242px;
  height: 2208px;
  overflow: hidden;
  background-color: #F5F5F5;
  margin-top: 150px;
  &__title{
    width: 100%;
    background-color: #0096FF;
    height: 250px;
    display: flex;
    &__item{
      &__name{
        font-size: 35px;
        color: #fff;
        font-weight: 700;
        display: block;
        margin: 55px 0px 0px;
      }
      &__phone{
        font-size: 20px;
        color: #fff;
        .icon-dianhua1{
          font-size: 20px;
        }
      }
    }
    .left,.right{
      width: 20%;
      display: flex;
      align-items: center;
      position: relative;
      .icon-xiangyou{
        font-size: 25px;
        color: #fff;
        position: absolute;
        right: 34px;
      }

      img{
        width: 130px;
        height: 130px;
        border-radius:50px;
        overflow: hidden;
        margin: 0px 30px;
      }
    }
    .center{
      width: 60%;
    }
  }
  &__integral{
    width: 100%;
    height: 225px;
    display: flex;
    &__item{
      width: 50%;
      text-align: center;

      &__number{
        width: 100%;
        margin: 44px 0px 0px 0px;
        font-size: 23px;
        span{
          font-size: 60px;
          font-weight: bold;
        }
      }
      &__redEnvelope{
        color: #6E6E6E;
        font-size:21px ;
        font-weight: bold;
      }
    }
    background-color: #fff;
    .left{
      border-bottom:1px solid #E0E0E0 ;
      border-right:1px solid #E0E0E0 ;
      .mine__integral__item__number{
        color: #FF603E;
      }
    }
    .right{
      border-bottom:1px solid #E0E0E0 ;
      .mine__integral__item__number{
        color: #6AC20C;
      }
    }
  }
  &__adress{
    width: 100%;
    height:120px;
    border-top: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
    background-color: #fff;
    margin: 22px 0px 24px;
    font-size:36px;
    display: flex;
    align-items: center;
    color: #454545;
    position: relative;
    &__left{
      .icon-dizhi{
        color: #4AA5F0;
        font-size:40px;
        margin: 0px 24px 0px 33px;
      }
    }
    &__right{
      font-size: 20px;
      color: #BBBBBB;
      position: absolute;
      right:25px;
    }

  }
  &__shareIt{
    width: 100%;
    border-top: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
    background-color: #fff;
    margin-bottom: 20px;
    &__item{
      width: 100%;
      height: 120px;
      font-size:36px;
      color: #454545;
      display: flex;
      &__left{
        width: 8.5%;
        display: flex;
        align-items: center;
        .icon-shangchengmoren{
          color: #95D94B;
          font-size:40px;
          margin: 0px 24px 0px 33px;
        }
        .icon-kefu{
          color: #4DA6F0;
          font-size:40px;
          margin: 0px 24px 0px 33px;
        }
      }
      &__center{
        width: 80%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E0E0E0;
      }
      &__right{
        width: 11.5%;
        position: relative;
        font-size: 20px;
        color: #BBBBBB;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E0E0E0;
        .icon-xiangyou{
          position: absolute;
          right: 25px;
        }

      }
    }
    &__envelope{
      width: 100%;
      height: 120px;
      font-size:36px;
      color: #454545;
      display: flex;
      &__left{
        width: 8.5%;
        display: flex;
        align-items: center;
        .icon-liwu{
          color: #FB7B53;
          font-size:40px;
          margin: 0px 24px 0px 33px;
        }
        .icon-guize{
          color: #4DA6F0;
          font-size:40px;
          margin: 0px 24px 0px 33px;
        }

      }
      &__center{
        width: 80%;
        display: flex;
        align-items: center;
      }
      &__right{
        width: 11.5%;
        position: relative;
        font-size: 20px;
        color: #BBBBBB;
        display: flex;
        align-items: center;
        .icon-xiangyou{
          position: absolute;
          right: 25px;
        }

      }
    }
  }
}
</style>
