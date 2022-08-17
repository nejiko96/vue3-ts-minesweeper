import {
  StdLevelType,
  SizeSettingType,
  SizeStateType,
  ParamRangeType,
} from '@/types'

const widthDef: ParamRangeType = {
  min: 9,
  max: 30,
  default: 9,
}

const heightDef: ParamRangeType = {
  min: 9,
  max: 24,
  default: 9,
}

const minesDef = (n: number): ParamRangeType => {
  const pct = 10 + (n / 45 | 0)
  return {
    min: 10,
    max: Math.floor(n * 0.94 - 8.45),
    default: Math.round(n * pct * 0.001) * 10,
  }
}

const adjustParam = (value: number | undefined, rng: ParamRangeType): number => (
  value === undefined ? rng.default : Math.min(Math.max(value, rng.min), rng.max)
)

const calcCustomSize = (
  param: SizeSettingType,
): SizeStateType => {
  const width = adjustParam(param.width, widthDef)
  const height = adjustParam(param.height, heightDef)
  const mines = adjustParam(param.mines, minesDef(width * height))
  return { width, height, mines }
}

const levelDef: Record<StdLevelType, SizeStateType> = {
  easy: {
    width: 9,
    height: 9,
    mines: 10,
  },
  medium: {
    width: 16,
    height: 16,
    mines: 40,
  },
  hard: {
    width: 30,
    height: 16,
    mines: 99,
  },
}

const calcSize = (param: SizeSettingType): SizeStateType => (
  param.level === 'custom' ? calcCustomSize(param) : levelDef[param.level]
)

export { calcSize }
