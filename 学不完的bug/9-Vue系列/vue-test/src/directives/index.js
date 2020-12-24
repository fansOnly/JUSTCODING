import copy from './copy'
import longpress from './longpress'
import debounce from './debounce'
import lazyLoad from './lazyLoad'
import permission from './permission'
import waterMarker from './waterMarker'
import draggable from './draggable'

const directives = {
    copy,
    longpress,
    debounce,
    lazyLoad,
    permission,
    waterMarker,
    draggable
}


export default {
    install(Vue) {
      Object.keys(directives).forEach((key) => {
        Vue.directive(key, directives[key])
      })
    },
  }
