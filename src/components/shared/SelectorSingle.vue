<template>
  <select
    v-model="selectedItem"
    @change="onChange"
    class="border text-sm block w-full p-2.5 bg-neutral-700 border-gray-600 text-white"
  >
    <option v-for="item in items" :key="`${name}-${item}`" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
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

const selectedItem = ref<string>(props.modelValue!)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      selectedItem.value = newValue
    }
  },
)

function onChange() {
  emit('update:modelValue', selectedItem.value)
  emit('change', selectedItem.value)
}
</script>
