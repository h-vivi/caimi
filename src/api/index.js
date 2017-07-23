/*!
 * apis
 * bq-hentai | 07/22/2017
 */

import axios from 'axios'

axios.defaults.baseURL = 'http://api.caimixinli.com/serverapi/'

export const getCategories = function () {
  // return axios.get()
  return Promise.resolve({
    success: true,
    msg: '成功.',
    code: 1001,
    data: {
      startImg: {
        imgUrl: 'http://pic.58pic.com/58pic/16/69/41/53G58PICn6P_1024.jpg',
        url: ''
      },
      categorys: [
        {
          categoryName: '推荐',
          categoryCode: 'tuijian'
        },
        {
          categoryName: '恋爱',
          categoryCode: 'lianai'
        },
        {
          categoryName: '校园',
          categoryCode: 'xiaoyuan'
        }
      ]
    }
  })
}

export const getEssayList = function ({ pageNo, code }) {
  return axios.get(`content/queryContent?pageNo=${pageNo}&categoryCode=${code}`)
}
