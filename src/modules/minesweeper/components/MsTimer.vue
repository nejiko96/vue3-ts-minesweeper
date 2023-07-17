<script lang="ts">
  import { ref, computed, watch } from 'vue'

  import { TimerModeEnum, TimerModeType } from '../types'

  const timeUnitTbl: Readonly<Record<string, number>> = {
    ms: 1,
    s: 1000,
  }
</script>

<script setup lang="ts">
  const props = defineProps<{
    interval: string
    limit: number
    mode: TimerModeType
  }>()

  const count = ref<number>(0)

  const innerMode = computed((): TimerModeType => {
    if (props.mode !== TimerModeEnum.RUNNING) return props.mode
    if (props.limit <= 0) return props.mode
    if (count.value < props.limit) return props.mode
    return TimerModeEnum.STOPPED
  })

  const intervalMs = computed((): number => {
    const match =
      /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/.exec(props.interval.trim()) || []
    const num = (match[1] && parseFloat(match[1])) || 1000
    const mult = (match[2] && timeUnitTbl[match[2]]) || 1
    return num * mult
  })

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

  watch(
    () => innerMode.value,
    () => {
      // console.log(`watch handler: mode=${innerMode.value}`)
      intervalObj.stop()
      if (innerMode.value === TimerModeEnum.READY) {
        count.value = 0
      } else if (innerMode.value === TimerModeEnum.RUNNING) {
        intervalObj.start(() => {
          count.value += 1
        }, intervalMs.value)
      }
    }
  )
</script>

<template>
  <span>{{ count }}</span>
</template>
