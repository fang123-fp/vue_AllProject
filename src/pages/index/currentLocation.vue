<template>
  <div class="current">
      <div class="current-location">
          <div class="current-location__item current-location__left">
              <span class="current-location__left__text">当前定位城市:</span>
          </div>
          <div class="current-location__item current-location__right">
            <span class="current-location__right__text">定位不准时，请在城市列表中选择</span>
          </div>
      </div>
      <div class="current-city"  @click="$router.push({
                                    name:'cityIndex',
                                    query:{ CityName:guessList.name, CityId:guessList.id }
                                  })" >
          <div class="current-city__item current-city__left">
              <span class="current-city__left__text">
                {{ guessList.name }}
              </span>
          </div>
          <div class="current-city__item current-city__right">
              <i class="iconfont icon-xiangyou"></i>
          </div>
      </div>
  </div>
</template>

<script>
import { setStore } from '../../config/mStorage';

export default {
  name: 'currentLocation',
  data() {
    return {
      guessList: [],
    };
  },
  created() {
    this.city();
  },
  methods: {
    city() {
      this.$http.gitGuess()
        .then((res) => {
          this.guessList = res.data;
          setStore('guessList', res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },

};
</script>

<style scoped lang='scss'>
.current{
  width: 100%;
  height: 167px;
}
.current-location{
  width: 1242px;
  height: 86px;
  border-bottom:2px solid #E4E4E4;
  font-size: 23px;
  color: #666666;
  display: flex;
  background-color: #fff;
  letter-spacing: 3px;
  &__left, &__right{
    display: flex;
    align-items: center;
  }
  &__left{
    width: 25%;
    height: inherit;
    &__text{
       margin-left:24px;
    }
  }
  &__right{
    width: 75%;
    height: inherit;
    color: #9F9F9F;
    font-weight: 600;
    position: relative;
    &__text{
       position: absolute;
       right: 26px;
    }
  }
}
.current-city{
  width: 1242px;
  height: 86px;
  border-bottom:5px solid #E4E4E4;
  display: flex;
  background-color: #fff;
  &__left, &__right{
    display: flex;
    align-items: center;
    width: 50%;
    height: inherit;
  }
  &__left{
    font-size: 32px;
    color: #3793E9;
    &__text{
       margin-left:24px;
    }
  }
  &__right{
      position: relative;
      display: flex;
      align-items: center;
      .icon-xiangyou{
        font-size: 28px;
        color: #999999;
        font-weight: 800;
        position: absolute;
        right: 27px;
      }
  }
}
</style>
