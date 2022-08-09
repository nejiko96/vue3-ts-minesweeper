import { fillArray, fillArray2D, noop } from '@/utils'
import * as cell from './cellModel'
import sizeGen from './sizeModel'

type GameStateType = {
  level: string,
  width: number,
  height: number,
  mines: number,
  status: number,
  grid: number[][],
  minePos: Record<string, number[]>,
  markPos: Record<string, number[]>,
  countDown: number,
}

const gameStatusEnum = {
  READY: 1,
  RUNNING: 2,
  CLEARED: 4,
  GAMEOVER: 8,
}

const gameStatusFlags = {
  ...gameStatusEnum,
  ENABLED: gameStatusEnum.READY | gameStatusEnum.RUNNING,
}

const isEnabled = (
  state: GameStateType,
) : boolean => (state.status & gameStatusFlags.ENABLED) > 0

const isHidden = (
  state: GameStateType,
  i: number,
  j: number,
): boolean => cell.isHidden(state.grid[i][j])

const relatives = (
  state: GameStateType,
  i: number,
  j: number,
  diffs: number[][],
): number[][] => (
  diffs
    .map(([di, dj]) => [i + di, j + dj])
    .filter(
      ([i2, j2]) => state.grid[i2] && state.grid[i2][j2],
    )
)

const surroundings = (
  state: GameStateType,
  i: number,
  j: number,
): number[][] => (
  relatives(
    state,
    i,
    j,
    [
      [-1, -1], [-1, 0], [-1, 1], [0, 1],
      [1, 1], [1, 0], [1, -1], [0, -1],
    ],
  )
)

const neighbors = (
  state: GameStateType,
  i: number,
  j: number,
): number[][] => (
  relatives(
    state,
    i,
    j,
    [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 0], [0, 1],
      [1, -1], [1, 0], [1, 1],
    ],
  )
)

const generateMines = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  state.minePos = {}
  const w = state.width
  let n = w * state.height
  const samples = fillArray(n, (k) => k)
  const excludes = neighbors(state, i, j).map(([i2, j2]) => i2 * w + j2)
  for (let e = 0; e < excludes.length && n > 0; e++) {
    const k = excludes[e]
    n -= 1;
    [samples[k], samples[n]] = [samples[n], samples[k]]
  }
  for (let m = 0; m < state.mines && n > 0; m++) {
    const k = Math.floor(Math.random() * n)
    const smp = samples[k]
    const [i2, j2] = [smp / w | 0, smp % w]
    state.grid[i2][j2] = cell.putMine(state.grid[i2][j2])
    const pos = [i2, j2]
    state.minePos[pos.toString()] = pos
    n -= 1;
    [samples[k], samples[n]] = [samples[n], samples[k]]
  }
}

const start = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  generateMines(state, i, j)
  state.status = gameStatusEnum.RUNNING
}

const toggleMark = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  const [f, result] = cell.toggleMark(state.grid[i][j])
  state.grid[i][j] = f
  if (result === cell.resultEnum.NONE) {
    return
  }
  const pos = [i, j]
  const key = pos.toString()
  if (result === cell.resultEnum.MARKED) {
    state.markPos[key] = pos
  }
  if (result === cell.resultEnum.UNMARKED) {
    delete state.markPos[key]
  }
}

const postOpen = (
  state: GameStateType,
  i: number,
  j: number,
): number[][] => {
  const surr = surroundings(state, i, j)
  const hint = surr
    .filter((pos) => state.minePos[pos.toString()])
    .length
  state.grid[i][j] = cell.setHint(state.grid[i][j], hint)
  return hint > 0 ? [] : surr
}

const open = (
  state: GameStateType,
  i: number,
  j: number,
): number => {
  const [f, result] = cell.open(state.grid[i][j])
  state.grid[i][j] = f
  if (result === cell.resultEnum.OPENED) {
    state.countDown -= 1
    postOpen(state, i, j).forEach(([i2, j2]) => open(state, i2, j2))
  }
  return result
}

const areaOpen = (
  state: GameStateType,
  i: number,
  j: number,
): number => {
  const hint = cell.getHint(state.grid[i][j])
  // exit if not empty
  if (hint < 0) {
    return cell.resultEnum.NONE
  }
  const surr = surroundings(state, i, j)
  const marks = surr
    .filter((pos) => state.markPos[pos.toString()])
    .length
  if (marks !== hint) {
    return cell.resultEnum.NONE
  }
  return surr
    .map(([i2, j2]) => open(state, i2, j2))
    .reduce((a, b) => a | b, cell.resultEnum.NONE)
}

