import { fillArray } from '../../../core/utils'

export type T3ResultType = 'first' | 'second' | 'draw'

export type T3StateType = {
  result: T3ResultType
  next: number[]
}

type T3CheckerType = {
  result: T3ResultType
  pat: RegExp
}

class T3Model {
  static CHECKER_TBL: T3CheckerType[] = [
    {
      result: 'first',
      pat: /^(ooo......|...ooo...|......ooo|o..o..o..|.o..o..o.|..o..o..o|o...o...o|..o.o.o..)$/,
    },
    {
      result: 'second',
      pat: /^(xxx......|...xxx...|......xxx|x..x..x..|.x..x..x.|..x..x..x|x...x...x|..x.x.x..)$/,
    },
    { result: 'draw', pat: /^[ox]+$/ },
  ]

  static #states: Record<string, T3StateType> = {}

  static solve: (t3: T3Model) => T3StateType = (t3) => {
    T3Model.#states[t3.board] ||= T3Model.#dfs(t3)
    return T3Model.#states[t3.board]
  }

  static #dfs: (t3: T3Model) => T3StateType = (t3) => {
    let result = t3.check()
    let next: number[] = []
    if (result !== null) return { result, next }
    const nextByResult: Record<T3ResultType, number[]> = {
      first: [],
      second: [],
      draw: [],
    }
    fillArray(9, (k) => k + 1).forEach((k) => {
      const t32 = new T3Model(t3)
      if (!t32.put(k)) return
      const state2 = T3Model.solve(t32)
      nextByResult[state2.result].push(k)
    })
    const results: T3ResultType[] = t3.turn
      ? ['first', 'draw', 'second']
      : ['second', 'draw', 'first']
    result = results.find((r) => nextByResult[r].length > 0) as T3ResultType
    next = nextByResult[result]
    return { result, next }
  }

  board: string

  turn: boolean

  constructor()
  constructor(t3: T3Model)
  constructor(obj?: T3Model) {
    if (obj === undefined) {
      this.board = '---------'
      this.turn = true
    } else {
      this.board = obj.board
      this.turn = obj.turn
    }
  }

  disp: () => string = () => this.board.replace(/.{3}/g, '$&\n')

  check: () => T3ResultType | null = () =>
    T3Model.CHECKER_TBL.find((chk) => this.board.match(chk.pat))?.result || null

  put: (k1: number) => boolean = (k1) => {
    const k = k1 - 1
    if (this.board[k] !== '-') return false
    this.board = this.board
      .split('')
      .map((v, i) => {
        if (i === k) return this.turn ? 'o' : 'x'
        return v
      })
      .join('')
    this.turn = !this.turn
    return true
  }
}

export default T3Model
