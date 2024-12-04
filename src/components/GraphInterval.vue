<template>
  <div class="inline-flex shadow-sm" role="group">
    <button
      v-for="option in timeIntervalOptions"
      :key="option"
      type="button"
      class="px-4 py-2 capitalize text-sm font-medium border bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
      :class="{ 'bg-neutral-900': option === active }"
      @click="updateActive(option)"
    >
      {{ option }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { timeIntervalOptions } from '../types/time-interval'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateActive = (option: string) => {
  emit('update:modelValue', option)
}

const active = computed(() => props.modelValue)
</script>
