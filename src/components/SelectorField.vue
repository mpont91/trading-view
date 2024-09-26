<template>
  <div class="flex">
    <div v-for="item in items" :key="item" class="flex items-center me-4">
      <input
        :id="item"
        type="radio"
        :value="item"
        v-model="selectedItem"
        @change="emit('change')"
        :name="`filter-${name}`"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        :for="item"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{{ item }}</label
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedItem = ref(props.modelValue)

watch(selectedItem, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    selectedItem.value = newValue
  },
)
</script>
<style scoped></style>
