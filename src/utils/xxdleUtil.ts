const deleteChars = (str: string, chars: string): string =>
  str.replace(new RegExp(`[${chars}]`, 'g'), '')

const selectChars = (str: string, chars: string): string =>
  str.replace(new RegExp(`[^${chars}]`, 'g'), '')

type Uniq = {
  (str: string): string
  <T>(arr: T[]): T[]
}
const uniq: Uniq = <T>(obj: string | T[]): any => {
  if (typeof obj === 'string') {
    return uniq([...obj]).join('')
  }
  return [...new Set(obj)]
}

type Permutation = {
  (str: string): string[]
  <T>(arr: T[]): T[][]
}
const permutation: Permutation = <T>(obj: string | T[]): any => {
  if (typeof obj === 'string') {
    return permutation([...obj]).map((arr) => arr.join(''))
  }
  const arr = obj
  if (arr.length === 1) {
    return [arr]
  }
  return arr.flatMap((_, i) => {
    const rest = [...arr]
    const elem = rest.splice(i, 1)[0]
    return permutation(rest).map((perm) => [elem, ...perm])
  })
}

type RepeatedPermutation = {
  (str: string, len: number): string[]
  <T>(arr: T[], len: number): T[][]
}
const repeatedPermutation: RepeatedPermutation = <T>(
  obj: string | T[],
  len: number
): any => {
  if (typeof obj === 'string') {
    return repeatedPermutation([...obj], len).map((arr) => arr.join(''))
  }
  const arr = obj
  if (len === 0) {
    return [[]]
  }
  return arr.flatMap((elem) =>
    repeatedPermutation(arr, len - 1).map((rp) => [elem, ...rp])
  )
}

export { deleteChars, selectChars, uniq, permutation, repeatedPermutation }
