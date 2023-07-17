<script setup lang="ts">
  import { ref } from 'vue'
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { injectUser, login, logout, UserRefType } from '../auth'
  import UserAvatar from './UserAvatar.vue'

  const user: UserRefType = injectUser() as UserRefType

  const waiting = ref(false)

  const signIn: () => void = () => {
    waiting.value = true
    login()
      .catch((error) => {
        console.error(error?.code)
      })
      .finally(() => {
        waiting.value = false
      })
  }
</script>
<template>
  <div
    v-if="user === null"
    class="rounded-md bg-black/0 px-4 py-2 hover:bg-black/30"
    @click="signIn"
  >
    Sign in
  </div>
  <Menu v-if="user && !waiting" as="div" class="relative">
    <MenuButton class="block rounded-md bg-black/0 px-4 py-2 hover:bg-black/30">
      <UserAvatar :src="user.photoURL" />
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
        class="absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="p-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="active ? 'bg-teal-500 text-white' : 'text-gray-900'"
              class="group flex w-full items-center rounded-md p-2 text-sm"
              @click="logout"
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
