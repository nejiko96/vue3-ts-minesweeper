<script lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { fetchCatImage } from '@/models/catApi'
  import { fillArray, shuffle } from '@/utils'

  type NeighborType = {
    di: number
    dj: number
    move: string
  }

  const neighbors: Readonly<NeighborType[]> = [
    { di: 1, dj: 0, move: 'down' },
    { di: 0, dj: 1, move: 'right' },
    { di: -1, dj: 0, move: 'up' },
    { di: 0, dj: -1, move: 'left' },
  ]

  const N = 4

  const N2 = N * N
</script>

<script setup lang="ts">
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
      .map(({ di, dj, move }) => ({ i2: i + di, j2: j + dj, move }))
      .find(({ i2, j2 }) => grid.value[i2] && grid.value[i2][j2] === N2)
    if (nb) {
      const { i2, j2, move } = nb
      grid.value[i2][j2] = v
      grid.value[i][j] = N2
      transitionName.value = `slide-${move}`
    }
  }

  const imgRef = ref<HTMLImageElement>()

  const basewidth = ref<number>(500)

  const baseheight = ref<number>(500)

  const bgpos = (v: number): string => {
    const k = v - 1
    const i = (k / N) | 0
    const j = k % N
    const x = ((basewidth.value * j) / N) | 0
    const y = ((baseheight.value * i) / N) | 0
    return `-${x}px -${y}px`
  }

  const catImageUrl = ref('')

  const isLoading = ref(false)

  const bgimg = computed(() => `url('${catImageUrl.value}')`)

  const updateCatImage = async () => {
    isLoading.value = true
    const image = await fetchCatImage()
    catImageUrl.value = image.url
  }

  const loadedCatImage = () => {
    basewidth.value = (imgRef.value && imgRef.value.width) || 500
    baseheight.value = (imgRef.value && imgRef.value.height) || 500
    generate()
    isLoading.value = false
  }

  onMounted(updateCatImage)
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Slide Puzzle</h1>
    <div
      class="basepanel mx-auto mb-4 grid grid-cols-4 grid-rows-4 border-2 border-amber-200 bg-gray-400"
    >
      <template v-for="(arr, i) in grid" :key="i">
        <template v-for="(v, j) in arr" :key="`${i}_${j}`">
          <Transition :name="transitionName" mode="out-in">
            <div
              v-if="v < N2"
              class="slidepanel inline-flex select-none items-center justify-center border-2 border-amber-200 text-4xl font-bold"
              :style="`background-position: ${bgpos(v)}`"
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
      class="mb-4 cursor-pointer rounded border-2 border-transparent bg-amber-500 px-4 py-2 text-xl font-semibold text-white transition duration-300 hover:border-amber-300 hover:bg-amber-600"
      @click="updateCatImage"
    >
      Restart
    </button>
    <img
      ref="imgRef"
      :src="catImageUrl"
      class="mx-auto hidden w-3/5"
      @load="loadedCatImage"
    />
  </div>
</template>

<style scoped>
  .basepanel {
    width: v-bind(basewidth + 'px');
    height: v-bind(baseheight + 'px');
  }

  .slidepanel {
    background-image: v-bind(bgimg);
    background-size: v-bind(basewidth + 'px') v-bind(baseheight + 'px');
  }

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
    transition: opacity 0.1s step-end;
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
