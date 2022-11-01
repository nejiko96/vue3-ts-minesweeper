class NerdleParser {
  #tokens: string[]

  #pos: number

  constructor(tokens: string[]) {
    this.#tokens = tokens
    this.#pos = 0
  }

  peek() {
    return this.#tokens[this.#pos]
  }

  consume() {
    this.#pos += 1
  }

  number() {
    const x = this.peek()

    this.consume()
    return { d: 1, n: parseInt(x, 10) }
  }

  term() {
    let x = this.number()
    for (;;) {
      switch (this.peek()) {
        case '*': {
          this.consume()
          const y = this.number()
          x = { d: x.d * y.d, n: x.n * y.n }
          continue
        }
        case '/': {
          this.consume()
          const z = this.number()
          x = { d: x.d * z.n, n: x.n * z.d }
          continue
        }
        default:
          break
      }
      break
    }
    return x
  }

  expr() {
    let x = this.term()
    for (;;) {
      switch (this.peek()) {
        case '+': {
          this.consume()
          const y = this.term()
          x = { d: x.d * y.d, n: x.n * y.d + x.d * y.n }
          continue
        }
        case '-': {
          this.consume()
          const z = this.term()
          x = { d: x.d * z.d, n: x.n * z.d - x.d * z.n }
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
