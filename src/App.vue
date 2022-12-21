<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import AppLayout from './AppLayout.vue'

  const menuItems = [
    {
      title: 'Minesweeper',
      path: '/ms',
    },
    {
      title: 'Cat API',
      path: '/cat',
    },
    {
      title: 'Wordle Helper',
      path: '/wordle',
    },
    {
      title: 'Nerdle Helper',
      path: '/nerdle',
    },
    {
      title: 'Slide Puzzle',
      path: '/slide',
    },
    {
      title: 'Flag Training',
      path: '/flag_training',
    },
  ]
</script>

<template>
  <AppLayout :menu-items="menuItems">
    <RouterView />
  </AppLayout>
</template>