const gameClear = (state: GameStateType): void => {
  state.status = gameStatusEnum.CLEARED
  Object.entries(state.minePos)
    .forEach(([key, pos]) => {
      const [i, j] = pos
      state.markPos[key] = pos
      state.grid[i][j] = cell.forceMark(state.grid[i][j])
    })
}

const gameOver = (state: GameStateType): void => {
  state.status = gameStatusEnum.GAMEOVER
  const mineMarkPos = {
    ...state.minePos,
    ...state.markPos,
  }
  Object.values(mineMarkPos)
    .forEach(([i, j]) => {
      [state.grid[i][j]] = cell.open(state.grid[i][j], false)
    })
}

const init = (state: GameStateType): void => {
  const { width, height, mines } = sizeGen(state)
  Object.assign(state, {
    width,
    height,
    mines,
    status: gameStatusEnum.READY,
    grid: fillArray2D(width, height, cell.initialValue),
    minePos: {},
    markPos: {},
    countDown: width * height - mines,
  })
}

const handleLeftMouseDown = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  state.grid[i][j] = cell.press(state.grid[i][j])
}

const handleLeftMouseOver = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  state.grid[i][j] = cell.press(state.grid[i][j])
}

const handleLeftMouseOut = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  state.grid[i][j] = cell.release(state.grid[i][j])
}

const handleLeftMouseUp = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  state.grid[i][j] = cell.release(state.grid[i][j])
  if (state.status === gameStatusEnum.READY) {
    start(state, i, j)
  }
  const result = open(state, i, j)
  if (result === cell.resultEnum.EXPLODED) {
    gameOver(state)
  } else if (state.countDown <= 0) {
    gameClear(state)
  }
}

const handleRightMouseDown = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  state.grid[i][j] = cell.release(state.grid[i][j])
  toggleMark(state, i, j)
}

const handleRightMouseOver = noop

const handleRightMouseOut = noop

const handleRightMouseUp = noop

const handleBothMouseDown = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  neighbors(state, i, j).forEach(
    ([i2, j2]) => { state.grid[i2][j2] = cell.press(state.grid[i2][j2]) },
  )
}

const handleBothMouseOver = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  neighbors(state, i, j).forEach(
    ([i2, j2]) => { state.grid[i2][j2] = cell.press(state.grid[i2][j2]) },
  )
}

const handleBothMouseOut = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  neighbors(state, i, j).forEach(
    ([i2, j2]) => {
      state.grid[i2][j2] = cell.release(state.grid[i2][j2])
    },
  )
}

const handleBothMouseUp = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (!isEnabled(state)) {
    return
  }
  neighbors(state, i, j).forEach(
    ([i2, j2]) => {
      state.grid[i2][j2] = cell.release(state.grid[i2][j2])
    },
  )
  const result = areaOpen(state, i, j)
  if (result & cell.resultEnum.EXPLODED) {
    gameOver(state)
  } else if (state.countDown <= 0) {
    gameClear(state)
  }
}

const handleTouchStart = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (isHidden(state, i, j)) {
    handleLeftMouseDown(state, i, j)
  } else {
    handleBothMouseDown(state, i, j)
  }
}

const handleTouchEnd = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (isHidden(state, i, j)) {
    handleLeftMouseUp(state, i, j)
  } else {
    handleBothMouseUp(state, i, j)
  }
}

const handleLongPress = (
  state: GameStateType,
  i: number,
  j: number,
): void => {
  if (isHidden(state, i, j)) {
    handleRightMouseDown(state, i, j)
  } else {
    handleBothMouseUp(state, i, j)
  }
}

export {
  gameStatusFlags,
  init,
  handleLeftMouseDown,
  handleLeftMouseOver,
  handleLeftMouseOut,
  handleLeftMouseUp,
  handleRightMouseDown,
  handleRightMouseOver,
  handleRightMouseOut,
  handleRightMouseUp,
  handleBothMouseDown,
  handleBothMouseOver,
  handleBothMouseOut,
  handleBothMouseUp,
  handleTouchStart,
  handleTouchEnd,
  handleLongPress,
}
