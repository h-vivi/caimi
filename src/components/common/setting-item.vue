<template lang="html">
  <li class="setting-item">
    <span :src="item.icon" alt="" class="xicon xicon-setting"></span>
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
      border: 1px solid red;
      background-repeat: no-repeat;
      background-position: 0 center;
      margin-right: 0.1rem;


    }
    .setting-name {
      float: left;
      width: 8.53rem;
      color: @color-deep;
      height: 1.6rem;
      line-height: 1.6rem;
      font-size: @font-size-larger;
      border-bottom: 1px solid @color-light;
      background: url(../../assets/go.png) right center no-repeat;
    }
</style>
