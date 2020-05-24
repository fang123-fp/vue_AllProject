<template>
  <div class="dialog" v-if="dialogIsShow">
      <div class="dialog-warp">
        <div class="dialog-title">{{ title }}</div>
        <div class="dialog-message">{{ message }}</div>
        <div class="dialog-active">
          <div class="dialog-cancel dialog-button" @click="cancel">取消</div>
          <div class="dialog-confirm dialog-button" @click="confirm">确定</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'co-dialog',
  data() {
    return {
      dialogIsShow: true,
    };
  },
  methods: {
    hide() {
      this.dialogIsShow = false;
    },
    cancel() {
      this.reject();
      this.hide();
    },
    confirm() {
      this.resolve();
      this.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog{
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 1000;
  background: #494949;
  top: 0px;
  opacity: 0.9;
}
.dialog-warp{
  width: 640px;
  height: 315px;
  border-radius:5px ;
  background-color: #fff;
  padding: 49px 30px 39px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  .dialog-title{
    font-size: 33px;
    color: #333;
    font-weight: 600;
  }
  .dialog-message{
    font-size: 25px;
    color: #666;
    line-height: 93px;
    margin-top: 12px;
  }
  .dialog-active{
    display: flex;
    justify-content: space-between;
  }
  .dialog-button{
    width: 281px;
    height: 86px;
    border-radius:3px;
    font-size: 30px;
    line-height: 86px;
    display: inline-block;
  }
  .dialog-cancel{
    border: 1px solid #ccc;
    box-sizing: border-box;
    color: #333;
  }
  .dialog-confirm{
    background-color: #2495ff;
    color: #fff;
  }

}
</style>
