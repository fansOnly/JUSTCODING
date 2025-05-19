import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('app', {
  state: () => {
    return {
      safeAreaInsetBottom: 0,
    }
  },
  actions: {
    setSafeAreaInsetBottom(payload = 0) {
      this.safeAreaInsetBottom = payload
    },
  },
})
