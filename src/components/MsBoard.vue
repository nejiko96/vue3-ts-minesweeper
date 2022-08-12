<script setup lang="ts">
import { computed } from 'vue'

import { StylesType, GameStatusFlags } from '@/types'
import { useGameStore } from '@/stores/game'
import { styleIdx } from '@/models/cellModel'

import MsCell from './MsCell.vue'

const props = defineProps<{ styles: StylesType }>()

const game = useGameStore()

const overlay = computed(() => (
  (game.status & GameStatusFlags.ENABLED) > 0
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
          :style="props.styles.cell[styleIdx(value)]"
          :row="i"
          :col="j"
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
