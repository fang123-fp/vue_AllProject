<template>
  <div class="popular-cities">
      <div class="popular-cities__title">热门城市</div>
      <div class="popular-cities__city">
        <div class="popular-cities__city__item" v-for="(item,index) in hotList" :key="index"
        @click="$router.push({ name:'cityIndex', query:{ CityName:item.name, CityId:item.id }})">
            {{ item.name }}
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'popularCities',
  data() {
    return {
      hotList: [],
    };
  },
  created() {
    this.city();
  },
  methods: {
    city() {
      this.$http.gitHot()
        .then((res) => {
          this.hotList = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },

};
</script>

<style lang="scss" scoped>
.popular-cities{
  width: 100%;
  height: 338px;
  border-top:5px solid #E4E4E4;
  background-color:#fff;
  margin-top: 20px;
  &__title{
    height:  110px;
    border-bottom: 2px solid #E4E4E4;
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #6E6E6E;
    padding-left: 22px;
  }
  &__city{
    width: 100%;
    &__item{
      float: left;
      width: 24.84%;
      height:110px;
      color: #3190e8;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size:25px;
      border-bottom: 2px solid #e4e4e4;
      border-right: 2px solid #e4e4e4;

    }
  }
}
</style>
