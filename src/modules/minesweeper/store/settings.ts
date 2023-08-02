import { defineStore } from 'pinia'

import type { LevelType, SettingsType } from '../types'

const useSettingsStore = defineStore('settings', {
  state: (): SettingsType => ({
    lang: 'en',
    theme: {
      name: 'green',
      size: 32,
    },
    board: {
      level: 'easy',
    },
  }),

  getters: {},

  actions: {
    changeLang(lang: string): void {
      this.lang = lang
    },
    changeTheme(name: string, size: number): void {
      this.theme = { name, size }
    },
    changeLevel(level: LevelType): void {
      this.board.level = level
    },
    changeWidth(width: number | undefined): void {
      this.board.width = width
    },
    changeHeight(height: number | undefined): void {
      this.board.height = height
    },
    changeMines(mines: number | undefined): void {
      this.board.mines = mines
    },
  },
})

export { useSettingsStore }
