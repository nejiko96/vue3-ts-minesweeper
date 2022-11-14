import {
  deleteChars,
  selectChars,
  sample,
  uniq,
  repeatedPermutation,
  fillArray,
  permutation,
} from '@/utils'
import samplesRaw from '@/resource/nerdle-samples.txt?raw'
import NerdleParser from './NerdleParser'

export type NerdleHintType = {
  position: number
  letter: string
  state: number
}

const escapeOps = (str: string): string => str.replace(/[*+/=]/g, '\\$&')

const escapeMinus = (str: string): string => str.replace(/-/g, '\\$&')

const intersection = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const ret = new Set<T>()
  setB.forEach((elem) => {
    if (setA.has(elem)) {
      ret.add(elem)
    }
  })
  return ret
}

const difference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  const ret = new Set<T>(setA)
  setB.forEach((elem) => {
    ret.delete(elem)
  })
  return ret
}

class NerdleHelper {
  static ALL_DIGITS = '0123456789'

  static ALL_OPS = '+*/-'

  static ALL_CHARS = `${NerdleHelper.ALL_DIGITS}=${NerdleHelper.ALL_OPS}`

  static #SAMPLES: string[] = samplesRaw.split('\n')

  static generateSamples(): string[] {
    const ret: string[] = []
    const ds = fillArray(10, (k) => k)
    const ps = permutation(ds)
    ps.forEach(([a, b, c, d, e, f, g, h, i, j]) => {
      if (a === 0 || i === 0 || c === 0) return

      const ab = a * 10 + b
      if (ab % c) return
      if (ab / c + d !== e) return

      const ij = i * 10 + j
      if (f * g - h !== ij) return

      ret.push(`${ab}/${c}+${d}=${e} ${f}*${g}-${h}=${ij}`)
    })
    return ret
  }

  static get suggest(): string[] {
    return sample(NerdleHelper.#SAMPLES).split(' ')
  }

  hs: NerdleHintType[]

  #got: string | null = null

  #digits: string | null = null

  #otherDigits: string | null = null

  #ops: string[] | null = null

  #nums: string[] | null = null

  #excludePat: RegExp | null = null

  #includePat: RegExp | null = null

  #search: string[] | null = null

  constructor(str: string)
  constructor(hs: NerdleHintType[])
  constructor(obj: any) {
    if (typeof obj === 'string') {
      const ms = obj.match(/[0-9+*/=-](!|\?)?/g) || []
      this.hs = ms.map<NerdleHintType>((h, i) => ({
        position: i % 8,
        letter: h.charAt(0),
        state: ['', '?', '!'].indexOf(h.charAt(1)),
      }))
    } else {
      this.hs = obj
    }
  }

  get got(): string {
    this.#got ||= this.#letters((h) => h.state > 0)
    return this.#got
  }

  get digits(): string {
    this.#digits ||= selectChars(this.got, NerdleHelper.ALL_DIGITS)
    return this.#digits
  }

  get otherDigits(): string {
    this.#otherDigits ||= deleteChars(NerdleHelper.ALL_DIGITS, this.digits)
    return this.#otherDigits
  }

  get ops(): string[] {
    this.#ops ||= [...selectChars(this.got, NerdleHelper.ALL_OPS)]
    return this.#ops
  }

  get nums(): string[] {
    if (this.#nums === null) {
      const ds = new Set([...this.digits])
      const d0 = new Set(['0'])
      const zero = [...intersection(ds, d0)]
      const top = [...difference(ds, d0)]
      const succ = [1, 2, 3, 4].flatMap((k) =>
        repeatedPermutation(this.digits, k - 1)
      )
      const nonzero = top.flatMap((t) => succ.map((s) => t + s))
      this.#nums = zero.concat(nonzero)
    }
    return this.#nums
  }

  get excludePat(): RegExp {
    this.#excludePat ||= new RegExp(`[_${this.otherDigits}]`)
    return this.#excludePat
  }

  get includePat(): RegExp {
    if (this.#includePat === null) {
      const containsRe = [...this.got]
        .map((c) => `(?=.*${escapeOps(c)})`)
        .join('')
      const allowedRe = Array.from(Array(8))
        .map((_, i) => {
          const cs2 = this.#letters((h) => h.position === i && h.state === 2)
          const cs1 = this.#letters((h) => h.position === i && h.state === 1)
          return (
            (cs2.length && escapeOps(cs2[0])) ||
            (cs1.length && `[^${escapeMinus(cs1)}]`) ||
            '.'
          )
        })
        .join('')
      this.#includePat = new RegExp(`^${containsRe}${allowedRe}$`)
    }
    return this.#includePat
  }

  get search(): string[] {
    if (this.#search === null) {
      this.#search = []
      this.#dfs([])
    }
    return this.#search
  }

  #letters(fl: (h: NerdleHintType) => boolean): string {
    return uniq(this.hs.filter(fl).map((h) => h.letter)).join('')
  }

  #chk(tokens: string[]): void {
    const r = new NerdleParser(tokens).expr()
    if (!r.isValid()) return

    const ans = r.toNumber().toString()
    if (ans.match(this.excludePat)) return

    const eq = `${tokens.join('')}=${ans}`
    if (!eq.match(this.includePat)) return

    this.#search?.push(eq)
  }

  #dfs(tokens: string[]): void {
    if (tokens.join('').length > 6) return

    if (tokens.length % 2) {
      this.#chk(tokens)
      this.ops.forEach((op) => this.#dfs(tokens.concat(op)))
    } else {
      this.nums.forEach((num) => this.#dfs(tokens.concat(num)))
    }
  }

  searchN(n: number): string[] {
    return this.search.slice(0, n)
  }
}

export default NerdleHelper
