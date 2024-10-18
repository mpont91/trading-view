<template>
  <VueDatePicker
    dark
    v-model="localDate"
    @update:model-value="onDateChange"
    :max-date="new Date()"
    :format="format"
    :enable-time-picker="false"
    :range="{ partialRange: false }"
    auto-apply
    :clearable="false"
  />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
})

const emit = defineEmits(['update:from', 'update:to'])

const localDate = ref([props.from, props.to])

const onDateChange = (newDate: [Date, Date]) => {
  emit('update:from', newDate[0])
  emit('update:to', newDate[1])
}

const format = (dates: Date[]) => {
  const from = dates[0]
  const dayFrom = from.getDate()
  const monthFrom = from.getMonth() + 1
  const yearFrom = from.getFullYear()
  const fromString = `${yearFrom}-${monthFrom}-${dayFrom}`

  if (dates.length === 1) {
    return fromString
  }

  const to = dates[1]
  const dayTo = to.getDate()
  const monthTo = to.getMonth() + 1
  const yearTo = to.getFullYear()
  const toString = `${yearTo}-${monthTo}-${dayTo}`

  return `${fromString} - ${toString}`
}

watch(
  () => [props.from, props.to],
  ([newFrom, newTo]) => {
    localDate.value = [newFrom, newTo]
  },
)
</script>
<style>
:root {
  --dp-border-radius: 0px;
  --dp-cell-border-radius: 0px;
}
</style>
