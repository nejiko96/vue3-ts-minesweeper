<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { styleIdx } from '@/models/cellModel'
import { useGameStore } from '@/stores/game'

const props = defineProps<{
  styleArr: Record<string, string>[]
  row: number,
  col: number,
  value: number,
}>()

const game = useGameStore()

const touched = ref(false)

const timeoutObj = {
  timeoutId: 0,
  start(handler: () => void, timeout: number): void {
    this.timeoutId = window.setTimeout(handler, timeout)
    // console.log(`timer ${this.intervalId} started`)
  },
  stop(): void {
    if (this.timeoutId > 0) {
      window.clearTimeout(this.timeoutId)
      this.timeoutId = 0
      // console.log(`timer ${this.intervalId} stopped`)
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

const handleTouchEnd = (ev: TouchEvent): void => {
  if (touched.value) {
    touched.value = false
    game.touchEnd({
      row: props.row,
      col: props.col,
    })
  }
  ev.preventDefault() // disable double tap zoom
}

watchEffect((onInvalidate) => {
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
  onInvalidate(() => timeoutObj.stop())
})
</script>

<template>
  <span
    :style="styleArr[styleIdx(props.value)]"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    @ontouchstart="handleTouchStart"
    @ontouchsend="handleTouchEnd"
  />
</template>
