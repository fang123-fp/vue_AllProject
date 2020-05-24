<template>
    <div class="el-radio-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'RadioGroup',
  props: ['value'],
  methods: {
    trigger(evevtType, value) {
      this.$emit(evevtType, value);
    },
  },
  mounted() {
    this.$children.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.checkedValue = this.value;
    });
  },
  watch: {
    value() {
      this.$children.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
        item.checkedValue = this.value;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-radio-group{
  height:inherit ;
  display: flex;
  align-items: center;
}
</style>
