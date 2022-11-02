import NerdleRational from './NerdleRational'

class NerdleParser {
  #tokens: string[]

  #pos: number

  constructor(tokens: string[]) {
    this.#tokens = tokens
    this.#pos = 0
  }

  peek(): string {
    return this.#tokens[this.#pos]
  }

  consume(): void {
    this.#pos += 1
  }

  number(): NerdleRational {
    const x = this.peek()

    this.consume()
    return new NerdleRational(1, Number(x))
  }

  term(): NerdleRational {
    let x = this.number()
    for (;;) {
      switch (this.peek()) {
        case '*': {
          this.consume()
          const y = this.number()
          x = x.mul(y)
          continue
        }
        case '/': {
          this.consume()
          const y = this.number()
          x = x.div(y)
          continue
        }
        default:
          break
      }
      break
    }
    return x
  }

  expr(): NerdleRational {
    let x = this.term()
    for (;;) {
      switch (this.peek()) {
        case '+': {
          this.consume()
          const y = this.term()
          x = x.add(y)
          continue
        }
        case '-': {
          this.consume()
          const y = this.term()
          x = x.sub(y)
          continue
        }
        default:
          break
      }
      break
    }
    return x
  }
}

export default NerdleParser
