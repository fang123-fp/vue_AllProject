<template>
  <div class="login-index">
    <!-- 头部 -->
    <login-header>重置密码</login-header>
    <!-- 登录 -->
    <reset-form></reset-form>
  </div>
</template>

<script>
import loginHeader from '../login/loginHeader.vue';
import resetForm from './resetForm.vue';

export default {
  name: 'resetIndex',
  components: {
    loginHeader,
    resetForm,
  },
};
</script>

<style lang="scss" scoped>
.login-index{
  width: 1242px;
  height: 2208px;
  background-color: #F5F5F5;
}
</style>
