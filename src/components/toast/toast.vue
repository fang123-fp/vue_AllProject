<template>
  <div class="toast" v-if="visible">{{ message }}</div>
</template>

<script>
export default {
  name: 'toast',
  data() {
    return {
      visible: true,
      duration: 300,
    };
  },
  methods: {
    hideToast() {
      this.visible = false;
    },
  },
  mounted() {
    setTimeout(() => {
      this.hideToast();
    }, this.duration);
  },
};
</script>

<style lang="scss" scoped>
.toast{
  display: inline-block;
  font-size: 25px;
  padding: 22px 40px;
  box-sizing: border-box;
  border-radius:50px ;
  background-color: #626262;
  position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  color: #D5D5D5;
  opacity: .8;
  transform: translate(-50%,-50%);
}
</style>
