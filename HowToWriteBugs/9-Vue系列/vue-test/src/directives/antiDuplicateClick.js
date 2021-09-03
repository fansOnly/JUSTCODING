/*
 * @Author: fansonly
 * @Date: 2021-08-27 16:19:57
 * @Description: 防重复点击
 * @LastEditTime: 2021-08-27 16:22:53
 */
export default {
  bind(el, {value}) {
    el.click = () => {
      {
        el.style.pointerEvents = 'none'
        setTimeout(() => {
          el.style.pointerEvents = 'auto'
        }, value || 1000);
      }
    }
    el.addEventListener('click', el.click)
  },
  unbind(el) {
    el.removeEventListener('click', e.click)
  }
}
