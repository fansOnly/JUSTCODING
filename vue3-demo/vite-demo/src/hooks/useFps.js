import { ref } from 'vue'

export const useFps = (interval = 10) => {
  const fps = ref(0)

  let last = performance.now()
  let count = 0

  const update = () => {
    count += 1;
    if (count > interval) {
      const now = performance.now()
      const diff = now - last
      fps.value = Math.round(1000 / (diff / count))
      last = now
      count = 0
    }

    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)

  return fps
}