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
  rank: number
}

export type FlagFilterType = (o: FlagType) => boolean

export type FlagGroupType = {
  type: string
  title: Record<string, string>
  filter: FlagFilterType
}

export type FlagQuizSettingType = {
  title: Record<string, string>
  range: FlagFilterType
  tcnt: number
  qcnt: number
}

const flagTbl: FlagType[] = flagTblRaw
  .trim()
  .split('\n')
  .map((row) => {
    const [id, emoji, nameJa, nameEn, div, area, mainland, rankStr] =
      row.split(`\t`)
    return {
      id,
      emoji,
      name: { ja: nameJa, en: nameEn },
      div,
      area,
      mainland,
      rank: Number(rankStr),
    }
  })
  .filter((o) => o.div !== '-')

const areaFilter = (area: string | string[]): FlagFilterType => {
  const values = Array.isArray(area) ? area : [area]
  return (o: FlagType) =>
    values.includes(o.area) && ['-', '*'].includes(o.mainland[0])
}

const mainLandFilter = (mainland: string | string[]): FlagFilterType => {
  const values = Array.isArray(mainland) ? mainland : [mainland]
  return (o: FlagType) => values.includes(o.mainland)
}

const idFilter = (id: string | string[]): FlagFilterType => {
  const values = Array.isArray(id) ? id : [id]
  return (o: FlagType) => values.includes(o.id)
}

const areaGroups = areaList.map(({ name, area }) => ({
  type: 'area',
  title: name,
  filter: areaFilter(area),
}))

const mainlandGroups = mainlandList.map(({ name, mainland }) => ({
  type: 'mainland',
  title: name,
  filter: mainLandFilter(mainland),
}))

const designGroups = designList.map(({ name, ids }) => ({
  type: 'design',
  title: name,
  filter: idFilter(ids.map((id) => id.split(':')[0])),
}))

const groupTbl: FlagGroupType[] = [
  ...areaGroups,
  ...mainlandGroups,
  ...designGroups,
]

const quizSettingTbl = [
  {
    title: { ja: '2021 GDP?????????50', en: '2021 GDP top 50' },
    range: (o: FlagType) => o.rank <= 50,
    tcnt: 50,
    qcnt: 10,
  },
  {
    title: { ja: '?????????????????????', en: 'UN member + 2' },
    range: (o: FlagType) => o.div <= 'B',
    tcnt: 195,
    qcnt: 20,
  },
  {
    title: { ja: 'ISO 3166-1', en: 'ISO 3166-1' },
    range: (o: FlagType) => o.div <= 'C',
    tcnt: 248,
    qcnt: 30,
  },
  {
    title: { ja: '????????????', en: 'Collector' },
    range: () => true,
    tcnt: 266,
    qcnt: 266,
  },
]

const getGroupList = (): FlagGroupType[] => groupTbl

const getQuizSettingList = (): FlagQuizSettingType[] => quizSettingTbl

const getFlagList = (f: FlagFilterType): FlagType[] => flagTbl.filter(f)

export { getGroupList, getQuizSettingList, getFlagList }
