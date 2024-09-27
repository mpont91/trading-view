<template>
  <div class="flex">
    <div v-for="item in items" :key="item" class="flex items-center me-4">
      <input
        :id="`checkbox-${item}`"
        type="checkbox"
        :value="item"
        v-model="selectedItems"
        @change="onChange"
        class="w-4 h-4 text-blue-600 rounded bg-gray-700 border-gray-600"
      />
      <label
        :for="`checkbox-${item}`"
        class="ms-2 text-sm font-medium text-gray-300 capitalize"
      >
        {{ item }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Array as () => string[],
  items: {
    type: Array as () => string[],
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedItems = ref<string[]>(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    selectedItems.value = newValue
  },
)

function onChange() {
  emit('update:modelValue', selectedItems.value)
  emit('change', selectedItems.value)
}
</script>
