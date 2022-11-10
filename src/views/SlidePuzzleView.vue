<script setup lang="ts">
  import { fillArray, shuffle } from '@/utils'
  import { onMounted, ref } from 'vue'

  const N = 4
  const N2 = N * N

  const neighbors = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ] as const

  const grid = ref<number[][]>([])

  const isValid = (arr: number[]): boolean => {
    let invNum = 0 // 転倒数
    let dist = 0 // 空きマスの移動距離
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) invNum += 1
      }
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
  }

  const slide = (i: number, j: number): void => {
    const v = grid.value[i][j]
    const p2 = neighbors
      .map(([di, dj]) => [i + di, j + dj])
      .find(([i2, j2]) => grid.value[i2] && grid.value[i2][j2] === N2)
    if (p2) {
      const [i2, j2] = p2
      grid.value[i2][j2] = v
      grid.value[i][j] = N2
    }
  }

  onMounted(generate)
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Slide Puzzle</h1>
    <div
      class="mx-auto mb-4 grid h-[400px] w-[400px] grid-cols-4 grid-rows-4 border-2 border-orange-200"
    >
      <template v-for="(arr, i) in grid" :key="i">
        <template v-for="(v, j) in arr" :key="`${i}_${j}`">
          <div
            v-if="v < N2"
            class="inline-flex select-none items-center justify-center border-2 border-amber-200 bg-amber-500 text-4xl font-bold"
            @click="() => slide(i, j)"
          >
            {{ v }}
          </div>
          <div v-else class="border-2 border-orange-200 bg-gray-500"></div>
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
