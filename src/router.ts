import { createRouter, createWebHashHistory } from 'vue-router'

// 動的にインポートするとビルド生成物が分割されるが
// GitHub Pagesにデプロイすると'TypeError: Failed to fetch dynamically imported module'
// エラーになりビューが出てこない。。。
// - なぜかCatViewだけは動く
// - yarn preview --host で起動してローカルとiPadから動かしてみると問題ない

// const loadView = (module: string, view: string) => () =>
//   import(`@/modules/${module}/views/${view}.vue`)

// const routes = [
//   { path: '/', redirect: '/ms' },
//   { path: '/ms', component: loadView('minesweeper', 'MsView') },
//   { path: '/cat', component: loadView('catapi', 'CatView') },
//   { path: '/wordle', component: loadView('wordle', 'WordleView') },
//   { path: '/nerdle', component: loadView('nerdle', 'NerdleView') },
//   { path: '/slide', component: loadView('catapi', 'SlidePuzzleView') },
//   {
//     path: '/flag_training',
//     component: loadView('national_flag', 'FlagTrainingView'),
//   },
// ]

import MsView from '@/modules/minesweeper/views/MsView.vue'
import CatView from '@/modules/catapi/views/CatView.vue'
import WordleView from '@/modules/wordle/views/WordleView.vue'
import NerdleView from '@/modules/nerdle/views/NerdleView.vue'
import SlidePuzzleView from '@/modules/catapi/views/SlidePuzzleView.vue'
import FlagTrainingView from '@/modules/national_flag/views/FlagTrainingView.vue'

const routes = [
  { path: '/', redirect: '/ms' },
  { path: '/ms', component: MsView },
  { path: '/cat', component: CatView },
  { path: '/wordle', component: WordleView },
  { path: '/nerdle', component: NerdleView },
  { path: '/slide', component: SlidePuzzleView },
  {
    path: '/flag_training',
    component: FlagTrainingView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }
