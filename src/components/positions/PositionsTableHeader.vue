<template>
  <th class="cursor-pointer">
    <div class="flex items-center" @click="sort(fieldValue)">
      {{ fieldName }}
      <SortIndicators
        :field="fieldValue"
        :sort-field="sortField"
        :sort-order="sortOrder"
      />
    </div>
  </th>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import SortIndicators from '../shared/SortIndicators.vue'

defineProps({
  fieldName: {
    type: String,
    required: true,
  },
  fieldValue: {
    type: String,
    required: true,
  },
  sortField: {
    type: String,
    required: true,
  },
  sortOrder: {
    type: String as PropType<'asc' | 'desc'>,
    required: true,
  },
})

const emit = defineEmits(['sort'])

function sort(field: string) {
  emit('sort', field)
}
</script>
