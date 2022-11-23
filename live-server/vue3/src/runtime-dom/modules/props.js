

export function patchDOMProp(el, key, value) {
  let needRemove = false

  if (value === null || value === '') {
    const type = typeof el[key]
    if (type === 'boolean') {
      // e.g. <button disabled></button> to <button :disabled="true"></button>
      value = true
    } else if (value === null && type === 'string') {
      // e.g. <div :id="null"></div>
      value = ''
      needRemove = true
    } else if (type === 'number') {
      // e.g. <img :width="null" />
      value = 0
      needRemove = true
    }
  }

  try {
    el[key] = value
  } catch (error) {}
  
  needRemove && el.removeAttribute(key)
}
