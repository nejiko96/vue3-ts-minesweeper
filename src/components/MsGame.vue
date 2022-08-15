<script lang="ts">
import {
  computed,
  watch,
  onMounted,
} from 'vue'

import {
  SettingsType,
  GameStatusEnum,
  GameStatusType,
  TimerModeEnum,
  TimerModeType,
} from '@/types'
import { initLocale } from '@/utils/locale'
import { useGameStore } from '@/stores/game'

import MsTimer from './MsTimer.vue'
import MsBoard from './MsBoard.vue'

const timerModeTbl: Record<GameStatusType, TimerModeType> = {
  [GameStatusEnum.READY]: TimerModeEnum.READY,
  [GameStatusEnum.RUNNING]: TimerModeEnum.RUNNING,
  [GameStatusEnum.CLEARED]: TimerModeEnum.STOPPED,
  [GameStatusEnum.GAMEOVER]: TimerModeEnum.STOPPED,
}
</script>

<script setup lang="ts">
const props = defineProps<{
  settings: SettingsType
}>()

const game = useGameStore()

const locale = computed((): Record<string, string> => initLocale(props.settings.lang))

const timerMode = computed((): TimerModeType => timerModeTbl[game.status])

const clearMsg = computed(() => (game.status === GameStatusEnum.CLEARED ? locale.value.cleared : ''))

const handleRestart = () => game.restart()

onMounted(
  () => {
    game.changeTheme(props.settings.theme)
    game.changeSize(props.settings.board)
  },
)

watch(
  () => props.settings.theme,
  () => {
    game.changeTheme(props.settings.theme)
  },
  { deep: true },
)

watch(
  () => props.settings.board,
  () => {
    game.changeSize(props.settings.board)
  },
  { deep: true },
)
</script>

<template>
  <div
    class="container"
    @contextmenu.prevent=""
  >
    {{ locale.remain1 }}
    <span class="text-box">
      {{ game.remain }}
    </span>
    {{ locale.remain2 }}
    <span class="space" />
    {{ locale.timer1 }}
    <MsTimer
      class="text-box"
      interval="1s"
      :limit="999"
      :mode="timerMode"
    />
    {{ locale.timer2 }}
    <span class="space" />
    {{ clearMsg }}
    <br>
    <MsBoard />
    <p />
    <button
      class="bg-gray-400 hover:bg-gray-300 text-black rounded px-4 py-2"
      type="button"
      @click="handleRestart"
    >
      {{ locale.retry }}
    </button>
  </div>
</template>

<style scoped>
.container {
  margin: 2rem;
  white-space: nowrap;
  -webkit-touch-callout: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.text-box {
  background-color: #f5f5f5;
  color: #000;
  border: 1px solid #d3d3d3;
  display: inline-block;
  padding-right: 2px;
  text-align: right;
  width: 40px;
}

.space {
  display: inline-block;
  width: 20px;
}
</style>
