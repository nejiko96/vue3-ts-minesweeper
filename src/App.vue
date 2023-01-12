<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import AppContext from './core/container/AppContext.vue'
  import AppLayout from './core/container/AppLayout.vue'
</script>

<template>
  <AppContext>
    <AppLayout>
      <RouterView />
    </AppLayout>
  </AppContext>
</template>
