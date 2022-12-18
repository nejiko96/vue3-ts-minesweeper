import {
  deleteChars,
  selectChars,
  sample,
  uniq,
  repeatedPermutation,
  fillArray,
  permutation,
} from '../../../core/utils'
// import samplesRaw from '../assets/nerdle-samples.txt?raw'
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

  static #SAMPLES: string[] = [] // samplesRaw.split('\n')

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

  size = 0

  #tried: string | null = null

  #got: string | null = null

  #remain: string | null = null

  #digits: string | null = null

  #otherDigits: string | null = null

  #ops: string[] | null = null

  #nums: string[] | null = null

  #excludePat: RegExp | null = null

  #includePat: RegExp | null = null

  #allowedPat: RegExp | null = null

  #search: string[] | null = null

  constructor(str: string)
  constructor(hs: NerdleHintType[])
  constructor(obj: any) {
    if (typeof obj === 'string') {
      this.hs = obj.split(' ').flatMap<NerdleHintType>((row) => {
        const ms = row.match(/[^!?](!|\?)?/g) || []
        return ms.map<NerdleHintType>((h, i) => ({
          position: i,
          letter: h.charAt(0),
          state: ['', '?', '!'].indexOf(h.charAt(1)),
        }))
      })
    } else {
      this.hs = obj
    }
    this.size = this.hs.reduce((memo, h) => Math.max(memo, h.position), -1) + 1
  }

  get tried(): string {
    if (this.#tried === null) {
      this.#tried = this.#letters(() => true)
    }
    return this.#tried
  }

  get got(): string {
    if (this.#got === null) {
      this.#got = this.#letters((h) => h.state > 0)
    }
    return this.#got
  }

  get remain(): string {
    if (this.#remain === null) {
      this.#remain = deleteChars(NerdleHelper.ALL_CHARS, this.tried)
    }
    return this.#remain
  }

  get digits(): string {
    if (this.#digits === null) {
      this.#digits = selectChars(
        this.got + this.remain,
        NerdleHelper.ALL_DIGITS
      )
    }
    return this.#digits
  }

  get otherDigits(): string {
    if (this.#otherDigits === null) {
      this.#otherDigits = deleteChars(NerdleHelper.ALL_DIGITS, this.digits)
    }
    return this.#otherDigits
  }

  get ops(): string[] {
    this.#ops ||= [...selectChars(this.got + this.remain, NerdleHelper.ALL_OPS)]
    return this.#ops
  }

  get nums(): string[] {
    if (this.#nums === null) {
      const ds = new Set([...this.digits])
      const d0 = new Set(['0'])
      const zero = [...intersection(ds, d0)]
      const top = [...difference(ds, d0)]
      const succ = [1, 2, 3].flatMap((k) =>
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
      const allowedRe = Array.from(Array(this.size))
        .map((_, i) => {
          const c2 = this.#letters((h) => h.position === i && h.state === 2)[0]
          const cs1 = this.#letters((h) => h.position === i && h.state === 1)
          return (
            (c2 && escapeOps(c2)) ||
            (cs1.length && `[^${escapeMinus(cs1)}]`) ||
            '.'
          )
        })
        .join('')
      this.#includePat = new RegExp(`^${containsRe}${allowedRe}$`)
    }
    return this.#includePat
  }

  get allowedPat(): RegExp {
    if (this.#allowedPat === null) {
      const allowedRe = Array.from(Array(this.size))
        .map((_, i) => {
          const c2 = this.#letters((h) => h.position === i && h.state === 2)[0]
          const cs1 = this.#letters((h) => h.position === i && h.state === 1)
          return (
            (c2 && `(${escapeOps(c2)}|_)`) ||
            (cs1.length && `[^${escapeMinus(cs1)}]`) ||
            '.'
          )
        })
        .join('')
      this.#allowedPat = new RegExp(`^${allowedRe}$`)
    }
    return this.#allowedPat
  }

  get search(): string[] {
    if (this.#search === null) {
      if (!this.got.includes('=')) {
        return []
      }
      // const startTime = performance.now()
      this.#search = []
      this.#dfs([])
      // const endTime = performance.now()
      // console.log(endTime - startTime)
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
    const s1 = tokens.join('')
    const rest = Math.max(2, deleteChars(this.got, s1).length)
    if (s1.length + rest > this.size) {
      return
    }

    const s2 = s1 + '_'.repeat(this.size - s1.length)
    if (!s2.match(this.allowedPat)) return

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
