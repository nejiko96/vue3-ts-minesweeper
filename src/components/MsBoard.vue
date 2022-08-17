<script setup lang="ts">
import { computed } from 'vue'

import { GameStatusFlags } from '@/types'
import { useGameStore } from '@/stores/game'

import MsCell from './MsCell.vue'

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
        <ms-cell
          v-for="(value, j) in arr"
          :key="`${i}_${j}`"
          :row="i"
          :col="j"
          :value="value"
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
  background-color: rgb(0 0 0 / 10%);
  pointer-events: none;
}
</style>
