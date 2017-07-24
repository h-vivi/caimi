<template lang="html">
  <li class="setting-item">
    <span alt="" :class="'xicon xicon-setting ' + item.icon"></span>
    <div class="setting-name">{{ item.name }}</div>
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
      height: 1.6rem;
      &:last-child {
        .setting-name {
          border-bottom: none;
        }
      }
    }
    .xicon-setting {
      width: 0.53rem;
      height: 1.6rem;
      float: left;
      background-repeat: no-repeat;
      background-position: 0 center;
      margin-right: 0.18rem;
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
    .setting-name {
      float: left;
      width: 8.53rem;
      color: @color-deep;
      height: 1.6rem;
      line-height: 1.65rem;
      font-size: @font-size-larger;
      border-bottom: 1px solid @color-light;
      background: url(../../assets/go.png) right center no-repeat;
    }
</style>
