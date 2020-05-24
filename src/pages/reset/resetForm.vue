<template>
  <div class="login-form">
   <form>
        <div class="login-form__item">
          <input type="text" placeholder="账号" v-model="phoneNumber">
        </div>
        <div class="login-form__item">
          <input type="password" placeholder="旧密码" v-model="oldPassWord">
        </div>
        <div class="login-form__item">
          <input type="password" placeholder="请输入新密码" v-model="newPassWord">
        </div>
        <div class="login-form__item">
          <input type="password" placeholder="请确认新密码" v-model="confirmPassWord">
        </div>
        <div class="login-form__item">
          <input type="text" placeholder="验证码" v-model="verificationCode"
            oninput="if(value.length>4)value=value.slice(0,4)">
          <div class="login-form__item__verificationCode">
            <div class="login-form__item__verificationCode__number">
              <img :src="codePic" alt="">
            </div>
            <div class="login-form__item__other">
              <span class="login-form__item__other__clearly"
                @click='searchVerificationCode()'>看不清</span>
              <span class="login-form__item__other__changeOne"
                @click='searchVerificationCode()'>换一张</span>
            </div>
          </div>
        </div>
   </form>
   <div class="login-form__buttom" @click='ConfirmTheChanges'>确认修改</div>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  name: 'resetForm',
  data() {
    return {
      codePic: '', // 验证码
      phoneNumber: null, // 账号
      oldPassWord: null, // 旧密码
      newPassWord: null, // 新密码
      confirmPassWord: null, // 确认密码
      verificationCode: null,
    };
  },
  created() {
    this.searchVerificationCode();
  },
  methods: {
    searchVerificationCode() {
      this.$http.gitVerificationCode({ })
        .then((res) => {
          this.codePic = res.data.code;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    // 重置密码
    async ConfirmTheChanges() {
      if (!this.phoneNumber) {
        Dialog.alert({
          title: '提示',
          message: '请输入正确的账号',
        });
        return;
      }
      if (!this.oldPassWord) {
        Dialog.alert({
          title: '提示',
          message: '请输入旧密码',
        });
        return;
      }
      if (!this.newPassWord) {
        Dialog.alert({
          title: '提示',
          message: '请输入新密码',
        });
        return;
      }
      if (this.oldPassWord === this.newPassWord) {
        Dialog.alert({
          title: '提示',
          message: '新密码不能与旧密码一样',
        });
        return;
      }
      if (!this.confirmPassWord) {
        Dialog.alert({
          title: '提示',
          message: '请输确认密码',
        });
        return;
      }
      if (this.newPassWord !== this.confirmPassWord) {
        Dialog.alert({
          title: '提示',
          message: '两次输入的密码不一致',
        });
        return;
      }
      if (!this.verificationCode) {
        Dialog.alert({
          title: '提示',
          message: '请输验证码',
        });
        return;
      }
      // 发送重置信息
      const res = await this.$http.gitPhonepassword({
        username: this.phoneNumber,
        oldpassWord: this.oldPassWord,
        newpassword: this.newPassWord,
        confirmpassword: this.confirmPassWord,
        captcha_code: this.verificationCode,
      });
      if (res.data.message) {
        console.log(res);
        Dialog.alert({
          title: '提示',
          message: res.data.message,
        });
      } else {
        Dialog.alert({
          title: '提示',
          message: '密码修改成功',
        }).then(() => {
          this.searchVerificationCode();
        });
        this.$router.push({ path: '/login' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form{
  width: 100%;
  margin-top:119px ;
  position: relative;
  &__item{
    height: 95px;
    border: 2px solid #F1F1F1;
    display: flex;
    align-items: center;
    padding: 0px 0px 0px 42px;
    background-color: #fff;
    &__verificationCode{
      width:252px;
      height: 95px;
      /* border: 1px solid #000; */
      display: flex;
      &__number{
        width:150px;
        height:95px;
        text-align: center;
        line-height: 95px;
        display: flex;
        align-items: center;
      }
      &__number>img{
        width:146px;
        height:64px;
      }
    }
     &__other{
         width:79px;
        height:95px;
        &__changeOne,&__clearly{
            width: 130px;
            height: 47px;
            display:block;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 23px;
         }
        &__clearly{
          color: #7B7B7B;
        }
        &__changeOne{
           color: #5DA7ED;
        }
      }
  }
  &__item>input{
    width: 75%;
    height:34px;
    font-size: 34px;
    color:#898989;
    border: none;
    outline: none;
  }
  &__buttom{
    width: 95%;
    height: 92px;
    background-color: #4DD964;
    margin: 0px auto;
    text-align: center;
    line-height: 92px;
    font-size: 30px;
    color: #FFFFFF;
    border-radius:6px;
    margin-top:50px ;
  }
}
</style>
