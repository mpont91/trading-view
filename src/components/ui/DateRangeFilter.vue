<script setup lang="ts">
import { Calendar, ChevronDown } from 'lucide-vue-next'

defineProps<{
  startDate: Date | undefined
  endDate: Date | undefined
}>()

defineEmits<{
  'update:startDate': [value: string | undefined]
  'update:endDate': [value: string | undefined]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="relative group">
      <Calendar
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none group-focus-within:text-emerald-500 transition-colors"
      />
      <ChevronDown
        class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none group-focus-within:text-emerald-500 transition-colors"
      />
      <input
        type="date"
        :value="startDate || ''"
        class="pl-10 pr-3 py-1.5 w-full"
        @input="
          $emit(
            'update:startDate',
            ($event.target as HTMLSelectElement).value || undefined,
          )
        "
      />
    </div>

    <span class="text-zinc-600 text-sm">-</span>

    <div class="relative group">
      <Calendar
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none group-focus-within:text-emerald-500 transition-colors"
      />
      <ChevronDown
        class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none group-focus-within:text-emerald-500 transition-colors"
      />
      <input
        type="date"
        :value="endDate || ''"
        class="pl-10 pr-3 py-1.5 w-full"
        @input="
          $emit(
            'update:endDate',
            ($event.target as HTMLSelectElement).value || undefined,
          )
        "
      />
    </div>
  </div>
</template>
