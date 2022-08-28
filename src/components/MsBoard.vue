<script setup lang="ts">
  const props = defineProps<{
    grid: number[][]
    overlay: boolean
  }>()
</script>

<template>
  <div class="board">
    <div class="cells">
      <template v-for="(arr, i) in props.grid" :key="i">
        <template v-for="(value, j) in arr" :key="`${i}_${j}`">
          <slot name="cell" :row="i" :col="j" :value="value"></slot>
        </template>
        <br />
      </template>
    </div>
    <div v-if="props.overlay" class="cells-overlay" />
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
