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

const timerModeTbl: Readonly<Record<GameStatusType, TimerModeType>> = {
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
    <ms-timer
      class="text-box"
      interval="1s"
      :limit="999"
      :mode="timerMode"
    />
    {{ locale.timer2 }}
    <span class="space" />
    <transition name="pyonpyon">
      <span v-if="game.status === GameStatusEnum.CLEARED">
        {{ locale.cleared }}
      </span>
    </transition>
    <br>
    <ms-board />
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
  padding: 2rem;
  white-space: nowrap;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

.container span {
  display: inline-block;
}

.text-box {
  background-color: #f5f5f5;
  color: #000;
  border: 1px solid #d3d3d3;
  padding-right: 2px;
  text-align: right;
  width: 40px;
}

.space {
  width: 20px;
}

.pyonpyon-enter-active {
  animation: pyonpyon 1s ease-in-out;
}

@keyframes pyonpyon {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, -10px);
  }

  50% {
    transform: translate(0, 0);
  }

  75% {
    transform: translate(0, -10px);
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>
