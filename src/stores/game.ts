import { defineStore } from 'pinia'

import { SizeParamType } from '@/models/sizeModel'
import * as gameModel from '@/models/gameModel'
import { makeWrapper, MouseStateType } from '@/models/mouseEventModel'

type TouchStateType = { touch: boolean }
type GameUIStateType = gameModel.GameStateType & MouseStateType & TouchStateType

type ButtonType = { button: number }
type GridPosType = {
  row: number,
  col: number,
}
type GridClickType = ButtonType & GridPosType

const mouseModel = makeWrapper(gameModel)

const useGameStore = defineStore('test', {
  state: ():GameUIStateType => ({
    ...gameModel.initState({ level: 'easy' }),
    ...mouseModel.initMouseEvent(),
    touch: false,
  }),

  // getters: {

  // },

  actions: {
    init(param: SizeParamType):void {
      gameModel.setSize(this, param)
    },
    restart(): void {
      gameModel.restart(this)
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
