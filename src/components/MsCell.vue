<script lang="ts">
import { ref, computed, watch } from 'vue'

import { useGameStore } from '@/stores/game'
import { styleIdx } from '@/models/cellModel'

const bgPosCache: Record<number, Record<number, string>> = {}
</script>

<script setup lang="ts">
const props = defineProps<{
  row: number,
  col: number,
  value: number
}>()

const game = useGameStore()

const touched = ref(false)

const themeClass = computed((): string => {
  const { name, size } = game.theme
  return `${name}-${size}`.toLowerCase()
})

const bgpos = computed((): string => {
  const { size } = game.theme
  bgPosCache[size] ??= {}
  const v = props.value
  if (bgPosCache[size][v] === undefined) {
    const i = styleIdx(v)
    const x = -size * (i % 3)
    const y = -size * (i / 3 | 0)
    bgPosCache[size][v] = `${x}px ${y}px`
  }

  return bgPosCache[size][v]
})

const timeoutObj = {
  timeoutId: 0,
  start(handler: () => void, timeout: number): void {
    this.timeoutId = window.setTimeout(handler, timeout)
    // console.log(`timer ${this.timeoutId} started`)
  },
  stop(): void {
    if (this.timeoutId > 0) {
      window.clearTimeout(this.timeoutId)
      // console.log(`timer ${this.timeoutId} stopped`)
      this.timeoutId = 0
    }
  },
}

const handleMouseDown = (ev: MouseEvent): void => {
  game.mouseDown({
    button: ev.button,
    ...props,
  })
}

const handleMouseUp = (): void => game.mouseUp(props)

const handleMouseOver = (): void => game.mouseOver(props)

const handleMouseOut = (): void => game.mouseOut(props)

const handleTouchStart = (): void => {
  game.touchStart(props)
  touched.value = true
}

const handleTouchEnd = (): void => {
  if (!touched.value) return
  touched.value = false
  game.touchEnd(props)
}

watch(
  () => touched.value,
  () => {
    timeoutObj.stop()
    if (touched.value) {
      timeoutObj.start(() => {
        touched.value = false
        game.longPress(props)
      }, 300)
    }
  },
)
</script>

<template>
  <span
    class="cell value"
    :class="themeClass"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    @touchstart.prevent="handleTouchStart"
    @touchend="handleTouchEnd"
  />
</template>

<style scoped>
.cell {
  display: inline-block;
  overflow: hidden;
}

.value {
  background-position: v-bind(bgpos);
}

.green-16 {
  background-image: url("../assets/green_16x16.png");
  height: 16px;
  width: 16px;
}

.green-32 {
  background-image: url("../assets/green_32x32.png");
  height: 32px;
  width: 32px;
}

.ms-16 {
  background-image: url("../assets/MS_16x16.png");
  height: 16px;
  width: 16px;
}

.ms-32 {
  background-image: url("../assets/MS_32x32.png");
  height: 32px;
  width: 32px;
}
</style>
