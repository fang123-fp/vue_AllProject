<template>
    <div>
        <span class="weui-switch" :class="{'weui-switch-on' : isChecked}"
          :value="value" @click="toggle" style="position:relative">
            <div v-if="isChecked && direction.length > 0"
              style="width:100%;
                    height:100%;
                    position:absolute;
                    color:#FFF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select:none">
                {{direction[0] }}
            </div>
            <div v-if="!isChecked && direction.length > 0"
              style="width:100%;
                    height:100%;
                    position:absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color:#7A7A7A;
                    user-select:none">
                {{direction[1]}}
            </div>
        </span>
    </div>
</template>
<script>
export default {
  name: 'switchComponent',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isChecked: this.value,
      isPassword: ' ',
    };
  },
  computed: {
    direction() {
      if (this.text) {
        return this.text.split('|');
      }
      return [];
    },
  },
  watch: {
    value(val) {
      this.isChecked = val;
    },
    isChecked(val) {
      this.$emit('change', val);
      this.sendMsg();
    },
  },
  methods: {
    toggle() {
      this.isChecked = !this.isChecked;
    },
    // 判断密码是否可见
    sendMsg() {
      if (this.isChecked === false) {
        this.isPassword = 'password';
      } else {
        this.isPassword = 'text';
      }
      // func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit('func', this.isPassword);
    },

  },
};
</script>
<style lang="scss" scoped>
.weui-switch {
  display: block;
  position: relative;
  width: 100px;
  height: 40px;
  border: 1px solid #DFDFDF;
  outline: 0;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: #DFDFDF;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
  font-size: 15px;
  color: #fff;
  margin-left:130px ;

}
.weui-switch:before {
  content: " ";
  position: absolute;
  top: -3px;
  left: -1px;
  width: 120px;
  height: 45px;
  border-radius: 50px;
  background-color: #CCCCCC;
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.weui-switch:after {
  content: " ";
  position: absolute;
  top: -18px;
  left: -4px;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: #F1F1F1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.weui-switch-on {
  /* border-color: #6F6F6F; */
  background-color: #CCCCCC;
}
.weui-switch-on:before {
  background-color: #4CD964;
}
.weui-switch-on:after {
  transform: translateX(52px);
}
</style>
