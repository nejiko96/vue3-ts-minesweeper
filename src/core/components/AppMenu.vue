<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

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
    {
      title: 'Flag Quiz',
      path: '/flag_quiz',
    },
    {
      title: 'Counter',
      path: '/counter',
    },
  ]

  const router = useRouter()

  const currentPath = computed(() => router.currentRoute.value.path)
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      class="rounded-md bg-black bg-opacity-0 px-4 py-2 hover:bg-opacity-30"
    >
      Menu
      <fa icon="fa-angle-down" />
    </MenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div v-for="item in menuItems" :key="item.path" class="p-1">
          <MenuItem v-slot="{ active }" :disabled="item.path === currentPath">
            <button
              :class="{
                'text-gray-400': item.path === currentPath,
                'bg-teal-500 text-white': item.path !== currentPath && active,
                'text-gray-900': item.path !== currentPath && !active,
              }"
              class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
              @click="() => router.push(item.path)"
            >
              {{ item.title }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
