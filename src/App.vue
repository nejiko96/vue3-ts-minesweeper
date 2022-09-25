<script lang="ts">
  import { computed, ref } from 'vue'

  import MsView from '@/views/MsView.vue'
  import CatView from '@/views/CatView.vue'
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
