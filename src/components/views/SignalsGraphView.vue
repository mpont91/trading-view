<template>
  <Card title="Signals">
    <GraphInterval class="my-4 sm:float-right" v-model="interval" />
  </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Card from '../common/Card.vue'
import GraphInterval from './GraphIntervalView.vue'
import { registerChartJs } from '../../helpers/graph-helper.ts'

registerChartJs()

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
