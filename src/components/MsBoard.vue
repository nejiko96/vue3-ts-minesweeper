<script setup lang="ts">
import { computed } from 'vue'

import { useGameStore } from '@/stores/game'
import { gameStatusFlags } from '@/models/gameModel'

import { StylesType } from '@/types'
import MsCell from './MsCell.vue'

const props = defineProps<{ styles: StylesType }>()

const game = useGameStore()

const overlay = computed(() => (
  (game.status & gameStatusFlags.ENABLED) > 0
  && game.touch
))
</script>

<template>
  <div :style="props.styles.board">
    <div :style="props.styles.cells">
      <template
        v-for="(arr, i) in game.grid"
        :key="i"
      >
        <MsCell
          v-for="(value, j) in arr"
          :key="`${i}_${j}`"
          :style="props.styles.cell"
          :row="i"
          :col="j"
          :value="value"
        />
        <br>
      </template>
    </div>
    <div
      v-if="overlay"
      :style="styles.cellsOverlay"
    />
  </div>
</template>
