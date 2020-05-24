<template>
  <div class="login-form">
   <form>
        <div class="login-form__item">
          <input type="text" placeholder="账号" v-model="userAccount">
        </div>
        <div class="login-form__item">
          <input :type="PasswordIsVisible || isShowPassword" placeholder="密码" v-model="passWord">
          <switchc text="abc...| abc... " @func='PasswordIsClick'></switchc>
        </div>
        <div class="login-form__item">
          <input type="text" placeholder="验证码" v-model="codeNumber"  oninput="if(value.length>4)value=value.slice(0,4)">
          <div class="login-form__item__verificationCode">
            <div class="login-form__item__verificationCode__number">
              <img :src="codePic" alt="">
            </div>
            <div class="login-form__item__other">
              <span class="login-form__item__other__clearly" @click='searchVerificationCode()'>看不清</span>
              <span class="login-form__item__other__changeOne"  @click='searchVerificationCode()'>换一张</span>
            </div>
          </div>
        </div>
    </form>
        <div class="login-form__tips">
          <span class="login-form__tips__tipsA">温馨提示：未注册过的账号，登录时将自动注册</span>
          <span class="login-form__tips__tipsB">注册过的用户可凭账号密码登录</span>
        </div>
        <div class="login-form__buttom" @click='mobileLogin'>登录</div>
        <a href="#/reset" class="login-form__linkToPassword">重置密码？</a>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import switchc from './switch.vue';
import { mutations } from '../../store/index';

export default {
  name: 'loginForm',
  data() {
    return {
      codePic: '',
      PasswordIsVisible: '', // 定义密码是否可见
      isShowPassword: 'password', // 密码显示
      showAlert: false, // 显示提示组件
      alertText: null, // 提示的内容
      userAccount: null, // 用户名
      passWord: null, // 密码
      codeNumber: null, // 验证码
      userInfo: '', // 获取到的用户信息
    };
  },
  components: {
    switchc,
  },
  created() {
    this.searchVerificationCode();
  },
  methods: {
    searchVerificationCode() {
      this.$http.gitVerificationCode()
        .then((res) => {
          this.codePic = res.data.code;
        })
        .catch((err) => {
          console.log(err.message);
        });
      // eslint-disable-next-line no-undef
    },
    PasswordIsClick(data) {
      this.PasswordIsVisible = data;
      console.log(this.userInfo);
    },
    // 登录
    async mobileLogin() {
      if (!this.userAccount) {
        Dialog.alert({
          title: '提示',
          message: '请输入手机号/邮箱/用户名',
        });
        return;
      }
      if (!this.passWord) {
        Dialog.alert({
          title: '提示',
          message: '请输入密码',
        });
        return;
      }
      if (!this.codeNumber) {
        Dialog.alert({
          title: '提示',
          message: '请输入验证码',
        });
        return;
      }
      // 用户名登录
      this.userInfo = await this.$http.gitPhoneLogin({
        username: this.userAccount,
        password: this.passWord,
        captcha_code: this.codeNumber,
      });
      // 如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
      if (!this.userInfo.data.user_id) {
        Dialog.alert({
          title: '提示',
          message: this.userInfo.data.message,
        }).then(() => {
          this.searchVerificationCode();
        });
      } else {
        mutations.setState(this.userInfo);
        this.$router.go(-1);
      }
    },
    // 关闭验证码
    closeTip() {
      this.showAlert = false;
    },
  },
  /* computed: {
    count() {
      return state.userInfo;
    },
  }, */
};
</script>

<style lang="scss" scoped>
.login-form{
  width: 100%;
  margin-top:173px ;
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
  &__tips{
    width: 100%;
    height: 120px;
    &__tipsA,&__tipsB{
      width: 100%;
      height:55px;
      display: block;
      font-size: 25px;
      color:#FF0100 ;
      display: flex;
      align-items: center;
      padding: 0px 0px 0px 30px;
    }
    &__tipsB{
      margin: 7px 0px 0px 0px;
    }
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
  }
  &__linkToPassword{
    text-decoration: none;
    color: #6BACEC;
    font-size: 26px;
    margin-top: 52px;
    display: block;
    position: absolute;
    right: 1%;
  }
}
</style>
