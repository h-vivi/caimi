<template>
  <div class="login">
    <div class="top">
      <div class="back xicon xicon-back" @click="back"></div>
      <router-link class="new-account" :to="{ name: 'register' }">注册</router-link>
    </div>
    <div class="content" :class="{ 'verify-mode': inVerifyMode }">
      <form class="info-form">
        <div class="xinput-wrapper">
          <input type="text" v-model="phone" class="xinput" placeholder="请输入手机号">
        </div>
        <div class="xinput-wrapper with-verify">
          <template v-if="inVerifyMode">
            <input type="text" v-model="psw" class="xinput" :placeholder="loginInExtra.placeholder">
          </template>
          <template v-else>
            <input type="password" v-model="psw" class="xinput" :placeholder="loginInExtra.placeholder">
          </template>
          <div class="verify-code" :class="{ 'disabled': disableGetVerify }" @click="sendVerifyCode">
            {{ disableGetVerify ? `重新发送(${curTime}s)` : '发送验证码' }}
          </div>
        </div>

        <input type="button" class="xbtn xbtn-large login-btn" value="登录" @click="loginAction">
      </form>
      <div class="extras">
        <div class="account" @click="toggleExtraLoginMtd">{{ loginInExtra.name }}</div>
        <!-- <router-link class="account" :to="{ query: loginInExtra.query }">{{ loginInExtra.name }}</router-link> -->
        <router-link class="forget" :to="{ name: 'findpsw' }">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { getVerifyCode, loginViaVerifyCode, loginViaPsw } from '@/api'

  export default {
    name: 'login',
    data () {
      return {
        phone: '',
        psw: '',
        curTime: 0,
        disableGetVerify: false,
        inVerifyMode: false
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      toggleExtraLoginMtd () {
        this.inVerifyMode = !this.inVerifyMode
        this.psw = ''
        this.disableGetVerify = false
        this.gc()
      },
      sendVerifyCode () {
        if (this.disableGetVerify) {
          return
        }
        getVerifyCode({ phone: this.phone })
          .then(res => {
            if (!res.success) {
              return
            }

            this.disableGetVerify = true
            this.curTime = 59
            this.verifyTimer = setInterval(_ => {
              this.curTime --

              if (this.curTime === 0) {
                clearInterval(this.verifyTimer)
                this.disableGetVerify = false
              }
            }, 1000)
          })
        .catch(ex => { /* Ignore */ })
      },
      loginAction () {
        if (!this.phone || !this.psw) {
          return
        }
        let method = loginViaVerifyCode
        if (!this.inVerifyMode) {
          method = loginViaPsw
        }
        method({ phone: this.phone, verifyCode: this.psw })
          .then(res => {
            if (!res.success) {
              return
            }
            this.$router.push({ name: 's' })
          })
        .catch(ex => { /* Ignore */ })
      },
      gc () {
        clearInterval(this.verifyTimer)
        this.curTime = 0
      }
    },
    beforeRouteLeave (to, from, next) {
      this.gc()
      next()
    },
    computed: {
      // inVerifyMode () {
        // return this.$route.query.verify === true ||
          // this.$route.query.verify === 'true'
      // },
      loginInExtra () {
        if (!this.inVerifyMode) {
          return {
            query: { verify: true },
            name: '免密码登录',
            placeholder: '请输入密码',
            verifyType: 'password'
          }
        }
        return {
          query: { verify: false },
          name: '账号密码登录',
          placeholder: '请输入验证码',
          verifyType: 'text'
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
  }

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
        font-size: @font-size-small;

        &.disabled {
          border-style: solid;
          border-color: @color-light;
          color: @color-middle;
        }
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
</style>
