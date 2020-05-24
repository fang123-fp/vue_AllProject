<template>
  <div class="city-index">
    <!-- 头部 -->
    <city-header></city-header>
    <!-- 搜索框 -->
    <city-searchFor></city-searchFor>
  </div>
</template>

<script>
import cityHeader from './cityHeader.vue';
import citySearchFor from './citySearchFor.vue';


export default {
  name: 'cityIndex',
  components: {
    cityHeader,
    citySearchFor,
  },
};
</script>

<style lang="scss" scoped>
.city-index{
  width: 1242px;
  height: 2208px;
  background-color: #F5F5F5;
}
</style>
