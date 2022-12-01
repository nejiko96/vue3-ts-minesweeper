<script lang="ts">
  import { onMounted, ref } from 'vue'
  import draggable, { MoveEvent } from 'vuedraggable'
  import { shuffle } from '@/core/utils'
  import flagsRaw from '../assets/flag_list.txt?raw'
  import FlagLabel from '../components/FlagLabel.vue'

  type FlagType = {
    id: string
    name: string
  }

  type FlagExtType = FlagType & {
    url: string
    choice: FlagType[]
  }

  const FLAG_TBL = flagsRaw.split('\n').map((row) => {
    const [id, , name] = row.split(`\t`)
    return { id, name }
  })

  const FLAG_DIC = FLAG_TBL.reduce<Record<string, FlagType>>((h, o) => {
    h[o.id] = o
    return h
  }, {})

  const ids = [
    'AT', // オーストリア
    'ID', // インドネシア
    'LV', // ラトビア
    'MC', // モナコ
    'PL', // ポーランド
    'SG', // シンガポール
  ]
</script>
<script setup lang="ts">
  const org = ref<FlagType[]>([])

  const shuffled = ref<FlagExtType[]>([])

  const checkMove = (evt: MoveEvent<FlagType>): boolean => {
    if (evt.relatedContext.list === org.value) return true
    return evt.relatedContext.list.length === 0
  }

  const handleRestart = () => {
    org.value = ids.map((id) => ({
      ...FLAG_DIC[id],
    }))

    shuffled.value = shuffle(org.value).map((o) => ({
      ...o,
      url: new URL(`../assets/images/${o.id}.svg`, import.meta.url).href,
      choice: [],
    }))
  }

  onMounted(handleRestart)
</script>
<template>
  <div class="p-4 text-center">
    <h1 class="mb-10 text-3xl font-semibold">Flag Study</h1>

    <div class="flex flex-col items-center justify-center">
      <div class="mb-10 grid grid-cols-3 gap-x-6 gap-y-6">
        <template v-for="flag in shuffled" :key="flag.id">
          <div>
            <div class="mb-2 flex h-[200px] w-[240px] items-center">
              <img class="h-full w-full object-contain" :src="flag.url" />
            </div>
            <div
              class="mx-auto h-auto w-[240px] border-2 border-yellow-400 bg-yellow-100 p-2"
            >
              <draggable
                :list="flag.choice"
                group="flags"
                item-key="id"
                ghost-class="ghost"
                :move="checkMove"
              >
                <template #item="{ element }">
                  <FlagLabel
                    >{{ element.id === flag.id ? '⭕️' : '❌' }}
                    {{ element.name }}</FlagLabel
                  >
                </template>
              </draggable>
            </div>
          </div>
        </template>
      </div>

      <div
        class="h-[150px] w-[700px] border-2 border-yellow-400 bg-yellow-100 p-2"
      >
        <draggable
          :list="org"
          group="flags"
          item-key="id"
          class="flex flex-row flex-wrap gap-x-2 gap-y-2"
          ghost-class="ghost"
          :move="checkMove"
        >
          <template #item="{ element }">
            <FlagLabel>{{ element.name }}</FlagLabel>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .ghost {
    opacity: 0.5;
  }
</style>
