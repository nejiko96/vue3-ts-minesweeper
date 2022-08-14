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
  <div class="board">
    <div class="cells">
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
      class="cells-overlay"
    />
  </div>
</template>

<style scoped>
.board {
  position: relative;
  display: inline-block;
}
.cells {
  line-height: 0;
}
.cells-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.1);
  pointer-events: none;
}
</style>
