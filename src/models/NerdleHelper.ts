import { NerdleHintType } from '@/types'
import { deleteChars, selectChars, uniq, repeatedPermutation } from '@/utils'
import samplesRaw from '@/resource/nerdle-samples.txt?raw'
import NerdleParser from './NerdleParser'

const escapeOps = (str: string) => str.replace(/[*+/=]/g, '\\$&')

const escapeMinus = (str: string) => str.replace(/-/g, '\\$&')

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

  static get suggest(): string[] {
    const smp =
      NerdleHelper.#SAMPLES[
        Math.floor(Math.random() * NerdleHelper.#SAMPLES.length)
      ]
    return smp.split(' ')
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

  cs(i: number, s: number): string {
    return this.hs
      .filter((h) => h.position === i && h.state === s)
      .map((h) => h.letter)
      .join('')
  }

  get got(): string {
    this.#got ||= uniq(
      this.hs.filter((h) => h.state > 0).map((h) => h.letter)
    ).join('')
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

  get nums() {
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

  get excludePat() {
    this.#excludePat ||= new RegExp(`[_${this.otherDigits}]`)
    return this.#excludePat
  }

  get includePat() {
    if (this.#includePat === null) {
      const containsRe = [...this.got]
        .map((c) => `(?=.*${escapeOps(c)})`)
        .join('')
      const allowedRe = Array.from(Array(8))
        .map((_, i) => {
          const cs2 = this.cs(i, 2)
          const cs1 = this.cs(i, 1)
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

  #chk(tokens: string[]) {
    const r = new NerdleParser(tokens).expr()
    if (r.d === 0) return
    if (r.n % r.d) return

    const ans = (r.n / r.d).toString()
    if (ans.match(this.excludePat)) return

    const eq = `${tokens.join('')}=${ans}`
    if (!eq.match(this.includePat)) return

    this.#search!.push(eq)
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

  get search(): string[] {
    if (this.#search === null) {
      this.#search = []
      this.#dfs([])
    }
    return this.#search
  }

  searchN(n: number): string[] {
    return this.search.slice(0, n)
  }
}

export default NerdleHelper
