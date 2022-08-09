import { noop } from '@/utils'

type MouseStateType = {
  pressed: number,
}

type MouseHandlerType = (state: MouseStateType, i: number, j: number) => void

type MouseModelType = {
  handleLeftMouseDown: MouseHandlerType,
  handleLeftMouseUp: MouseHandlerType,
  handleLeftMouseOver: MouseHandlerType,
  handleLeftMouseOut: MouseHandlerType,
  handleRightMouseDown: MouseHandlerType,
  handleRightMouseUp: MouseHandlerType,
  handleRightMouseOver: MouseHandlerType,
  handleRightMouseOut: MouseHandlerType,
  handleBothMouseDown: MouseHandlerType,
  handleBothMouseUp: MouseHandlerType,
  handleBothMouseOver: MouseHandlerType,
  handleBothMouseOut: MouseHandlerType,
}

interface IPressedTbl {
  [key: number]: number
}

// mouse events
const eventEnum = {
  MOUSE_DOWN: 0,
  MOUSE_UP: 1,
  MOUSE_OVER: 2,
  MOUSE_OUT: 3,
}

// ev.button values
const evBtnEnum = {
  LEFT: 0,
  RIGHT: 2,
}

// state.pressed values
const pressedEnum = {
  LEFT: 1,
  RIGHT: 2,
}

// ev.button -> state.pressed value
const pressedTbl: IPressedTbl = {
  [evBtnEnum.LEFT]: pressedEnum.LEFT,
  [evBtnEnum.RIGHT]: pressedEnum.RIGHT,
}

const makeDispatch = (model: MouseModelType): MouseHandlerType[][] => [
  [
    noop,
    model.handleLeftMouseDown,
    model.handleRightMouseDown,
    model.handleBothMouseDown,
  ],
  [
    noop,
    model.handleLeftMouseUp,
    model.handleRightMouseUp,
    model.handleBothMouseUp,
  ],
  [
    noop,
    model.handleLeftMouseOver,
    model.handleRightMouseOver,
    model.handleBothMouseOver,
  ],
  [
    noop,
    model.handleLeftMouseOut,
    model.handleRightMouseOut,
    model.handleBothMouseOut,
  ],
]

const wrapModel = (model: MouseModelType) => ({
  dispatch: makeDispatch(model),
  init(): MouseStateType {
    return {
      pressed: 0,
    }
  },
  handleMouseDown(
    state: MouseStateType,
    button: number,
    i: number,
    j: number,
  ): void {
    state.pressed |= pressedTbl[button]
    this.dispatch[eventEnum.MOUSE_DOWN][state.pressed](state, i, j)
  },
  handleMouseUp(state: MouseStateType, i: number, j: number): void {
    if (state.pressed === 0) return
    const pressedOld = state.pressed
    state.pressed = 0
    this.dispatch[eventEnum.MOUSE_UP][pressedOld](state, i, j)
  },
  handleMouseOver(state: MouseStateType, i: number, j: number): void {
    if (state.pressed === 0) return
    this.dispatch[eventEnum.MOUSE_OVER][state.pressed](state, i, j)
  },
  handleMouseOut(state: MouseStateType, i: number, j: number): void {
    if (state.pressed === 0) return
    this.dispatch[eventEnum.MOUSE_OUT][state.pressed](state, i, j)
  },
})

export default wrapModel
