/*!
 * apis
 * bq-hentai | 07/22/2017
 */

import axios from 'axios'
// import jsonp from 'jsonp'
// import qs from 'qs'
import { toLogin } from '@/utils'

axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://api.caimixinli.com/serverapi/'
axios.defaults.baseURL = '/serverapi'

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

// jsonpWrapper('/config/init')

export const loadCategories = function () {
  return axios.get('config/init')
  // return jsonpWrapper('config/init')
}

export const loadEssayList = function ({ pageNo, code }) {
  return axios.get('content/queryContent', {
    params: {
      pageNo,
      categoryCode: code
    }
  })
  // return jsonpWrapper('content/queryContent', {
  //   pageNo,
  //   categoryCode: code
  // })
}

export const loadStoryList = function ({ pageNo }) {
  return axios.get('content/queryMyContent', {
    params: { pageNo }
  })
  // return jsonpWrapper('content/queryMyContent', {
  //   pageNo
  // })
}

export const getVerifyCode = function ({ phone }) {
  return axios.get('userlogin/getPhoneCheckCode', {
    params: { phone }
  })
  // return jsonpWrapper('userlogin/getPhoneCheckCode', {
  //   phone
  // })
}

export const loginViaVerifyCode = function ({ phone, verifyCode }) {
  return axios.get('userlogin/loginNoPassword', {
    params: {
      phone,
      phoneCheckCode: verifyCode
    }
  })
  // return jsonpWrapper(`userlogin/loginNoPassword`, {
  //   phone,
  //   phoneCheckCode: verifyCode
  // })
}

export const loginViaPsw = function ({ phone, psw }) {
  return axios.get('userlogin/loginPassword', {
    params: {
      phone,
      password: psw
    }
  })
  // return jsonpWrapper(`userlogin/loginPassword`, {
  //   phone,
  //   password: psw
  // })
}

export const getEssayDetail = function ({ contentId }) {
  return axios.get('detail/contentDetail', {
    params: { contentId }
  })
  // return jsonpWrapper('detail/contentDetail', {
    // contentId
  // })
}

export const submitFollowUser = function ({ followUserId }) {
  return axios.get('relation/followUser', {
    params: { followUserId }
  })
  // return jsonpWrapper('relation/followUser', {
  //   followUserId
  // })
}

export const likeArticle = function ({ contentId }) {
  return axios.get('relation/likeContent', {
    params: { contentId }
  })
  // return jsonpWrapper('relation/likeContent', {
  //   contentId
  // })
}

export const collectArticle = function ({ contentId }) {
  return axios.get('relation/collectContent', {
    params: { contentId }
  })
  // return jsonpWrapper('relation/collectContent', {
  //   contentId
  // })
}

export const likeComment = function ({ commentId }) {
  return axios.get('relation/likeComment', {
    params: { commentId }
  })
  // return jsonpWrapper('relation/likeComment', {
  //   comentId: commentId
  // })
}

export const sendStory = function ({ title, detail, voiceUrl, imageUrls }) {
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
      imageUrls
    }
  })
  // return jsonpWrapper(`content/addContent`, {
  //   title,
  //   contentTxt: detail,
  //   voiceUrl,
  //   imageUrls
  // })
}

export const uploadVoice = function ({ fd }) {
  return axios.post(`upload/uploadVoice`, fd)
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
  // return jsonpWrapper('comment/addComment', {
  //   beCommentUserId,
  //   contentId,
  //   commentContent
  // })
}
