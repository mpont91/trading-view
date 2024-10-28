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
          :id="`${name}-${item}`"
          type="checkbox"
          v-model="selectedItems"
          @change="onChange"
          :value="item"
          class="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
        />
        <label
          :for="`${name}-${item}`"
          class="w-full py-2 ms-2 text-sm font-medium text-gray-300"
        >
          {{ item }}
        </label>
      </div>
    </li>
    <li class="w-full px-3 border-b sm:border-b-0 sm:border-r border-gray-600">
      <div class="flex items-center">
        <input
          :id="`${name}-select-all`"
          type="checkbox"
          v-model="selectAll"
          class="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
        />
        <label
          :for="`${name}-select-all`"
          class="w-full py-2 ms-2 text-sm font-medium text-gray-300"
        >
          All
        </label>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: Array as () => string[],
  items: {
    type: Array as () => string[],
    default: () => [],
  },
  name: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedItems = ref<string[]>(props.modelValue!)

const selectAll = computed({
  get() {
    return (
      props.items.length > 0 &&
      props.items.every((item) => selectedItems.value.includes(item))
    )
  },
  set(value: boolean) {
    if (value) {
      selectedItems.value = [...props.items]
    } else {
      selectedItems.value = []
    }
    emit('update:modelValue', selectedItems.value)
    emit('change', selectedItems.value)
  },
})

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
