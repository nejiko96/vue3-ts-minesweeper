import { fillArray } from '@/utils'
import SlidePuzzle from './SlidePuzzle'

/**
 * スライドパズルを自動で解くソルバー
 */
class SlidePuzzleSolver {
  /**
   * 隣接するマスの相対位置
   * @type {number[][]}
   */
  static NEIGHBORS: number[][] = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ]

  /**
   * 現在の盤面
   * @type {number[][]}
   */
  grid: number[][]

  /**
   * 盤面のサイズ(N)
   * @type {number}
   */
  n: number

  /**
   * マス数(NxN)
   * @type {number}
   */
  n2: number

  /**
   * スライドパズルのロジック
   * @type {SlidePuzzle}
   */
  #logic: SlidePuzzle

  /**
   * 移動の履歴
   * @type {number[][]}
   */
  #path: number[][] = []

  /**
   * パネル毎の移動可／不可
   * @type {Record<number, boolean>}
   */
  #locked: Record<number, boolean> = {}

  /**
   * コンストラクタ
   * @param {nuber[][]} grid 盤面
   */
  constructor(grid: number[][]) {
    this.grid = JSON.parse(JSON.stringify(grid))
    this.n = this.grid.length
    this.n2 = this.n ** 2
    this.#logic = new SlidePuzzle(this.n)
  }

  /**
   * 指定されたパネルの現在位置を求める
   * @param {number} x パネル番号(1...N^2)
   * @return {number} 位置番号(0...N^2-1)
   */
  currentPos(x: number): number {
    return this.grid.flat().findIndex((v) => v === x)
  }

  /**
   * 指定された位置が空いているか判定
   * @param {umber} v 位置番号(0...N^2-1)
   */
  isVacant(v: number): boolean {
    return this.grid[(v / this.n) | 0][v % this.n] === this.n2
  }

  /**
   * 現在の状態から完成状態までのスライド履歴を生成する
   * @return {number[][]} 移動履歴
   */
  solve(): number[][] {
    this.#path = []
    this.#locked = {}
    for (let v = 1; v <= this.n2 - this.n; v++) {
      this.solveFor(v)
      if (v + this.n > this.n2 - this.n && v + this.n < this.n2) {
        this.solveFor(v + this.n)
      }
    }
    return this.#path
  }

  /**
   * 指定されたパネルを目的地に移動させるまでのスライド履歴を生成する
   * @param {number} x パネル番号
   */
  solveFor(x: number): void {
    // console.log(`solveFor: ${x}`)

    // 空きマス移動のときに動かさないパネルに追加
    this.#locked[x] = true
    // 現在位置
    const f = this.currentPos(x)
    // 目標位置
    const t = x - 1

    // すでに目標の位置にいれば何もせず終了
    if (f === t) {
      // console.log(' no move.')
      return
    }

    if ([this.n2 - 1, this.n2 - this.n, this.n2 - this.n - 1].includes(x)) {
      this.moveSimple(f, t)
    } else if (x % this.n === 0) {
      this.moveToRightEnd(f, t)
    } else if (x > this.n2 - this.n) {
      this.moveToBottomEnd(f, t)
    } else {
      this.moveSimple(f, t)
    }
  }

  /**
   * fの位置にあるパネルをtまで移動させる
   * @param {number} f 現在位置
   * @param {number} t 目標位置
   */
  moveSimple(f: number, t: number): void {
    // console.log(`moveSimple: ${v}->${t}`)

    let v = f
    // 右移動
    for (; v % this.n < t % this.n; v += 1) {
      this.moveOne(v, v + 1)
    }
    // 左移動
    for (; v % this.n > t % this.n; v -= 1) {
      this.moveOne(v, v - 1)
    }
    // 下移動
    for (; v < t; v += this.n) {
      this.moveOne(v, v + this.n)
    }
    // 上移動
    for (; v > t; v -= this.n) {
      this.moveOne(v, v - this.n)
    }
  }

  /**
   * fの位置にあるパネルをt(右端)まで移動させる
   * @param {number} f 現在位置
   * @param {number} t 目標位置
   */
  moveToRightEnd(f: number, t: number): void {
    // console.log(`moveToRightEnd: ${v}->${t}`)

    // 真下にいて上がちょうど空いていたら
    // 今の位置からスライドさせるだけ
    if (f === t + this.n && this.isVacant(t)) {
      this.slideAt(f)
      return
    }

    // 左隣とくっつけて目標位置に入れる
    this.moveSimple(f, t + this.n * 2)
    this.moveOne(t - 1, t)
    this.moveOne(t + this.n * 2, t + this.n)
    this.moveOne(t, t - 1)
    this.moveOne(t + this.n, t)
  }

  /**
   * fの位置にあるパネルをt(下端)まで移動させる
   * @param {number} f 現在位置
   * @param {number} t 目標位置
   */
  moveToBottomEnd(f: number, t: number): void {
    // console.log(`moveToBottomEnd: ${v}->${t}`)

    // 真横にいて横がちょうど空いていたら
    // 今の位置からスライドさせるだけ
    if (f === t + 1 && this.isVacant(t)) {
      this.slideAt(f)
      return
    }

    // 上隣とくっつけて目標位置に入れる
    this.moveSimple(f, t + 2)
    this.moveOne(t - this.n, t)
    this.moveOne(t + 2, t + 1)
    this.moveOne(t, t - this.n)
    this.moveOne(t + 1, t)
  }

  /**
   * fの位置にあるパネルをt(隣)まで移動させる
   * @param {number} f 現在位置
   * @param {number} t 目標位置
   */
  moveOne(f: number, t: number): void {
    // console.log(` moveOne: ${v}->${u}`)

    this.vacate(t)
    this.slideAt(f)
  }

  /**
   * 目標位置のマスを空ける
   * @param {number} t 目標位置
   */
  vacate(t: number): void {
    // 目標位置を始点とした最短経路探索
    const q: number[] = []
    const prev: number[] = fillArray(this.n2, () => -2)
    q.push(t)
    prev[t] = -1
    while (q.length) {
      const v = q.shift() as number
      const [i, j] = [(v / this.n) | 0, v % this.n]
      SlidePuzzleSolver.NEIGHBORS.forEach(([di, dj]) => {
        const [i2, j2] = [i + di, j + dj]
        if (i2 < 0 || i2 >= this.n || j2 < 0 || j2 >= this.n) return // 盤面の外
        if (this.#locked[this.grid[i2][j2]]) return // 動かせない
        const u = i2 * this.n + j2
        if (prev[u] >= -1) return // 探索済
        q.push(u)
        prev[u] = v
      })
    }
    // 現在の空きマスの位置
    const f = this.currentPos(this.n2)
    // 目標位置まで空きマスを移動させる
    let v = prev[f]
    while (v >= 0) {
      this.slideAt(v)
      v = prev[v]
    }
  }

  /**
   * 指定した位置のパネルをスライドさせて履歴を残す
   * @param {number} v 位置番号
   */
  slideAt(v: number): void {
    const [i, j] = [(v / this.n) | 0, v % this.n]
    // console.log(`  slideAt: [${i}, ${j}]`)
    this.#path.push([i, j])
    this.#logic.slideAt(this.grid, i, j)
  }
}

export default SlidePuzzleSolver
