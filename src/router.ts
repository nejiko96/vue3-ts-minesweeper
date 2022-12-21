import { createRouter, createWebHashHistory } from 'vue-router'

// 動的にインポートするとビルド生成物が分割されるが
// GitHub Pagesにデプロイすると'TypeError: Failed to fetch dynamically imported module'
// エラーになりビューが出てこない。。。
// - なぜかCatViewだけが動く
// - yarn preview --host で起動してローカルとiPadから動かしてみると問題ない
// - サイトのサブフォルダで動かそうとするとダメっぽい
// - ベースURLを vite.config.tsの設定から引っ張ってきてcreateWebHistoryに渡す
//   https://zenn.dev/kouschatten/scraps/d8e11adf870d78
// - _plugin-vue_export-helper.02828bc0.js がアンスコ始まりのためGitHub Pagesに置くと
//   404になってしまう
//   https://github.com/vitejs/vite/issues/9119
// - .nojekyllファイルを置くとJekyllによる加工がスキップされてアンスコ付きファイルも
//   読めるようになる

const loadView = (module: string, view: string) => () =>
  import(`@/modules/${module}/views/${view}.vue`)

const routes = [
  { path: '/', redirect: '/ms' },
  { path: '/ms', component: loadView('minesweeper', 'MsView') },
  { path: '/cat', component: loadView('catapi', 'CatView') },
  { path: '/wordle', component: loadView('wordle', 'WordleView') },
  { path: '/nerdle', component: loadView('nerdle', 'NerdleView') },
  { path: '/slide', component: loadView('catapi', 'SlidePuzzleView') },
  {
    path: '/flag_training',
    component: loadView('national_flag', 'FlagTrainingView'),
  },
]

// import MsView from '@/modules/minesweeper/views/MsView.vue'
// import CatView from '@/modules/catapi/views/CatView.vue'
// import WordleView from '@/modules/wordle/views/WordleView.vue'
// import NerdleView from '@/modules/nerdle/views/NerdleView.vue'
// import SlidePuzzleView from '@/modules/catapi/views/SlidePuzzleView.vue'
// import FlagTrainingView from '@/modules/national_flag/views/FlagTrainingView.vue'

// const routes = [
//   { path: '/', redirect: '/ms' },
//   { path: '/ms', component: MsView },
//   { path: '/cat', component: CatView },
//   { path: '/wordle', component: WordleView },
//   { path: '/nerdle', component: NerdleView },
//   { path: '/slide', component: SlidePuzzleView },
//   {
//     path: '/flag_training',
//     component: FlagTrainingView,
//   },
// ]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export { router }
