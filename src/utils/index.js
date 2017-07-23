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
