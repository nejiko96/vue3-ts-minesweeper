const noop = (): void => {}

const fillArray = <T>(
  n: number,
  fn: (i: number) => T,
): T[] => (
    Array.from({ length: n }, (_, i) => fn(i))
  )

const fillArray2D = <T>(
  w: number,
  h:number,
  fn: (i: number, j: number) => T,
): T[][] => (
    Array.from(
      { length: h },
      (_, i) => (
        Array.from(
          { length: w },
          (__, j) => fn(i, j),
        )
      ),
    )
  )

export {
  noop,
  fillArray,
  fillArray2D,
}
