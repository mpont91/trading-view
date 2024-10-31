<template>
  <VueDatePicker
    dark
    v-model="localDate"
    @update:model-value="onDateChange"
    :max-date="new Date()"
    :format="formatRangeDates"
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
import { formatRangeDates } from '../../helpers/format-helper.ts'

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

.dp__theme_dark {
  --dp-background-color: #404040;
}
</style>
