<script lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import SlidePuzzle from '@/models/SlidePuzzle'
  import { fetchCatImage } from '@/models/catApi'

  import VueElementLoading from 'vue-element-loading'

  const N = 4

  const N2 = N * N

  const model = new SlidePuzzle(N)
</script>

<script setup lang="ts">
  const grid = ref<number[][]>([])

  const transitionName = ref<string>('')

  const complete = computed(() => model.isComplete(grid.value))

  const initGrid = (): void => {
    grid.value = model.generateGrid()
    transitionName.value = ''
  }

  const slideGrid = (i: number, j: number): void => {
    const move = model.slideAt(grid.value, i, j)
    transitionName.value = `slide-${move}`
  }

  const imgRef = ref<HTMLImageElement>()

  const imgUrl = ref('')

  const isLoading = ref(false)

  const updateImage = async () => {
    isLoading.value = true
    const image = await fetchCatImage()
    imgUrl.value = image.url
  }

  const loadedImage = () => {
    bgwidth.value = (imgRef.value && imgRef.value.width) || 500
    bgheight.value = (imgRef.value && imgRef.value.height) || 500
    initGrid()
    isLoading.value = false
  }

  const bgwidth = ref<number>(500)

  const bgheight = ref<number>(500)

  const bgimg = computed(() => `url('${imgUrl.value}')`)

  const bgpos = (v: number): string => {
    const k = v - 1
    const [i, j] = [(k / N) | 0, k % N]
    const [x, y] = [
      ((bgwidth.value * j) / N) | 0,
      ((bgheight.value * i) / N) | 0,
    ]
    return `-${x + 2}px -${y + 2}px`
  }

  onMounted(updateImage)
</script>

<template>
  <VueElementLoading
    :active="isLoading"
    color="orange"
    is-full-page
    spinner="line-scale"
  />
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Slide Puzzle</h1>
    <div class="relative mx-auto mb-6 w-[600px] border-2 border-amber-200">
      <img
        ref="imgRef"
        :src="imgUrl"
        class="h-auto w-full"
        @load="loadedImage"
      />
      <Transition name="fade">
        <div
          v-show="!complete"
          class="absolute top-0 left-0 bottom-0 right-0 grid grid-cols-4 grid-rows-4 bg-gray-500"
        >
          <template v-for="(arr, i) in grid" :key="i">
            <template v-for="(v, j) in arr" :key="`${i}_${j}`">
              <Transition :name="transitionName" mode="out-in">
                <div
                  v-if="v < N2"
                  class="slidepanel inline-flex select-none items-center justify-center border-2 border-amber-200 text-4xl font-bold text-white"
                  :style="`background-position: ${bgpos(v)}`"
                  @click="() => slideGrid(i, j)"
                >
                  {{ v }}
                </div>
                <div
                  v-else
                  class="border-2 border-amber-200 bg-transparent"
                ></div>
              </Transition>
            </template>
          </template>
        </div>
      </Transition>
    </div>
    <button
      class="cursor-pointer rounded border-2 border-transparent bg-amber-500 px-4 py-2 text-xl font-semibold text-white transition duration-300 hover:border-amber-300 hover:bg-amber-600"
      @click="updateImage"
    >
      Restart
    </button>
  </div>
</template>

<style scoped>
  .slidepanel {
    background-image: v-bind(bgimg);
    background-size: v-bind(bgwidth + 'px') v-bind(bgheight + 'px');
    -webkit-text-stroke: 1px #000;
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
    transition: opacity 0.2s step-end;
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

  .fade-leave-active {
    transition: opacity 2s ease;
  }

  .fade-leave-to {
    opacity: 0;
  }
</style>
