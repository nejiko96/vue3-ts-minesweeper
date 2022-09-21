<script lang="ts">
  import { shallowRef } from 'vue'

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
  const currentView = shallowRef(MsView)

  const handleMenuSelect = (id: string): void => {
    currentView.value = menuItems.find((e) => e.id === id)?.view ?? MsView
  }
</script>

<template>
  <AppLayout :menu-items="menuItems" @menuselect="handleMenuSelect">
    <keep-alive>
      <component :is="currentView" />
    </keep-alive>
  </AppLayout>
</template>
