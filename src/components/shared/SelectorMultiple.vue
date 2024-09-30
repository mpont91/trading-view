<template>
  <ul
    v-if="items.length > 0"
    class="items-center text-sm font-medium border sm:flex bg-neutral-700 border-gray-600 text-white"
  >
    <li
      v-for="item in items"
      :key="item"
      class="w-full px-3 border-b sm:border-b-0 sm:border-r border-gray-600"
    >
      <div class="flex items-center">
        <input
          :id="`checkbox-${item}`"
          type="checkbox"
          v-model="selectedItems"
          @change="onChange"
          :value="item"
          class="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
        />
        <label
          :for="`checkbox-${item}`"
          class="w-full py-2 ms-2 text-sm font-medium text-gray-300"
        >
          {{ item }}
        </label>
      </div>
    </li>
  </ul>
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

const selectedItems = ref<string[]>(props.modelValue!)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      selectedItems.value = newValue
    }
  },
)

function onChange() {
  emit('update:modelValue', selectedItems.value)
  emit('change', selectedItems.value)
}
</script>
