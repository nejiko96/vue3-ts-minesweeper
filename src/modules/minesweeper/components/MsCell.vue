<script lang="ts">
  import { ref, computed, watch } from 'vue'

  import { ThemeSettingType, GridClickType, GridPosType } from '../types'
  import { styleIdx } from '../models/cellModel'

  const bgPosCache: Record<number, Record<number, string>> = {}
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

  const bgpos = computed((): string => {
    const { size } = props.theme
    bgPosCache[size] ??= {}
    const v = props.value
    if (bgPosCache[size][v] === undefined) {
      const i = styleIdx(v)
      const x = -size * (i % 3)
      const y = -size * ((i / 3) | 0)
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
    emits('mousedown', {
      button: ev.button,
      ...props,
    })
  }

  const handleMouseUp = (): void => emits('mouseup', props)

  const handleMouseEnter = (): void => emits('mouseover', props)

  const handleMouseLeave = (): void => emits('mouseout', props)

  const handleTouchStart = (): void => {
    emits('touchstart', props)
    touched.value = true
  }

  const handleTouchEnd = (): void => {
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
