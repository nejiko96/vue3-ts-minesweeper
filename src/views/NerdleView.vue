<script setup lang="ts">
  import NerdleHelper from '@/models/NerdleHelper'
  import { NerdleHintType } from '@/types'
  import { onMounted, ref, watch } from 'vue'

  const nerdleStateTbl = [
    { class: 'absent' },
    { class: 'present' },
    { class: 'correct' },
  ] as const

  const grid = ref<NerdleHintType[][]>([])

  const searchCount = ref<number>(0)

  const searchList = ref<string[]>([])

  const charStateClass = (i: number, j: number): string => {
    if (i >= grid.value.length) return 'empty'
    const st = grid.value[i][j].state
    return nerdleStateTbl[st].class
  }

  const toggleCharState = (i: number, j: number): void => {
    if (i >= grid.value.length) return
    const h = grid.value[i][j]
    h.state = (h.state + 1) % 3
  }

  const push = (s: string): void => {
    if (grid.value.length >= 6) return
    const arr = s
      .split('')
      .map<NerdleHintType>((c, i) => ({ position: i, letter: c, state: 0 }))
    grid.value.push(arr)
  }

  const pop = (): void => {
    if (grid.value.length <= 2) return
    grid.value.pop()
  }

  const reset = (): void => {
    grid.value.splice(0)
    NerdleHelper.suggest.forEach((sg) => push(sg))
  }

  const update = async () => {
    const nerdle = new NerdleHelper(grid.value.flat())
    searchCount.value = nerdle.search.length
    searchList.value = nerdle.searchN(12)
  }

  onMounted(reset)

  watch(() => grid, update, { immediate: true, deep: true })
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Nerdle Helper</h1>
    <div
      class="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-evenly"
    >
      <div class="mb-10">
        <h3 class="mb-2 text-2xl font-semibold">🟪Present 🟩Correct</h3>
        <div class="pb-2">
          <template v-for="(_n, i) in 6" :key="i">
            <div class="mb-1 flex justify-center">
              <template v-for="(_m, j) in 8" :key="`${i}_${j}`">
                <div
                  __class="box-border inline-flex h-11 w-14 items-center justify-center"
                  class="mx-0.5 flex h-14 w-14 items-center justify-center rounded"
                  :class="charStateClass(i, j)"
                  @click="toggleCharState(i, j)"
                >
                  <span
                    v-if="i < grid.length"
                    class="text-xl font-bold text-white"
                    >{{ grid[i][j].letter }}</span
                  >
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>

      <div class="mb-10">
        <ul class="mb-2 grid grid-cols-3 grid-rows-1 gap-x-2 gap-y-2">
          <a
            href="https://nerdlegame.com/"
            class="w-40 rounded-lg bg-slate-500 p-2 text-xl text-white hover:bg-slate-300"
            target="_blank"
            rel="noreferrer noopener"
            ><fa icon="fa-arrow-up-right-from-square" size="sm" /> Open
            Nerdle</a
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
            Reset
          </li>
        </ul>

        <h3 class="mb-2 text-2xl font-semibold">
          Search Result ({{ searchCount }})
        </h3>
        <ul class="mb-2 grid grid-cols-2 grid-rows-6 gap-x-2 gap-y-2">
          <li
            v-for="w in searchList"
            :key="w"
            class="w-60 rounded-lg bg-sky-500 p-2 text-xl text-white hover:bg-sky-300"
            @click="push(w)"
          >
            {{ w }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .present {
    background-color: #820458;
  }

  .present:hover {
    background-color: #97116b;
  }

  .correct {
    background-color: #398874;
  }

  .correct:hover {
    background-color: #4ca28d;
  }

  .absent {
    background-color: #161803;
  }

  .absent:hover {
    background-color: #262a08;
  }

  .empty {
    background-color: #989484;
  }
</style>
