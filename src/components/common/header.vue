<template>
  <header class="header">
    <ul class="list">
      <li
        class="list-item"
        :class="{ 'active': item.active }"
        v-for="item in items"
        @click="handleClick(item.code)"
      >{{ item.name }}</li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return { }
    },
    methods: {
      handleClick (code) {
        this.$emit('to-certain-item', { code })
      }
    },
    props: {
      items: {
        default () {
          return [ ]
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';
  @import '~styles/functions';

  @active-item-color: #77d9f7;

  .header {
    padding: 0 0.53rem;
    font-size: @font-size-larger;
    background-color: @color-deep;
    color: @color-light;
    text-align: center;

    .list {
      white-space: nowrap;
      overflow-x: auto;
      list-style: none;

      .list-item {
        position: relative;
        display: inline-block;
        min-width: 1.33rem;
        margin: 0 1.06rem 0 0;
        border-bottom: 1px solid transparent;
        top: -1px;

        &.active {
          color: @active-item-color;
          border-bottom-color: @active-item-color;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
