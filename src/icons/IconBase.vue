<script setup lang="ts">
  import { CSSProperties } from 'vue'

  withDefaults(
    defineProps<{
      iconName?: string
      viewBox?: string
      iconColor?: string
      style?: string | CSSProperties
    }>(),
    {
      iconName: 'box',
      viewBox: '0 0 448 512',
      iconColor: 'currentColor',
      style: 'height: 1rem;',
    }
  )
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :aria-label="iconName"
    role="presentation"
    :style="style"
  >
    <title :id="iconName">{{ iconName }}</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>
