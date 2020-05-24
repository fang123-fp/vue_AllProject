/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
<template>
  <div class="sort-cities">
    <ul class="sort-cities__item" >
       <li class="sort-cities__item__oneItem" v-for="(item, key) in allCityList" :key="key">
          <div class="sort-cities__item__oneItem__title">
              {{ item[key].abbr.slice(0,1) }}
              <span class="sort-cities__item__oneItem__title__sortAlphabetically"
              v-show="key === 0">(按字母排序)</span>
          </div>
          <ul class="sort-cities__item__oneItem__text">
            <li class="sort-cities__item__oneItem__text__item"
            v-for="(item, key) in item" :key="key"
            @click="$router.push({ name:'cityIndex', query:{ CityName:item.name, CityId:item.id }})"
            >{{ item.name | toPrivacy()}}</li>
          </ul>
       </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sortCities',
  data() {
    return {
      allCityList: [],
    };
  },
  methods: {
    group() {
      this.$http.gitGroup()
        .then((res) => {
          Object.keys(res.data)
            .sort()
            // eslint-disable-next-line array-callback-return
            .map((key) => {
              this.allCityList[key] = res.data[key];
            });
          this.allCityList = Object.values(this.allCityList);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  created() {
    this.group();
  },
  filters: {
    toPrivacy(value) {
      if (value.length > 5) {
        return `${value.substring(0, 5)}...`;
      }
      return value;
    },
  },
};
</script>
<style lang="scss" scoped>
.sort-cities{
  width: 100%;
  &__item{
    margin: 0px;
    padding: 0px;
    height: 52000px;
    &__oneItem{
      width: 100%;
      border-top:5px solid #E4E4E4;
      margin-top: 20px;
      background-color: #fff;
      &__title{
        width: 98%;
        height:110px;
        border-bottom: 2px solid #E4E4E4;
        padding-left: 22px;
        font-size: 20px;
        display: flex;
        align-items: center;
        color: #666666;
        &__sortAlphabetically{
          color:#A1A1A1 ;
          margin-left: 24px;
          letter-spacing: 2px;
        }
      }
      &__text{
        width: 100%;
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-wrap: wrap;
        &__item{
          width: 24.84%;
          height:110px;
          color: #666666;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size:28px;
          border-bottom: 2px solid #e4e4e4;
          border-right: 2px solid #e4e4e4;
        }
      }
    }
  }

}
</style>
