class NerdleRational {
  d: number

  n: number

  constructor(d: number, n: number) {
    this.d = d
    this.n = n
  }

  add(r: NerdleRational): NerdleRational {
    return new NerdleRational(this.d * r.d, this.n * r.d + this.d * r.n)
  }

  sub(r: NerdleRational): NerdleRational {
    return new NerdleRational(this.d * r.d, this.n * r.d - this.d * r.n)
  }

  mul(r: NerdleRational): NerdleRational {
    return new NerdleRational(this.d * r.d, this.n * r.n)
  }

  div(r: NerdleRational): NerdleRational {
    return new NerdleRational(this.d * r.n, this.n * r.d)
  }

  isValid(): boolean {
    if (this.d === 0) return false
    if (this.n % this.d) return false
    return true
  }

  toNumber(): number {
    return this.n / this.d
  }
}

export default NerdleRational
