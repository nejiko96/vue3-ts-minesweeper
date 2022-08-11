<script lang="ts">
export const timerModes = {
  READY: 'ready',
  RUNNING: 'running',
  STOPPED: 'stopped',
} as const

export type TimerModeType = typeof timerModes[keyof typeof timerModes]
</script>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  style: Record<string, string>,
  mode: TimerModeType,
}>()

const count = ref<number>(0)

const intervalObj = {
  intervalId: 0,
  start(handler: () => void, timeout: number): void {
    this.intervalId = window.setInterval(handler, timeout)
    // console.log(`timer ${this.intervalId} started`)
  },
  stop(): void {
    if (this.intervalId > 0) {
      window.clearInterval(this.intervalId)
      this.intervalId = 0
      // console.log(`timer ${this.intervalId} stopped`)
    }
  },
}

watchEffect((onInvalidate) => {
  // console.log(props.mode)
  intervalObj.stop()
  if (props.mode === timerModes.READY) {
    count.value = 0
  } else if (props.mode === timerModes.RUNNING) {
    intervalObj.start(() => { count.value += 1 }, 1000)
  }
  onInvalidate(() => intervalObj.stop())
})
</script>

<template>
  <span :style="props.style">{{ count }}</span>
</template>
