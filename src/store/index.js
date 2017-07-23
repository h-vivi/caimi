import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {

    },
    categories: [ ]
  },
  mutations: {
    SET_CATEGORIES (state, { categories }) {
      state.categories = categories
    }
  },
  getters: {
    categories: state => state.categories
  },
  actions: {
    setCategories ({ commit }, categories) {
      commit('SET_CATEGORIES', { categories })
    }
  }
})
