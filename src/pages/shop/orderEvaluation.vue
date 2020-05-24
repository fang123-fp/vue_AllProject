<template>
  <div class="order-evaluation">
      <van-tabs
      color='#2295FF'
      title-inactive-color='#666666'
      title-active-color='#333333'>
          <van-tab title="点餐">
            <!-- 点餐内容组件 -->
            <shop-order></shop-order>
          </van-tab>
          <van-tab title="评价">
            <!-- 点餐评价组件 -->
            <evaluation></evaluation>
          </van-tab>
          <van-tab title="商家">
            <!-- 点餐商家组件 -->
            <merchant></merchant>
          </van-tab>
      </van-tabs>
  </div>
</template>

<script>
/* import BScroll from 'better-scroll'; */
import shopOrder from './shopOrder.vue';
import evaluation from './evaluation.vue';
import merchant from './merchant.vue';

export default {
  name: 'orderEvaluation',
  components: {
    shopOrder,
    evaluation,
    merchant,
  },
};
</script>


<style lang="scss" scoped>

</style>
