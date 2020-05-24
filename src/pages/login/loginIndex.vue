<template>
  <div class="login-index">
    <!-- 头部 -->
    <login-header>密码登录</login-header>
    <!-- 登录 -->
    <login-form></login-form>
  </div>
</template>

<script>
import loginHeader from './loginHeader.vue';
import loginForm from './loginForm.vue';

export default {
  name: 'loginIndex',
  components: {
    loginHeader,
    loginForm,
  },
};
</script>

<style lang="scss" scoped>
.login-index{
  width: 1242px;
  height: 2208px;
  background-color: #F5F5F5;
  overflow: hidden;
}
</style>
