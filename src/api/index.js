/*!
 * apis
 * bq-hentai | 07/22/2017
 */

import axios from 'axios'

axios.defaults.baseURL = 'http://api.caimixinli.com/serverapi/'

export const getCategories = function () {
  return axios.get('http://api.caimixinli.com/serverapi/config/init')
}

export const getEssayList = function ({ pageNo, code }) {
  return axios.get(`content/queryContent?pageNo=${pageNo}&categoryCode=${code}`)
}
