<script setup lang="ts">
  import WordleHelper, {
    WordleHintType,
    WordleSuggestionType,
  } from '@/models/WordleHelper'
  import { fillArray } from '@/utils'
  import { ref, watch } from 'vue'

  type StatePropType = {
    state: number
    label: string
    class: string
  }

  type CellPropType = WordleHintType & StatePropType

  const emptyHint: WordleHintType = {
    position: -1,
    letter: '',
    state: 9,
  } as const

  const stateTbl = [
    { state: 0, label: 'absent', class: 'absent' },
    { state: 1, label: 'present', class: 'present' },
    { state: 2, label: 'correct', class: 'correct' },
    { state: 9, label: 'empty', class: 'empty' },
  ].reduce<Record<number, StatePropType>>((h, o) => {
    h[o.state] = o
    return h
  }, {})

  const grid = ref<WordleHintType[][]>([])

  const searchCount = ref<number>(0)

  const searchList = ref<string[]>([])

  const suggestion = ref<WordleSuggestionType[]>([])

  const getCellProp = (i: number, j: number): CellPropType => {
    const h: WordleHintType = (grid.value[i] && grid.value[i][j]) || emptyHint
    const pr: StatePropType = stateTbl[h.state]
    return { ...h, ...pr }
  }

  const getCellProps = (i: number): CellPropType[] =>
    fillArray(5, (j) => getCellProp(i, j))

  const toggleCellState = (i: number, j: number): void => {
    if (i >= grid.value.length) return
    const h = grid.value[i][j]
    h.state = (h.state + 1) % 3
  }

  const push = (s: string): void => {
    if (grid.value.length >= 6) return
    const arr = s
      .split('')
      .map<WordleHintType>((c, i) => ({ position: i, letter: c, state: 0 }))
    grid.value.push(arr)
  }

  const pop = (): void => {
    if (grid.value.length <= 0) return
    grid.value.pop()
  }

  const reset = (): void => {
    grid.value.splice(0)
  }

  const update = async (): Promise<void> => {
    const wordle = new WordleHelper(grid.value.flat())
    searchCount.value = wordle.search.length
    searchList.value = wordle.searchN(12)
    suggestion.value = wordle.suggestN(6)
  }

  watch(() => grid, update, { immediate: true, deep: true })
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Wordle Helper</h1>
    <div
      class="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-evenly"
    >
      <div class="mb-10">
        <div class="mb-2 grid grid-cols-5 grid-rows-6 gap-x-2 gap-y-2">
          <template v-for="(_n, i) in 6" :key="i">
            <template v-for="(cell, j) in getCellProps(i)" :key="`${i}_${j}`">
              <div
                class="box-border inline-flex h-16 w-16 select-none items-center justify-center text-4xl font-bold uppercase text-white"
                :class="cell.class"
                role="img"
                aria-roledescription="tile"
                :aria-label="`${cell.letter} ${cell.label}`"
                aria-live="polite"
                @click="toggleCellState(i, j)"
              >
                <span v-if="cell.letter">{{ cell.letter }}</span>
              </div>
            </template>
          </template>
        </div>
        <h3 class="text-2xl font-semibold">🟨Present 🟩Correct</h3>
      </div>

      <div class="mb-10">
        <ul class="mb-2 grid grid-cols-3 grid-rows-1 gap-x-2 gap-y-2">
          <a
            href="https://www.nytimes.com/games/wordle/index.html"
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
            target="_blank"
            rel="noreferrer noopener"
            ><fa icon="fa-arrow-up-right-from-square" size="sm" /> Open
            Wordle</a
          >
          <li
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
            @click="pop"
          >
            <fa icon="fa-rotate-left" size="sm" />
            Undo
          </li>
          <li
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
            @click="reset"
          >
            <fa icon="fa-trash-can" size="sm" />
            Clear
          </li>
        </ul>

        <h3 class="mb-2 text-2xl font-semibold">Suggestion</h3>
        <ul class="mb-2 grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-2">
          <li
            v-for="sg in suggestion"
            :key="sg.w"
            class="w-40 rounded-lg bg-pink-500 p-2 text-xl text-white hover:bg-pink-300"
            :tooltip="`${sg.r1}-${sg.r2}-${sg.r3}`"
            flow="down"
            @click="push(sg.w)"
          >
            {{ sg.w }}
          </li>
        </ul>

        <h3 class="mb-2 text-2xl font-semibold">
          Search Result ({{ searchCount }})
        </h3>
        <ul class="mb-2 grid grid-cols-3 grid-rows-4 gap-x-2 gap-y-2">
          <li
            v-for="w in searchList"
            :key="w"
            class="w-40 rounded-lg bg-sky-500 p-2 text-xl text-white hover:bg-sky-300"
            @click="push(w)"
          >
            {{ w }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  :root {
    --color-tone-1: #000;
    --color-tone-2: #787c7e;
    --color-tone-3: #878a8c;
    --color-tone-4: #d3d6da;
    --color-tone-5: #edeff1;
    --color-tone-6: #f6f7f8;
    --color-tone-7: #fff;
    --color-tone-8: #121212;
    --color-tone-9: #dfdfdf;
    --color-tone-10: #000;
    --color-tone-11: #787c7e;
    --color-tone-12: #363636;
    --green: #6aaa64;
    --darkened-green: #538d4e;
    --yellow: #c9b458;
    --darkened-yellow: #b59f3b;
    --color-present: var(--yellow);
    --color-correct: var(--green);
    --color-absent: var(--color-tone-2);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-tone-1: #fff;
      --color-tone-2: #818384;
      --color-tone-3: #565758;
      --color-tone-4: #3a3a3c;
      --color-tone-5: #272729;
      --color-tone-6: #1a1a1b;
      --color-tone-7: #121213;
      --color-tone-8: #fff;
      --color-tone-9: #424242;
      --color-tone-10: #dfdfdf;
      --color-tone-11: #dfdfdf;
      --color-tone-12: #dfdfdf;
      --color-present: var(--darkened-yellow);
      --color-correct: var(--darkened-green);
      --color-absent: var(--color-tone-4);
    }
  }
