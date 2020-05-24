<template>
    <div class="co-radio__warp">
      <!-- 我们需要利用checkbox的选中状态 来改变模拟单选框的选中样式 -->
        <input class="co-radio__checkbox" type="checkbox" :checked=" value === checkedValue">
        <label class="co-radio__outer" @click="toggle">
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
  name: 'Radio',
  data() {
    return {
      checkedValue: '',
    };
  },
  methods: {
    toggle() {
      this.$parent.trigger('input', this.value);
    },
  },
  props: ['label', 'value'],
};
</script>

<style lang="scss" scoped>
.co-radio__warp{
    display: inline-block;
    display: flex;
    align-items: center;
    margin-right: 19px;
    .co-radio__checkbox{
      display: none;
    }
    .co-radio__checkbox:checked + .co-radio__outer{
      color: #2195ff;
      background-color: #eef7fe;
      border-color: rgba(35,149,255,.5);
    }
    .co-radio__outer{
      font-size: 25px;
      padding: 15px 39px;
      border: 1px solid #ddd;
      border-radius:6px ;
      color: #666666;
    }
  }
</style>
