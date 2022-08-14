<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { useGameStore } from '@/stores/game'
import { styleIdx } from '@/models/cellModel'

const props = defineProps<{
  row: number,
  col: number,
  value: number
}>()

const game = useGameStore()

const touched = ref(false)

const themeClass = computed((): string => {
  const { name, size } = game.theme
  return `${name}_${size}`
})

const bgPosition = computed((): string => {
  const { size } = game.theme
  const i = styleIdx(props.value)
  const x = -size * (i % 3)
  const y = -size * (i / 3 | 0)
  return `${x}px ${y}px`
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
    row: props.row,
    col: props.col,
  })
}

const handleMouseUp = (): void => {
  game.mouseUp({
    row: props.row,
    col: props.col,
  })
}

const handleMouseOver = (): void => {
  game.mouseOver({
    row: props.row,
    col: props.col,
  })
}

const handleMouseOut = (): void => {
  game.mouseOut({
    row: props.row,
    col: props.col,
  })
}

const handleTouchStart = (): void => {
  game.touchStart({
    row: props.row,
    col: props.col,
  })
  touched.value = true
}

const handleTouchEnd = (): void => {
  if (!touched.value) return
  touched.value = false
  game.touchEnd({
    row: props.row,
    col: props.col,
  })
}

watch(
  () => touched.value,
  () => {
    timeoutObj.stop()
    if (touched.value) {
      timeoutObj.start(() => {
        touched.value = false
        game.longPress({
          row: props.row,
          col: props.col,
        })
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
  background-position: v-bind(bgPosition);
}
.green_16 {
  background-image: url('../assets/green_16x16.png');
  height: 16px;
  width: 16px;
}
.green_32 {
  background-image: url('../assets/green_32x32.png');
  height: 32px;
  width: 32px;
}
.MS_16 {
  background-image: url('../assets/MS_16x16.png');
  height: 16px;
  width: 16px;
}
.MS_32 {
  background-image: url('../assets/MS_32x32.png');
  height: 32px;
  width: 32px;
}
</style>
