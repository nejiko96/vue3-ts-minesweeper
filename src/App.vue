<script lang="ts">
  import { computed, ref } from 'vue'
  import MsView from '@/modules/minesweeper/views/MsView.vue'
  import CatView from '@/modules/catapi/views/CatView.vue'
  import WordleView from '@/modules/wordle/views/WordleView.vue'
  import NerdleView from '@/modules/nerdle/views/NerdleView.vue'
  import SlidePuzzleView from '@/modules/catapi/views/SlidePuzzleView.vue'

  import AppLayout from './AppLayout.vue'

  const menuItems = [
    {
      id: 'MS',
      title: 'Minesweeper',
      view: MsView,
    },
    {
      id: 'CAT',
      title: 'Cat API',
      view: CatView,
    },
    {
      id: 'WORDLE',
      title: 'Wordle Helper',
      view: WordleView,
    },
    {
      id: 'NERDLE',
      title: 'Nerdle Helper',
      view: NerdleView,
    },
    {
      id: 'SLIDE',
      title: 'Slide Puzzle',
      view: SlidePuzzleView,
    },
  ]
</script>

<script setup lang="ts">
  const currentId = ref('MS')

  const currentView = computed(
    () => menuItems.find((e) => e.id === currentId.value)?.view ?? MsView
  )
</script>

<template>
  <AppLayout
    :menu-items="menuItems"
    :selected="currentId"
    @menuselect="(id) => (currentId = id)"
  >
    <keep-alive>
      <component :is="currentView" />
    </keep-alive>
  </AppLayout>
</template>
