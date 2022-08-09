type LevelParamType = {
  level: 'easy' | 'medium' | 'hard',
}

type CustomParamType = {
  level: 'custom',
  width: number | undefined,
  height: number | undefined,
  mines: number | undefined,
}

type SizeType = {
  width: number,
  height: number,
  mines: number,
}

type RangeType = {
  min: number,
  max: number,
  default: number,
}

const levelDef = {
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

const levelToSize = (state: LevelParamType): SizeType => levelDef[state.level]

const widthDef: RangeType = {
  min: 9,
  max: 30,
  default: 9,
}

const heightDef: RangeType = {
  min: 9,
  max: 24,
  default: 9,
}

const minesDef = (n: number): RangeType => {
  const pct = 10 + (n / 45 | 0)
  return {
    min: 10,
    max: Math.floor(n * 0.94 - 8.45),
    default: Math.round(n * pct * 0.001) * 10,
  }
}

const initParam = (value: number | undefined, rng: RangeType): number => (
  value === undefined ? rng.default : Math.min(Math.max(value, rng.min), rng.max)
)

const customSize = (state: CustomParamType) => {
  const width = initParam(state.width, widthDef)
  const height = initParam(state.height, heightDef)
  const mines = initParam(state.mines, minesDef(width * height))
  return { width, height, mines }
}

const sizeGen = (state: LevelParamType | CustomParamType): SizeType => (
  state.level === 'custom' ? customSize(state) : levelToSize(state)
)

export default sizeGen
