import flagsRaw from '../assets/flag_list.txt?raw'

export type FlagType = {
  id: string
  emoji: string
  name: Record<string, string>
  div: string
  area: string
  mainLand: string
  url: string
}

type FlagAreaType = {
  id: string
  name: Record<string, string>
  type: number
}

type FlagFilterFuncType = (o: FlagType) => boolean

export type FlagFilterType = {
  id: string
  title: Record<string, string>
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
      name: { ja: nameJa, en: nameEn },
      div,
      area,
      mainLand,
      url: new URL(`../assets/images/${id}.svg`, import.meta.url).href,
    }
  })
  .filter((o) => o.div !== '-')

const AREA_TBL: FlagAreaType[] = [
  {
    id: 'Central_Asia',
    name: { ja: '中央アジア', en: 'Central Asia' },
    type: 1,
  },
  { id: 'Eastern_Asia', name: { ja: '東アジア', en: 'Eastern Asia' }, type: 1 },
  {
    id: 'South-Eastern_Asia',
    name: { ja: '東南アジア', en: 'South-Eastern Asia' },
    type: 1,
  },
  {
    id: 'Southern_Asia',
    name: { ja: '南アジア', en: 'Southern Asia' },
    type: 1,
  },
  { id: 'Western_Asia', name: { ja: '西アジア', en: 'Western Asia' }, type: 1 },
  {
    id: 'Western_Europe',
    name: { ja: '西ヨーロッパ', en: 'Western Europe' },
    type: 1,
  },
  {
    id: 'Eastern_Europe',
    name: { ja: '東ヨーロッパ', en: 'Eastern Europe' },
    type: 1,
  },
  {
    id: 'Southern_Europe',
    name: { ja: '南ヨーロッパ', en: 'Southern Europe' },
    type: 1,
  },
  {
    id: 'Northern_Europe',
    name: { ja: '北ヨーロッパ', en: 'Northern Europe' },
    type: 1,
  },
  {
    id: 'Extended_Europe',
    name: { ja: '広域ヨーロッパ', en: 'Extended Europe' },
    type: 1,
  },
  {
    id: 'Eastern_Africa',
    name: { ja: '東アフリカ', en: 'Eastern Africa' },
    type: 1,
  },
  {
    id: 'Middle_Africa',
    name: { ja: '中部アフリカ', en: 'Middle Africa' },
    type: 1,
  },
  {
    id: 'Northern_Africa',
    name: { ja: '北アフリカ', en: 'Northern Africa' },
    type: 1,
  },
  {
    id: 'Southern_Africa',
    name: { ja: '南部アフリカ', en: 'Southern Africa' },
    type: 1,
  },
  {
    id: 'Western_Africa',
    name: { ja: '西アフリカ', en: 'Western Africa' },
    type: 1,
  },
  {
    id: 'North_America',
    name: { ja: '北アメリカ', en: 'North America' },
    type: 3,
  },
  { id: 'Caribbean', name: { ja: 'カリブ海地域', en: 'Caribbean' }, type: 1 },
  {
    id: 'Central_America',
    name: { ja: '中央アメリカ', en: 'Central America' },
    type: 1,
  },
  {
    id: 'South_America',
    name: { ja: '南アメリカ', en: 'South America' },
    type: 1,
  },
  { id: 'Australia', name: { ja: 'オーストラリア', en: 'Australia' }, type: 3 },
  { id: 'Melanesia', name: { ja: 'メラネシア', en: 'Melanesia' }, type: 1 },
  { id: 'Micronesia', name: { ja: 'ミクロネシア', en: 'Micronesia' }, type: 1 },
  { id: 'Polynesia', name: { ja: 'ポリネシア', en: 'Polynesia' }, type: 1 },
  { id: 'Antarctic', name: { ja: '南極', en: 'Antarctic' }, type: 3 },
  {
    id: 'International_Organization',
    name: { ja: '国際機関', en: 'International Organization' },
    type: 3,
  },
]

const areaFilterFunc = (area: string | string[]): FlagFilterFuncType => {
  const values = Array.isArray(area) ? area : [area]
  return (o: FlagType) =>
    values.includes(o.area) && ['-', '*'].includes(o.mainLand[0])
}

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
  title: area.name,
  func: areaFilterFunc(area.id),
}))

const otherAreas = AREA_TBL.filter((area) => area.type === 3).map(
  (area) => area.id
)

const otherAreaFilter = {
  id: 'area:Other',
  title: { ja: '北アメリカ・その他', en: 'North America and Other' },
  func: areaFilterFunc(otherAreas),
}

const mainLandFilters = [
  {
    id: 'mainLand:GB',
    title: {
      ja: 'イギリスの構成国・海外領土',
      en: 'British Countries / Overseas Territories',
    },
    func: mainLandFilterFunc('GB'),
  },
  {
    id: 'mainLand:FR',
    title: { ja: 'フランスの海外領土', en: 'Overseas France' },
    func: mainLandFilterFunc('FR'),
  },
  {
    id: 'mainLand:NL',
    title: {
      ja: 'オランダの構成国',
      en: 'Constituent countries of the Kingdom of the Netherlands',
    },
    func: mainLandFilterFunc('NL'),
  },
  {
    id: 'mainLand:US',
    title: { ja: 'アメリカの海外領土', en: 'Territories of the United States' },
    func: mainLandFilterFunc('US'),
  },

  {
    id: 'mainLand:Other1',
    title: {
      ja: 'その他海外領土（１）',
      en: 'Other OverSeas Territories(1)',
    },
    func: mainLandFilterFunc(['DK', 'ES', 'FI', 'PT']),
  },
  {
    id: 'mainLand:Other2',
    title: { ja: 'その他海外領土（２）', en: 'Other OverSeas Territories(2)' },
    func: mainLandFilterFunc(['AU', 'CN', 'NZ']),
  },
]

const patternFilters = [
  {
    id: 'pattern:Red_And_White_Stripe',
    title: { ja: '赤と白の縞模様', en: 'Red And White Stripe' },
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
