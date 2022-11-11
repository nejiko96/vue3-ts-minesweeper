<script setup lang="ts">
  import { fillArray, shuffle } from '@/utils'
  import { onMounted, ref } from 'vue'

  type NeighborType = {
    di: number
    dj: number
    tr: string
  }

  const N = 4
  const N2 = N * N

  const neighbors: Readonly<NeighborType[]> = [
    { di: 1, dj: 0, tr: 'down' },
    { di: 0, dj: 1, tr: 'right' },
    { di: -1, dj: 0, tr: 'up' },
    { di: 0, dj: -1, tr: 'left' },
  ]

  const grid = ref<number[][]>([])

  const transitionName = ref<string>('')

  const isValid = (arr: number[]): boolean => {
    let invNum = 0 // 転倒数
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) invNum += 1
      }
    }

    let dist = 0 // 空きマスの移動距離
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === N2) {
        dist = ((i / N) | 0) + (i % N)
      }
    }

    return (invNum + dist) % 2 === 0
  }

  const swapFirst = (arr: number[]): void => {
    let [i, j] = [0, 1]
    if (arr[0] === N2) [i, j] = [1, 2]
    if (arr[1] === N2) [i, j] = [0, 2]
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  const generate = (): void => {
    const arr = shuffle(fillArray(N2, (k) => k + 1))
    if (!isValid(arr)) swapFirst(arr)

    grid.value = fillArray(N, (i) => arr.slice(i * N, (i + 1) * N))
    transitionName.value = ''
  }

  const slide = (i: number, j: number): void => {
    const v = grid.value[i][j]
    const nb = neighbors
      .map(({ di, dj, tr }) => ({ i2: i + di, j2: j + dj, tr }))
      .find(({ i2, j2 }) => grid.value[i2] && grid.value[i2][j2] === N2)
    if (nb) {
      const { i2, j2, tr } = nb
      grid.value[i2][j2] = v
      grid.value[i][j] = N2
      transitionName.value = `slide-${tr}`
    }
  }

  onMounted(generate)
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Slide Puzzle</h1>
    <div
      class="mx-auto mb-4 grid h-[400px] w-[400px] grid-cols-4 grid-rows-4 border-2 border-amber-200 bg-gray-400"
    >
      <template v-for="(arr, i) in grid" :key="i">
        <template v-for="(v, j) in arr" :key="`${i}_${j}`">
          <Transition :name="transitionName" mode="out-in">
            <div
              v-if="v < N2"
              class="slidepanel inline-flex select-none items-center justify-center border-2 border-amber-200 bg-amber-500 text-4xl font-bold"
              @click="() => slide(i, j)"
            >
              {{ v }}
            </div>
            <div v-else class="border-2 border-amber-200 bg-transparent"></div>
          </Transition>
        </template>
      </template>
    </div>
    <button
      class="cursor-pointer rounded border-2 border-transparent bg-amber-500 px-4 py-2 text-xl font-semibold text-white transition duration-300 hover:border-amber-300 hover:bg-amber-600"
      @click="generate"
    >
      Restart
    </button>
  </div>
</template>

<style scoped>
  .slidepanel.slide-up-leave-active,
  .slidepanel.slide-down-leave-active,
  .slidepanel.slide-left-leave-active,
  .slidepanel.slide-right-leave-active {
    transition: transform 0.25s ease;
  }

  .slidepanel.slide-up-enter-active,
  .slidepanel.slide-down-enter-active,
  .slidepanel.slide-left-enter-active,
  .slidepanel.slide-right-enter-active {
    transition: opacity 0.1s steps(1, jump-end);
  }

  .slidepanel.slide-up-enter-from,
  .slidepanel.slide-down-enter-from,
  .slidepanel.slide-left-enter-from,
  .slidepanel.slide-right-enter-from {
    opacity: 0;
  }

  .slidepanel.slide-up-leave-to {
    transform: translateY(-100%);
  }

  .slidepanel.slide-down-leave-to {
    transform: translateY(100%);
  }

  .slidepanel.slide-right-leave-to {
    transform: translateX(100%);
  }

  .slidepanel.slide-left-leave-to {
    transform: translateX(-100%);
  }
</style>
