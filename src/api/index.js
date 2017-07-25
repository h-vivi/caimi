/*!
 * apis
 * bq-hentai | 07/22/2017
 */

import axios from 'axios'

// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://api.caimixinli.com/serverapi/'

export const getCategories = function () {
  return axios.get('http://api.caimixinli.com/serverapi/config/init')
}

export const getEssayList = function ({ pageNo, code }) {
  return axios.get(`content/queryContent?pageNo=${pageNo}&categoryCode=${code}`)
}

export const getVerifyCode = function ({ phone }) {
  return axios.get(`userlogin/getPhoneCheckCode?phone=${phone}`)
}

export const loginViaVerifyCode = function ({ phone, verifyCode }) {
  return axios.get(`userlogin/loginNoPassword?phone=${phone}&phoneCheckCode=${verifyCode}`)
}

export const loginViaPsw = function ({ phone, psw }) {
  return axios.get(`userlogin/loginPassword?phone=${phone}&password=${psw}`)
}

export const getEssayDetail = function ({ contentId }) {
  return axios.get(`detail/contentDetail?contentId=${contentId}`)
}
