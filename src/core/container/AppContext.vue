<script setup lang="ts">
  import { ref } from 'vue'
  import { provideUser, UserType, watchUser } from '../auth'

  const user = ref<UserType | null | undefined>(undefined)

  provideUser(user)

  watchUser(user)
</script>

<template>
  <slot></slot>
</template>
