import { createRouter, createWebHashHistory } from 'vue-router'

const loadView = (module: string, view: string) => () =>
  import(`@/modules/${module}/views/${view}.vue`)

const routes = [
  { path: '/', component: loadView('minesweeper', 'MsView') },
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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }
