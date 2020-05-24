<template>
  <div class="index-header">
    <div class="index-header__item index-header__left">
      <span>快点点</span>
    </div>
    <div class="index-header__item index-header__center"></div>
    <div class="index-header__item index-header__right">
      <div class="index-header__right__item" v-show="!isIconShow">
          <span @click="$router.push({ path: '/login'})">登录</span>
          <span class="index-header__right__line">|</span>
          <span class="index-header__right__registered"
            @click="$router.push({ path: '/login'})">注册</span>
      </div>
      <i class="iconfont icon-denglu" v-show="isIconShow"></i>
    </div>
  </div>
</template>

<script>
import { getStore } from '../../config/mStorage';

export default {
  name: 'indexHeader',
  data() {
    return {
      isIconShow: false,
    };
  },

  methods: {
    changeIsIconShow() {
      if (JSON.parse(getStore('userInfo'))) {
        this.isIconShow = true;
      }
    },
  },
  created() {
    this.changeIsIconShow();
  },
};
</script>

<style scoped lang='scss'>
.index-header{
  width: 1242px;
  height: 120px;
  background-color: #3190E8;
  display: flex;
  font-size: 31px;
  color: #FFFFFF;
  font-weight: 400;
  position: fixed;
  top: 0px;
  z-index: 10;
  &__item{
    width: 60%;
  }
  &__right{
     position: relative;
     .icon-denglu{
       position: absolute;
       right: 27px;
       font-size: 50px;
     }
  }
  &__left,&__right{
    width: 20%;
    display: flex;
    align-items: center;
    &__line{
      margin: 0px 5px;
    }
    &__item{
      position: absolute;
      right: 27px;
    }
  }
  &__left{
    span{
       margin-left:20px;
    }
  }
}
</style>
