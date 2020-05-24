<template>
  <div class="shop-index">
      <!-- 头部 -->
      <shop-header></shop-header>
      <!-- 标题 -->
      <shop-title></shop-title>
      <!-- 点餐 -->
      <order-evaluation></order-evaluation>
  </div>
</template>

<script>
import shopHeader from './indexHeader.vue';
import shopTitle from './shopTitile.vue';
import orderEvaluation from './orderEvaluation.vue';

export default {
  name: 'shopIndex',
  components: {
    shopHeader,
    shopTitle,
    orderEvaluation,
  },
};
</script>
<style lang="scss" scoped>
  .shop-index{
    background-color: #fff;
  }
</style>
