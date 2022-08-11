<script setup lang="ts">
import {
  ref, computed, watch, onMounted, onBeforeUnmount,
} from 'vue'

import { SettingsType } from '@/types'
import { initStyles } from '@/utils/styles'
import { initLocale } from '@/utils/locale'
import { gameStatusFlags } from '@/models/gameModel'
import { useGameStore } from '@/stores/game'

import MsTimer, { timerModes } from './MsTimer.vue'
import MsBoard from './MsBoard.vue'

const timerModeTbl = {
  [gameStatusFlags.READY]: timerModes.READY,
  [gameStatusFlags.RUNNING]: timerModes.RUNNING,
  [gameStatusFlags.CLEARED]: timerModes.STOPPED,
  [gameStatusFlags.GAMEOVER]: timerModes.STOPPED,
}

const props = defineProps<{
  settings: SettingsType
}>()

const locale = computed(() => initLocale(props.settings.lang))

const styles = computed(() => initStyles(props.settings.theme, props.settings.cellSize))

const node = ref<HTMLInputElement | null>(null)

const game = useGameStore()

const clearMsg = computed(() => (game.status === gameStatusFlags.CLEARED ? locale.value.cleared : ''))

const handleContextMenu = (ev: Event) => ev.preventDefault()

const handleRestart = () => game.restart()

onMounted(() => node.value?.addEventListener('contextmenu', handleContextMenu))

onBeforeUnmount(() => node.value?.removeEventListener('contextmenu', handleContextMenu))

watch(
  () => props.settings.board,
  () => {
    game.init(props.settings.board)
  },
  { deep: true },
)
</script>

<template>
  <div
    ref="node"
    :style="styles.container"
  >
    {{ locale.remain1 }}
    <span :style="styles.counter">{{ game.remain }}</span>
    {{ locale.remain2 }}
    <span :style="styles.space" />
    {{ locale.timer1 }}
    <MsTimer
      :style="styles.timer"
      :mode="timerModeTbl[game.status]"
    />
    {{ locale.timer2 }}
    <span :style="styles.space" />
    {{ clearMsg }}
    <br>
    <MsBoard
      :styles="styles"
    />
    <p />
    <button
      type="button"
      @onclick="handleRestart"
    >
      {{ locale.retry }}
    </button>
  </div>
</template>
