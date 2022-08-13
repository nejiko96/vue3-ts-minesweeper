<script setup lang="ts">
import {
  ref, computed, watch, onMounted, onBeforeUnmount,
} from 'vue'

import {
  SettingsType,
  GameStatusEnum,
  GameStatusType,
  TimerModeEnum,
  TimerModeType,
} from '@/types'
import { initStyles } from '@/utils/styles'
import { initLocale } from '@/utils/locale'
import { useGameStore } from '@/stores/game'

import MsTimer, { } from './MsTimer.vue'
import MsBoard from './MsBoard.vue'

const timerModeTbl: Record<GameStatusType, TimerModeType> = {
  [GameStatusEnum.READY]: TimerModeEnum.READY,
  [GameStatusEnum.RUNNING]: TimerModeEnum.RUNNING,
  [GameStatusEnum.CLEARED]: TimerModeEnum.STOPPED,
  [GameStatusEnum.GAMEOVER]: TimerModeEnum.STOPPED,
}

const props = defineProps<{
  settings: SettingsType
}>()

const locale = computed(() => initLocale(props.settings.lang))

const styles = computed(() => initStyles(props.settings.theme, props.settings.cellSize))

const node = ref<HTMLInputElement | null>(null)

const game = useGameStore()

const clearMsg = computed(() => (game.status === GameStatusEnum.CLEARED ? locale.value.cleared : ''))

const handleContextMenu = (ev: Event) => ev.preventDefault()

const handleRestart = () => game.restart()

onMounted(
  () => {
    node.value?.addEventListener('contextmenu', handleContextMenu)
  },
)

onBeforeUnmount(
  () => {
    node.value?.removeEventListener('contextmenu', handleContextMenu)
  },
)

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
      interval="1s"
      :limit="999"
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
      class="bg-gray-400 hover:bg-gray-300 text-white rounded px-4 py-2"
      type="button"
      @click="handleRestart"
    >
      {{ locale.retry }}
    </button>
  </div>
</template>
