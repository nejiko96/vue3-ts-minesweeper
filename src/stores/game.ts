import { defineStore } from 'pinia'

import {
  ThemeSettingType,
  SizeSettingType,
  GameStoreStateType,
} from '@/types'
import * as gameModel from '@/models/gameModel'
import { makeWrapper } from '@/models/mouseEventModel'

type GridPosType = {
  row: number,
  col: number,
}

type GridClickType = { button: number } & GridPosType

const mouseModel = makeWrapper(gameModel)

const useGameStore = defineStore('game', {
  state: (): GameStoreStateType => ({
    theme: { name: 'green', size: 32 },
    ...gameModel.initAll({ level: 'easy' }),
    ...mouseModel.initState(),
    touch: false,
  }),

  getters: {
    remain: (state) => (state.mines - Object.keys(state.markPos).length),
  },

  actions: {
    changeTheme(theme: ThemeSettingType): void {
      this.theme = theme
    },
    changeSize(size: SizeSettingType): void {
      gameModel.resetAll(this, size)
    },
    restart(): void {
      gameModel.resetBoard(this)
    },
    mouseDown({ button, row, col }: GridClickType): void {
      mouseModel.handleMouseDown(this, button, row, col)
    },
    mouseUp({ row, col }: GridPosType): void {
      mouseModel.handleMouseUp(this, row, col)
    },
    mouseOver({ row, col }: GridPosType): void {
      mouseModel.handleMouseOver(this, row, col)
    },
    mouseOut({ row, col }: GridPosType): void {
      mouseModel.handleMouseOut(this, row, col)
    },
    touchStart({ row, col }: GridPosType): void {
      this.touch = true
      gameModel.handleTouchStart(this, row, col)
    },
    touchEnd({ row, col }: GridPosType): void {
      this.touch = false
      gameModel.handleTouchEnd(this, row, col)
    },
    longPress({ row, col }: GridPosType): void {
      this.touch = false
      gameModel.handleLongPress(this, row, col)
    },
  },
})

export { useGameStore }
