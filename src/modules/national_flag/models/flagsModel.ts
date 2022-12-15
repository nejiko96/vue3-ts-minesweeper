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

type FlagFilterFuncType = (o: FlagType) => boolean

export type FlagFilterType = {
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

const AREA_TBL = [
  {
    name: { ja: '中央アジア', en: 'Central Asia' },
    area: 'Central_Asia',
  },
  {
    name: { ja: '東アジア', en: 'Eastern Asia' },
    area: 'Eastern_Asia',
  },
  {
    name: { ja: '東南アジア', en: 'South-Eastern Asia' },
    area: 'South-Eastern_Asia',
  },
  {
    name: { ja: '南アジア', en: 'Southern Asia' },
    area: 'Southern_Asia',
  },
  {
    name: { ja: '西アジア', en: 'Western Asia' },
    area: 'Western_Asia',
  },
  {
    name: { ja: '西ヨーロッパ', en: 'Western Europe' },
    area: 'Western_Europe',
  },
  {
    name: { ja: '東ヨーロッパ', en: 'Eastern Europe' },
    area: 'Eastern_Europe',
  },
  {
    name: { ja: '南ヨーロッパ', en: 'Southern Europe' },
    area: 'Southern_Europe',
  },
  {
    name: { ja: '北ヨーロッパ', en: 'Northern Europe' },
    area: 'Northern_Europe',
  },
  {
    name: { ja: '広域ヨーロッパ', en: 'Extended Europe' },
    area: 'Extended_Europe',
  },
  {
    name: { ja: '東アフリカ', en: 'Eastern Africa' },
    area: 'Eastern_Africa',
  },
  {
    name: { ja: '中部アフリカ', en: 'Middle Africa' },
    area: 'Middle_Africa',
  },
  {
    name: { ja: '北アフリカ', en: 'Northern Africa' },
    area: 'Northern_Africa',
  },
  {
    name: { ja: '南部アフリカ', en: 'Southern Africa' },
    area: 'Southern_Africa',
  },
  {
    name: { ja: '西アフリカ', en: 'Western Africa' },
    area: 'Western_Africa',
  },
  {
    name: { ja: '北アメリカ', en: 'North America' },
    area: 'North_America',
    other: true,
  },
  { name: { ja: 'カリブ海地域', en: 'Caribbean' }, area: 'Caribbean' },
  {
    name: { ja: '中央アメリカ', en: 'Central America' },
    area: 'Central_America',
  },
  {
    name: { ja: '南アメリカ', en: 'South America' },
    area: 'South_America',
  },
  {
    name: { ja: 'オーストラリア', en: 'Australia' },
    area: 'Australia',
    other: true,
  },
  { name: { ja: 'メラネシア', en: 'Melanesia' }, area: 'Melanesia' },
  { name: { ja: 'ミクロネシア', en: 'Micronesia' }, area: 'Micronesia' },
  { name: { ja: 'ポリネシア', en: 'Polynesia' }, area: 'Polynesia' },
  { name: { ja: '南極', en: 'Antarctic' }, area: 'Antarctic', other: true },
  {
    name: { ja: '国際機関', en: 'International Organization' },
    area: 'International_Organization',
    other: true,
  },
]

const MAINLAND_TBL = [
  {
    name: {
      ja: 'イギリス領',
      en: 'British Terittory',
    },
    mainLand: 'GB',
  },
  {
    name: { ja: 'フランス領', en: 'French Territory' },
    mainLand: 'FR',
  },
  {
    name: {
      ja: 'オランダ領',
      en: 'Dutch Territory',
    },
    mainLand: 'NL',
  },
  {
    name: { ja: 'アメリカ領', en: 'American Territory' },
    mainLand: 'US',
  },
  {
    name: {
      ja: 'その他領土１',
      en: 'Other Territory 1',
    },
    mainLand: ['DK', 'ES', 'FI', 'PT'],
  },
  {
    name: { ja: 'その他領土２', en: 'Other Territory 2' },
    mainLand: ['AU', 'CN', 'NZ'],
  },
]

const DESIGN_TBL = [
  {
    name: { ja: '長方形以外', en: 'Uncommon Shape' },
    ids: [
      'CH', // スイス
      'VA', // バチカン
      'NP', // ネパール
    ],
  },
  {
    name: { ja: '大きな丸', en: 'Circle' },
    ids: [
      'BD', // バングラデシュ
      'BR', // ブラジル
      'BZ', // ベリーズ
      'JP', // 日本
      'KG', // キルギス
      'KR', // 韓国
      'KZ', // カザフスタン
      'PW', // パラオ
      'O-UN', // 国際連合
    ],
  },
  {
    name: { ja: '大きな星', en: 'Single Star' },
    ids: [
      'MA', // モロッコ
      'MP', // 北マリアナ諸島
      'SO', // ソマリア
      'VN', // ベトナム
    ],
  },
  {
    name: { ja: '大きな三日月', en: 'Crescent' },
    ids: [
      'DZ', // アルジェリア
      'MR', // モーリタニア
      'MV', // モルディブ
      'PK', // パキスタン
      'TN', // チュニジア
      'TR', // トルコ
    ],
  },
  {
    name: { ja: '南十字星', en: 'Southern Cross' },
    ids: [
      'AU', // オーストラリア
      'CC', // ココス諸島
      'CX', // クリスマス島
      'NZ', // ニュージーランド
      'PG', // パプアニューギニア
      'TK', // トケラウ
      'WS', // サモア
    ],
  },
  {
    name: { ja: '多数の星', en: 'Many Stars' },
    ids: [
      'BA', // ボスニア・ヘルツェゴビナ
      'CK', // クック諸島
      'CV', // カーボベルデ
      'FM', // ミクロネシア連邦
      'O-EU', // 欧州連合
      'SB', // ソロモン諸島
      'TV', // ツバル
      'X-XK', // コソボ
    ],
  },
  {
    name: { ja: '赤道・水平線', en: 'Equator / Horizon' },
    ids: [
      'AG', // アンティグア・バーブーダ
      'AW', // アルバ
      'CW', // キュラソー島
      'KI', // キリバス
      'MH', // マーシャル諸島
      'NR', // ナウル
    ],
  },
  {
    name: { ja: '赤白', en: 'Red and White' },
    ids: [
      'AT', // オーストリア
      'BH', // バーレン
      'ID', // インドネシア
      'LV', // ラトビア
      'MC', // モナコ
      'MT', // マルタ
      'PE', // ペルー
      'PL', // ポーランド
      'QA', // カタール
      'SG', // シンガポール
    ],
  },
  {
    name: { ja: '青白', en: 'Blue and White' },
    ids: [
      'AR', // アルゼンチン
      'GT', // グアテマラ
      'HN', // ホンジュラス
      'NI', // ニカラグア
      'SM', // サンマリノ
      'SV', // エルサルバドル
    ],
  },
  {
    name: { ja: '汎スラブ色１', en: 'Pan-Slavic Colors 1' },
    ids: [
      'FR', // フランス
      'HR', // クロアチア
      'LU', // ルクセンブルク
      'NL', // オランダ
      'PY', // パラグアイ
      'RS', // セルビア
      'RU', // ロシア
      'SI', // スロベニア
      'SK', // スロバキア
    ],
  },
  {
    name: { ja: '汎スラブ色２', en: 'Pan-Slavic Colors 2' },
    ids: [
      'CZ', // チェコ
      'PH', // フィリピン
      'SX', // シント・マールテン
      'PR', // プエルトリコ
      'CU', // キューバ
      'CR', // コスタリカ
      'TH', // タイ
    ],
  },
  {
    name: { ja: '緑白１', en: 'Green and White 1' },
    ids: [
      'BG', // ブルガリア
      'HU', // ハンガリー
      'IR', // イラン
      'IT', // イタリア
      'LB', // レバノン
      'MX', // メキシコ
      'NG', // ナイジェリア
      'NF', // ノーフォーク島
      'TJ', // タジキスタン
    ],
  },
  {
    name: { ja: '緑白２', en: 'Green and White 2' },
    ids: [
      'IE', // アイルランド
      'CI', // コートジボワール
      'NE', // ニジェール
      'IN', // インド
      'UZ', // ウズベキスタン
      'SL', // シエラレオネ
      'LS', // レソト
    ],
  },
  {
    name: { ja: '汎アラブ色', en: 'Pan-Arab Colors' },
    ids: [
      'AE', // アラブ首長国連邦
      'EG', // エジプト
      'EH', // 西サハラ
      'IQ', // イラク
      'JO', // ヨルダン
      'KE', // ケニア
      'KW', // クウェート
      'LY', // リビア
      'MW', // マラウイ
      'PS', // パレスチナ
      'SD', // スーダン
      'SS', // 南スーダン
      'SY', // シリア
      'YE', // イエメン
    ],
  },
  {
    name: { ja: '汎アフリカ色', en: 'Pan-African colors' },
    ids: [
      'BO', // ボリビア
      'CM', // カメルーン
      'ET', // エチオピア
      'GH', // ガーナ
      'GN', // ギニア
      'LT', // リトアニア
      'ML', // マリ
      'MM', // ミャンマー
      'SN', // セネガル
    ],
  },
  {
    name: { ja: 'ミランダ三色旗', en: 'Miranda Tricolor' },
    ids: [
      'AD', // アンドラ
      'AM', // アルメニア
      'CO', // コロンビア
      'EC', // エクアドル
      'RO', // ルーマニア
      'MD', // モルドバ
      'TD', // チャド
      'VE', // ベネズエラ
    ],
  },
  {
    name: { ja: 'スカンジナビア十字', en: 'Scandinavian Cross' },
    ids: [
      'AX', // オーランド諸島
      'DK', // デンマーク
      'FI', // フィンランド
      'FO', // フェロー諸島
      'IS', // アイスランド
      'NO', // ノルウェー
      'SE', // スウェーデン
    ],
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

const areaFilters = AREA_TBL.filter((area) => area.other !== true).map(
  ({ name, area }) => ({
    title: name,
    func: areaFilterFunc(area),
  })
)

const otherAreas = AREA_TBL.filter((area) => area.other === true).map(
  ({ area }) => area
)

const otherAreaFilter = {
  title: { ja: '北アメリカ・その他', en: 'North America / Other' },
  func: areaFilterFunc(otherAreas),
}

const mainLandFilters = MAINLAND_TBL.map(({ name, mainLand }) => ({
  title: name,
  func: mainLandFilterFunc(mainLand),
}))

const designFilters = DESIGN_TBL.map(({ name, ids }) => ({
  title: name,
  func: idFilterFunc(ids),
}))

const FLAG_FILTER_TBL: FlagFilterType[] = [
  ...areaFilters,
  otherAreaFilter,
  ...mainLandFilters,
  ...designFilters,
]

// const FLAG_FILTER_DIC: Record<string, FlagFilterType> = FLAG_FILTER_TBL.reduce<
//   Record<string, FlagFilterType>
// >((h, o) => {
//   h[o.id] = o
//   return h
// }, {})

const getFilterList = (): FlagFilterType[] => FLAG_FILTER_TBL

// const getFilter = (id: string): FlagFilterType => FLAG_FILTER_DIC[id]

const getFlagList = (filter: FlagFilterType): FlagType[] =>
  FLAG_TBL.filter(filter.func)

export { getFilterList, getFlagList }
