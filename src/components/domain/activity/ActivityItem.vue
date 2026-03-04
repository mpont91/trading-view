<script setup lang="ts">
import { formatTime } from '../../../helpers/format-helper.ts'
import type { Activity } from '../../../schemas/activity.ts'

defineProps<{
  activity: Activity
}>()

const getLevelConfig = (level: string) => {
  switch (level) {
    case 'INFO':
      return { color: 'text-blue-400', icon: '●' }
    case 'WARN':
      return { color: 'text-yellow-400', icon: '⚠' }
    case 'ERROR':
      return { color: 'text-red-500', icon: '✖' }
    case 'SUCCESS':
      return { color: 'text-green-400', icon: '✔' }
    default:
      return { color: 'text-zinc-500', icon: '○' }
  }
}
</script>
<template>
  <li
    class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 hover:bg-zinc-800/40 px-2 py-1.5 sm:py-1 rounded transition-colors"
  >
    <div class="flex items-center gap-2 sm:gap-3 shrink-0">
      <span class="text-zinc-600 shrink-0 select-none">
        [{{ formatTime(activity.createdAt) }}]
      </span>

      <span class="text-zinc-500 shrink-0 w-auto sm:w-52 select-none truncate">
        [{{ activity.context }}]
      </span>

      <span
        :class="[
          'font-bold shrink-0 select-none w-5 text-center text-base',
          getLevelConfig(activity.level).color,
        ]"
      >
        {{ getLevelConfig(activity.level).icon }}
      </span>
    </div>

    <span
      class="flex-1 whitespace-normal wrap-break-word leading-relaxed sm:leading-normal"
      :class="
        activity.level === 'ERROR'
          ? 'text-red-400 font-medium'
          : 'text-zinc-300'
      "
    >
      {{ activity.message }}
    </span>
  </li>
</template>
