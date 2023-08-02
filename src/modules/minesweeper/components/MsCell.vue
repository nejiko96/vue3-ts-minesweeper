<script lang="ts">
  import { computed, ref, watch } from 'vue'

  import { styleIdx } from '../models/cellModel'
  import type { GridClickType, GridPosType, ThemeSettingType } from '../types'

  const calcBgPos: (s: number, v: number) => string = (s, v) => {
    const i = styleIdx(v)
    const x = -s * (i % 3)
    const y = -s * ((i / 3) | 0)
    return `${x}px ${y}px`
  }

  const bgPosCache: Record<number, Record<number, string>> = {}

  const getBgPos: (s: number, v: number) => string = (s, v) => {
    bgPosCache[s] ??= {}
    bgPosCache[s][v] ??= calcBgPos(s, v)
    return bgPosCache[s][v]
  }
</script>

<script setup lang="ts">
  const props = defineProps<{
    theme: ThemeSettingType
    row: number
    col: number
    value: number
  }>()

  const emits = defineEmits<{
    (e: 'mousedown', params: GridClickType): void
    (e: 'mouseup', params: GridPosType): void
    (e: 'mouseover', params: GridPosType): void
    (e: 'mouseout', params: GridPosType): void
    (e: 'touchstart', params: GridPosType): void
    (e: 'touchend', params: GridPosType): void
    (e: 'longpress', params: GridPosType): void
  }>()

  const touched = ref(false)

  const themeClass = computed((): string => {
    const { name, size } = props.theme
    return `${name}-${size}`.toLowerCase()
  })

  const bgpos = computed((): string => getBgPos(props.theme.size, props.value))

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

  const handleMouseDown: (ev: MouseEvent) => void = (ev) => {
    emits('mousedown', {
      button: ev.button,
      ...props,
    })
  }

  const handleMouseUp: () => void = () => emits('mouseup', props)

  const handleMouseEnter: () => void = () => emits('mouseover', props)

  const handleMouseLeave: () => void = () => emits('mouseout', props)

  const handleTouchStart: () => void = () => {
    emits('touchstart', props)
    touched.value = true
  }

  const handleTouchEnd: () => void = () => {
    if (!touched.value) return
    touched.value = false
    emits('touchend', props)
  }

  watch(
    () => touched.value,
    () => {
      timeoutObj.stop()
      if (touched.value) {
        timeoutObj.start(() => {
          touched.value = false
          emits('longpress', props)
        }, 300)
      }
    }
  )
</script>

<template>
  <span
    class="cell value"
    :class="themeClass"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
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
    background-image: url('../assets/green_16x16.png');
    height: 16px;
    width: 16px;
  }

  .green-32 {
    background-image: url('../assets/green_32x32.png');
    height: 32px;
    width: 32px;
  }

  .ms-16 {
    background-image: url('../assets/MS_16x16.png');
    height: 16px;
    width: 16px;
  }

  .ms-32 {
    background-image: url('../assets/MS_32x32.png');
    height: 32px;
    width: 32px;
  }
</style>
