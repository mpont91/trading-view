<template>
  <Card>
    <h2>Strategies</h2>
  </Card>
</template>

<script setup lang="ts">
import Card from '../Card.vue'
import type { PropType } from 'vue'
import type { Strategy } from '../../types/strategy.ts'

const props = defineProps({
  strategies: {
    type: Array as PropType<Strategy[]>,
    required: true,
  },
})
</script>
