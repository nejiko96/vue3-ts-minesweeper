import {
  deleteChars,
  selectChars,
  uniq,
  permutation,
} from '../../../core/utils' // ts-node/esm が path alias 未対応
import words from '../assets/words.json' assert { type: 'json' }

export type WordleHintType = {
  position: number
  letter: string
  state: number
}

export type WordleSuggestionType = {
  w: string
  r1: number
  r2: number
  r3: number
}

class WordleHelper {
  static ALL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  static WORDS: string[] = words

  hs: WordleHintType[]

  #tried: string | null = null

  #got: string | null = null

  #others: string | null = null

  #remain: string | null = null

  #excludePat: RegExp | null = null

  #includePat: RegExp | null = null

  #search: string[] | null = null

  #generate: string[] | null = null

  #charHist: Record<string, number> | null = null

  #suggest: WordleSuggestionType[] | null = null

  constructor(ss: string[])
  constructor(hs: WordleHintType[])
  constructor(obj: string[] | WordleHintType[]) {
    if (typeof obj[0] === 'string') {
      const ss = obj as string[]
      this.hs = ss.flatMap((row) => {
        const ms = row.toUpperCase().match(/[A-Z](!|\?)?/g) || []
        return ms.map<WordleHintType>((h, i) => ({
          position: i,
          letter: h.charAt(0),
          state: ['', '?', '!'].indexOf(h.charAt(1)),
        }))
      })
    } else {
      this.hs = obj as WordleHintType[]
    }
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

  get others(): string {
    if (this.#others === null) {
      this.#others = deleteChars(this.tried, this.got)
    }
    return this.#others
  }

  get remain(): string {
    if (this.#remain === null) {
      this.#remain = deleteChars(WordleHelper.ALL_CHARS, this.tried)
    }
    return this.#remain
  }

  get excludePat(): RegExp {
    this.#excludePat ||= new RegExp(`[_${this.others}]`)
    return this.#excludePat
  }

  get includePat(): RegExp {
    if (this.#includePat === null) {
      const containsRe = [...this.got].map((c) => `(?=.*${c})`).join('')
      const allowedRe = Array.from(Array(5))
        .map((_, i) => {
          const c2 = this.#letters((h) => h.position === i && h.state === 2)[0]
          const cs1 = this.#letters((h) => h.position === i && h.state === 1)
          return c2 || (cs1.length && `[^${cs1}]`) || '.'
        })
        .join('')
      this.#includePat = new RegExp(`^${containsRe}${allowedRe}$`)
    }
    return this.#includePat
  }

  get search(): string[] {
    this.#search ||= WordleHelper.WORDS.filter(
      (w) => !w.match(this.excludePat) && w.match(this.includePat)
    )
    return this.#search
  }

  get generate(): string[] {
    if (this.#generate === null) {
      const base = (this.got + '*'.repeat(5)).substring(0, 5)
      const perms = uniq(permutation(base))
      this.#generate = perms.filter((w) => w.match(this.includePat))
    }
    return this.#generate
  }

  get charHist(): Record<string, number> {
    if (this.#charHist === null) {
      const h = new Proxy<Record<string | symbol, number>>(
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

  get suggest(): WordleSuggestionType[] {
    if (this.#suggest === null) {
      if (this.search.length >= 1 && this.search.length <= 2) {
        this.#suggest = []
      } else {
        const ch = this.charHist
        const sgs = WordleHelper.WORDS.map<WordleSuggestionType>((w) => {
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

  #letters(fl: (h: WordleHintType) => boolean): string {
    return uniq(this.hs.filter(fl).map((h) => h.letter)).join('')
  }

  searchN(n: number): string[] {
    return this.search.slice(0, n)
  }

  suggestN(n: number): WordleSuggestionType[] {
    return this.suggest.slice(0, n)
  }
}

export default WordleHelper
