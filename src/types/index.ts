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

export type BoardStateType = {
  status: number,
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
export type StylesType = {
  container: Record<string, string>,
  counter: Record<string, string>,
  timer: Record<string, string>,
  space: Record<string, string>,
  board: Record<string, string>,
  cells: Record<string, string | number>,
  cell: Record<string, string>[],
  cellsOverlay: Record<string, string | number>,
}
