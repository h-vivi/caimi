<template lang="html">
  <li class="setting-item" :class=item.className>
    <i v-if="item.icon" alt="" :class="'xicon xicon-setting ' + item.icon"></i>
    <div class="content">
      <div>{{ item.name }}</div>
      <div class="center"><slot></slot></div>
      <i class="right"></i>
    </div>
  </li>
</template>

<script>
export default {
  name: 'setting-item',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    item: {
      default () {
        return { name: { }, icon: { } }
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import '~styles/vars.less';
    .setting-item {
      display: flex;
      height: 1.6rem;
      &:last-child {
        .content {
          border-bottom: none;
        }
      }
      .center {
        color: @color-middle;
        font-size: @font-size-middle;
      }
    }
    .xicon-setting {
      width: 0.53rem;
      height: 1.6rem;
      background-repeat: no-repeat;
      background-position: 0 center;
      margin-right: 0.1rem;
    }
    .avatar {
      .center {
        height: 1.3rem;
        float: right;
        border: 1px solid red;
      }
    }
    .story {
      background-image: url(../../assets/xicon-story.png);
    }
    .collect {
      background-image: url(../../assets/xicon-collect.png);
    }
    .honor {
      background-image: url(../../assets/xicon-up-setting.png);
    }
    .ask {
      background-image: url(../../assets/xicon-answer.png);
    }
    .set {
      background-image: url(../../assets/xicon-set.png);
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      min-height: 1.6rem;
      padding-left: 0.4rem;
      font-size: @font-size-larger;
      border-bottom: 1px solid @color-light;
      color: @color-deep;
    }
    .center {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      margin-right: 0.26rem;
    }
    .right {
      display: inline-block;
      width: 10px;
      height: 20px;
      background: url(../../assets/go.png) no-repeat;
      background-size: 100%;
    }
</style>
