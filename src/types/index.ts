//------------------------------------------------------------------------------
// Game Settings
//------------------------------------------------------------------------------
export type ThemeSettingType = {
  name: string,
  size: number,
}

export type StdLevelType = 'easy' | 'medium' | 'hard'
export type LevelType = StdLevelType | 'custom'

export type SizeSettingType = {
  level: LevelType,
  width?: number,
  height?: number,
  mines?: number,
}

export type SettingsType = {
  lang: string,
  theme: ThemeSettingType,
  board: SizeSettingType,
}

//------------------------------------------------------------------------------
// Game Model & Game Store
//------------------------------------------------------------------------------
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

export type SizeStateType = {
  width: number,
  height: number,
  mines: number,
}

export type GameStatusType = typeof GameStatusEnum[keyof typeof GameStatusEnum]

export type BoardStateType = {
  status: GameStatusType,
  grid: number[][],
  minePos: Record<string, number[]>,
  markPos: Record<string, number[]>,
  countDown: number,
}

export type GameModelStateType = SizeStateType & BoardStateType

export type ThemeStatusType = { theme: ThemeSettingType }

export type MouseStateType = { pressed: number }

export type TouchStateType = { touch: boolean }

export type GameStoreStateType = (
  ThemeStatusType
  & GameModelStateType
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
// Timer Constants
//------------------------------------------------------------------------------
export const TimerModeEnum = {
  READY: 'ready',
  RUNNING: 'running',
  STOPPED: 'stopped',
} as const

export type TimerModeType = typeof TimerModeEnum[keyof typeof TimerModeEnum]

//------------------------------------------------------------------------------
export type GridPosType = {
  row: number,
  col: number,
}
export type GridClickType = { button: number } & GridPosType
