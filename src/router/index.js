import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/pages/login'
// import Register from '@/components/pages/register'
import Findpsw from '@/components/pages/findpsw'
import Resetpsw from '@/components/pages/resetpsw'
import S from '@/components/pages/s'
import List from '@/components/pages/list'
import Mine from '@/components/pages/mine'
import Detail from '@/components/pages/detail'
import Story from '@/components/pages/story'
import Settings from '@/components/pages/settings'
// import Hello from '@/components/Hello'

Vue.use(Router)

/**
 * 登录 [ 密码 | 免密 ]
 * 找回密码
 * 列表
 * 详情
 * 设置
 */

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/resetpsw',
      name: 'resetpsw',
      component: Resetpsw
    },
    // {
      // path: '/register',
      // name: 'register',
      // component: Register
    // },
    {
      path: '/findpsw',
      name: 'findpsw',
      component: Findpsw
    },
    {
      path: '/s',
      name: 's',
      component: S,
      redirect: { name: 's::list' },
      children: [
        {
          path: 'list',
          name: 's::list',
          component: List
        },
        {
          path: 'mine',
          name: 's::mine',
          component: Mine
        }
      ]
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/story',
      name: 'story',
      component: Story
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '*',
      redirect: { name: 's::list' }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  }
})