</style>

<style scoped>
  .present {
    background-color: var(--color-present);
  }

  .present:hover {
    background-color: #fef08a;
  }

  .correct {
    background-color: var(--color-correct);
  }

  .correct:hover {
    background-color: #a1e1c7;
  }

  .absent {
    background-color: var(--color-absent);
  }

  .absent:hover {
    background-color: #bcc1c4;
  }

  .empty {
    border: 2px solid var(--color-tone-4);
  }

  /* START TOOLTIP STYLES */
  [tooltip] {
    position: relative; /* opinion 1 */
  }

  /* Applies to all tooltips */
  [tooltip]::before,
  [tooltip]::after {
    text-transform: none; /* opinion 2 */
    font-size: 0.7em; /* opinion 3 */
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    display: none;
    opacity: 0;
  }

  [tooltip]::before {
    content: '';
    border: 5px solid transparent; /* opinion 4 */
    z-index: 1001; /* absurdity 1 */
  }

  [tooltip]::after {
    content: attr(tooltip); /* magic! */

    /* most of the rest of this is opinion */
    font-family: Helvetica, sans-serif;
    text-align: center;

    /*
    Let the content set the size of the tooltips
    but this will also keep them from being obnoxious
    */
    min-width: 3em;
    max-width: 21em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 1ch 1.5ch;
    border-radius: 0.3ch;
    box-shadow: 0 1em 2em -0.5em rgb(0 0 0 / 35%);
    background: #333;
    color: #fff;
    z-index: 1000; /* absurdity 2 */
  }

  /* Make the tooltips respond to hover */
  [tooltip]:hover::before,
  [tooltip]:hover::after {
    display: block;
  }

  /* don't show empty tooltips */
  [tooltip='']::before,
  [tooltip='']::after {
    display: none !important;
  }

  /* FLOW: UP */
  [tooltip]:not([flow])::before,
  [tooltip][flow^='up']::before {
    bottom: 100%;
    border-bottom-width: 0;
    border-top-color: #333;
  }

  [tooltip]:not([flow])::after,
  [tooltip][flow^='up']::after {
    bottom: calc(100% + 5px);
  }

  [tooltip]:not([flow])::before,
  [tooltip]:not([flow])::after,
  [tooltip][flow^='up']::before,
  [tooltip][flow^='up']::after {
    left: 50%;
    transform: translate(-50%, -0.5em);
  }

  /* FLOW: DOWN */
  [tooltip][flow^='down']::before {
    top: 100%;
    border-top-width: 0;
    border-bottom-color: #333;
  }

  [tooltip][flow^='down']::after {
    top: calc(100% + 5px);
  }

  [tooltip][flow^='down']::before,
  [tooltip][flow^='down']::after {
    left: 50%;
    transform: translate(-50%, 0.5em);
  }

  /* FLOW: LEFT */
  [tooltip][flow^='left']::before {
    top: 50%;
    border-right-width: 0;
    border-left-color: #333;
    left: calc(0em - 5px);
    transform: translate(-0.5em, -50%);
  }

  [tooltip][flow^='left']::after {
    top: 50%;
    right: calc(100% + 5px);
    transform: translate(-0.5em, -50%);
  }

  /* FLOW: RIGHT */
  [tooltip][flow^='right']::before {
    top: 50%;
    border-left-width: 0;
    border-right-color: #333;
    right: calc(0em - 5px);
    transform: translate(0.5em, -50%);
  }

  [tooltip][flow^='right']::after {
    top: 50%;
    left: calc(100% + 5px);
    transform: translate(0.5em, -50%);
  }

  /* KEYFRAMES */
  @keyframes tooltips-vert {
    to {
      opacity: 0.9;
      transform: translate(-50%, 0);
    }
  }

  @keyframes tooltips-horz {
    to {
      opacity: 0.9;
      transform: translate(0, -50%);
    }
  }

  /* FX All The Things */
  [tooltip]:not([flow]):hover::before,
  [tooltip]:not([flow]):hover::after,
  [tooltip][flow^='up']:hover::before,
  [tooltip][flow^='up']:hover::after,
  [tooltip][flow^='down']:hover::before,
  [tooltip][flow^='down']:hover::after {
    animation: tooltips-vert 300ms ease-out forwards;
  }

  [tooltip][flow^='left']:hover::before,
  [tooltip][flow^='left']:hover::after,
  [tooltip][flow^='right']:hover::before,
  [tooltip][flow^='right']:hover::after {
    animation: tooltips-horz 300ms ease-out forwards;
  }
</style>
