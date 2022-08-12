import { CSSProperties } from 'vue'

//------------------------------------------------------------------------------
// Game Settings
//------------------------------------------------------------------------------
export type LevelValueType = 'easy' | 'medium' | 'hard'

export type LevelParamType = {
  level: LevelValueType,
}

export type CustomParamType = {
  level: 'custom',
  width: number | undefined,
  height: number | undefined,
  mines: number | undefined,
}

export type SizeParamType = LevelParamType | CustomParamType

export type SettingsType = {
  lang: string,
  theme: string,
  cellSize: number,
  board: SizeParamType,
}

//------------------------------------------------------------------------------
// Game Model & Game Store
//------------------------------------------------------------------------------
export type SizeType = {
  width: number,
  height: number,
  mines: number,
}

export const GameStatusEnum = {
  READY: 1,
  RUNNING: 2,
  CLEARED: 4,
  GAMEOVER: 8,
} as const

export const GameStatusFlags = {
  ...GameStatusEnum,
  ENABLED: GameStatusEnum.READY | GameStatusEnum.RUNNING,
} as const

export type GameStatusType = typeof GameStatusEnum[keyof typeof GameStatusEnum]

export type BoardStateType = {
  status: GameStatusType,
  grid: number[][],
  minePos: Record<string, number[]>,
  markPos: Record<string, number[]>,
  countDown: number,
}

export type GameModelStateType = SizeType & BoardStateType

export type MouseStateType = { pressed: number }

export type TouchStateType = { touch: boolean }

export type GameStoreStateType = (
  GameModelStateType
  & MouseStateType
  & TouchStateType
)

//------------------------------------------------------------------------------
// Board Size Parameter
//------------------------------------------------------------------------------
export type ParamRangeType = {
  min: number,
  max: number,
  default: number,
}

//------------------------------------------------------------------------------
// Mouse Event Model
//------------------------------------------------------------------------------
export type TgtHandlerType<S> = (
  state: S,
  i: number,
  j: number
) => void

export type TgtModelType<S> = {
  handleLeftMouseDown: TgtHandlerType<S>,
  handleLeftMouseUp: TgtHandlerType<S>,
  handleLeftMouseOver: TgtHandlerType<S>,
  handleLeftMouseOut: TgtHandlerType<S>,
  handleRightMouseDown: TgtHandlerType<S>,
  handleRightMouseUp: TgtHandlerType<S>,
  handleRightMouseOver: TgtHandlerType<S>,
  handleRightMouseOut: TgtHandlerType<S>,
  handleBothMouseDown: TgtHandlerType<S>,
  handleBothMouseUp: TgtHandlerType<S>,
  handleBothMouseOver: TgtHandlerType<S>,
  handleBothMouseOut: TgtHandlerType<S>,
}

//------------------------------------------------------------------------------
export type GridPosType = {
  row: number,
  col: number,
}
export type GridClickType = { button: number } & GridPosType

//------------------------------------------------------------------------------
export type StyleType = CSSProperties

export type StylesType = {
  container: StyleType,
  counter: StyleType,
  timer: StyleType,
  space: StyleType,
  board: StyleType,
  cells: StyleType,
  cell: StyleType[],
  cellsOverlay: StyleType,
}

//------------------------------------------------------------------------------
export const TimerModeEnum = {
  READY: 'ready',
  RUNNING: 'running',
  STOPPED: 'stopped',
} as const

export type TimerModeType = typeof TimerModeEnum[keyof typeof TimerModeEnum]
