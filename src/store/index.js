import Vue from 'vue'
import Vuex from 'vuex'

import { loadCategories, loadEssayList } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {

    },
    startImage: { },
    categories: [ ],
    essays: [ ],
    essayListScrollY: 0
  },
  mutations: {
    SET_CATEGORIES (state, { categories }) {
      state.categories = categories
    },
    SET_START_IMAGE (state, { o }) {
      state.startImage = o
    },
    SET_ESSAYS (state, { essays }) {
      state.essays = essays
    },
    SET_ESSAY_LIST_SCROLL_Y (state, y) {
      state.essayListScrollY = y
    }
  },
  getters: {
    categories: state => state.categories,
    essays: state => state.essays,
    essayListScrollY: state => state.essayListScrollY
  },
  actions: {
    async getCategories ({ state, commit }) {
      if (state.categories.length) {
        return
        // return Promise.resolve(state.categories)
      }
      const res = await loadCategories()
      let data = res.data
      if (data.success) {
        data = data.data
        commit('SET_START_IMAGE', {
          o: {
            src: data.startImg.imgUrl,
            referrer: data.startImg.url
          }
        })
        const categories = data.categorys.map(x => ({
          code: x.categoryCode,
          name: x.categoryName
        }))
        commit('SET_CATEGORIES', { categories })
      }
    },
    async getEssayList ({ state, getters, commit }) {
      if (state.essayList) {
        return Promise.resolve(state.essayList)
      }
      const essayList = await loadEssayList()
      console.log('essayList', essayList)
    }
  }
})
