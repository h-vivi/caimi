/*!
 * apis
 * bq-hentai | 07/22/2017
 */

import axios from 'axios'
// import jsonp from 'jsonp'
// import qs from 'qs'
import { toLogin } from '@/utils'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.NODE_ENV === 'development'
                         ? '/serverapi'
                         : 'http://api.caimixinli.com/serverapi/'

const UN_AUTH_CODE = 1022

axios.interceptors.response.use(response => {
  if (Number(response.data.code) === UN_AUTH_CODE) {
    toLogin()
    return
  }
  return response.data
}, error => {
  return Promise.reject(error)
})

// const jsonpWrapper = function (url, data) {
//   return new Promise((resolve, reject) => {
//     jsonp(axios.defaults.baseURL + url, { param: qs.stringify(data) + '&callback' }, (err, data) => {
//       if (err) {
//         reject(err)
//       }
//       if (Number(data.code) === UN_AUTH_CODE) {
//         toLogin()
//         return
//       }
//       resolve(data)
//     })
//   })
// }

export const loadCategories = function () {
  return axios.get('config/init')
}

export const loadEssayList = function ({ pageNo, code }) {
  return axios.get('content/queryContent', {
    params: {
      pageNo,
      categoryCode: code
    }
  })
}

export const loadStoryList = function ({ pageNo }) {
  return axios.get('content/queryMyContent', {
    params: { pageNo }
  })
}

export const loadCollectList = function ({ pageNo }) {
  return axios.get('content/queryMyCollectContent', {
    params: { pageNo }
  })
}

export const getVerifyCode = function ({ phone }) {
  return axios.get('userlogin/getPhoneCheckCode', {
    params: { phone }
  })
}

export const loginViaVerifyCode = function ({ phone, verifyCode }) {
  return axios.get('userlogin/loginNoPassword', {
    params: {
      phone,
      phoneCheckCode: verifyCode
    }
  })
}

export const loginViaPsw = function ({ phone, psw }) {
  return axios.get('userlogin/loginPassword', {
    params: {
      phone,
      password: psw
    }
  })
}

export const getEssayDetail = function ({ contentId }) {
  return axios.get('detail/contentDetail', {
    params: { contentId }
  })
}

export const submitFollowUser = function ({ followUserId }) {
  return axios.get('relation/followUser', {
    params: { followUserId }
  })
}

export const likeArticle = function ({ contentId }) {
  return axios.get('relation/likeContent', {
    params: { contentId }
  })
}

export const collectArticle = function ({ contentId }) {
  return axios.get('relation/collectContent', {
    params: { contentId }
  })
}

export const likeComment = function ({ commentId }) {
  return axios.get('relation/likeComment', {
    params: { commentId }
  })
}

export const sendStory = function ({ title, detail, voiceUrl, imageUrls, categoryCode }) {
  if (!voiceUrl) {
    voiceUrl = ''
  }
  if (!imageUrls) {
    imageUrls = ''
  }
  return axios.get('content/addContent', {
    params: {
      title,
      contentTxt: detail,
      voiceUrl,
      imageUrls,
      categoryCode
    }
  })
}

export const uploadVoice = function ({ fd }) {
  return axios.post(`upload/uploadVoice`, fd)
}

export const uploadImages = function ({ fd }) {
  return axios.post(`upload/uploadImages`, fd)
}

export const commentArticle = function ({
  beCommentUserId,
  contentId,
  commentContent
}) {
  return axios.get('comment/addComment', {
    params: {
      beCommentUserId,
      contentId,
      commentContent
    }
  })
}

export const delContent = function ({ id }) {
  return axios.get('content/delContent', {
    params: {
      contentId: id
    }
  })
}
