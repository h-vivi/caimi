<template>
  <div class="login">
    <div class="top">
      <div class="back xicon" @click="back">返回</div>
      <router-link class="new-account" :to="{ name: 'psw' }">注册</router-link>
    </div>
    <div class="content" :class="{ 'verify-mode': inVerifyMode }">
      <form class="info-form">
        <div class="xinput-wrapper">
          <input type="text" class="xinput" value="" placeholder="请输入手机号">
        </div>
        <div class="xinput-wrapper with-verify">
          <input type="text" class="xinput" value="" :placeholder="loginInExtra.placeholder">
          <div class="verify-code">发送验证码</div>
        </div>

        <input type="button" class="xbtn-large login-btn" value="登录">
      </form>
      <div class="extras">
        <router-link class="account" :to="{ name: loginInExtra.path }">{{ loginInExtra.name }}</router-link>
        <router-link class="forget" :to="{ name: 'psw' }">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return { }
    },
    methods: {
      back () {
        this.$router.back()
      }
    },
    computed: {
      inVerifyMode () {
        return this.$route.name === 'login::verify'
      },
      loginInExtra () {
        return {
          path: this.inVerifyMode ? 'login::psw' : 'login::verify',
          name: this.inVerifyMode ? '账号密码登录' : '免密码登录',
          placeholder: this.inVerifyMode ? '请输入验证码' : '请输入密码'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .login {
    color: @color-deep;
    font-size: @font-size-larger;

    .top {
      margin-top: 0.58rem;
      margin-bottom: 2.97rem;
      height: 0.62rem;
      line-height: 0.62rem;
      overflow: hidden;

      .back {
        float: left;
        margin-left: 0.4rem;
      }

      .new-account {
        float: right;
        margin-right: 0.4rem;
      }
    }

    .content {
      width: 7.73rem;
      margin: 0 auto;

      &.verify-mode {
        .with-verify {
          .xinput {
            padding-right: 2.6rem;
          }
        }

        .verify-code {
          display: block;
          position: absolute;
          right: 0;
          bottom: 0.18rem;
          width: 2.4rem;
          height: 0.74rem;
          line-height: 0.74rem;
          border: 1px dashed #77daf7;
          border-radius: 1rem;
          text-align: center;
          color: #77daf7;
        }
      }
    }

    .info-form {
      font-size: @font-size-large;
    }

    .xinput-wrapper {
      position: relative;
      overflow: hidden;
      margin-bottom: 0.6rem;
      
      &.with-verify {
        margin-bottom: 1.6rem;
      }

      .xinput {
        width: 100%;
      }
    }

    .verify-code {
      display: none;
    }

    .extras {
      margin-top: 0.66rem;
      overflow: hidden;

      .account {
        float: left;
      }

      .forget {
        float: right;
      }
    }
  }
</style>
