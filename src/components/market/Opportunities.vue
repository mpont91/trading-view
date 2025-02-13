<template>
  <Card>
    <h2>Latest opportunities</h2>
  </Card>
</template>

<script setup lang="ts">
import Card from '../Card.vue'
import type { PropType } from 'vue'
import type { Strategy } from '../../types/strategy.ts'

const props = defineProps({
  opportunities: {
    type: Array as PropType<Strategy[]>,
    required: true,
  },
})
</script>
