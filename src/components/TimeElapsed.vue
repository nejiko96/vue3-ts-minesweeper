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

const props = defineProps<{ mode: TimerModeType }>()

const count = ref<number>(0)

const timerObj = {
  intervalId: 0,
  start(handler: () => void, timeout: number) {
    this.intervalId = window.setInterval(handler, timeout)
    // console.log(`timer ${this.intervalId} started`)
  },
  stop() {
    if (this.intervalId > 0) {
      window.clearInterval(this.intervalId)
      this.intervalId = 0
      // console.log(`timer ${this.intervalId} stopped`)
    }
  },
}

watchEffect((onInvalidate) => {
  // console.log(props.mode)
  timerObj.stop()
  if (props.mode === timerModes.READY) {
    count.value = 0
  } else if (props.mode === timerModes.RUNNING) {
    timerObj.start(() => { count.value += 1 }, 1000)
  }
  onInvalidate(() => timerObj.stop())
})

</script>

<template>
  <div class="card">
    <button
      type="button"
    >
      count is {{ count }}
    </button>
  </div>
</template>

<style scoped>
</style>
