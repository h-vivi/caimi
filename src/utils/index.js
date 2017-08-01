/*!
 * utils
 * bq-hentai | 07/22/2017
 */

export const setDefaultIf = function (fn, x, v, thisArg) {
  if (fn.call(thisArg, x)) {
    return x
  }
  return v
}

export const scrollTop = function (dom, top = 0) {
  dom.scrollTop = top
}

export const validScrollLoad = function (dom, percent = 0.7, max) {
  return dom.scrollTop / (dom.scrollHeight - dom.offsetHeight) > percent
}

export const seconds2minutes = function (seconds) {
  seconds = Number(seconds)
  if (Number.isNaN(seconds)) {
    seconds = 0
  }
  seconds = Math.floor(seconds)
  return addZero(Math.floor(seconds / 60)) + ':' + addZero(seconds % 60)
}

export const addZero = function (n) {
  n = Number(n)
  if (n < 0) {
    return '00'
  }
  if (n < 10) {
    return `0${n}`
  }
  return String(n)
}
