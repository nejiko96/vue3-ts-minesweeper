<script lang="ts">
  import { computed, onMounted, watch } from 'vue'

  import { useGameStore } from '../store/game'
  import type {
    GridClickActionType,
    GridPosActionType,
    SettingsType,
    TimerModeType,
  } from '../types'
  import { GameStatusEnum, TimerModeEnum } from '../types'
  import { initLocale } from '../utils/locale'

  import MsBoard from './MsBoard.vue'
  import MsCell from './MsCell.vue'
  import MsTimer from './MsTimer.vue'

  const timerModeTbl = {
    [GameStatusEnum.READY]: TimerModeEnum.READY,
    [GameStatusEnum.RUNNING]: TimerModeEnum.RUNNING,
    [GameStatusEnum.CLEARED]: TimerModeEnum.STOPPED,
    [GameStatusEnum.GAMEOVER]: TimerModeEnum.STOPPED,
  } as const
</script>

<script setup lang="ts">
  const props = defineProps<{
    settings: SettingsType
  }>()

  const game = useGameStore()

  const locale = computed(
    (): Record<string, string> => initLocale(props.settings.lang)
  )

  const timerMode = computed((): TimerModeType => timerModeTbl[game.status])

  const handleRestart: () => void = () => game.restart()

  const handleMouseDown: GridClickActionType = (params) =>
    game.mouseDown(params)

  const handleMouseUp: GridPosActionType = (params) => game.mouseUp(params)

  const handleMouseOver: GridPosActionType = (params) => game.mouseOver(params)

  const handleMouseOut: GridPosActionType = (params) => game.mouseOut(params)

  const handleTouchStart: GridPosActionType = (params) =>
    game.touchStart(params)

  const handleTouchEnd: GridPosActionType = (params) => game.touchEnd(params)

  const handleLongPress: GridPosActionType = (params) => game.longPress(params)

  onMounted(() => {
    game.changeSize(props.settings.board)
  })

  watch(
    () => props.settings.board,
    () => {
      game.changeSize(props.settings.board)
    },
    { deep: true }
  )
</script>

<template>
  <div class="container" @contextmenu.prevent="">
    {{ locale.remain1 }}
    <span class="text-box">
      {{ game.remain }}
    </span>
    {{ locale.remain2 }}
    <span class="w-5" />
    {{ locale.timer1 }}
    <MsTimer class="text-box" interval="1s" :limit="999" :mode="timerMode" />
    {{ locale.timer2 }}
    <span class="w-5" />
    <transition name="pyonpyon">
      <span v-if="game.status === GameStatusEnum.CLEARED">
        {{ locale.cleared }}
      </span>
    </transition>
    <br />
    <MsBoard :grid="game.grid" :overlay="game.overlay">
      <template #cell="{ row, col, value }">
        <MsCell
          :theme="props.settings.theme"
          :row="row"
          :col="col"
          :value="value"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          @mouseover="handleMouseOver"
          @mouseout="handleMouseOut"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
          @longpress="handleLongPress"
        />
      </template>
    </MsBoard>
    <br />
    <button
      class="rounded bg-gray-400 px-4 py-2 text-black hover:bg-gray-300"
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
