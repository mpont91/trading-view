<template>
  <label for="table-search" class="sr-only">Search</label>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none"
    >
      <Search class="w-5 h-5 text-gray-400" />
    </div>
    <input
      :value="modelValue"
      @input="updateSearch"
      @change="emit('change')"
      type="text"
      id="table-search"
      class="block p-2 ps-10 text-sm border w-80 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white"
      placeholder="Search for items"
    />
  </div>
</template>
<script setup lang="ts">
import Search from '../../icons/Search.vue'

defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue', 'change'])

function updateSearch(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>
