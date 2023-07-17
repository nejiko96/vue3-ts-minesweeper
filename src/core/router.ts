import { createRouter, createWebHashHistory } from 'vue-router'

// 動的にインポートするとビルド生成物が分割されるが
// GitHub Pagesにデプロイすると'TypeError: Failed to fetch dynamically imported module'
// エラーになりビューが出てこない。。。
// - なぜかCatViewだけが動く
// - yarn preview --host で起動してローカルとiPadで動かすと動く
//   -> サイトのサブフォルダで動かそうとするとダメっぽい
// - ベースURLを vite.config.tsの設定から引っ張ってきてcreateWebHistory()に渡す
//   https://zenn.dev/kouschatten/scraps/d8e11adf870d78
// - _plugin-vue_export-helper.02828bc0.js がアンスコ始まりのためGitHub Pagesに置くと
//   404になってしまう
//   https://github.com/vitejs/vite/issues/9119
//   ->フォルダ直下に.nojekyllファイルを置くとJekyllによる加工がスキップされて
//     アンスコ付きファイルも読めるようになる

const loadView: (module: string, view: string) => Promise<any> = (
  module,
  view
) => import(`@/modules/${module}/views/${view}.vue`)

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
  {
    path: '/flag_quiz',
    component: loadView('national_flag', 'FlagQuizView'),
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export { router }
