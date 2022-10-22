import { WordleStateType, WordleHintType } from '@/types'
import { deleteChars, selectChars, uniq, permutation } from '@/utils'
import WordlePattern from './WordlePattern'
import wordsRaw from './words.txt?raw'

const ALL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class WordleHelper {
  static #WORDS = wordsRaw.split('\n')

  tried: string

  got: string

  allowed: WordlePattern

  others: string

  remain: string

  #excludePat: RegExp | null = null

  #includePat: RegExp | null = null

  #search: string[] | null = null

  #generate: string[] | null = null

  #charHist: Record<PropertyKey, number> | null = null

  #suggest: { w: string; r1: number; r2: number; r3: number }[] | null = null

  constructor(str: string)
  constructor(hs: WordleHintType[])
  constructor(obj: any) {
    let hs: WordleHintType[]
    if (typeof obj === 'string') {
      const ms = obj.toUpperCase().match(/[A-Z](!|\?)?/g) || []
      hs = ms.map<WordleHintType>((h, i) => ({
        position: i % 5,
        letter: h.charAt(0),
        state: h.charAt(1) as WordleStateType,
      }))
    } else {
      hs = obj
    }
    this.tried = uniq(hs.map((h) => h.letter)).join('')
    this.got = uniq(hs.filter((h) => h.state).map((h) => h.letter)).join('')
    this.allowed = hs.reduce((pat, h) => pat.addHint(h), new WordlePattern())
    this.others = deleteChars(this.tried, this.got)
    this.remain = deleteChars(ALL_CHARS, this.tried)
  }

  get excludePat() {
    this.#excludePat ||= new RegExp(`[_${this.others}]`)
    return this.#excludePat
  }

  get includePat() {
    if (this.#includePat === null) {
      const containsRe = [...this.got].map((c) => `(?=.*${c})`).join('')
      const allowedRe = this.allowed.re
      this.#includePat = new RegExp(`^${containsRe}${allowedRe}$`)
    }
    return this.#includePat
  }

  get search() {
    this.#search ||= WordleHelper.#WORDS.filter(
      (w) => !w.match(this.excludePat) && w.match(this.includePat)
    )
    return this.#search
  }

  get generate() {
    if (this.#generate === null) {
      const base = (this.got + '*'.repeat(5)).substring(0, 5)
      const perms = uniq(permutation(base))
      this.#generate = perms.filter((w) => w.match(this.includePat))
    }
    return this.#generate
  }

  get charHist() {
    if (this.#charHist === null) {
      const h = new Proxy<Record<PropertyKey, number>>(
        {},
        {
          get: (object, property) =>
            property in object ? object[property] : 0,
        }
      )
      if (this.search.length) {
        this.search.forEach((w) => {
          ;[...w].forEach((c, i) => {
            h[c] += 1
            h[`${c}${i}`] += 1
          })
        })
      } else {
        ;[...this.remain].forEach((c) => {
          h[c] += 1
        })
      }
      this.#charHist = h
    }
    return this.#charHist
  }

  get suggest() {
    if (this.#suggest === null) {
      if (this.search.length >= 1 && this.search.length <= 2) {
        this.#suggest = []
      } else {
        const ch = this.charHist
        const sgs = WordleHelper.#WORDS.map((w) => {
          const r1 = [...uniq(deleteChars(w, this.tried))].reduce(
            (r, c) => r + ch[c],
            0
          )
          const r2 = [...w].reduce(
            (r, c, i) => r + (this.tried.includes(c) ? 0 : ch[`${c}${i}`]),
            0
          )
          const r3 = selectChars(w, this.got).length
          return { w, r1, r2, r3 }
        })
        sgs.sort((a, b) => {
          if (a.r1 !== b.r1) return b.r1 - a.r1
          if (a.r2 !== b.r2) return b.r2 - a.r2
          if (a.r3 !== b.r3) return b.r3 - a.r3
          return a.w.localeCompare(b.w)
        })
        this.#suggest = sgs
      }
    }
    return this.#suggest
  }

  searchN(n: number) {
    return this.search.slice(0, n)
  }

  suggestN(n: number) {
    return this.suggest.slice(0, n)
  }
}

export default WordleHelper
