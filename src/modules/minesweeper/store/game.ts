import { defineStore } from 'pinia'

import * as gameModel from '../models/gameModel'
import { makeWrapper } from '../models/mouseEventModel'
import type {
  GameStoreStateType,
  GridClickType,
  GridPosType,
  SizeSettingType,
} from '../types'
import { GameStatusFlags } from '../types'

const mouseModel = makeWrapper(gameModel)

const useGameStore = defineStore('game', {
  state: (): GameStoreStateType => ({
    ...gameModel.initAll({ level: 'easy' }),
    ...mouseModel.initState(),
    touch: false,
  }),

  getters: {
    remain: (state) => state.mines - Object.keys(state.markPos).length,
    overlay: (state) =>
      (state.status & GameStatusFlags.ENABLED) > 0 && state.touch,
  },

  actions: {
    changeSize(size: SizeSettingType): void {
      Object.assign(this, {
        ...gameModel.initAll(size),
        ...mouseModel.initState(),
        touch: false,
      })
    },
    restart(): void {
      Object.assign(this, {
        ...gameModel.initBoard(this),
        ...mouseModel.initState(),
        touch: false,
      })
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
