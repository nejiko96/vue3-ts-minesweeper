import {
  LevelValueType,
  LevelParamType,
  CustomParamType,
  SizeParamType,
  SizeType,
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

const initParam = (value: number | undefined, rng: ParamRangeType): number => (
  value === undefined ? rng.default : Math.min(Math.max(value, rng.min), rng.max)
)

const initCustomSize = (
  param: CustomParamType,
): SizeType => {
  const width = initParam(param.width, widthDef)
  const height = initParam(param.height, heightDef)
  const mines = initParam(param.mines, minesDef(width * height))
  return { width, height, mines }
}

const levelDef: Record<LevelValueType, SizeType> = {
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

const initSizeByLevel = (state: LevelParamType): SizeType => levelDef[state.level]

const initSize = (param: SizeParamType): SizeType => (
  param.level === 'custom' ? initCustomSize(param) : initSizeByLevel(param)
)

export { initSize }
