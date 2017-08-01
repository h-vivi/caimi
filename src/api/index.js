/*!
 * apis
 * bq-hentai | 07/22/2017
 */

import axios from 'axios'
import jsonp from 'jsonp'
import qs from 'qs'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://api.caimixinli.com/serverapi/'

const jsonpWrapper = function (url, data) {
  return new Promise((resolve, reject) => {
    jsonp(axios.defaults.baseURL + url, { param: qs.stringify(data) + '&callback' }, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

export const loadCategories = function () {
  // return axios.get('config/init')
  return jsonpWrapper('config/init')
}

export const loadEssayList = function ({ pageNo, code }) {
  // return axios.get(`content/queryContent?pageNo=${pageNo}&categoryCode=${code}`)
  return jsonpWrapper('content/queryContent', {
    pageNo,
    categoryCode: code
  })
}

export const getVerifyCode = function ({ phone }) {
  // return axios.get(`userlogin/getPhoneCheckCode?phone=${phone}`)
  return jsonpWrapper('userlogin/getPhoneCheckCode', {
    phone
  })
}

export const loginViaVerifyCode = function ({ phone, verifyCode }) {
  // return axios.get(`userlogin/loginNoPassword?phone=${phone}&phoneCheckCode=${verifyCode}`)
  return jsonpWrapper(`userlogin/loginNoPassword`, {
    phone,
    phoneCheckCode: verifyCode
  })
}

export const loginViaPsw = function ({ phone, psw }) {
  // return axios.get(`userlogin/loginPassword?phone=${phone}&password=${psw}`)
  return jsonpWrapper(`userlogin/loginPassword`, {
    phone,
    password: psw
  })
}

export const getEssayDetail = function ({ contentId }) {
  // return axios.get(`detail/contentDetail?contentId=${contentId}`)
  return jsonpWrapper('detail/contentDetail', {
    contentId
  })
}

export const submitFollowUser = function ({ followUserId }) {
  return jsonpWrapper('relation/followUser', {
    followUserId
  })
}
