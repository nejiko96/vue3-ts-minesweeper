<script setup lang="ts">
  import NerdleHelper from '@/models/NerdleHelper'
  import { NerdleHintType } from '@/types'
  import { onMounted, ref, watch } from 'vue'
  import IconBase from '@/icons/IconBase.vue'
  import IconPlus from '@/icons/IconPlus.vue'
  import IconMinus from '@/icons/IconMinus.vue'
  import IconMultiply from '@/icons/IconMultiply.vue'
  import IconDivide from '@/icons/IconDivide.vue'
  import IconEquals from '@/icons/IconEquals.vue'
  import { fillArray } from '@/utils'

  type StatePropType = {
    state: number
    label: string
    class: string
  }

  type CellPropType = NerdleHintType & StatePropType

  const emptyHint: NerdleHintType = {
    position: -1,
    letter: '',
    state: 9,
  } as const

  const stateTbl: Record<number, StatePropType> = [
    { state: 0, label: 'absent', class: 'bg-[#161803] hover:bg-[#262a08]' },
    { state: 1, label: 'present', class: 'bg-[#820458] hover:bg-[#97116b]' },
    { state: 2, label: 'correct', class: 'bg-[#398874] hover:bg-[#4ca28d]' },
    { state: 9, label: 'empty', class: 'bg-[#989484]' },
  ].reduce<Record<number, StatePropType>>((h, o) => {
    h[o.state] = o
    return h
  }, {})

  const grid = ref<NerdleHintType[][]>([])

  const searchCount = ref<number>(0)

  const searchList = ref<string[]>([])

  const getCellProp = (i: number, j: number): CellPropType => {
    const h: NerdleHintType = (grid.value[i] && grid.value[i][j]) || emptyHint
    const pr: StatePropType = stateTbl[h.state]
    return { ...h, ...pr }
  }

  const getCellProps = (i: number): CellPropType[] =>
    fillArray(8, (j) => getCellProp(i, j))

  const toggleCellState = (i: number, j: number): void => {
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
    searchList.value = nerdle.searchN(15)
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
      <div class="mb-10 p-4 dark:bg-gray-800">
        <div class="pb-2">
          <template v-for="(_n, i) in 6" :key="i">
            <div class="mb-1 flex justify-center">
              <template v-for="(cell, j) in getCellProps(i)" :key="`${i}_${j}`">
                <div
                  class="mx-0.5 flex h-[3.2rem] w-14 select-none items-center justify-center rounded text-lg font-bold text-white"
                  :class="cell.class"
                  role="navigation"
                  :aria-label="`${cell.letter} ${cell.label}`"
                  @click="toggleCellState(i, j)"
                >
                  <template v-if="i < grid.length">
                    <IconBase v-if="cell.letter === '+'" icon-name="plus"
                      ><IconPlus
                    /></IconBase>
                    <IconBase v-else-if="cell.letter === '-'" icon-name="minus"
                      ><IconMinus
                    /></IconBase>
                    <IconBase
                      v-else-if="cell.letter === '*'"
                      icon-name="multiply"
                      ><IconMultiply
                    /></IconBase>
                    <IconBase
                      v-else-if="cell.letter === '/'"
                      icon-name="divide"
                      viewBox="0 0 640 512"
                      style="height: 1rem; transform: rotate(90deg)"
                      ><IconDivide
                    /></IconBase>
                    <IconBase v-else-if="cell.letter === '='" icon-name="equals"
                      ><IconEquals
                    /></IconBase>
                    <span v-else-if="cell.letter">{{ cell.letter }}</span>
                  </template>
                </div>
              </template>
            </div>
          </template>
        </div>
        <h3 class="text-2xl font-semibold">🟪Present 🟩Correct</h3>
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
        <ul class="mb-2 grid grid-cols-3 grid-rows-5 gap-x-2 gap-y-2">
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
