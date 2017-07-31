<template>
  <div class="list">
    <x-header class="header" :items="categories" @to-certain-item="toItem"></x-header>
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
  import { loadCategories, loadEssayList } from '@/api'
  import XHeader from '@/components/common/header'
  import EssayDescItem from '@/components/common/essay-desc-item'
  import { scrollTop, validScrollLoad } from '@/utils'

  export default {
    name: 's',
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapGetters([ 'categories', 'essays', 'essayListScrollY' ]),
      essayListDom () {
        return this.$el.querySelector('.essays')
      }
    },
    components: {
      XHeader,
      EssayDescItem
    },
    methods: {
      ...mapMutations([ 'SET_CATEGORIES', 'SET_START_IMAGE', 'SET_ESSAYS', 'SET_ESSAY_LIST_SCROLL_Y' ]),
      handleStart ({ imageUrl, referrer, categories }) {
        categories = categories.map(x => ({
          name: x.categoryName,
          code: x.categoryCode
        }))

        this.SET_CATEGORIES({ categories })

        if (categories.length > 0) {
          this.toItem({ item: categories[0], first: true })
        }
      },
      toDetail (essay) {
        this.$router.push({ name: 'detail', params: { id: essay.contentId } })
      },
      scrollLoad () {
        this.SET_ESSAY_LIST_SCROLL_Y(this.$el.querySelector('.essays').scrollTop)
        const category = this.categories.find(x => x.active)
        if (!category) {
          return
        }
        if (!validScrollLoad(this.essayListDom)) {
          return
        }
        this.loadEssays(category, this.essays)
      },
      loadEssays (category, initial = [ ]) {
        if (category.end || this.loading) {
          return Promise.resolve()
        }

        category.pageNo += 1
        this.loading = true
        return loadEssayList(category)
          .then(res => {
            if (!res.success) {
              throw new Error('fail')
            }
            if (!res.data.items || res.data.items.length === 0) {
              category.end = true
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
      toItem ({ item, first }) {
        if (!item) {
          return
        }
        item.pageNo = -1
        item.end = false
        this.loadEssays(item)
          .then(res => {
            const categories = this.categories.map(x => {
              x.active = x.code === item.code
              return x
            })
            this.SET_CATEGORIES({ categories: categories })

            !first && scrollTop(this.$el.querySelector('.essays'))
          })
      }
    },
    beforeMount () {
      if (this.categories.length && this.essays) {
        this.$nextTick(_ => {
          scrollTop(this.essayListDom, this.essayListScrollY)
        })
        return
      }
      loadCategories()
        .then(res => {
          if (!res.success) {
            return
          }
          const data = res.data
          this.handleStart({
            imageUrl: data.startImg.imgUrl,
            referrer: data.startImg.url,
            categories: data.categorys
          })
        })
        .catch(ex => { /* Ignore */ })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .list {
    position: relative;
    height: 100%;

    .header {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 1.17rem;
      line-height: 1.17rem;
      z-index: 2;
    }
    .essays {
      position: relative;
      height: 100%;
      padding-top: 1.17rem;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 1;
      background: @color-light;

      .essay-desc-item {
        margin-bottom: 0.266rem;
        background-color: #fff;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
