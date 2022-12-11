import { uniq } from '@/core/utils'
import flagsRaw from '../assets/flag_list.txt?raw'

export type FlagType = {
  id: string
  emoji: string
  nameJa: string
  nameEn: string
  div: string
  area: string
  mainLand: string
  url: string
}

type FlagAreaType = {
  id: string
  nameJa: string
  nameEn: string
  type: number
}

type FlagFilterFuncType = (o: FlagType) => boolean

export type FlagFilterType = {
  id: string
  titleJa: string
  titleEn: string
  func: FlagFilterFuncType
}

const FLAG_TBL: FlagType[] = flagsRaw
  .trim()
  .split('\n')
  .map((row) => {
    const [id, emoji, nameJa, nameEn, div, area, mainLand] = row.split(`\t`)
    return {
      id,
      emoji,
      nameJa,
      nameEn,
      div,
      area,
      mainLand,
      url: new URL(`../assets/images/${id}.svg`, import.meta.url).href,
    }
  })
  .filter((o) => o.div !== '-')

const AREA_TBL: FlagAreaType[] = [
  { id: 'Central_Asia', nameJa: '中央アジア', nameEn: 'Central Asia', type: 1 },
  { id: 'Eastern_Asia', nameJa: '東アジア', nameEn: 'Eastern Asia', type: 1 },
  {
    id: 'South-Eastern_Asia',
    nameJa: '東南アジア',
    nameEn: 'South-Eastern Asia',
    type: 1,
  },
  { id: 'Southern_Asia', nameJa: '南アジア', nameEn: 'Southern Asia', type: 1 },
  { id: 'Western_Asia', nameJa: '西アジア', nameEn: 'Western Asia', type: 1 },
  {
    id: 'Western_Europe',
    nameJa: '西ヨーロッパ',
    nameEn: 'Western Europe',
    type: 1,
  },
  {
    id: 'Eastern_Europe',
    nameJa: '東ヨーロッパ',
    nameEn: 'Eastern Europe',
    type: 1,
  },
  {
    id: 'Southern_Europe',
    nameJa: '南ヨーロッパ',
    nameEn: 'Southern Europe',
    type: 1,
  },
  {
    id: 'Northern_Europe',
    nameJa: '北ヨーロッパ',
    nameEn: 'Northern Europe',
    type: 1,
  },
  {
    id: 'Extended_Europe',
    nameJa: '広域ヨーロッパ',
    nameEn: 'Extended Europe',
    type: 1,
  },
  {
    id: 'Dependent_Territories_in_Europe',
    nameJa: 'ヨーロッパ自治領',
    nameEn: 'Dependent Territories in Europe',
    type: 2,
  },
  {
    id: 'Eastern_Africa',
    nameJa: '東アフリカ',
    nameEn: 'Eastern Africa',
    type: 1,
  },
  {
    id: 'Middle_Africa',
    nameJa: '中部アフリカ',
    nameEn: 'Middle Africa',
    type: 1,
  },
  {
    id: 'Northern_Africa',
    nameJa: '北アフリカ',
    nameEn: 'Northern Africa',
    type: 1,
  },
  {
    id: 'Southern_Africa',
    nameJa: '南部アフリカ',
    nameEn: 'Southern Africa',
    type: 1,
  },
  {
    id: 'Western_Africa',
    nameJa: '西アフリカ',
    nameEn: 'Western Africa',
    type: 1,
  },
  {
    id: 'North_America',
    nameJa: '北アメリカ',
    nameEn: 'North America',
    type: 3,
  },
  { id: 'Caribbean', nameJa: 'カリブ海地域', nameEn: 'Caribbean', type: 1 },
  {
    id: 'Central_America',
    nameJa: '中央アメリカ',
    nameEn: 'Central America',
    type: 1,
  },
  {
    id: 'South_America',
    nameJa: '南アメリカ',
    nameEn: 'South America',
    type: 1,
  },
  { id: 'Australia', nameJa: 'オーストラリア', nameEn: 'Australia', type: 3 },
  { id: 'Melanesia', nameJa: 'メラネシア', nameEn: 'Melanesia', type: 1 },
  { id: 'Micronesia', nameJa: 'ミクロネシア', nameEn: 'Micronesia', type: 1 },
  { id: 'Polynesia', nameJa: 'ポリネシア', nameEn: 'Polynesia', type: 1 },
  { id: 'Antarctic', nameJa: '南極', nameEn: 'Antarctic', type: 3 },
  {
    id: 'International_Organization',
    nameJa: '国際機関',
    nameEn: 'International Organization',
    type: 3,
  },
]

