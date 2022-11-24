import { fillArray, shuffle } from '@/utils'

type NeighborType = {
  di: number
  dj: number
  move: string
}

const neighbors: Readonly<NeighborType[]> = [
  { di: 1, dj: 0, move: 'down' },
  { di: 0, dj: 1, move: 'right' },
  { di: -1, dj: 0, move: 'up' },
  { di: 0, dj: -1, move: 'left' },
]

class SlidePuzzle {
  // 転倒数
  static inversionNumber(arr: number[]): number {
    let ret = 0 // 転倒数
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) ret += 1
      }
    }
    return ret
  }

  n: number

  n2: number

  #panels: number[] | null = null

  #completeStatus: string | null = null

  constructor(n: number) {
    if (n < 2) throw new Error('n must satisfy n >= 2.')
    this.n = n
    this.n2 = this.n ** 2
  }

  get panels(): number[] {
    this.#panels ||= fillArray(this.n2, (k) => k + 1)
    return this.#panels
  }

  get completeStatus(): string {
    this.#completeStatus ||= JSON.stringify(this.arrToGrid(this.panels))
    return this.#completeStatus
  }

  // 空きマスの移動距離
  movesOfEmptyCell(arr: number[]): number {
    const i = arr.findIndex((v) => v === this.n2)
    return ((i / this.n) | 0) + (i % this.n)
  }

  // 最初の２つを交換
  swapTop2(arr: number[]): void {
    let [i, j] = [0, 1]
    if (arr[0] === this.n2) [i, j] = [1, 2]
    if (arr[1] === this.n2) [i, j] = [0, 2]
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  // 配列->グリッド変換
  arrToGrid(arr: number[]): number[][] {
    return fillArray(this.n, (i) => arr.slice(i * this.n, (i + 1) * this.n))
  }

  // グリッド生成
  generateGrid(): number[][] {
    const arr = shuffle(this.panels)
    const invNum = SlidePuzzle.inversionNumber(arr)
    const dist = this.movesOfEmptyCell(arr)
    if ((invNum + dist) % 2 > 0) this.swapTop2(arr)
    return this.arrToGrid(arr)
  }

  // スライド
  slideAt = (grid: number[][], i: number, j: number): string => {
    const v = grid[i][j]
    const nb = neighbors
      .map(({ di, dj, move }) => ({ i2: i + di, j2: j + dj, move }))
      .find(({ i2, j2 }) => grid[i2] && grid[i2][j2] === this.n2)
    if (!nb) return ''
    const { i2, j2, move } = nb
    grid[i2][j2] = v
    grid[i][j] = this.n2
    return move
  }

  // 完成判定
  isComplete(grid: number[][]): boolean {
    return JSON.stringify(grid) === this.completeStatus
  }
}

export default SlidePuzzle
