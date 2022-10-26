<script setup lang="ts">
  import WordleHelper from '@/models/WordleHelper'
  import { WordleHintType } from '@/types'
  import { ref, watch } from 'vue'

  const wordleStateTbl = [
    { class: 'absent' },
    { class: 'present' },
    { class: 'correct' },
  ] as const

  const grid = ref<WordleHintType[][]>([])

  const searchCount = ref<number>(0)

  const searchList = ref<string[]>([])

  const suggestion = ref<string[]>([])

  const charClass = (i: number, j: number): string => {
    if (i >= grid.value.length) return 'empty'
    const st = grid.value[i][j].state
    return wordleStateTbl[st].class
  }

  const toggleCharState = (i: number, j: number): void => {
    if (i >= grid.value.length) return
    const h = grid.value[i][j]
    h.state = (h.state + 1) % 3
  }

  const pushWord = (s: string): void => {
    if (grid.value.length >= 6) return
    const arr = s
      .split('')
      .map<WordleHintType>((c, i) => ({ position: i, letter: c, state: 0 }))
    grid.value.push(arr)
  }

  const popWord = (): void => {
    if (grid.value.length <= 0) return
    grid.value.pop()
  }

  const clearWords = (): void => {
    grid.value.splice(0)
  }

  watch(
    () => grid,
    () => {
      const wordle = new WordleHelper(grid.value.flat())
      searchCount.value = wordle.search.length
      searchList.value = wordle.searchN(9)
      suggestion.value = wordle.suggestN(6).map((sg) => sg.w)
    },
    { immediate: true, deep: true }
  )
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Wordle Helper</h1>
    <div class="--items-center flex grow justify-evenly">
      <div>
        <h3 class="mb-2 text-2xl font-semibold">Present/Correct/Absent</h3>
        <div class="grid grid-cols-5 grid-rows-6 gap-x-2 gap-y-2">
          <template v-for="(_n, i) in 6" :key="i">
            <template v-for="(_m, j) in 5" :key="`${i}_${j}`">
              <div
                class="box-border inline-flex h-16 w-16 items-center justify-center uppercase text-white"
                :class="charClass(i, j)"
                @click="toggleCharState(i, j)"
              >
                <span v-if="i < grid.length" class="text-4xl font-bold">{{
                  grid[i][j].letter
                }}</span>
              </div>
            </template>
          </template>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-2xl font-semibold">Command</h3>
        <ul class="mb-2 grid grid-cols-3 grid-rows-1 gap-x-2 gap-y-2">
          <a
            href="https://www.nytimes.com/games/wordle/index.html"
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
            target="_blank"
            rel="noreferrer noopener"
            >Open Wordle</a
          >
          <li
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
            @click="popWord"
          >
            <fa icon="fa-rotate-left" size="sm" />
            Undo
          </li>
          <li
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
            @click="clearWords"
          >
            <fa icon="fa-trash-can" size="sm" />
            Clear
          </li>
        </ul>

        <h3 class="mb-2 text-2xl font-semibold">Suggestion</h3>
        <ul class="mb-2 grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-2">
          <li
            v-for="w in suggestion"
            :key="w"
            class="w-40 rounded-lg bg-pink-500 p-2 text-xl text-white hover:bg-pink-300"
            @click="pushWord(w)"
          >
            {{ w }}
          </li>
        </ul>

        <h3 class="mb-2 text-2xl font-semibold">
          Search Result ({{ searchCount }})
        </h3>
        <ul class="mb-2 grid grid-cols-3 grid-rows-3 gap-x-2 gap-y-2">
          <li
            v-for="w in searchList"
            :key="w"
            class="w-40 rounded-lg bg-sky-500 p-2 text-xl text-white hover:bg-sky-300"
            @click="pushWord(w)"
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
</style>
