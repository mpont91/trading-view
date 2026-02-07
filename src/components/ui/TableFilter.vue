<script setup lang="ts">
import { Filter } from 'lucide-vue-next'

defineProps<{
  modelValue: string | undefined
  placeholder?: string
  options: { value: string; label: string }[]
}>()

defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()
</script>

<template>
  <div class="relative">
    <Filter
      class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
    />
    <select
      :value="modelValue"
      class="pl-9 pr-8 py-1.5 bg-zinc-950 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer w-full sm:w-auto transition-colors"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLSelectElement).value || undefined,
        )
      "
    >
      <option :value="undefined">{{ placeholder || 'Select...' }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
