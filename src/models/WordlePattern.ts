import { WordleHintType } from '@/types'
import { fillArray } from '@/utils'

type WordlePatternElementType = {
  matched: string | null
  exclude: Set<string> | null
}

class WordlePattern {
  arr: WordlePatternElementType[]

  constructor() {
    this.arr = fillArray<WordlePatternElementType>(5, () => ({
      matched: null,
      exclude: null,
    }))
  }

  addHint(h: WordleHintType) {
    const elem = this.arr[h.position]
    if (h.state === '!') {
      elem.matched = h.letter
    } else if (h.state === '?') {
      elem.exclude ||= new Set<string>()
      elem.exclude.add(h.letter)
    }
    return this
  }

  get re() {
    return this.arr
      .map((e) => {
        if (e.matched) return e.matched
        if (e.exclude) return `[^${[...e.exclude].join('')}]`
        return '.'
      })
      .join('')
  }
}

export default WordlePattern
