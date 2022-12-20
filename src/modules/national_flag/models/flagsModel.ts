import flagTblRaw from '../assets/flagList.txt?raw'
import areaList from '../assets/areaList.json'
import mainlandList from '../assets/mainlandList.json'
import designList from '../assets/designList.json'

export type FlagType = {
  id: string
  emoji: string
  name: Record<string, string>
  div: string
  area: string
  mainland: string
  url: string
}

type FlagFilterFuncType = (o: FlagType) => boolean

export type FlagFilterType = {
  type: string
  title: Record<string, string>
  func: FlagFilterFuncType
}

const flagTbl: FlagType[] = flagTblRaw
  .trim()
  .split('\n')
  .map((row) => {
    const [id, emoji, nameJa, nameEn, div, area, mainland] = row.split(`\t`)
    return {
      id,
      emoji,
      name: { ja: nameJa, en: nameEn },
      div,
      area,
      mainland,
      url: new URL(`../assets/images/${id}.svg`, import.meta.url).href,
    }
  })
  .filter((o) => o.div !== '-')

const areaFilterFunc = (area: string | string[]): FlagFilterFuncType => {
  const values = Array.isArray(area) ? area : [area]
  return (o: FlagType) =>
    values.includes(o.area) && ['-', '*'].includes(o.mainland[0])
}

const mainLandFilterFunc = (
  mainland: string | string[]
): FlagFilterFuncType => {
  const values = Array.isArray(mainland) ? mainland : [mainland]
  return (o: FlagType) => values.includes(o.mainland)
}

const idFilterFunc = (id: string | string[]): FlagFilterFuncType => {
  const values = Array.isArray(id) ? id : [id]
  return (o: FlagType) => values.includes(o.id)
}

const areaFilters = areaList.map(({ name, area }) => ({
  type: 'area',
  title: name,
  func: areaFilterFunc(area),
}))

const mainlandFilters = mainlandList.map(({ name, mainland }) => ({
  type: 'mainland',
  title: name,
  func: mainLandFilterFunc(mainland),
}))

const designFilters = designList.map(({ name, ids }) => ({
  type: 'design',
  title: name,
  func: idFilterFunc(ids.map((id) => id.split(':')[0])),
}))

const flagFilterTbl: FlagFilterType[] = [
  ...areaFilters,
  ...mainlandFilters,
  ...designFilters,
]

// const FLAG_FILTER_DIC: Record<string, FlagFilterType> = FLAG_FILTER_TBL.reduce<
//   Record<string, FlagFilterType>
// >((h, o) => {
//   h[o.id] = o
//   return h
// }, {})

const getFilterList = (): FlagFilterType[] => flagFilterTbl

// const getFilter = (id: string): FlagFilterType => FLAG_FILTER_DIC[id]

const getFlagList = (filter: FlagFilterType): FlagType[] =>
  flagTbl.filter(filter.func)

export { getFilterList, getFlagList }
