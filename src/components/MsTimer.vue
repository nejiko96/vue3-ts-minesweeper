<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { StyleType, TimerModeEnum, TimerModeType } from '@/types'

const props = defineProps<{
  style: StyleType,
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
      // console.log(`timer ${this.intervalId} stopped`)
      this.intervalId = 0
    }
  },
}

watchEffect((onInvalidate) => {
  // console.log(props.mode)
  intervalObj.stop()
  if (props.mode === TimerModeEnum.READY) {
    count.value = 0
  } else if (props.mode === TimerModeEnum.RUNNING) {
    intervalObj.start(() => { count.value += 1 }, 1000)
  }
  onInvalidate(() => intervalObj.stop())
})
</script>

<template>
  <span :style="props.style">{{ count }}</span>
</template>
