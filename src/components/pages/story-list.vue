<template lang="html">
  <div class="list">
    <div class="story-head">
      <div class="back xicon xicon-back-white" @click="back"></div>
      详情
    </div>
    <div class="essays optimize-scroll" @scroll="scrollLoad">
      <essay-desc-item
        class="essay-desc-item"
        v-for="essay in essays"
        @item-content-click="toDetail(essay)"
        :item="essay"
        :key="essay.contentId"
      ></essay-desc-item>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { loadStoryList } from '@/api'
  import EssayDescItem from '@/components/common/essay-desc-item'
  import { scrollTop, validScrollLoad } from '@/utils'

  export default {
    name: 'storyList',
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters([ 'categories', 'essays', 'essayListScrollY' ]),
      essayListDom () {
        return this.$el.querySelector('.essays')
      }
    },
    components: {
      EssayDescItem
    },
    methods: {
      ...mapMutations([ 'SET_CATEGORIES', 'SET_START_IMAGE', 'SET_ESSAYS', 'SET_ESSAY_LIST_SCROLL_Y' ]),
      back () {
        this.$router.back()
      },
      toDetail (essay) {
        this.$router.push({ name: 'detail', params: { id: essay.contentId } })
      },
      scrollLoad () {
        this.SET_ESSAY_LIST_SCROLL_Y(this.$el.querySelector('.essays').scrollTop)
        /* const category = this.categories.find(x => x.active)
        if (!category) {
          return
        } */
        if (!validScrollLoad(this.essayListDom)) {
          return
        }
        this.loadStory(this.essays)
      },
      loadStory (category, initial = [ ]) {
        if (category.end || this.loading) {
          return Promise.resolve()
        }

        category.pageNo += 1
        this.loading = true
        return loadStoryList(category.pageNo)
          .then(res => {
            if (!res.success) {
              throw new Error('fail')
            }
            if (!res.data.items || res.data.items.length === 0) {
              /* category.end = true */
              throw new Error('end')
            }

            const essays = initial.concat(res.data.items)

            this.SET_ESSAYS({ essays })
            this.loading = false
          })
          .catch(ex => {
            category.pageNo -= 1
            this.loading = false
          })
      },
      beforeMount () {
        if (this.essays) {
          this.$nextTick(_ => {
            scrollTop(this.essayListDom, this.essayListScrollY)
          })
          return
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~styles/vars.less';
  .list {
    position: relative;
    height: 100%;
  }
  .story-head {
    height: 1.17rem;
    line-height: 1.17rem;
    color: #fff;
    text-align: center;
    background: @color-deep;
    font-size: @font-size-large;
    .back {
      float: left;
      margin: 0.3rem 0 0 0.4rem;
    }
  }

  .essays {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: @color-light;
    height: e('calc(100% - 1.17rem)');

    .essay-desc-item {
      background-color: #fff;
      margin-bottom: 0.26rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
