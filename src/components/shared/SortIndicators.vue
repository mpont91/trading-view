<template>
  <SortUp v-if="sortField === field && sortOrder === 'asc'" class="w-5 h-5" />
  <SortDown
    v-else-if="sortField === field && sortOrder === 'desc'"
    class="w-5 h-5"
  />
  <SortUpDown v-else class="w-5 h-5" />
</template>
<script setup lang="ts">
import SortDown from '../../icons/SortDown.vue'
import SortUp from '../../icons/SortUp.vue'
import SortUpDown from '../../icons/SortUpDown.vue'
import type { PropType } from 'vue'

defineProps({
  field: {
    type: String,
    required: true,
  },
  sortField: {
    type: String,
    default: 'id',
  },
  sortOrder: {
    type: String as PropType<'asc' | 'desc'>,
    default: 'desc',
  },
})
</script>