const areaFilterFunc = (area: string | string[]): FlagFilterFuncType => {
  const values = Array.isArray(area) ? area : [area]
  return (o: FlagType) =>
    values.includes(o.area) && ['-', '*'].includes(o.mainLand[0])
}

// const dependentFilterFunc = (area: string | string[]): FlagFilterFuncType => {
//   const values = Array.isArray(area) ? area : [area]
//   return (o: FlagType) => values.includes(o.area)
// }

const mainLandFilterFunc = (
  mainLand: string | string[]
): FlagFilterFuncType => {
  const values = Array.isArray(mainLand) ? mainLand : [mainLand]
  return (o: FlagType) => values.includes(o.mainLand)
}

const idFilterFunc = (id: string | string[]): FlagFilterFuncType => {
  const values = Array.isArray(id) ? id : [id]
  return (o: FlagType) => values.includes(o.id)
}

const areaFilters = AREA_TBL.filter((area) => area.type === 1).map((area) => ({
  id: `area:${area.id}`,
  titleJa: area.nameJa,
  titleEn: area.nameEn,
  func: areaFilterFunc(area.id),
}))

// const dependentFilters = AREA_TBL.filter((area) => area.type === 2).map(
//   (area) => ({
//     id: `area:${area.id}`,
//     titleJa: area.nameJa,
//     titleEn: area.nameEn,
//     func: dependentFilterFunc(area.id),
//   })
// )

const otherAreas = AREA_TBL.filter((area) => area.type === 3).map(
  (area) => area.id
)

const otherAreaFilter = {
  id: 'area:Other',
  titleJa: '北アメリカ・その他',
  titleEn: 'North America and Other',
  func: areaFilterFunc(otherAreas),
}

// const otherMainLands = uniq(FLAG_TBL.map((o) => o.mainLand))
//   .filter((ml) => !['-', '*'].includes(ml[0]))
//   .filter((ml) => !['GB', 'FR', 'US', 'NL'].includes(ml))

const mainLandFilters = [
  {
    id: 'mainLand:GB',
    titleJa: 'イギリスの構成国・海外領土',
    titleEn: 'British Countries / Overseas Territories',
    func: mainLandFilterFunc('GB'),
  },
  {
    id: 'mainLand:FR',
    titleJa: 'フランスの海外領土',
    titleEn: 'Overseas France',
    func: mainLandFilterFunc('FR'),
  },
  {
    id: 'mainLand:NL',
    titleJa: 'オランダの構成国',
    titleEn: 'Constituent countries of the Kingdom of the Netherlands',
    func: mainLandFilterFunc('NL'),
  },
  {
    id: 'mainLand:US',
    titleJa: 'アメリカの海外領土',
    titleEn: 'Territories of the United States',
    func: mainLandFilterFunc('US'),
  },

  {
    id: 'mainLand:Other1',
    titleJa: 'その他海外領土（１）',
    titleEn: 'Other OverSeas Territories(1)',
    func: mainLandFilterFunc(['DK', 'ES', 'FI', 'PT']),
  },
  {
    id: 'mainLand:Other2',
    titleJa: 'その他海外領土（２）',
    titleEn: 'Other OverSeas Territories(2)',
    func: mainLandFilterFunc(['AU', 'CN', 'NZ']),
  },
]

const patternFilters = [
  {
    id: 'pattern:Red_And_White_Stripe',
    titleJa: '赤と白の縞模様',
    titleEn: 'Red And White Stripe',
    func: idFilterFunc([
      'AT', // オーストリア
      'ID', // インドネシア
      'LV', // ラトビア
      'MC', // モナコ
      'PL', // ポーランド
      'SG', // シンガポール
    ]),
  },
]

const FLAG_FILTER_TBL: FlagFilterType[] = [
  ...areaFilters,
  // ...dependentFilters,
  otherAreaFilter,
  ...mainLandFilters,
  ...patternFilters,
]

const FLAG_FILTER_DIC: Record<string, FlagFilterType> = FLAG_FILTER_TBL.reduce<
  Record<string, FlagFilterType>
>((h, o) => {
  h[o.id] = o
  return h
}, {})

const getFilterList = (): FlagFilterType[] => FLAG_FILTER_TBL

const getFilter = (id: string): FlagFilterType => FLAG_FILTER_DIC[id]

const getFlagList = (id: string): FlagType[] =>
  FLAG_TBL.filter(getFilter(id).func)

export { getFilterList, getFilter, getFlagList }
