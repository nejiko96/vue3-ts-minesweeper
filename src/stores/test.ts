// https://www.aska-ltd.jp/jp/blog/242
import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {

  state: () => ({
    counter: 0,
  }),

  getters: {
    doubleCount: (state) => state.counter * 2,
  },

  actions: {
    increment() {
      this.counter += 1
    },
    decrement() {
      this.counter -= 1
    },
  },
})
