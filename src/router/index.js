import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/pages/login'
import Psw from '@/components/pages/psw'
import S from '@/components/pages/s'
import List from '@/components/pages/list'
import Mine from '@/components/pages/mine'
import Detail from '@/components/pages/detail'
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
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/psw',
      name: 'psw',
      component: Psw
    },
    {
      path: '/register',
      name: 'register',
      component: Login
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
      path: '*',
      redirect: { name: 'login' }
    }
  ]
})
