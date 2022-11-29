<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'
  import VueElementLoading from 'vue-element-loading'
  import { fetchCatImage } from '../models/catApi'

  const catImageUrl = ref('')

  const isLoading = ref(false)

  const updateCatImage = async () => {
    isLoading.value = true
    const image = await fetchCatImage()
    catImageUrl.value = image.url
  }

  const loadedCatImage = () => {
    isLoading.value = false
  }

  onBeforeMount(updateCatImage)
</script>

<template>
  <VueElementLoading
    :active="isLoading"
    color="orange"
    is-full-page
    spinner="line-scale"
  />
  <div class="p-4">
    <button
      class="mx-auto block cursor-pointer rounded border-2 border-transparent bg-red-500 px-4 py-2 font-semibold text-white transition duration-300 hover:border-red-300 hover:bg-red-600"
      @click="updateCatImage"
    >
      Today's Cat
    </button>
    <div class="mx-auto mt-4 w-3/5">
      <img class="h-auto w-full" :src="catImageUrl" @load="loadedCatImage" />
    </div>
  </div>
</template>
