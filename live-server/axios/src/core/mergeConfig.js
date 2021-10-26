import { merge } from '../utils.js'

export default function mergeConfig(config1, config2 = {}) {
  return merge(config1, config2)
}
