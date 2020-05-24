<template>
  <div class="index" >
    <!-- 头部 -->
    <index-header></index-header>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >
        <div class="wrapper" ref="wrapper">
            <div>
                <div>
                    <!-- 定位-->
                    <current-location></current-location>
                    <!-- 热门城市 -->
                    <popular-cities></popular-cities>
                    <!-- 排序 -->
                    <sort-cities></sort-cities>
                </div>
            </div>
        </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import indexHeader from './indexHeader.vue';
import currentLocation from './currentLocation.vue';
import popularCities from './popularCities.vue';
import sortCities from './sortCties.vue';

export default {
  name: 'index',
  components: {
    indexHeader, currentLocation, popularCities, sortCities,
  },
  data() {
    return {
      scroller: null,
      isLoading: false, // 下拉刷新
    };
  },
  methods: {
    onRefresh() { // 下拉刷新
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
  mounted() {
    this.scroller = new BScroll(this.$refs.wrapper, {
      scrollY: true, // 纵向滚动
      click: true, // 点击触发事件
      /*  pullDownRefresh: {
        threshold: 30,
        stop: 15,
      }, // 下拉刷新
      pullUpLoad: {
        threshold: 30,
      }, // 上拉加载 */
    });
    /*  this.scroller.on('pullingDown', () => {
      console.log('sd');
      // 发送请求
      this.scroller.finishPullDown();
    }); */
  },
};
</script>
<style lang="scss" scoped>
.index{
  width: 1242px;
  background-color: #F5F5F5;
  height: 2208px;
  overflow: hidden;
  .wrapper{
      width: 1242px;
      height: 2084px;
      margin-top: 124px;
  }
}


</style>
