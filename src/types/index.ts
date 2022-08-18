//------------------------------------------------------------------------------
// Game Settings
//------------------------------------------------------------------------------
export type ThemeSettingType = {
  name: string,
  size: number,
}

export type StdLevelType = 'easy' | 'medium' | 'hard'
export type CustomLevelType = 'custom'
export type LevelType = StdLevelType | CustomLevelType
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
// Game Model State & Game Store State
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
// Timer Constants
//------------------------------------------------------------------------------
export const TimerModeEnum = {
  READY: 'ready',
  RUNNING: 'running',
  STOPPED: 'stopped',
} as const

export type TimerModeType = typeof TimerModeEnum[keyof typeof TimerModeEnum]

//------------------------------------------------------------------------------
